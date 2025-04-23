<script generic="E extends RootEntity, S extends AbstractCurdService<E>" lang="ts" setup>
import type { IJson, ITransformerConstructor } from '@airpower/transformer'
import type { TableInstance } from 'element-plus'
import type { ComputedRef, PropType, Ref } from 'vue'
import type { RootEntity } from '../../base'
import type { AbstractCurdService, CurdServiceConstructor } from '../../curd'
import type { IModelConfig, ISearchField, ITableColumn } from '../../decorator'
import type { QueryRequest } from '../../model'
import type { IFile } from '../../util'
import { Transformer } from '@airpower/transformer'
import { DateTimeFormatter } from '@airpower/util'
import { ElInput, ElLink, ElMessageBox, ElOption, ElSelect, ElTable, ElTableColumn } from 'element-plus'
import { computed, nextTick, ref, watch } from 'vue'
import { WebConfig } from '../../config'
import { getDictionary, getFieldLabel, getModelConfig, getSearchConfigList } from '../../decorator'
import { WebI18n } from '../../i18n'
import { ExportModel, QueryRequestPage, QuerySort } from '../../model'
import { FeedbackUtil, Http, PermissionAction, PermissionUtil } from '../../util'
import Desensitize from '../desensitize/Desensitize'
import { AButton, ADateTime, DialogUtil } from '../index'
import { ColumnSelector, CopyColumn, EnumColumn } from './component'
import { useTableButton } from './useTableButton'
import { useTableColumn } from './useTableColumn'
import { useTableSelect } from './useTableSelect'

const props = defineProps({
  /**
   * # 隐藏添加按钮
   */
  hideAdd: {
    type: Boolean,
    default: undefined,
  },
  /**
   * # 行尾编辑按钮的权限标识
   */
  editPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 行尾禁用按钮的权限标识
   */
  disablePermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 行尾启用按钮的权限标识
   */
  enablePermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 行尾详情按钮的权限标识
   */
  detailPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 行尾删除按钮的权限标识
   */
  deletePermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 行尾添加按钮的权限标识
   */
  addRowPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 左侧添加按钮的权限标识
   */
  addPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 右侧导出按钮的权限标识
   */
  exportPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 左侧导入按钮的权限标识
   */
  importPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 表格显示的数据数组
   */
  dataList: {
    type: Array<E>,
    required: true,
  },

  /**
   * # 默认选中的数据数组
   */
  selectList: {
    type: Array<E>,
    default: () => [],
  },

  /**
   * # 显示字段列表
   * 如传入 则优先使用
   */
  columnList: {
    type: Array<ITableColumn>,
    default: () => [],
  },

  /**
   * # 默认表格空文案
   */
  emptyText: {
    type: String,
    default: undefined,
  },

  /**
   * # 是否隐藏编辑按钮
   */
  hideEdit: {
    type: Boolean,
    default: false,
  },

  /**
   * # 控制是否禁用行内编辑按钮的回调方法
   */
  disableEdit: {
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * # 控制是否禁用行内添加按钮的回调方法
   */
  disableAddRow: {
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * # 控制是否允许操作禁用启用
   */
  disableChangeStatus: {
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * # 控制是否禁用行内详情按钮的回调方法
   */
  disableDetail: {
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * # 控制是否禁用行内删除按钮的回调方法
   */
  disableDelete: {
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * # 控制是否整行显示禁用状态
   * 如禁用了行，则行将被模糊并显示灰色背景色
   */
  disableRow: {
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * # 是否隐藏删除按钮
   */
  hideDelete: {
    type: Boolean,
    default: false,
  },

  /**
   * # 控制是否禁用多选按钮的回调方法
   */
  selectable: {
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * # 是否显示多选框
   * 可触发 `@on-select(selectList)` 事件, 可配置 `:select-list` 默认选中
   */
  showSelect: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否显示禁用启用
   */
  showEnableAndDisable: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否隐藏序号
   */
  hideIndex: {
    type: Boolean,
    default: false,
  },

  /**
   * # 表格字段缓存Key
   */
  fieldCacheKey: {
    type: String,
    default: undefined,
  },

  /**
   * # 是否隐藏字段选择
   */
  hideColumnSelector: {
    type: Boolean,
    default: false,
  },

  /**
   * # 操作区宽度
   */
  ctrlWidth: {
    type: String,
    default: 'auto',
  },

  /**
   * # 自动撑起高度
   * 默认fix滚动
   */
  autoHeight: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否隐藏操作按钮
   */
  hideCtrl: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否显示详情按钮
   */
  showDetail: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否显示行添加按钮
   */
  showAddRow: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否自定义删除事件
   */
  customDelete: {
    type: Boolean,
    default: false,
  },

  /**
   * # 删除确认框提示标题
   */
  deleteTitle: {
    type: String,
    default: '',
  },

  /**
   * # 删除确认框提示内容
   */
  deleteContent: {
    type: String,
    default: '',
  },

  /**
   * # 表格绑定的数据实体
   */
  entity: {
    type: Function as unknown as PropType<ITransformerConstructor<E>>,
    required: true,
  },

  /**
   * # 是否显示导入按钮
   * - `import-url` `可选` 导入的API接口地址
   * - `import-title` `可选` 指定上传框的标题
   */
  showImport: {
    type: Boolean,
    default: false,
  },

  /**
   * # 导入上传的标题
   * 默认按传入的 `service` 自动生成
   */
  importTitle: {
    type: String,
    default: undefined,
  },

  /**
   * # 导出的请求参数
   */
  exportParam: {
    type: Object as PropType<QueryRequest>,
    default: undefined,
  },

  /**
   * # 是否显示导出按钮
   * 如传入 则需要再传入 `:service`
   */
  showExport: {
    type: Boolean,
    default: false,
  },

  /**
   * # 接口服务类
   */
  service: {
    type: Function as unknown as PropType<CurdServiceConstructor<E, S>>,
    required: undefined,
  },

  /**
   * # 默认的筛选器
   */
  defaultFilter: {
    type: Object as PropType<E>,
    default: undefined,
  },

  /**
   * # 搜索的对象
   * 则覆盖自动生成的条件
   */
  searchParams: {
    type: Array<ISearchField>,
    default: undefined,
  },

  /**
   * # 导入接口地址
   * 默认按传入的 `service` 自动生成
   */
  importUrl: {
    type: String,
    default: undefined,
  },

  /**
   * # 导入模板下载地址
   * 默认按传入的 `service` 自动生成
   */
  importTemplateUrl: {
    type: String,
    default: undefined,
  },

  /**
   * # 导入的文件实体类
   */
  fileEntity: {
    type: Function as unknown as PropType<ITransformerConstructor<IFile & RootEntity>>,
    default: undefined,
  },
})
const emits = defineEmits<{
  add: []
  detail: [row: E]
  delete: [row: E]
  edit: [row: E]
  selectChanged: [list: E[]]
  addRow: [row: E]
  sortChanged: [sort?: QuerySort]
  disable: [row: E]
  enable: [row: E]
  search: [request: QueryRequestPage<E>]
}>()

/**
 * # 暴露一个重置搜索的方法
 */
defineExpose({
  resetSearch: onReset,
  search: onSearch,
})

/**
 * 表格dom
 */
const airTableRef = ref<TableInstance>()

/**
 * Table的ID
 */
const tableId: string = `table_${Math.random()}`

/**
 * # Entity的实例
 */
const entityInstance = Transformer.newInstance(props.entity)

/**
 * # 内部使用的配置
 */
const modelConfig: IModelConfig = getModelConfig(entityInstance)

const {
  allColumnList,
  isColumnSelectorEnabled,
  updateSelectKeys,
  showColumnList,
} = useTableColumn({
  entityInstance,
  customColumns: props.columnList,
  hideColumnSelector: props.hideColumnSelector,
  modelConfig,
})
const {
  toggleSelection,
} = useTableSelect({
  tableInstance: airTableRef,
  dataList: props.dataList,
  selectList: props.selectList,
})

const {
  isAddRowDisabled,
  isSelectable,
  isEditDisabled,
  isDetailDisabled,
  isDisableChangeStatus,
  isDeleteDisabled,
} = useTableButton({
  entityClass: props.entity,
  editPermission: props.editPermission,
  deletePermission: props.deletePermission,
  addRowPermission: props.addRowPermission,
  disablePermission: props.disablePermission,
  enablePermission: props.enablePermission,
  detailPermission: props.detailPermission,
  disableAddRow: props.disableAddRow,
  disableDelete: props.disableDelete,
  disableEdit: props.disableEdit,
  disableChangeStatus: props.disableChangeStatus,
  selectable: props.selectable,
  isAddDisabled: props.disableAddRow,
})

/**
 * # 高级搜索字段列表
 */
const searchFieldList: ComputedRef<ISearchField[]> = computed(() => props.searchParams || getSearchConfigList(entityInstance))

/**
 * # 获取字符串值
 * @param data 数据
 */
function getStringValue(data: string | number | object | undefined | null): string {
  if (data === undefined || data === null) {
    return ''
  }
  return data.toString()
}

/**
 * # 查询对象
 */
const request = ref(new QueryRequestPage(props.entity)) as Ref<QueryRequestPage<E>>

/**
 * # 导出方法
 */
function onExport() {
  if (!props.service) {
    FeedbackUtil.toastError('请先传入 service 参数')
    return
  }
  const service = Transformer.newInstance(props.service)
  const exportModel = new ExportModel()
  exportModel.param = request.value
  exportModel.createExportTaskUrl = `${service.baseUrl}${WebConfig.exportUrl}`
  exportModel.queryExportUrl = `${service.baseUrl}${WebConfig.exportQueryUrl}`
  DialogUtil.createExportTask(exportModel)
}

/**
 * # 单个删除
 * @param item
 */
async function handleDelete(item: E) {
  if (props.customDelete) {
    emits('delete', item)
    return
  }
  try {
    let title: string
    let content: string
    // 如果实体传入 则尝试自动获取

    title = WebI18n.get().ConfirmPlease
    content = WebI18n.get().ConfirmToDelete

    // 如果传入配置项 则覆盖实体标注的内容
    if (props.deleteTitle) {
      title = props.deleteTitle
    }
    if (props.deleteContent) {
      content = props.deleteContent
    }
    await ElMessageBox.confirm(content, title, {
      closeOnPressEscape: false,
      confirmButtonText: WebI18n.get().Confirm,
      cancelButtonText: WebI18n.get().Cancel,
      type: 'warning',
    })
    emits('delete', item)
  }
  catch (e) {
    console.error(e)
    // 取消删除
  }
}

/**
 * # 是否在当前页数据中
 */
function inCurrentPage(list: E[], find: E): boolean {
  const isIn = false
  for (let i = 0; i < list.length; i += 1) {
    const row = list[i]
    if (row.id === find.id) {
      return true
    }
    if ((row as IJson).children && (row as IJson).children.length > 0) {
      return inCurrentPage((row as IJson).children, find)
    }
  }
  return isIn
}

/**
 * # 选中事件
 * @param list 选中的列表
 */
function handleSelectChanged(list: E[]) {
  const selectAll = list.map(item => item.copy())
  list.forEach((find) => {
    if (inCurrentPage(props.dataList, find)) {
      // 在当前页面没找到的数据 保持选中
      return
    }
    const exist = selectAll.find(item => item.id === find.id)
    if (!exist) {
      selectAll.push(find)
    }
  })
  emits('selectChanged', selectAll)
}

/**
 * # 排序事件
 * @param data 数据
 * @param data.prop 排序字段
 * @param data.order 排序方向
 */
function handleSortChanged(data: { prop: string, order: string }) {
  if (data.prop && data.order) {
    const sort = new QuerySort()
    sort.field = data.prop
    sort.direction = data.order === 'descending' ? 'desc' : 'asc'
    emits('sortChanged', sort)
  }
  else {
    emits('sortChanged', undefined)
  }
}

/**
 * # 获取行的实体数据
 * @param scope
 */
function getRowEntity(scope: IJson): E {
  return scope.row
}

/**
 * # 获取行的数据列
 * @param scope Scope
 * @param key 字段
 */
function getValue(scope: IJson, key: unknown): any {
  return getRowEntity(scope)[key as keyof E]
}

function tableRowClassName({ row }: { row: E, rowIndex: number }) {
  if (props.disableRow && props.disableRow(row)) {
    return 'disable-row'
  }
  return ''
}

/**
 * # 监听传入数据变化
 */
watch(
  () => props.dataList,
  () => {
    nextTick(() => {
      toggleSelection()

      // 分页后滚动条置顶
      const table = document.getElementById(tableId)
      const bodyWrap = table?.querySelector('.el-scrollbar__wrap') as HTMLElement
      bodyWrap.scrollTop = 0
    })
  },
)

/**
 * # 监听选择的数组列表
 */
watch(
  () => props.selectList,
  () => {
    nextTick(() => {
      if (airTableRef.value) {
        airTableRef.value.clearSelection()
      }
      toggleSelection()
    })
  },
)

/**
 * # 获取API地址
 * @param url
 */
function getApiUrl(url: string): string {
  if (url.includes(Http.PREFIX_HTTP) || url.includes(Http.PREFIX_HTTPS)) {
    return url
  }
  return WebConfig.apiUrl + url
}

/**
 * # 导入
 */
async function onImport() {
  let url = props.importUrl
  if (!url) {
    if (!props.service) {
      FeedbackUtil.toastError('请先传入 service 参数')
      return
    }
    const service = Transformer.newInstance(props.service)
    url = `${service.baseUrl}/${WebConfig.importUrl}`
    url = getApiUrl(url)
  }
  if (!props.fileEntity) {
    FeedbackUtil.toastError('请先传入 fileEntity 参数')
    return
  }
  await DialogUtil.showUpload(
    {
      uploadUrl: url,
      extensions: ['xls', 'xlsx'],
      title: props.importTitle || WebI18n.get().Import,
      uploadSuccess: WebI18n.get().ImportSuccess,
      confirmText: WebI18n.get().DownloadTemplate,
      entity: props.fileEntity,
    },
    () => {
      onDownloadTemplate()
    },
  )
  onReset()
}

/**
 * # 为URL拼接AccessToken
 * @param url
 */
function getUrlWithAccessToken(url: string): string {
  const accessToken = WebConfig.getAccessToken()
  const tempString = `${WebConfig.authorizationHeaderKey}=`
  if (url.includes(`?${tempString}`) || url.includes((`&${tempString}`))) {
    return url
  }
  if (url.includes('?')) {
    return `&${WebConfig.authorizationHeaderKey}=${accessToken}`
  }
  return `?${WebConfig.authorizationHeaderKey}=${accessToken}`
}

/**
 * # 下载导入的模板
 */
function onDownloadTemplate() {
  let url = props.importTemplateUrl
  if (url) {
    window.open(WebConfig.apiUrl + getUrlWithAccessToken(url))
    return
  }
  if (!props.service) {
    FeedbackUtil.toastError('请先传入 service 参数')
    return
  }
  const service = Transformer.newInstance(props.service)
  url = `${service.baseUrl}/${WebConfig.importTemplateUrl}`
  url = getApiUrl(url)
  window.open(getUrlWithAccessToken(url))
}

const searchFilter = ref(entityInstance.copy())

function onReset() {
  if (props.defaultFilter) {
    searchFilter.value = props.defaultFilter
  }
  else {
    searchFilter.value = entityInstance.copy()
  }
  request.value = new QueryRequestPage(props.entity)
  request.value.exclude('filter')
}

/**
 * # 查询事件
 */
function onSearch() {
  request.value = new QueryRequestPage(props.entity)
  const keys = Object.keys(searchFilter.value)
  keys.forEach((key) => {
    if (searchFilter.value[key] === '') {
      searchFilter.value[key] = undefined
    }
  })
  request.value.filter = searchFilter.value.copy()
  if (request.value.page) {
    request.value.page.pageNum = 1
  }
  emits('search', request.value)
}
</script>

<template>
  <div
    :style="{ height: autoHeight ? 'auto' : '0px' }"
    class="a-table-container"
  >
    <div class="a-table-toolbar">
      <div class="a-table-toolbar-left">
        <slot name="left">
          <slot name="beforeButton" />
          <AButton
            v-if="props.entity && !hideAdd"
            :permission="addPermission || PermissionUtil.get(entity, PermissionAction.ADD)"
            icon="ADD"
            primary
            @click="emits('add')"
          >
            {{ modelConfig.addTitle || WebI18n.get().Add }}
          </AButton>
          <AButton
            v-if="showImport"
            :permission="importPermission || PermissionUtil.get(entity, PermissionAction.IMPORT)"
            icon="IMPORT"
            @click="onImport()"
          >
            {{ WebI18n.get().Import }}
          </AButton>
          <slot name="afterButton" />
        </slot>
      </div>
      <div class="a-table-toolbar-right">
        <slot name="beforeSearch" />
        <template
          v-for="item in searchFieldList"
          :key="item.key"
        >
          <div
            v-if="!item.hide"
            :style="{ width: `${item.width || 160}px` }"
            class="a-table-toolbar-search-item"
          >
            <slot
              :data="searchFilter"
              :name="item.key"
            >
              <ElSelect
                v-if="getDictionary(entityInstance, item.key!)"
                v-model="searchFilter[item.key!]"
                :clearable="item.clearable !== false"
                :filterable="item.filterable"
                :placeholder="`${getFieldLabel(entityInstance, item.key!)}...`"
                @change="onSearch()"
                @clear="searchFilter[item.key!] = undefined"
              >
                <template v-for="enumItem of getDictionary(entityInstance, item.key!)?.toArray()">
                  <ElOption
                    v-if="!enumItem.disabled"
                    :key="enumItem.key.toString()"
                    :label="enumItem.label"
                    :value="enumItem.key"
                  />
                </template>
              </ElSelect>
              <ElInput
                v-else
                v-model="searchFilter[item.key!]"
                :clearable="item.clearable !== false"
                :placeholder="`${getFieldLabel(entityInstance, item.key!)}...`"
                @blur="onSearch()"
                @clear="onSearch"
                @keydown.enter="onSearch"
              />
            </slot>
          </div>
        </template>
        <AButton
          v-if="showExport"
          :permission="exportPermission || PermissionUtil.get(entity, PermissionAction.EXPORT)"
          icon="EXPORT"
          @click="onExport()"
        >
          {{ WebI18n.get().Export }}:
        </AButton>
        <slot name="afterSearch" />
        <ColumnSelector
          v-if="isColumnSelectorEnabled"
          :column-list="allColumnList"
          :entity-instance="entityInstance"
          @changed="updateSelectKeys($event)"
        />
      </div>
    </div>
    <ElTable
      v-if="allColumnList"
      :id="tableId"
      ref="airTableRef"
      :data="dataList"
      :row-class-name="tableRowClassName"
      :row-key="(row: E) => `${row.id}`"
      class="a-table"
      flexible
      height="100%"
      @select="handleSelectChanged"
      @select-all="handleSelectChanged"
      @sort-change="handleSortChanged"
    >
      <ElTableColumn
        v-if="showSelect"
        :reserve-selection="true"
        :selectable="isSelectable"
        fixed="left"
        type="selection"
        width="40"
      />
      <ElTableColumn
        v-if="!hideIndex"
        :label="WebI18n.get().ID || '序号'"
        fixed="left"
        type="index"
        width="60"
      />
      <!-- 文本数据渲染 -->
      <template
        v-for="item in showColumnList"
        :key="item.key"
      >
        <ElTableColumn
          :align="item.align"
          :fixed="item.fixed"
          :label="getFieldLabel(entityInstance, item.key!)"
          :min-width="item.minWidth || 'auto'"
          :prop="item.key as string"
          :sortable="item.sortable"
          :width="item.width || 'auto'"
        >
          <template #default="scope">
            <slot
              v-if="scope.$index >= 0"
              :data="getRowEntity(scope)"
              :index="scope.$index as number"
              :name="item.key"
            >
              <span
                v-if="item.prefixText"
                style="color: #aaa; margin-right: 3px"
              >{{ item.prefixText }}</span>
              <EnumColumn
                v-if="getDictionary(entityInstance, item.key!)" :column="item" :data="scope.row"
                :dictionary="getDictionary(entityInstance, item.key!)!"
              />
              <Desensitize
                v-else-if="item.desensitize"
                :content="getValue(scope, item.key)"
                :type="item.desensitize"
              />

              <ADateTime
                v-else-if="item.datetime"
                :formatter="item.datetime === true ? DateTimeFormatter.FULL_DATE_TIME : item.datetime"
                :time="getValue(scope, item.key)"
              />
              <CopyColumn v-else-if="item.copy" :column="item" :data="scope.row" />
              <template v-else>
                <div
                  :class="item.nowrap ? 'nowrap' : ''"
                  class="a-table-column"
                >
                  {{ getStringValue(getValue(scope, item.key)) ?? item.emptyValue }}
                </div>
              </template>
              <span
                v-if="item.suffixText"
                style="color: #aaa"
              >{{ item.suffixText }}</span>
            </slot>
          </template>
        </ElTableColumn>
      </template>
      <!-- 如果没有隐藏操作列 或者字段选择器启用 -->
      <ElTableColumn
        v-if="!hideCtrl || isColumnSelectorEnabled"
        :width="ctrlWidth || 'auto'"
        align="right"
        fixed="right"
      >
        <template #header>
          <div class="custom-header">
            <span
              v-if="!hideCtrl"
              class="custom-header-title"
            />
          </div>
        </template>
        <template #default="scope">
          <div class="ctrlRow">
            <!-- 自定义操作列前置插槽 -->
            <slot
              v-if="scope.index >= 0"
              :data="getRowEntity(scope)"
              :index="scope.$index as number"
              name="customRow"
            />
            <template v-if="!hideCtrl">
              <ElLink
                v-if="showAddRow"
                :disabled="isAddRowDisabled(getRowEntity(scope))"
                :underline="false"
                @click="emits('addRow', getRowEntity(scope))"
              >
                {{ WebI18n.get().Add }}
              </ElLink>
              <ElLink
                v-if="!props.hideEdit"
                :disabled="isEditDisabled(getRowEntity(scope))"
                :underline="false"
                type="primary"
                @click="emits('edit', getRowEntity(scope))"
              >
                {{ WebI18n.get().Update }}
              </ElLink>
              <ElLink
                v-if="showDetail"
                :disabled="isDetailDisabled(getRowEntity(scope))"
                :underline="false"
                @click="emits('detail', getRowEntity(scope))"
              >
                {{ WebI18n.get().Detail }}
              </ElLink>
              <template
                v-if="showEnableAndDisable "
              >
                <ElLink
                  v-if="getRowEntity(scope).isDisabled"
                  :disabled="isDisableChangeStatus(getRowEntity(scope))"
                  :underline="false"
                  @click="emits('enable', getRowEntity(scope))"
                >
                  {{ WebI18n.get().Enable }}
                </ElLink>
                <ElLink
                  v-else
                  :disabled="isDisableChangeStatus(getRowEntity(scope))"
                  :underline="false"
                  @click="emits('disable', getRowEntity(scope))"
                >
                  {{ WebI18n.get().Disable }}
                </ElLink>
              </template>
              <ElLink
                v-if="!hideDelete"
                :disabled="isDeleteDisabled(getRowEntity(scope))"
                :underline="false"
                type="danger"
                @click="handleDelete(getRowEntity(scope))"
              >
                {{ WebI18n.get().Delete }}
              </ElLink>
            </template>
            <!-- 自定义操作列后置插槽 -->
            <slot
              v-if="scope.index >= 0"
              :data="getRowEntity(scope)"
              :index="scope.$index as number"
              name="endRow"
            />
          </div>
        </template>
      </ElTableColumn>
      <template #empty>
        <img
          alt=""
          src="../../assets/img/empty.svg"
          style="width: 80px"
        >
        <div>{{ emptyText || modelConfig.tableEmptyText || WebI18n.get().NoData }}</div>
      </template>
    </ElTable>
  </div>
</template>

<style lang="scss">
.a-table-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 300px;
  position: relative;

  .a-table-toolbar {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .a-table-toolbar-left {
      flex: 1;

      .el-button + .el-button {
        margin-left: 5px;
      }
    }

    .a-table-toolbar-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      .el-button + .el-button {
        margin-left: 5px;
      }

      .a-table-toolbar-search-item {
        margin-right: 5px;
      }
    }
  }

  .a-table {
    flex: 1;
    height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .disable-row {
      background: #f5f5f5;
      cursor: not-allowed;
      position: relative;

      > * {
        user-select: none;
        filter: blur(1px);
      }
    }

    thead .cell {
      overflow: hidden;
      white-space: nowrap;
      word-break: keep-all;
      text-overflow: ellipsis;
    }

    td .cell {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .is-right .cell {
      justify-content: flex-end;
    }

    .a-table-column.nowrap {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: keep-all;
      cursor: pointer;
      user-select: none;
    }

    .a-table-column.nowrap * {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: keep-all;
      cursor: pointer;
      user-select: none;
      display: inherit;
    }

    .el-table__empty-text {
      line-height: 40px;
    }

    .el-table__header-wrapper {
      background-color: var(--el-color-primary-light-9);
      border-radius: 5px;

      th {
        background-color: var(--el-color-primary-light-9) !important;
      }
    }

    .el-table__body-wrapper {
      flex: 1;
      height: 0;
      overflow: hidden;
      overflow-y: auto;

      .el-scrollbar__view {
        height: 100%;
      }
    }

    .custom-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      .el-icon:hover {
        color: var(--primary-color);
      }
    }

    .row-delete {
      color: var(--el-color-error);
    }

    .ctrlRow {
      display: flex;
      padding-right: 8px;

      .el-link {
        user-select: none;
        padding: 0 3px;
      }
    }
  }
}
</style>
