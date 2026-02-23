import Link from "next/link";
import AuthedButtonGroup from "./authedButtonGroup";

export default function About() {

    return (
        <>
            {/* 可选：更多链接 */}
            <div>
                <Link
                    href="/blog/about"
                    className="pb-4 text-base text-black dark:text-gray-600 hover:underline hover:font-bold dark:hover:text-gray-300 dark:hover:underline dark:hover:font-bold transition-colors"
                >
                    关于我 →
                </Link>
                <AuthedButtonGroup slug="ggl" />
            </div>
        </>
    )
}