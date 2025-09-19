[返回文档首页](./README.md)

## 内置组件

AirPower-Web 提供了一系列内置组件，这些组件基于 Element Plus 封装，提供了更便捷的使用方式和统一的样式规范。

### 基础组件

| 组件名                                                  | 说明                 | 对应Element组件      |
|------------------------------------------------------|--------------------|------------------|
| [AButton](../src/components/button/Button.vue)       | 按钮组件，支持权限控制和多种预设样式 | ElButton, ElLink |
| [AInput](../src/components/input/Input.vue)          | 输入框组件              | ElInput          |
| [ASelect](../src/components/select/Select.vue)       | 下拉选择组件             | ElSelect         |
| [ADateTime](../src/components/datetime/DateTime.vue) | 日期时间选择组件           | ElDatePicker     |
| [ASwitch](../src/components/input/Input.vue)         | 开关组件               | ElSwitch         |

### 业务组件

| 组件名                                            | 说明                 |
|------------------------------------------------|--------------------|
| [ATable](../src/components/table/Table.vue)    | 表格组件，支持分页、搜索、导出等功能 |
| [AForm](../src/components/form/FormField.vue)  | 表单组件，基于装饰器自动生成表单项  |
| [ADialog](../src/components/dialog/Dialog.vue) | 弹窗组件               |
| [APage](../src/components/page/Page.vue)       | 页面容器组件             |
| [AUser](../src/components/user/User.vue)       | 用户信息展示组件           |
| [AMoney](../src/components/money/Money.vue)    | 金额展示组件             |
| [APhone](../src/components/phone/Phone.vue)    | 电话号码展示组件           |
| [AImage](../src/components/image/Image.vue)    | 图片展示组件             |
| [AQrcode](../src/components/qrcode/Qrcode.vue) | 二维码生成组件            |
| [ACopy](../src/components/copy/Copy.vue)       | 文本复制组件             |

### 组件使用示例

```vue

<template>
  <!-- 使用按钮组件 -->
  <AButton primary @click="handleClick">主要按钮</AButton>

  <!-- 使用表格组件 -->
  <ATable
      :service="UserService"
      :columns="['name', 'email', 'status']"
      @selection-change="handleSelectionChange"
  />
</template>

<script setup>
  import {AButton, ATable} from '@airpower/web'
  import {UserService} from '@/service/UserService'

  const handleClick = () => {
    console.log('按钮被点击')
  }

  const handleSelectionChange = (selection) => {
    console.log('选中项变化', selection)
  }
</script>
```

### 组件特性

1. **权限控制**: 多数组件支持通过 `permission` 属性控制显示和操作权限
2. **装饰器驱动**: 表单和表格组件支持通过装饰器自动生成界面
3. **国际化支持**: 组件内部文本支持国际化
4. **样式统一**: 所有组件遵循统一的设计规范
5. **类型安全**: 基于 TypeScript 开发，提供完整的类型定义