# Mizuho

Mizuho 是一个根据 GitHub Profile 来填写 `package.json` 相关字段的 CLI 工具。

## 用法

```bash
npx mizuho
```

首次使用的时候需要手动键入 email 和 GitHub 用户名，之后会使用存储在 `~/.mizuhorc` 中的缓存。

如果相关信息更新，你可以使用：

```bash
npx mizuho --delete
```

删除后再次运行 `npx mizuho` 来重新填写信息。

## 效果

可以参考 [此项目的 package.json](./package.json)。

## 最后

Mizuho 可以是：

| 花之宫瑞穗 | 宫小路瑞穗 |
|------------|-------------|
| ![Hananomiya](./assets/Hananomiya.png) | ![Miyanokouji](./assets/Miyanokouji.png) |
