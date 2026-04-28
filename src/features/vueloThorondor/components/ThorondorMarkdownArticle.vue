<template>
    <article class="markdown-article" v-html="html"></article>
</template>

<script>
import { renderMarkdown } from "@/features/vueloThorondor/utils/markdown";

export default {
    name: "ThorondorMarkdownArticle",

    props: {
        source: {
            type: String,
            required: true
        }
    },

    computed: {
        html() {
            return renderMarkdown(this.source);
        }
    }
};
</script>

<style scoped>
.markdown-article {
    color: #dbe5f1;
    line-height: 1.75;
}

.markdown-article :deep(h1),
.markdown-article :deep(h2),
.markdown-article :deep(h3) {
    color: #f8fafc;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
}

.markdown-article :deep(h1) {
    font-size: 1.8rem;
}

.markdown-article :deep(h2) {
    font-size: 1.35rem;
}

.markdown-article :deep(h3) {
    font-size: 1.08rem;
}

.markdown-article :deep(p),
.markdown-article :deep(li),
.markdown-article :deep(blockquote) {
    color: #cbd5e1;
}

.markdown-article :deep(code) {
    background: rgba(15, 23, 42, 0.72);
    border: 1px solid #334155;
    border-radius: 6px;
    color: #e2e8f0;
    padding: 2px 6px;
    font-family: "Courier New", monospace;
}

.markdown-article :deep(pre) {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 8px;
    padding: 14px;
    overflow: auto;
}

.markdown-article :deep(pre code) {
    background: transparent;
    border: 0;
    padding: 0;
}

.markdown-article :deep(blockquote) {
    border-left: 3px solid rgba(56, 189, 248, 0.45);
    padding-left: 14px;
    margin-left: 0;
}

.markdown-article :deep(ul),
.markdown-article :deep(ol) {
    padding-left: 20px;
}
</style>
