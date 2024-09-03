export interface Dimensions {
  depth: number;
  height: number;
  width: number;
}

export interface Review {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
}

export interface Meta {
  barcode: string;
  createdAt: string;
  qrCode: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  tags: string[];
  dimensions: Dimensions;
  weight: number;
  thumbnail: string;
  images: string[];
  availabilityStatus: string;
  minimumOrderQuantity: number;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  sku: string;
  reviews: Review[];
  meta: Meta;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  cart: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  totalItems: number;
  totalAmount: number;
}
