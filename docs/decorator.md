[返回文档首页](./README.md)

## 内置装饰器

AirPower-Web 提供了多种装饰器来简化开发，通过元数据的方式定义模型字段在不同场景下的表现形式。

### @Model

[@Model](../src/decorator/@Model/Model.ts) 装饰器用于定义模型的基本信息。

```typescript

@Model({
    name: '用户',
    api: '/user'
})
export class User extends RootEntity {
    // ...
}
```

### @Field

[@Field](../src/decorator/@Field/Field.ts) 装饰器用于定义字段的基本信息。

```typescript
export class User extends RootEntity {
    @Field({
        label: '用户名',
        summary: '用户登录名',
        placeholder: '请输入用户名'
    })
    username!: string

    @Field({
        label: '年龄',
        min: 0,
        max: 150
    })
    age!: number
}
```

### @Form

[@Form](../src/decorator/@Form/Form.ts) 装饰器用于定义字段在表单中的表现形式。

```typescript
export class User extends RootEntity {
    @Field({
        label: '用户名'
    })
    @Form({
        required: true,
    })
    username!: string

    @Field({
        label: '邮箱'
    })
    @Form({
        email: true,
        required: true,
    })
    email!: string
}
```

### @Table

[@Table](../src/decorator/@Table/Table.ts) 装饰器用于定义字段在表格中的表现形式。

```typescript
export class User extends RootEntity {
    @Field({
        label: '用户名'
    })
    @Table({
        width: 150,
        align: 'center'
    })
    username!: string

    @Field({
        label: '状态'
    })
    @Table({
        enum: UserStatusEnum
    })
    status!: number
}
```

### @Search

[@Search](../src/decorator/@Search/Search.ts) 装饰器用于定义字段在搜索表单中的表现形式。

```typescript
export class User extends RootEntity {
    @Field({
        label: '用户名'
    })
    @Search({
        order: 1,
        col: 6
    })
    username!: string

    @Field({
        label: '注册时间'
    })
    @Search({
        type: 'datetime',
        order: 2,
        col: 6
    })
    createdAt!: Date
}
```

## 装饰器组合使用

同一个字段可以同时使用多个装饰器，分别定义在不同场景下的表现形式：

```typescript
export class User extends RootEntity {
    @Field({
        label: '用户名',
        placeholder: '请输入用户名'
    })
    @Form({
        required: true,
        col: 12,
        order: 1
    })
    @Table({
        width: 150,
        sortable: true
    })
    @Search({
        order: 1,
        col: 6
    })
    username!: string
}
```

## 装饰器配置项

#### @Field 配置项

| 属性          | 类型         | 说明     |
|-------------|------------|--------|
| label       | string     | 字段显示名称 |
| summary     | string     | 字段摘要说明 |
| placeholder | string     | 占位符文本  |
| min         | number     | 最小值    |
| max         | number     | 最大值    |
| dictionary  | IWebEnum[] | 字典枚举   |

#### @Form 配置项

| 属性       | 类型               | 说明              |
|----------|------------------|-----------------|
| required | boolean          | 是否必填            |
| col      | number           | 表单栅格占据的列数(1-24) |
| order    | number           | 表单字段排序          |
| type     | string           | 表单控件类型          |
| show     | boolean/function | 是否显示该字段         |
| disabled | boolean/function | 是否禁用            |

#### @Table 配置项

| 属性       | 类型               | 说明                                             |
|----------|------------------|------------------------------------------------|
| width    | number/string    | 列宽度                                            |
| sortable | boolean          | 是否可排序                                          |
| align    | string           | 对齐方式(left/center/right)                        |
| type     | string           | 列类型(text/enum/date/datetime/money/phone/image) |
| show     | boolean/function | 是否显示该列                                         |
| fixed    | boolean/string   | 是否固定列                                          |

#### @Search 配置项

| 属性       | 类型               | 说明                |
|----------|------------------|-------------------|
| order    | number           | 搜索字段排序            |
| col      | number           | 搜索表单栅格占据的列数(1-24) |
| type     | string           | 搜索控件类型            |
| show     | boolean/function | 是否显示该字段           |
| disabled | boolean/function | 是否禁用              |