// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// 模拟数据库中的用户（实际项目中应从数据库获取）
const ADMIN_USER = {
  id: "1",
  username: process.env.ADMIN_USERNAME || "",
  // 密码应该使用 bcrypt 加密后存储
  passwordHash: process.env.ADMIN_PASSWORD_HASH || "",
  role: "admin" as const,
};

const JWT_SECRET = process.env.JWT_SECRET || "1433223";
const JWT_EXPIRES_IN = "7d"; // Token 有效期7天

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 1. 验证必填字段
    if (!username || !password) {
      return NextResponse.json(
        {
          error: "用户名和密码不能为空",
        },
        {
          status: 400,
        },
      );
    }

    // 2. 验证用户名
    if (username !== ADMIN_USER.username) {
      return NextResponse.json(
        {
          error: "用户名或密码错误",
        },
        { status: 401 },
      );
    }

    // 3. 验证密码
    const isPasswordValid = await bcrypt.compare(
      password,
      ADMIN_USER.passwordHash,
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: "用户名或密码错误",
        },
        { status: 402 },
      );
    }

    // 4. 生成 JWT Token
    const token = jwt.sign(
      {
        userId: ADMIN_USER.id,
        username: ADMIN_USER.username,
        role: ADMIN_USER.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    // 5. 设置 HTTP-only Cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7天
      path: "/",
    });

    // 6. 返回成功响应
    return NextResponse.json(
      {
        success: true,
        user: {
          id: ADMIN_USER.id,
          username: ADMIN_USER.username,
          role: ADMIN_USER.role,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("登录错误:", error);
    return NextResponse.json({ error: "服务器内部错误", status: 500 });
  }
}

// 登出 API
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");

  return NextResponse.json({ success: true });
}

// 检查登录状态
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ isAuthenticated: false });
    }

    // 验证 Token
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    return NextResponse.json({
      isAuthenticated: true,
      user: {
        id: decoded.userId,
        username: decoded.username,
        role: decoded.role,
      },
    });
  } catch (error) {
    // Token 无效或过期
    return NextResponse.json({ isAuthenticated: false });
  }
}
