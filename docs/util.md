[返回文档首页](./README.md)

## 内置工具类

AirPower-Web 提供了一些常用的工具类，用于简化开发过程中的常见操作。

### ClipboardUtil 剪贴板工具

[ClipboardUtil](../src/util/ClipboardUtil.ts) 提供了剪贴板相关的操作方法。

#### 方法

| 方法名 | 参数 | 返回值 | 说明 |
| ---- | ---- | ---- | ---- |
| copy | content: string | Promise<unknown> | 复制指定内容到剪贴板 |

#### 使用示例

```typescript
import { ClipboardUtil } from '@airpower/web'

// 复制文本到剪贴板
ClipboardUtil.copy('需要复制的文本')
  .then(() => {
    console.log('复制成功')
  })
  .catch((error) => {
    console.error('复制失败', error)
  })
```

### WebFileUtil 文件工具

[WebFileUtil](../src/file/WebFileUtil.ts) 提供了文件相关的操作方法。

#### 方法

| 方法名 | 参数 | 返回值 | 说明 |
| ---- | ---- | ---- | ---- |
| download | url: string, filename?: string | void | 下载文件 |
| open | url: string | void | 在新窗口打开文件 |
| formatSize | size: number | string | 格式化文件大小 |

#### 使用示例

```typescript
import { WebFileUtil } from '@airpower/web'

// 下载文件
WebFileUtil.download('/api/download/1', '文件名.xlsx')

// 打开文件
WebFileUtil.open('/static/document.pdf')

// 格式化文件大小
const size = WebFileUtil.formatSize(1024) // 返回: 1KB
```

### PermissionUtil 权限工具

[PermissionUtil](../src/permission/PermissionUtil.ts) 提供了权限相关的操作方法。

#### 方法

| 方法名 | 参数 | 返回值 | 说明 |
| ---- | ---- | ---- | ---- |
| has | permission: string | boolean | 检查是否有指定权限 |
| getPermissions | - | string[] | 获取所有权限列表 |
| setPermissions | permissions: string[] | void | 设置权限列表 |

#### 使用示例

```typescript
import { PermissionUtil } from '@airpower/web'

// 检查权限
if (PermissionUtil.has('user:create')) {
  // 有创建用户的权限
}

// 获取权限列表
const permissions = PermissionUtil.getPermissions()

// 设置权限列表
PermissionUtil.setPermissions(['user:create', 'user:edit', 'user:delete'])
```

### 其他工具类

#### DialogUtil 弹窗工具

[DialogUtil](../src/dialog/DialogUtil.ts) 提供了统一的弹窗管理方法。

```typescript
import { DialogUtil } from '@airpower/web'

// 显示确认弹窗
DialogUtil.confirm('确定要删除吗?')
  .then(() => {
    // 用户点击确定
  })
  .catch(() => {
    // 用户点击取消
  })
```

#### FeedbackUtil 反馈工具

[FeedbackUtil](../src/feedback/FeedbackUtil.ts) 提供了统一的消息反馈方法。

```typescript
import { FeedbackUtil } from '@airpower/web'

// 显示成功消息
FeedbackUtil.success('操作成功')

// 显示错误消息
FeedbackUtil.error('操作失败')

// 显示警告消息
FeedbackUtil.warning('警告信息')

// 显示提示消息
FeedbackUtil.info('提示信息')
```