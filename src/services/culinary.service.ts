import { PrismaClient, Culinary } from "@prisma/client";

export class CulinaryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createCulinary(
    imageUrl: string,
    name: string,
    description: string
  ): Promise<Culinary> {
    return await this.prisma.culinary.create({
      data: {
        image: imageUrl,
        name,
        description,
      },
    });
  }

  async getAllCulinary(): Promise<Culinary[]> {
    return await this.prisma.culinary.findMany();
  }

  async getCulinaryById(id: string): Promise<Culinary | null> {
    return await this.prisma.culinary.findUnique({
      where: {
        id,
      },
    });
  }

  async updateCulinary(
    id: string,
    image: string,
    name: string,
    description: string
  ): Promise<Culinary> {
    return await this.prisma.culinary.update({
      where: { id },
      data: { image, name, description },
    });
  }
  async deleteCulinary(id: string): Promise<Culinary> {
    return await this.prisma.culinary.delete({
      where: { id },
    });
  }
}
