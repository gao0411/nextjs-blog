import markdownit from "markdown-it";
import hljs from "highlight.js";

const md = new markdownit({
  html: true, // 允许 HTML 标签
  linkify: true, // 自动识别 URL
  typographer: true, // 智能引号等
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(str, { language: lang }).value;
    }
    return ""; // 或者返回未高亮的 <code>
  },
});

export function markdownToHtml(content: string): string {
  return md.render(content);
}
