interface Product {
  id: number;
  price: number;
  weight: number;
  count: number;
  description: string;
  isInCart?: boolean;
}

interface State {
  products: Product[];
  cart: Product[];
}