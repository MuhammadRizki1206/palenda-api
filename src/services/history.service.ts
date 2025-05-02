import { PrismaClient, History } from "@prisma/client";

export class HistoryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Create History with Cloudinary upload
  async createHistory(
    imageUrl: string,
    name: string,
    description: string
  ): Promise<History> {
    // Save history record with the image URL in the database
    return await this.prisma.history.create({
      data: {
        image: imageUrl, // Save the URL that was passed from the controller
        name,
        description,
      },
    });
  }

  async getAllHistory(): Promise<History[]> {
    return await this.prisma.history.findMany();
  }

  async getHistoryById(id: string): Promise<History | null> {
    return await this.prisma.history.findUnique({
      where: {
        id,
      },
    });
  }

  async updateHistory(
    id: string,
    image: string,
    name: string,
    description: string
  ): Promise<History> {
    return await this.prisma.history.update({
      where: { id },
      data: { image, name, description },
    });
  }

  async deleteHistory(id: string): Promise<History> {
    return await this.prisma.history.delete({
      where: { id },
    });
  }
}
