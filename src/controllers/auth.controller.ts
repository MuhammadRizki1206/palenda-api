import { Request, Response } from "express";
import { AuthService } from "../services/auth.service"; // Pastikan path ini benar
import { Auth } from "../models/models";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Memanggil login di AuthService dan menunggu hasilnya
      const result = await this.authService.login(email, password);

      if (result.success) {
        const { accessToken, refreshToken, admin } = result;

        res.status(200).send({
          data: {
            user: admin,
            access_token: accessToken,
            refresh_token: refreshToken,
          },
          message: "Successfully logged in",
          status: res.statusCode,
        });
      } else {
        res.status(401).send({
          success: false,
          message: result.message || "Invalid credentials",
          status: res.statusCode,
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).send({
        success: false,
        message: `Failed to login: Please check your email and password`,
        detail: error.message || error.errors,
        status: res.statusCode,
      });
    }
  }

  // Register
  async register(req: Request, res: Response) {
    try {
      const user: Auth = req.body;
      const result = await this.authService.register(user);

      if (result.success) {
        res.status(201).send({
          message: "Successfully registered",
          status: res.statusCode,
        });
      } else {
        res.status(400).send({
          message:
            result.message ||
            "Failed to register: Username/Email is already taken",
          status: res.statusCode,
        });
      }
    } catch (error: any) {
      console.error("Register error:", error);
      res.status(500).send({
        message: `Failed to register: Please try again later.`,
        status: res.statusCode,
      });
    }
  }

  // Refresh Token
  async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    const data = await this.authService.refreshToken(refreshToken);
    if (data) {
      res.status(200).send({
        data: {
          refresh_token: data,
        },
        message: "Token updated",
        status: res.statusCode,
      });
    } else {
      res.status(400).send({
        message: "Failed to retrieve refresh token. Please try again later.",
        status: res.statusCode,
      });
    }
  }
}
