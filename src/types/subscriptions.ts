export interface Subscription {
  id: number;
  image: string;
  isActive: boolean;
  title: string;
  description: string;
  features: string[];
  price: string;
  pricePer?: string;
  banner?: string;
  onClick?: (...args: any) => any;
}
