export interface Product {
  title: string;
  actualPrice: number;
  discountPrice: number;
  image: string;
}

export interface ProductList {
  products: Product[];
}
