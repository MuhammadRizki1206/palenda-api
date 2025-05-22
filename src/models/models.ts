export interface Auth {
  email: string;
  name: string;
  password: string;
}

export interface History {
  image: string | null;
  name: string;
  description: string;
}

export interface Culinary {
  image: string | null;
  name: string;
  description: string;
}

export interface TourPackage {
  image: string;
  title: string;
  description: string;
  price: number;
  location: string;
  logo: string | null;
}

export interface UMKMProduct {
  image: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  location: string;
  logo: string | null;
}

export interface NewsItem {
  image: string;
  name: string;
  description: string;
}
