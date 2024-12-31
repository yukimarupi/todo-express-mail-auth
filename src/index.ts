import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

// 型を明示的に指定
app.post("/send-login-link", async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // ユーザーが存在しない場合は新しく作成
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email },
  });

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const loginLink = `http://localhost:${port}/login?token=${Buffer.from(email).toString("base64")}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Your login link",
    text: `Click the link to login: ${loginLink}`,
  });

  return res.status(200).json({ message: "Login link sent" });
});

app.get("/login", (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send("Token is required");
  }

  const email = Buffer.from(token as string, "base64").toString("utf-8");

  // ログイン処理（実際にはユーザーをセッションに保存する等が必要）
  return res.status(200).send(`Login successful for: ${email}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
