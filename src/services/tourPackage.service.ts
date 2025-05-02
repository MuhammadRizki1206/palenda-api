// services/tourPackageService.ts
import { PrismaClient, TourPackage } from "@prisma/client";

export class TourPackageService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Create Tour Package
  async createTourPackage(
    image: string,
    title: string,
    price: number,
    location: string,
    logo: string,
    description: string
  ): Promise<TourPackage> {
    try {
      // Simpan data TourPackage ke Prisma
      const newTourPackage = await this.prisma.tourPackage.create({
        data: {
          image,
          title,
          price,
          location,
          logo,
          description,
        },
      });
      return newTourPackage;
    } catch (error) {
      throw new Error("Failed to create tour package");
    }
  }

  // Get All Tour Packages
  async getAllTourPackages(): Promise<TourPackage[]> {
    try {
      return await this.prisma.tourPackage.findMany(); // Mengambil semua data dari database
    } catch (error) {
      throw new Error("Failed to fetch tour packages");
    }
  }

  // Get Tour Package by ID
  async getTourPackageById(id: string): Promise<TourPackage | null> {
    try {
      return await this.prisma.tourPackage.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error("Failed to fetch tour package");
    }
  }

  // Update Tour Package
  async updateTourPackage(
    id: string,
    image: string,
    title: string,
    price: number,
    location: string,
    logo: string,
    description: string
  ): Promise<TourPackage | null> {
    try {
      return await this.prisma.tourPackage.update({
        where: { id },
        data: {
          image,
          title,
          price,
          location,
          logo,
          description,
        },
      });
    } catch (error) {
      throw new Error("Failed to update tour package");
    }
  }

  // Delete Tour Package
  async deleteTourPackage(id: string): Promise<boolean> {
    try {
      await this.prisma.tourPackage.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      throw new Error("Failed to delete tour package");
    }
  }
}
