import { getPostBySlug } from "@/app/lib/posts";
import { markdownToHtml } from "@/app/lib/markdown";
import { MermaidRenderer } from "@/common/mermaidRenderer";

interface PostPageProps {
    params: {
        slug: string;
    };
}

export default async function PostPage({ params }: PostPageProps) {
    // params是一个Promise对象，需要await才能获取到slug
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) {
        return <div>Post not found</div>;
    }
    const contentHtml = await markdownToHtml(post.content || "");

    return (
        <div className="flex items-center justify-center auto-animate">
            <div className="p-8 my-4 w-full max-w-3xl">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold pb-4">{post.title}</h1>
                    <time className="text-gray-500 dark:text-gray-400">
                        {new Date(post.date).toLocaleDateString('en-US')}
                    </time>
                </header>
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                >
                </div>
                <MermaidRenderer></MermaidRenderer>
            </div>
        </div>
    );
}
