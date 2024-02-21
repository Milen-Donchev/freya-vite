import { Image } from './ui';

export interface Period {
  is_default: boolean;
  price: string;
  price_formatted: string;
  type: string; // monthly | six-months | ...
}

export interface Orderable {
  id: number;
  price: number; // 5.9
  price_formatted: string; // 5,90 $
  periods?: Period[];
}

export interface Product {
  id: number;
  can_change_quantifiable: boolean;
  default_quantifiable: {
    key: string;
    value: string;
  };
  description: Record<string, string>;
  image: Image;
  orderable: Orderable;
  orderable_id: number;
  orderable_slug: string;
  orderable_title: Record<string, string>;
  price: number;
  price_formatted: string;
  quantifiable_key: string; // period | quantity | ...
  title: Record<string, string>;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  products_count: number;
  profile_id: number;
  total: number;
  total_formatted: string;
}

export interface CartProduct {
  id: number;
  price: string;
  price_formatted: string;
  product: Product;
  quantifiable_key: string;
  quantifiable_value: {
    key: string;
    value: Record<string, string>;
  };
  total: number;
  total_formatted: string;
}

export interface PaymentMethod {
  id: number;
  title: Record<string, string>;
  description: Record<string, string>;
  type: string;
  type_title: Record<string, string>;
}

export interface PaymentStatus {
  key: string; // "pending" | "paid" ...
  color: string; // #FF8C00
  title: Record<string, string>;
}

export interface OrderDocument {
  created_at: string; // "03/01/2024"
  number: number;
  number_formatted: string; // "#700000002"
  route: string; // http://domain.com/document/24
  total: number;
  total_formatted: string;
  type: 'invoice';
  type_title: Record<string, string>;
}

export interface OrderRefund {
  id: number;
  created_at: string;
  order_id: number;
  profile_id: number;
  status: 'pending' | 'approved';
  status_title: Record<string, string>;
  total: number;
  total_formatted: string;
}

export interface Order {
  id: number;
  created_at: string; // UTC date
  payment_method: PaymentMethod;
  payment_method_id: number;
  products: CartProduct[];
  profile_id: number;
  status: PaymentStatus;
  total: number; // 2.4
  total_formatted: string; // "2, 40 E"
  can_refund: boolean;
  documents: OrderDocument[];
  order_refund?: OrderRefund;
}
