import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

const aboutDirectory = path.join(process.cwd(), "content", "about");

export type PostMetadata = {
  slug: string;
  content?: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  draft?: boolean;
};

export function getAllPost(): PostMetadata[] {
  const files = fs.readdirSync(postsDirectory);
  console.log("files", files);
  const posts = files
    .filter((file) => {
      return file.endsWith(".md");
    })
    .map((file) => {
      const fullPath = path.join(postsDirectory, file);
      const content = fs.readFileSync(fullPath, "utf-8");
      const { data } = matter(content);
      return {
        slug: file.replace(/\.md$/, ""),
        ...data,
      } as PostMetadata;
    })
    .filter((post) => !post.draft)
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  return posts;
}

export function getPostBySlug(slug: string): PostMetadata | null {
  if (slug === "about") {
    return getAbout();
  }
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    slug,
    content,
    ...data,
  } as PostMetadata;
}

export function getAbout() {
  const aboutPath = path.join(aboutDirectory, "ggl.md");
  if (!fs.existsSync(aboutPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(aboutPath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    slug: "ggl",
    content,
    ...data,
  } as PostMetadata;
}

// posts 按年月分组
const groupedPosts = (posts: PostMetadata[]) =>
  posts.reduce(
    (acc, post) => {
      // 确保 date 是 Date 对象
      const date = new Date(post.date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() 返回 0-11
      const key = `${year}-${month}`; // 如 "2026-03"

      if (!acc[key]) {
        acc[key] = { year, month, posts: [] };
      }
      acc[key].posts.push(post);
      return acc;
    },
    {} as Record<string, { year: number; month: string; posts: typeof posts }>,
  );

// 按月份将groupedPosts转为数组并按时间倒序（最新在前）
const groups = (grouped: Record<string, any>) => Object.values(grouped).sort((a, b) => {
  return (
    new Date(b.year, Number(b.month) - 1).getTime() -
    new Date(a.year, Number(a.month) - 1).getTime()
  );
});

// 获取英文月份名称
const getMonthNameFromStr = (monthStr: string): string => {
  const monthNum = parseInt(monthStr, 10);
  if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    throw new Error("Invalid month");
  }
  return new Date(2024, monthNum - 1).toLocaleString("en-US", {
    month: "short",
  });
};

export const postsByMonth = () => {
  const posts = getAllPost();
  const grouped = groupedPosts(posts);
  const groupsArr = groups(grouped);
  return groupsArr.map((group) => ({
    ...group,
    monthName: getMonthNameFromStr(group.month),
  }));
};
