// components/MermaidRenderer.tsx
'use client';

import { useEffect } from 'react';

// 修复循环引用的补丁
const applyMermaidPatch = () => {
  if (typeof window === 'undefined') return;
  
  // 保存原始方法
  const originalStringify = JSON.stringify;
  
  // 安全版的stringify
  JSON.stringify = function(value, replacer, space) {
    const seen = new WeakSet();
    
    const safeReplacer = replacer || function(key, val) {
      if (typeof val === 'object' && val !== null) {
        if (seen.has(val)) {
          return '[Circular]';
        }
        seen.add(val);
      }
      return val;
    };
    
    // 适用类型断言告诉ts我这里的参数就是你要的类型
    return originalStringify.call(this, value, safeReplacer as (string | number)[] | null | undefined, space);
  };
};

export function MermaidRenderer() {
  useEffect(() => {
    
    // 应用补丁
    applyMermaidPatch();

    import('mermaid')
      .then((mermaid) => {
        mermaid.default.initialize({
          startOnLoad: false,
          theme: 'base',
          securityLevel: 'loose', // 允许内联脚本
        });

        // 渲染所有 .mermaid 元素
        mermaid.default.run({
          querySelector: "pre code.language-mermaid"
        });
      })
      .catch(console.error);
  }, []);

  return null;
}