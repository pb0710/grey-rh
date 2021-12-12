# Vite + React + Typescript

## 目录结构

```
.
├── README.md // 文档
├── conf // 项目配置
│   ├── dev.ts
│   ├── index.ts
│   └── prod.ts
├── dist // 打包目录
├── index.html // 入口文件
├── package.json
├── public
│   └── favicon.svg
├── src // 源码目录
│   ├── App.tsx
│   ├── api // 请求
│   ├── assets // 静态资源
│   ├── components // 组件
│   ├── hooks // 自定义hooks
│   ├── index.tsx 入口
│   ├── store // redux
│   ├── utils // 工具库
│   └── views // 页面
├── .eslintrc // eslint 配置
├── .gitignore // git忽略文件配置
├── .prettierrc // 格式化代码配置
├── stats.html // 包体积分析可视化页面
├── tsconfig.json // typescript 配置
├── vite.config.ts // vite 配置
└── yarn.lock // 依赖版本锁定
```

## 工具链

-   husky
-   eslint
-   prettier
-   sass
