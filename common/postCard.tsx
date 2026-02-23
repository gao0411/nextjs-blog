import { formatDate } from "@/app/lib/utils";
import type { PostMetadata } from "@/app/lib/posts";
import Link from "next/link";
import AuthedButtonGroup from "@/common/authedButtonGroup";

export default function PostCard({ post }: Readonly<{ post: PostMetadata }>) {
  return (
    <article
      key={post.slug}
      className="py-3"
    >
      <div className="inline-block text-gray-600 hover:text-gray-900">
        <Link href={`/blog/${post.slug}`} className="p-0 pr-2 text-lg  dark:text-white dark:hover:text-blue-500 transition-colors">
          {post.title}
        </Link>
        <time className="p-0 text-base opacity-[0.5] cursor-pointer">
          {formatDate(post.date)}
        </time>
        <AuthedButtonGroup slug={post.slug}/>
      </div>
    </article>
  );
}
