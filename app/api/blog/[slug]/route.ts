import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content", "posts");
const aboutDirectory = path.join(process.cwd(), "content", "about");

// GET - 获取博客原始内容 用于编辑博客时显示在编辑器中 客户端组件必须通过API请求获取数据
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = await params;
    const fullPath =
      slug === "ggl"
        ? path.join(aboutDirectory, `${slug}.md`)
        : path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return Response.json({ error: "Blog not found" }, { status: 404 });
    }

    const rawContent = fs.readFileSync(fullPath, "utf-8");

    return Response.json({
      rawContent, // 完整的原始内容
    });
  } catch (error) {
    console.error("Error reading blog:", error);
    return Response.json({ error: "Failed to read blog" }, { status: 500 });
  }
}

// PUT - 保存博客内容
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = await params;
    const { content } = await request.json();

    const fullPath = path.join(postsDirectory, `${slug}.md`);
    fs.writeFileSync(fullPath, content, "utf-8");

    return Response.json({
      success: true,
      message: "博客修改成功",
    });
  } catch (error) {
    console.error("博客修改错误:", error);
    return Response.json({ error: "博客修改错误" }, { status: 500 });
  }
}
