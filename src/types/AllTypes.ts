export interface IBook {
  _id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  category: "Fiction" | "Science" | "SelfDevelopment" | "Poetry" | "Religious";
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

// Define the structure for a book in the cart
export interface Book {
  image: string;
  _id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
  cartQuantity: number;
}

// Define the initial state type
export interface CartState {
  books: Book[];
}
export interface IProduct {
  image?: string | undefined;
  title: string;
  productId: string | IProduct; // ID or full product details
  quantity: number; // Quantity of the product in the order
  price?: number; // Optional price of the product at the time of order
}

export interface IOrder {
  _id: string; // Unique identifier for the order
  user: string; // ID of the user who placed the order
  products: IProduct[];
  totalPrice: number; // Total price of the order
  transactionId?: string; // Optional transaction ID for payment
  status: "pending" | "success" | "cancelled"; // Status of the order
  createdAt: string; // Creation date of the order
  updatedAt?: string; // Optional last update date of the order
}
