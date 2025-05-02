import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { Auth } from "../models/models"; // Pastikan path ini benar
import { registerSchema, loginSchema } from "../validators/auth.validators";

const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Register
  async register(data: Auth) {
    const validatedData = registerSchema.parse(data);
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    try {
      const admin = await this.prisma.admin.create({
        data: {
          username: validatedData.username,
          name: validatedData.name,
          email: validatedData.email,
          password: hashedPassword,
        },
      });
      return { success: true, admin };
    } catch (error) {
      return { success: false, message: "Email or Username already taken" };
    }
  }

  // Login
  async login(email: string, password: string) {
    const validatedData = loginSchema.parse({ email, password });

    const admin = await this.prisma.admin.findUnique({
      where: { email: validatedData.email },
    });

    if (
      !admin ||
      !(await bcrypt.compare(validatedData.password, admin.password))
    ) {
      return { success: false, message: "Invalid credentials" };
    }

    const accessToken = jwt.sign({ id: admin.id }, JWT_SECRET, {
      expiresIn: "3d",
    });

    const refreshToken = jwt.sign({ id: admin.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Update the admin with the new tokens
    await this.prisma.admin.update({
      where: { email: validatedData.email },
      data: {
        refresh_token: refreshToken,
        access_token: accessToken,
      },
    });

    return { success: true, accessToken, refreshToken, admin };
  }

  // Refresh Token
  async refreshToken(token: string) {
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const admin = await this.prisma.admin.findUnique({
        where: { id: decoded.id },
      });

      if (!admin) {
        return { success: false, message: "Invalid refresh token" };
      }

      const newAccessToken = jwt.sign({ id: admin.id }, JWT_SECRET, {
        expiresIn: "3d",
      });

      return { success: true, accessToken: newAccessToken };
    } catch (error) {
      return { success: false, message: "Invalid refresh token" };
    }
  }
}
