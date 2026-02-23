"use client"

import { useAuth } from "@/app/hooks/use-auth"
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { TooltipTrigger, Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { FilePen } from "lucide-react";
import EditBlog from "./editBlog";
import { useState } from "react";

type AuthedButtonGroupProps = {
    slug?: string;
}

export default function AuthedButtonGroup({ slug }: AuthedButtonGroupProps) {
    const { isAuthenticated } = useAuth();
    const [isEditOpen, setIsEditOpen] = useState(false);
    if (!isAuthenticated) {
        return null; // 如果用户未登录，不显示文档操作按钮组
    }

    const handleClick = () => {
        // 打开编辑博客的对话框
        setIsEditOpen(true);
    }
    return (
        <div className="inline-block">
            <ButtonGroup className="ml-4">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={handleClick} className="text-xs size-5">
                            <FilePen />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>编辑博客</span>
                    </TooltipContent>
                </Tooltip>
            </ButtonGroup>
            <EditBlog slug={slug || ""} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
        </div>
    )
}