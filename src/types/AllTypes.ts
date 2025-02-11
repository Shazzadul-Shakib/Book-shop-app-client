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
  cartQuantity:number;
}

// Define the initial state type
export interface CartState {
  books: Book[];
}
