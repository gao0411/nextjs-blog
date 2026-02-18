---
title: "Deving Problems"
date: "2026-02-10"
excerpt: "开发时遇到的问题"
tags: ["dev", "problem"]
---

canvas的指针事件问题：此问题来源于在使用canvas做背景动画时，设置z-index后导致canvas上的事件无法触发，原因是point-events仅能触发一个元素，无法同时触发多个元素，所以解决办法就是在需要触发的元素上设置point-events-auto，在不需要触发的元素上设置point-events-none，使得canvas能够触发hover事件 **经过大量查阅资料发现，浏览器的指针事件默认只派发给最上层可交互元素，也就是多个元素重叠，仅有最上层可交互元素能接收，其他元素接收不到。基于以上信息，原方案不是最优解，最优解是全局监听事件，因为canvas上的事件无法触发，window上的事件必定会触发，在tsparticles库可以将tsparticles中的option.interactive.detectOn设置为window，启用全局监听即可触发指针事件，并且这种方案是心智负担最小的方案** 而且需要注意的是，规范中说这个命中测试并没有一份正式的文件，所以在不同浏览器中这个问题的行为结果可能也不同

todo：typography插件如何使用？直接用`@plugin`不需要在`postcss.config.mjs`中添加

mermaid渲染问题：在渲染md文件中的mermaid图表时遇到了一些问题。
  1. 如何渲染mermaid：直接使用mermaid插件，在输出解析好的md文件后，寻找包含mermaid类的元素，生成svg元素渲染
  2. 渲染block图表时遇到的循环引用的问题：自己实现一个安全的JSON.stringfy方法，本质上就是把要序列化的对象/参数处理了一下，排查困难的点在于为什么会出现循环引用，查阅资料发现可能是在日志上或调试功能上需要使用JSON.stringfy方法转换数据，而block数据对象可能会有双向引用的情况出现
  3. ts类型断言：类型断言其实本质上就是告诉ts，我这个参数/对象的类型是什么，来解决类型不一致的错误问题，使用上要符合类型安全性的基本规范
  4. 图表闪烁问题：md文件显示流程 markdown-it解析md文件，通过innerHTML插入，插入后通过mermaid库将HTML中的包含mermaid代码的标签进行替换 通过上述流程可见md文件的渲染与图表的转换是有顺序问题的，这会导致页面先显示mermaid源代码，再显示转换后的图表，目前的**解决方案**是将转换前的标签设置`display:none`属性
  5. SVG闪烁：由于SVG也有一个初始化过程，导致图表的渲染有一个从初始SVG到最终SVG的过程，**解决方案**是SVG仅能使用固定大小，所以设置`height:50vh`
