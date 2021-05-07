# matias-vuepress-cli

[`vuepress`](https://vuepress.vuejs.org/zh/guide/directory-structure.html)目录及文件创建命令行工具

## 命令

> $ mt-vuepress-run 指令

### docs

> $ mt-vuepress-run docs

创建 `docs` 文件夹及其中的文件。目录结构如下：
```txt
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```
