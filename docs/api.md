[返回文档首页](./README.md)

## 通用接口规范

我们使用的是 `POST` 请求，数据类型统一为 `JSON`。其中 `Http` 状态码固定为 `200`，不使用 `Restful` 风格。

返回体基础 JSON 如下

```json
{
  "code": 200,
  "message": "成功",
  "data": {}
}
```

其中，`code` 为状态码，`message` 为返回信息，`data` 为返回数据。

> code 为 `200` 时为请求成功，`401` 为需要登录，`403` 为无权限，`500` 为服务器错误，其他为自定义错误。
>
> data 为返回数据，具体格式根据接口定义。
>
> 错误信息为 `message`

所有通用的增删改查接口命名规范如下：

### 列表和分页请求

列表和分页请求的请求体必须继承 `QueryRequest` 类，所以均支持传入 `filter` `sort` 参数，其中：

> - `fiter` 为过滤条件，必须继承来自 `RootEntity`
> - `sort` 为排序对象，必须是 `QuerySort` 类，即必须包含 `field` 字段属性以及 `direction` 排序方向属性
> - `page` 为分页对象，仅分页请求需要传入。
>
> 分页对象要求必须包含 pageNum 和 pageSize 两个属性。

#### 分页请求

分页请求要求接口名称固定为 `getPage`，且要求请求体继承 `QueryRequestPage` 类，响应体继承 `QueryResponsePage` 类。

> 分页响应的数据模型必须包含 `list` 列表属性、`total` 总数属性、 `pageCount` 页码数属性、`page` 分页对象、`sort` 排序对象等属性。

#### 不分页列表请求

不分页列表请求要求接口名称固定为 `getList`，且要求请求体继承 `QueryRequest` 类，响应体为 `RootEntity` 的子类数组。

### 详情请求

详情请求要求接口名称固定为 `getDetail`，且要求请求体固定为 `{"id": xxx}`，响应体继承 `RootEntity` 类。

### 禁用/启用/删除

禁用/启用/删除 接口名称固定为 `disable`、`enable`、`delete`，且要求请求体固定为 `{"id": xxx}`，无数据响应体。

### 新增和修改

新增和修改接口名称固定为 `add`、`update`，且要求请求体继承 `RootEntity` 类，新增固定响应体为 `{"id": xxx}`，修改无数据响应体。