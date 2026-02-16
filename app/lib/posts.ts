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
