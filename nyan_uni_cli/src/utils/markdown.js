import { marked } from 'marked';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify'; // 安全过滤

// 配置 Markdown 解析规则
marked.setOptions({
  breaks: true,      // 自动换行
  gfm: true,         // 支持 GitHub Flavored Markdown
  highlight: (code, lang) => {
    return hljs.highlightAuto(code).value; // 自动检测语言
  }
});

// 自定义安全过滤函数
const safeParse = (raw) => {
  return DOMPurify.sanitize(marked.parse(raw), {
    ALLOWED_TAGS: ['h1','h2','code','pre'], // 按需开放标签
    FORBID_ATTR: ['style','onerror'] // 禁止危险属性
  });
};

export { marked, safeParse };
