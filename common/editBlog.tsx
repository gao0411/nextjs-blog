"use client"
import MDEditorWrapper from "./MDEditorWrapper";
import { getPostRawContent, savePostContent } from "@/app/lib/editPosts";
import { useState, useEffect } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

type EditBlogProps = {
    slug: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function EditBlog({ slug, isOpen, onClose }: EditBlogProps) {
    const [rawContent, setRawContent] = useState<string>("");
    useEffect(() => {
        if (isOpen && slug) {
            loadingContent();
        }
    }, [isOpen, slug])

    const loadingContent = async () => {
        const content = await getPostRawContent(slug);
        setRawContent(content || "");
    }

    const handleSave = async () => {
        await savePostContent(slug, rawContent);
        onClose();
    }

    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            <DrawerContent>
                <DrawerTitle></DrawerTitle>
                <MDEditorWrapper rawContent={rawContent} setRawContent={setRawContent} />
                <DrawerFooter className='fixed bottom-2 right-2'>
                    <ButtonGroup>
                        <Button variant="outline" onClick={onClose} className='flex-auto'>取消</Button>
                        <Button onClick={handleSave} className='flex-auto'>保存</Button>
                    </ButtonGroup>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}