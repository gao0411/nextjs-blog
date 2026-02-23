import { postsByMonth } from "./lib/posts";
import PostCard from "@/common/postCard";
import About from "@/common/about";
import NewBlog from "@/common/newBlog";

export default function Home() {
  const posts = postsByMonth();
  return (
    <div className="justify-items-center content-center">
      <div className="w-2xl px-4 pt-12">
        {/* Hero Section */}
        <header className="py-8 text-left">
          <h1 className="text-4xl py-6">{"ga_oo的博客"}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            这里是我的个人博客，分享关于开发的经验与思考。
          </p>
        </header>
      </div>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 w-2xl auto-animate">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">暂无文章</p>
        ) : (
          posts.map((post: any) => (
            <div key={`${post.year}-${post.month}`} className="mb-10">
              <div className="select-none relative pointer-events-none" >
                <span className="text-7xl absolute -left-[0.5em] -top-[2rem] font-sans text-transparent text-stroke-2-black opacity-[0.1]">
                  {`${post.year} ${post.monthName}`}
                </span>
              </div>
              {/* 该月的文章列表 */}
              <div>
                {
                  post.posts.map((post: any) => (
                    <PostCard key={post.slug} post={post} />
                  ))
                }
              </div>
            </div >
          ))
        )
        }
      </main >
      <About />
      <NewBlog />
    </div >
  );
}
