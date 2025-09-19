[返回文档首页](./README.md)

## 命名规范

### 前置规范

类、枚举等必须使用 `大写驼峰`，如：

- `LoginModel`
- `UserEntity`
- `UserTypeEnum`

函数、变量、属性等必须使用 `小写驼峰`，如：

- `getUserList`
- `userList`
- `userType`

接口必须使用 `大写驼峰`，且建议行为限定类的接口使用 `I` 开头，如：

- `IFile`
- `IUser`

泛型、常量必须使用 `全大写蛇形`，如：

- `USER_TYPE_ADMIN`
- `IS_ADMIN`
- `REQ`

### 文件和类名

| 类型    | 命名规则          | 示例                |
|-------|---------------|-------------------|
| 数据模型  | 使用 Model 结尾   | `LoginModel.ts`   |
| 实体模型  | 使用 Entity 结尾  | `UserEntity.ts`   |
| 封装枚举  | 使用 Enum 结尾    | `UserTypeEnum.ts` |
| 封装工具  | 使用 Util 结尾    | `StringUtil.ts`   |
| 封装接口  | 使用 Service 结尾 | `UserService.ts`  |
| 列表页面  | 使用 List       | `list.vue`        |
| 详情页面  | 使用 Detail     | `detail.vue`      |
| 编辑页面  | 使用 Edit       | `edit.vue`        |
| 选择器页面 | 使用 Selector   | `selector.vue`    |

### 方法名称

方法和函数使用 `动词` + `名词(可省略)` + `限定词(可省略)`，例如：

- `getUserList`
- `getUserById`
- `addUser`
- `updateUser`
- `deleteUser`
- `login`

#### 分页请求

名称必须包含 `page` ，且请求和响应必须使用指定的数据模型，如：

- `getUserPage`
- `getPage`
- `getUserPageByXXX`

#### 列表请求

名称必须包含 `List`，且请求和响应必须使用指定的数据模型，如：

- `getUserList`
- `getList`
- `getUserListByXXX`
