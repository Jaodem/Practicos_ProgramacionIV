export interface CartItemDetail {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  image_url: string;
}

export interface CartDetail {
  cart_id?: number;
  items: CartItemDetail[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}