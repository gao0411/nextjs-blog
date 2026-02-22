import { getAllPost } from "./lib/posts";
import PostCard from "@/common/postCard";
import About from "@/common/about";

export default function Home() {
  const posts = getAllPost();
  const groupedPosts = posts.reduce((acc, post) => {
    // 确保 date 是 Date 对象
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() 返回 0-11
    const key = `${year}-${month}`; // 如 "2026-03"

    if (!acc[key]) {
      acc[key] = { year, month, posts: [] };
    }
    acc[key].posts.push(post);
    return acc;
  }, {} as Record<string, { year: number; month: string; posts: typeof posts }>);

  // 转为数组并按时间倒序（最新在前）
  const groups = Object.values(groupedPosts).sort((a, b) => {
    return new Date(b.year, Number(b.month) - 1).getTime() - new Date(a.year, Number(a.month) - 1).getTime();
  });

  const getMonthNameFromStr = (monthStr: string): string => {
    const monthNum = parseInt(monthStr, 10);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      throw new Error('Invalid month');
    }
    return new Date(2024, monthNum - 1).toLocaleString('en-US', { month: 'short' });
  }

  return (
    <div className="flex-auto justify-items-center content-center">
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
          groups.map((group: any) => (
            <div key={`${group.year}-${group.month}`} className="mb-10">
              <div className="select-none relative pointer-events-none" >
                <span className="text-7xl absolute -left-[0.5em] -top-[2rem] font-sans text-transparent text-stroke-2-black opacity-[0.1]">
                  {`${group.year} ${getMonthNameFromStr(group.month)}`}
                </span>
              </div>
              {/* 该月的文章列表 */}
              <div>
                {
                  group.posts.map((post: any) => (
                    <PostCard key={post.slug} post={post} />
                  ))
                }
              </div>
            </div >
          ))
        )
        }
      </main >
      <About></About>
    </div >
  );
}
