[返回文档首页](./README.md)

## 配置和常量

### WebConfig 全局配置

[WebConfig](../src/config/WebConfig.ts) 类用于配置 AirPower-Web 的全局设置，可以在应用初始化时进行修改。

#### 主要配置项

| 配置项               | 类型       | 默认值               | 说明              |
|-------------------|----------|-------------------|-----------------|
| appKey            | string   | 'AirPower'        | 应用标识            |
| apiUrl            | string   | '/api/'           | 接口根地址           |
| uploadUrl         | string   | '/upload'         | 上传地址            |
| timeout           | number   | 5000              | HTTP请求超时时间(毫秒)  |
| successCode       | number   | 200               | HTTP请求成功状态码     |
| unAuthorizeCode   | number   | 401               | HTTP未授权状态码      |
| maxTextLength     | number   | 50                | 最大文本长度          |
| maxTextAreaLength | number   | 200               | 最大文本域长度         |
| pageSizes         | number[] | [10, 20, 50, 100] | 每页显示条数可选项       |
| elementPlusLocale | object   | zhCn              | Element Plus语言包 |

#### 权限相关配置

| 配置项                  | 类型      | 默认值           | 说明         |
|----------------------|---------|---------------|------------|
| disablePermission    | boolean | false         | 是否禁用权限控制   |
| autoPermissionPrefix | boolean | true          | 是否自动处理权限前缀 |
| permissionCacheKey   | string  | 'permissions' | 权限缓存Key    |

#### 金额和数字相关配置

| 配置项             | 类型                    | 默认值       | 说明     |
|-----------------|-----------------------|-----------|--------|
| moneyDirection  | 'up'/'down'/'half-up' | 'down'    | 金额舍入方向 |
| moneyPrecision  | number                | 2         | 金额精度   |
| numberPrecision | number                | 2         | 小数精度位数 |
| maxNumber       | number                | 999999999 | 最大数字   |
| minNumber       | number                | 0         | 最小数字   |

#### 方法

| 方法名               | 参数                  | 返回值    | 说明     |
|-------------------|---------------------|--------|--------|
| getAccessToken    | -                   | string | 获取身份令牌 |
| saveAccessToken   | accessToken: string | void   | 保存身份令牌 |
| removeAccessToken | -                   | void   | 移除身份令牌 |

### WebConstant 常量

[WebConstant](../src/config/WebConstant.ts) 类定义了一些常用的常量。

| 常量名          | 值          | 说明        |
|--------------|------------|-----------|
| PREFIX_HTTP  | 'http://'  | HTTP请求前缀  |
| PREFIX_HTTPS | 'https://' | HTTPS请求前缀 |

### 配置使用示例

```typescript
import {WebConfig} from '@airpower/web'

// 修改全局配置
WebConfig.apiUrl = 'https://api.example.com/'
WebConfig.timeout = 10000
WebConfig.pageSizes = [5, 10, 20, 50]

// 使用配置
const token = WebConfig.getAccessToken()
```