import { z } from "zod";

// Validator untuk model History
export const historyValidator = z.object({
  id: z.string().uuid(), // id menggunakan UUID
  image: z.string().url(), // image harus URL yang valid
  name: z.string().min(1, "Name is required"), // name tidak boleh kosong
  description: z.string().min(1, "Description is required"), // description tidak boleh kosong
  createdAt: z.date(), // createdAt harus bertipe Date
  updatedAt: z.date(), // updatedAt harus bertipe Date
});

// Validator untuk model Culinary
export const culinaryValidator = z.object({
  id: z.string().uuid(), // id menggunakan UUID
  image: z.string().url(), // image harus URL yang valid
  name: z.string().min(1, "Name is required"), // name tidak boleh kosong
  description: z.string().min(1, "Description is required"), // description tidak boleh kosong
  createdAt: z.date(), // createdAt harus bertipe Date
  updatedAt: z.date(), // updatedAt harus bertipe Date
});

// Validator untuk model TourPackage
export const tourPackageValidator = z.object({
  id: z.string().uuid(), // id menggunakan UUID
  image: z.string().url(), // image harus URL yang valid
  title: z.string().min(1, "Title is required"), // title tidak boleh kosong
  price: z.number().positive("Price must be a positive number"), // price harus decimal dan positif
  location: z.string().min(1, "Location is required"), // location tidak boleh kosong
  logo: z.string().url(), // logo harus URL yang valid
  description: z.string().min(1, "Description is required"), // description tidak boleh kosong
  createdAt: z.date(), // createdAt harus bertipe Date
  updatedAt: z.date(), // updatedAt harus bertipe Date
});

// Validator untuk model UMKMProduct
export const umkmProductValidator = z.object({
  id: z.string().uuid(), // id menggunakan UUID
  image: z.string().url(), // image harus URL yang valid
  name: z.string().min(1, "Name is required"), // name tidak boleh kosong
  price: z.number().positive("Price must be a positive number"), // price harus decimal dan positif
  location: z.string().min(1, "Location is required"), // location tidak boleh kosong
  logo: z.string().url(), // logo harus URL yang valid
  createdAt: z.date(), // createdAt harus bertipe Date
  updatedAt: z.date(), // updatedAt harus bertipe Date
});
