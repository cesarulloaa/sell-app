export interface SignupFormData {
  businessName: string;
  email: string;
  password: string;
  countryCode: string;
  phoneNumber: string;
}

export interface FormErrors {
  businessName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
}
