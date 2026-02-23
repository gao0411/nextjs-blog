"use client"

import { useAuth } from "@/app/hooks/use-auth"
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { TooltipTrigger, Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { FilePen } from "lucide-react";

export default function AuthedButtonGroup() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return null; // 如果用户未登录，不显示文档操作按钮组
    }

    const handleClick = () => {
        // todo: 实现编辑博客的逻辑
        console.log("编辑按钮被点击");
    }
    return (
        <div className="inline-block">
            <ButtonGroup className="ml-4">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon-sm" onClick={handleClick}>
                            <FilePen />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>编辑博客</span>
                    </TooltipContent>
                </Tooltip>
            </ButtonGroup>
        </div>
    )
}