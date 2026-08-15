import React from 'react';

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  status: string;
  imageUrl: string;
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  growth: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface ActionCardProps {
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  primary?: boolean;
}

export interface ProductListItemProps {
  product: ProductItem;
}
