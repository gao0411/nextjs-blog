"use client";

import { useAuth } from "@/app/hooks/use-auth";
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Drawer, DrawerContent, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import MDEditor from '@uiw/react-md-editor';
import { useState } from "react";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { createNewPost } from "@/app/lib/editPosts";
import { useRouter } from "next/navigation";
export default function NewBlog() {
    const { isAuthenticated } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [rawContent, setRawContent] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const router = useRouter();

    if (!isAuthenticated) {
        return null; // 如果用户未登录，不显示新建博客按钮
    }

    const handleClick = () => {
        // todo: 实现新建博客的逻辑
        setIsOpen(true);
    }

    const onClose = () => {
        document.body.style.overflow = 'auto';
        setIsOpen(false);
    }

    const handleSave = async () => {
        // todo: 实现保存博客的逻辑
        if (!fileName) {
            alert("请输入文件名称");
            return;
        }
        await createNewPost(fileName, rawContent);
        onClose();
        // 刷新页面以显示新博客
        router.refresh();
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
            <Drawer open={isOpen} onOpenChange={onClose}>
                <DrawerContent>
                    <DrawerTitle></DrawerTitle>
                    <div className="flex flex-col h-full">
                        <MDEditor
                            value={rawContent || ""}
                            onChange={(value) => {
                                setRawContent(value || "");
                            }}
                            className='flex-1 m-4'
                        />
                    </div>
                    <DrawerFooter className='fixed bottom-2 right-2 flex flex-row'>
                        <Input placeholder="输入文件名称" value={fileName} onChange={(e) => setFileName(e.target.value)} />
                        <ButtonGroup>
                            <Button variant="outline" onClick={onClose} className='flex-auto'>取消</Button>
                            <Button onClick={handleSave} className='flex-auto'>保存</Button>
                        </ButtonGroup>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}