[返回文档首页](./README.md)

## 数据模型规范

### 普通模型

普通模型必须继承自 [RootModel](../src/model/RootModel.ts) 类。

普通模型用于不涉及数据库实体的数据结构，如登录表单、查询参数等。

### 实体模型

实体模型必须继承自 [RootEntity](../src/model/RootEntity.ts) 类。

实体模型用于表示数据库实体，必须包含 `id: number` 属性。

实体模型通常用于与后端接口交互的业务数据。

### 装饰器使用

数据模型通过装饰器来定义字段的元数据，包括：
- [@Field](./decorator.md#field) - 定义字段基本信息
- [@Form](./decorator.md#form) - 定义表单相关属性
- [@Table](./decorator.md#table) - 定义表格相关属性
- [@Search](./decorator.md#search) - 定义搜索相关属性

这些装饰器可以组合使用，为同一个字段定义不同场景下的元数据。