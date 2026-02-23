import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export async function POST(request: NextRequest) {
  try {
    const { slug, content } = await request.json();

    const fullPath = path.join(postsDirectory, `${slug}.md`);
    fs.writeFileSync(fullPath, content, "utf-8");

    return Response.json({
      success: true,
      message: "博客创建成功",
    });
  } catch (error) {
    console.error("博客创建错误:", error);
    return Response.json({ error: "博客创建错误" }, { status: 500 });
  }
}
