"use client";

import { useAuth } from "@/app/hooks/use-auth";
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function NewBlog() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return null; // 如果用户未登录，不显示新建博客按钮
    }

    const handleClick = () => {
        // todo: 实现新建博客的逻辑
        console.log("新建博客按钮被点击");
    }
    return (
        <div className="fixed bottom-16 right-16">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="icon-lg" className="rounded-full" onClick={handleClick}>
                        <Plus />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <span>新建博客</span>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}