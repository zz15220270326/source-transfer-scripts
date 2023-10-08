# source-transfer-scripts

这是一个资源转换器的项目（目前支持转换 B站视频）的脚本，依赖（`source-transfer-server`），这里主要实现了客户端部分的内容

# 功能点

该项目主要负责：
  - DOM 操作
  - ajax 上传提交
  - 前端资源展示 & 资源提交操作

# 使用步骤
> ## 使用前注意
> 1. 建议 Node 版本大于 14
> 2. 本项目使用 pnpm 管理，建议使用 pnpm 安装项目
> 3. 本项目需要和 `source-transfer-server` 同时运行
----

1. 安装依赖，在根目录下执行

```bash
pnpm install;
```

2. 运行项目
```bash
pnpm run dev;
```

3. 运行项目：[链接地址: http://localhost:9241](http://localhost:9241) 

    看到以下画面就算是运行成功了：
    ![Alt text](image.png)
