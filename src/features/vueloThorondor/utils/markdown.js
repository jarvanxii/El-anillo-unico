export function renderMarkdown(markdownText) {
  const safeSource = String(markdownText || "");

  if (typeof window !== "undefined" && window.marked?.parse) {
    return window.marked.parse(safeSource);
  }

  return safeSource
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/^> (.*)$/gm, "<blockquote>$1</blockquote>")
    .replace(/```bash([\s\S]*?)```/gm, (_, code) => `<pre><code>${escapeHtml(code.trim())}</code></pre>`)
    .replace(/```([\s\S]*?)```/gm, (_, code) => `<pre><code>${escapeHtml(code.trim())}</code></pre>`)
    .replace(/^- (.*)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/gm, "<ul>$1</ul>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>");
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
