"use client";

import MDEditor from "@uiw/react-md-editor";
import { useEffect } from "react";

type MDEditorWrapperProps = {
    rawContent: string;
    setRawContent: (content: string) => void;
}

// 这个组件的作用是包裹MDEditor，并在组件卸载时恢复body的overflow属性，防止出现滚动条无法滚动的问题
// 主要解决的是MDEditor与Drawer组件一起使用时，属性设置的问题
export default function MDEditorWrapper({ rawContent, setRawContent }: MDEditorWrapperProps) {
    useEffect(() => {
        return () => {
            document.body.style.overflow = "";
        }
    }, [])
    return (
        <div className="flex flex-col h-full">
            <MDEditor
                value={rawContent || ""}
                onChange={(value) => {
                    setRawContent(value || "");
                }}
                className='flex-1 m-4'
            />
        </div>
    )
}