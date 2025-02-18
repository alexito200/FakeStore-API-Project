export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
}
export interface OrderItem {
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
  }
  
  export interface Order {
    id?: string;
    items: OrderItem[];
    totalAmount: number;
    totalPrice: string;
    createdAt: Date;
    status: string;
  }
  