import { PrismaClient, UMKMProduct } from "@prisma/client";

export class UMKMProductService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUMKMProduct(
    image: string,
    name: string,
    price: number,
    location: string,
    logo: string,
    description: string
  ): Promise<UMKMProduct> {
    try {
      const newUMKMProduct = await this.prisma.uMKMProduct.create({
        data: {
          image,
          name,
          price,
          location,
          logo,
          description,
        },
      });
      return newUMKMProduct;
    } catch (error) {
      throw new Error("Failed to create umkm product");
    }
  }

  async getAllUMKMProduct(): Promise<UMKMProduct[]> {
    try {
      return await this.prisma.uMKMProduct.findMany();
    } catch (error) {
      throw new Error("Failed to fetch umkm product");
    }
  }
  async getUMKMProductById(id: string): Promise<UMKMProduct | null> {
    try {
      return await this.prisma.uMKMProduct.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error("Failed to fetch umkm Product");
    }
  }
  async updateUMKMProduct(
    id: string,
    image: string,
    name: string,
    price: number,
    location: string,
    logo: string,
    description: string
  ): Promise<UMKMProduct | null> {
    try {
      return await this.prisma.uMKMProduct.update({
        where: { id },
        data: {
          image,
          name,
          price,
          location,
          logo,
          description,
        },
      });
    } catch (error) {
      throw new Error("Failed to update UMKM product");
    }
  }

  async deleteUMKMProduct(id: string): Promise<boolean> {
    try {
      await this.prisma.uMKMProduct.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      throw new Error("Failed to delete UMKM Product");
    }
  }
}
