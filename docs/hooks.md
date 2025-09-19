[返回文档首页](./README.md)

## 内置Hook

AirPower-Web 提供了一系列内置 Hook，用于简化常见的业务逻辑处理。

### 表格相关 Hook

#### useTable

基础表格 Hook，提供表格数据加载、分页、排序等基本功能。

```typescript
import {useTable} from '@airpower/web'

const {
    tableData,    // 表格数据
    loading,      // 加载状态
    pagination,   // 分页信息
    fetchTableData // 获取表格数据方法
} = useTable(UserService)
```

#### useTableList

列表表格 Hook，在 useTable 基础上增加了搜索功能。

```typescript
import {useTableList} from '@airpower/web'

const {
    tableData,
    loading,
    pagination,
    searchForm,   // 搜索表单数据
    handleSearch, // 处理搜索
    resetSearch   // 重置搜索
} = useTableList(UserService)
```

#### useTableTree

树形表格 Hook，用于展示具有层级关系的数据。

```typescript
import {useTableTree} from '@airpower/web'

const {
    tableData,
    loading,
    loadTreeData  // 加载树形数据方法
} = useTableTree(DepartmentService)
```

### 表单相关 Hook

#### useDetail

详情页面 Hook，用于获取和展示数据详情。

```typescript
import {useDetail} from '@airpower/web'

const {
    detailData,   // 详情数据
    loading,      // 加载状态
    fetchDetail   // 获取详情方法
} = useDetail(UserService, route.params.id)
```

#### useEditor

编辑页面 Hook，用于处理新增和编辑表单。

```typescript
import {useEditor} from '@airpower/web'

const {
    formData,     // 表单数据
    loading,      // 加载状态
    fetchDetail,  // 获取详情（编辑时）
    submitForm    // 提交表单
} = useEditor(UserService, route.params.id)
```

### Hook 使用示例

#### 表格页面使用 useTableList

```vue

<template>
  <APage title="用户管理">
    <!-- 搜索表单 -->
    <AForm :model="searchForm" :service="UserService" type="search"/>

    <!-- 操作按钮 -->
    <AButton primary icon="ADD" @click="handleAdd">新增用户</AButton>

    <!-- 数据表格 -->
    <ATable
        :data="tableData"
        :loading="loading"
        :pagination="pagination"
        @refresh="fetchTableData"
    />
  </APage>
</template>

<script setup>
  import {useTableList} from '@airpower/web'
  import {UserService} from '@/service/UserService'

  const {
    tableData,
    loading,
    pagination,
    searchForm,
    fetchTableData
  } = useTableList(UserService)

  const handleAdd = () => {
    // 跳转到新增页面
  }
</script>
```

#### 编辑页面使用 useEditor

```vue

<template>
  <APage title="编辑用户">
    <AForm
        :model="formData"
        :service="UserService"
        :loading="loading"
        type="edit"
    />

    <div class="form-actions">
      <AButton @click="router.back">取消</AButton>
      <AButton primary @click="submitForm">保存</AButton>
    </div>
  </APage>
</template>

<script setup>
  import {useEditor} from '@airpower/web'
  import {UserService} from '@/service/UserService'

  const route = useRoute()
  const router = useRouter()

  const {
    formData,
    loading,
    submitForm
  } = useEditor(UserService, route.params.id)
</script>
```