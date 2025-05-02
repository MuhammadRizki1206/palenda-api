import { PrismaClient, NewsItem } from "@prisma/client";

export class NewsService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createNews(
    imageUrl: string,
    name: string,
    description: string
  ): Promise<NewsItem> {
    return await this.prisma.newsItem.create({
      data: {
        image: imageUrl,
        name,
        description,
      },
    });
  }

  async getAllNews(): Promise<NewsItem[]> {
    return await this.prisma.newsItem.findMany();
  }

  async getNewsById(id: string): Promise<NewsItem | null> {
    return await this.prisma.newsItem.findUnique({
      where: {
        id,
      },
    });
  }

  async updateNews(
    id: string,
    image: string,
    name: string,
    description: string
  ): Promise<NewsItem> {
    return await this.prisma.newsItem.update({
      where: { id },
      data: { image, name, description },
    });
  }

  async deleteNews(id: string): Promise<NewsItem> {
    return await this.prisma.newsItem.delete({
      where: { id },
    });
  }
}
