// Importar React y los hooks necesarios para el manejo de estado, efectos y contexto
import React, { createContext, useContext, useState, useEffect } from 'react';
// Importar funciones de Firebase Authentication para el flujo de autenticación de usuarios
import {
    createUserWithEmailAndPassword, // Para registrar nuevos usuarios con correo/contraseña
    signInWithEmailAndPassword,     // Para iniciar sesión con correo/contraseña
    signOut,                        // Para cerrar la sesión del usuario actual
    onAuthStateChanged,             // Escuchador que reacciona a cambios del estado de sesión
    type User                       // Tipo TypeScript que representa los datos de usuario de Firebase auth
} from 'firebase/auth';
// Importar instancias configuradas de autenticación y base de datos (Firestore)
import { auth, db } from '../config/firebase';
// Importar funciones de Firestore para manejar documentos y colecciones
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Interfaz que define la estructura de los datos adicionales del usuario almacenados en Firestore
interface UserData {
    uid: string;          // ID único del usuario (coincide con el Auth uid)
    email: string;        // Correo electrónico del usuario/negocio
    businessName: string; // Nombre del negocio o tienda del vendedor
    phoneNumber: string;  // Número de teléfono de contacto (e.g. para redirección a WhatsApp)
    createdAt: string;    // Fecha de creación del registro en formato ISO string
}

// Interfaz que describe el valor provisto por el contexto de autenticación
interface AuthContextType {
    user: User | null;         // El objeto de usuario autenticado de Firebase Auth (o null)
    userData: UserData | null; // Datos personalizados del usuario guardados en la base de datos (o null)
    loading: boolean;          // Indicador de carga para saber si se está procesando la autenticación
    signup: (email: string, password: string, businessName: string, phoneNumber: string) => Promise<void>; // Registro
    login: (email: string, password: string) => Promise<void>; // Inicio de sesión
    logout: () => Promise<void>; // Cierre de sesión
    error: string | null;      // Mensajes de error potenciales durante el flujo
}

// Crear el contexto de autenticación React con un valor inicial indefinido (Undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente Proveedor que envuelve la aplicación para proveer el estado de autenticación a sus hijos
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Estado para guardar el objeto de usuario de Firebase Auth
    const [user, setUser] = useState<User | null>(null);
    // Estado para guardar la información personalizada del usuario desde Firestore
    const [userData, setUserData] = useState<UserData | null>(null);
    // Estado para manejar el estado de carga inicial de la autenticación
    const [loading, setLoading] = useState(true);
    // Estado para guardar y mostrar errores de autenticación
    const [error, setError] = useState<string | null>(null);

    // Efecto para monitorear el estado de autenticación de forma reactiva al montar el componente
    useEffect(() => {
        // Suscribirse a los cambios en el estado de autenticación de Firebase
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            // Si hay un usuario autenticado activo
            if (currentUser) {
                // Actualizar el estado del usuario de Auth
                setUser(currentUser);

                // Obtener datos adicionales del usuario de la colección 'users' en Firestore
                try {
                    // Obtener referencia al documento del usuario usando su UID
                    const userDocRef = doc(db, 'users', currentUser.uid);
                    // Obtener instantánea/snapshot del documento en la base de datos
                    const userDocSnap = await getDoc(userDocRef);

                    // Si el documento existe en Firestore, guardar sus datos en el estado
                    if (userDocSnap.exists()) {
                        setUserData(userDocSnap.data() as UserData);
                    }
                } catch (err) {
                    // Capturar y registrar en consola cualquier fallo al obtener los datos de la base de datos
                    console.error('Error fetching user data:', err);
                }
            } else {
                // Si no hay usuario autenticado, limpiar ambos estados
                setUser(null);
                setUserData(null);
            }
            // Finalizar el estado de carga una vez finalizada la consulta inicial de autenticación
            setLoading(false);
        });

        // Retornar la función unsubscribe para limpiar la suscripción cuando el componente se desmonte
        return unsubscribe;
    }, []); // Array de dependencias vacío para ejecutar solo una vez al montar

    // Función asíncrona para registrar un usuario nuevo con email, password y detalles del negocio
    const signup = async (
        email: string,
        password: string,
        businessName: string,
        phoneNumber: string
    ) => {
        try {
            setError(null);

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;

            const userDocRef = doc(db, 'users', newUser.uid);

            // Timeout de seguridad: si Firestore no responde en 8 segundos, avisa
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Firestore no responde. Revisa tu ad-blocker o conexión.')))
            );


            setDoc(userDocRef, {
                uid: newUser.uid,
                email: newUser.email,
                businessName,
                phoneNumber,
                createdAt: new Date().toISOString(),
                isPhoneVerified: false
            }),
                timeoutPromise

            setUser(newUser);
            setUserData({
                uid: newUser.uid,
                email: newUser.email || '',
                businessName,
                phoneNumber,
                createdAt: new Date().toISOString()
            });
        } catch (err: any) {
            const errorMessage = err.message || 'Error en signup';
            setError(errorMessage);
            throw err;
        }
    };

    // Función asíncrona para iniciar sesión con correo y contraseña
    const login = async (email: string, password: string) => {
        try {
            // Limpiar errores previos
            setError(null);

            // Intentar iniciar sesión usando Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Extraer el usuario logueado
            const loggedInUser = userCredential.user;

            // Obtener datos del usuario desde la base de datos Firestore
            const userDocRef = doc(db, 'users', loggedInUser.uid);
            const userDocSnap = await getDoc(userDocRef);

            // Si el documento existe, guardar los datos en el estado
            if (userDocSnap.exists()) {
                setUserData(userDocSnap.data() as UserData);
            }

            // Actualizar estado de usuario de Auth
            setUser(loggedInUser);
        } catch (err: any) {
            // Capturar y guardar en estado el mensaje de error
            const errorMessage = err.message || 'Error en login';
            setError(errorMessage);
            // Propagar el error para manejo en interfaz
            throw err;
        }
    };

    // Función asíncrona para cerrar la sesión del usuario actual
    const logout = async () => {
        try {
            // Limpiar posibles errores
            setError(null);
            // Ejecutar logout en Firebase Auth
            await signOut(auth);
            // Limpiar estados locales de usuario y datos personalizados
            setUser(null);
            setUserData(null);
        } catch (err: any) {
            // Guardar cualquier error ocurrido durante el cierre de sesión
            setError(err.message);
            throw err;
        }
    };

    // Retornar el Context Provider envolviendo a los componentes hijos y pasando los valores de autenticación
    return (
        <AuthContext.Provider value={{ user, userData, loading, signup, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para consumir el contexto de autenticación de forma simplificada en cualquier componente
export const useAuth = () => {
    // Obtener el valor del contexto actual de AuthContext
    const context = useContext(AuthContext);

    // Si el hook se usa fuera de un AuthProvider, lanzar un error para evitar fallos silenciosos
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }

    // Retornar los valores del contexto de autenticación
    return context;
};