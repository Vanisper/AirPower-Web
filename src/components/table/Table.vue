<script generic="E extends RootEntity" lang="ts" setup>
import type { IJson, ITransformerConstructor } from '@airpower/transformer'
import type { TableInstance } from 'element-plus'
import type { PropType } from 'vue'
import type { RootEntity } from '../../base'
import type { IModelConfig, ITableColumn } from '../../decorator'
import { Transformer } from '@airpower/transformer'
import { DateTimeFormatter } from '@airpower/util'
import { Setting } from '@element-plus/icons-vue'
import { ElCheckTag, ElMessageBox } from 'element-plus'
import { computed, nextTick, ref, watch } from 'vue'
import { getModelConfig } from '../../decorator'
import { WebI18n } from '../../i18n'
import { QuerySort } from '../../model'
import { PermissionAction, PermissionUtil } from '../../util'
import { AButton, ADateTime } from '../index'
import { CopyColumn, EnumColumn } from './column/'
import { useTableColumn } from './useTableColumn'
import { useTableSelect } from './useTableSelect'

const props = defineProps({

  /**
   * # 行尾编辑按钮的权限标识
   * 如不传入 则默认使用 `EntityConfig` 的 `editPermission` 配置
   */
  editPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 行尾禁用按钮的权限标识
   * 如不传入 则默认使用 `EntityConfig` 的 `disablePermission` 配置
   */
  disablePermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 行尾启用按钮的权限标识
   * 如不传入 则默认使用 `EntityConfig` 的 `enablePermission` 配置
   */
  enablePermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 行尾详情按钮的权限标识
   * 如不传入 则默认使用 `EntityConfig` 的 `detailPermission` 配置
   */
  detailPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 行尾删除按钮的权限标识
   * 如不传入 则默认使用 `EntityConfig` 的 `deletePermission` 配置
   */
  deletePermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 行尾添加按钮的权限标识
   * 如不传入 则默认使用 `EntityConfig` 的 `addChildPermission` 配置
   */
  addPermission: {
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
    type: Array<ITableColumn<E>>,
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
  disableAdd: {
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
   * 如 `EntityConfig` 的 `hideFieldSelector` 设置为 `true`, 则此项失效
   */
  hideFieldSelector: {
    type: Boolean,
    default: false,
  },

  /**
   * # 操作区宽度
   */
  ctrlWidth: {
    type: Number,
    // eslint-disable-next-line vue/require-valid-default-prop
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
   * # 是否显示添加按钮
   */
  showAdd: {
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
   * # 是否显示更多的下拉按钮
   */
  showMoreButton: {
    type: Boolean,
    default: false,
  },

  /**
   * # 在更多里显示删除
   * 仅在 `showMoreButton=true` 时有效，且 `deleteInMore=true` 时被收起到更多，否则保持表格行内显示
   */
  deleteInMore: {
    type: Boolean,
    default: true,
  },

  /**
   * # 在更多里显示编辑
   * 仅在 `showMoreButton=true` 时有效，且 `editInMore=true` 时被收起到更多，否则保持表格行内显示
   */
  editInMore: {
    type: Boolean,
    default: false,
  },

  /**
   * # 在更多里显示禁用启用
   * 仅在 `showMoreButton=true` 时有效，且 `enableAndDisableInMore=true` 时被收起到更多，否则保持表格行内显示
   */
  enableAndDisableInMore: {
    type: Boolean,
    default: true,
  },

  /**
   * # 在更多里显示详情
   * 仅在 `showMoreButton=true` 时有效，且 `detailInMore=true` 时被收起到更多，否则保持表格行内显示
   */
  detailInMore: {
    type: Boolean,
    default: true,
  },

  /**
   * # 是否懒加载
   */
  lazy: Boolean,

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
   * # 懒加载的方法注入
   */
  load: {
    type: Function,
    default: null,
  },

  /**
   * # 是否展开树的所有项目
   */
  defaultExpandAll: {
    type: Boolean,
    default: true,
  },
})
const emits = defineEmits<{
  detail: [row: E]
  delete: [row: E]
  edit: [row: E]
  selectChanged: [list: E[]]
  add: [row: E]
  sortChanged: [sort?: QuerySort]
  disable: [row: E]
  enable: [row: E]
}>()

/**
 * 表格dom
 */
const airTableRef = ref<TableInstance>()

/**
 * Table的ID
 */
const tableId: string = new Crypto().randomUUID()

/**
 * # 无需二次确认 强制删除
 */
const isForceDelete = ref(false)

/**
 * # Entity的实例
 */
const entityInstance: E = Transformer.newInstance(props.entity)

/**
 * # 内部使用的配置
 */
const modelConfig: IModelConfig = getModelConfig(entityInstance)

const {
  isColumnSelected,
  allColumnList,
  selectColumnList,
  isColumnSelectorShow,
  isColumnSelectorEnabled,
  columnSelectChanged,
  updateSelectedColumnList,
} = useTableColumn({
  entityInstance,
  customColumns: props.columnList,
  modelConfig,
})

const {
  toggleSelection,
} = useTableSelect({
  tableInstance: airTableRef,
  dataList: props.dataList,
  selectList: props.selectList,
})

const isAddDisabled = (row: E) => (props.disableAdd ? props.disableAdd(row) : false)
const isDisableChangeStatus = (row: E) => (props.disableChangeStatus ? props.disableChangeStatus(row) : false)
const isDeleteDisabled = (row: E) => (props.disableDelete ? props.disableDelete(row) : false)
const isDetailDisabled = (row: E) => (props.disableDetail ? props.disableDetail(row) : false)
const isEditDisabled = (row: E) => (props.disableEdit ? props.disableEdit(row) : false)
const isSelectable = (row: E) => (props.selectable ? props.selectable(row) : true)

// ! 计算按钮是否显示
const isDeleteShowInline = computed(() => {
  if (props.hideDelete) {
    return false
  }
  if (!props.showMoreButton) {
    return true
  }
  return props.showMoreButton && !props.deleteInMore
})

const isEditShowInline = computed(() => {
  if (props.hideEdit) {
    return false
  }
  if (!props.showMoreButton) {
    return true
  }
  return props.showMoreButton && !props.editInMore
})

const isEnableAndDisableShowInline = computed(() => {
  if (!props.showMoreButton) {
    return true
  }
  return props.showMoreButton && !props.enableAndDisableInMore
})

const isDetailShowInline = computed(() => {
  if (!props.showDetail) {
    return false
  }
  if (!props.showMoreButton) {
    return true
  }
  return props.showMoreButton && !props.detailInMore
})

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
 * # 添加按钮点击事件
 * @param item 行数据
 */
function handleAdd(item: E) {
  emits('add', item)
}

/**
 * # 详情按钮点击事件
 * @param item 详情数据
 */
function handleDetail(item: E) {
  emits('delete', item)
}

/**
 * # 编辑按钮点击事件
 * @param item 编辑的数据
 */
function handleEdit(item: E) {
  emits('edit', item)
}

/**
 * # 启用按钮点击事件
 * @param item 编辑的数据
 */
function handleEnable(item: E) {
  emits('enable', item)
}

/**
 * # 禁用按钮点击事件
 * @param item 编辑的数据
 */
function handleDisable(item: E) {
  emits('disable', item)
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
  return scope.row[key as keyof E]
}

function tableRowClassName({ row }: { row: E, rowIndex: number }) {
  if (props.disableRow && props.disableRow(row)) {
    return 'disable-row'
  }
  return ''
}

// 初始化
function init() {
  // 初始更新
  updateSelectedColumnList()
}

/**
 * # 监听传入字段列表变化
 */
watch(
  () => props.columnList,
  () => {
    updateSelectedColumnList()
  },
)

/**
 * # 监听传入数据变化
 */
watch(
  () => props.dataList,
  () => {
    nextTick(() => {
      toggleSelection()

      // 分页后滚动条置顶
      const table = document.querySelector(`#${tableId}`)
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

init()
</script>

<template>
  <div
    :style="{ height: autoHeight ? 'auto' : '0px' }"
    class="air-table-container"
  >
    <div class="air-table-tool-bar">
      <slot name="addButton" />
    </div>
    <el-table
      v-if="allColumnList"
      :id="tableId"
      ref="airTableRef"
      :data="dataList"
      :default-expand-all="defaultExpandAll"
      :row-class-name="tableRowClassName"
      :row-key="(row: E) => row.id"
      class="air-table"
      flexible
      height="100%"
      @select="handleSelectChanged"
      @select-all="handleSelectChanged"
      @sort-change="handleSortChanged"
    >
      <el-table-column
        v-if="showSelect"
        :reserve-selection="true"
        :selectable="isSelectable"
        fixed="left"
        type="selection"
        width="40"
      />
      <el-table-column
        v-if="!hideIndex"
        :label="WebI18n.get().ID || '序号'"
        fixed="left"
        type="index"
        width="60"
      />
      <!-- 文本数据渲染 -->
      <template
        v-for="item in allColumnList"
        :key="item.key"
      >
        <el-table-column
          v-if="isColumnSelected(item)"
          :align="item.align"
          :fixed="item.fixed"
          :label="item.label"
          :min-width="item.minWidth || 'auto'"
          :prop="item.key"
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
              <EnumColumn v-if="item.dictionary" :column="item" :data="scope.row" />

              <ADateTime
                v-else-if="item.datetime"
                :formatter="item.datetime === true ? DateTimeFormatter.FULL_DATE_TIME : item.datetime"
                :time="getValue(scope, item.key)"
              />
              <CopyColumn v-else-if="item.copy" :column="item" :data="scope.row" />
              <!-- 图片字段 -->
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
        </el-table-column>
      </template>
      <!-- 如果没有隐藏操作列 或者字段选择器启用 -->
      <el-table-column
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
            <template v-if="isColumnSelectorEnabled">
              <el-icon
                class="air-field-select-icon"
                @click="isColumnSelectorShow = true"
              >
                <Setting />
              </el-icon>
            </template>
          </div>
        </template>
        <template #default="scope">
          <div class="ctrlRow">
            <!-- 自定义操作列前置插槽 -->
            <slot
              v-if="scope.$index >= 0"
              :data="getRowEntity(scope)"
              :index="scope.$index as number"
              name="customRow"
            />
            <template v-if="!hideCtrl">
              <AButton
                v-if="showAdd"
                :disabled="isAddDisabled(getRowEntity(scope))"
                :permission="addPermission || PermissionUtil.get(entity, PermissionAction.ADD_CHILD)"
                link
                type="ADD"
                @click="handleAdd(getRowEntity(scope))"
              >
                {{ WebI18n.get().Add }}
              </AButton>
              <AButton
                v-if="isEditShowInline"
                :disabled="isEditDisabled(getRowEntity(scope))"
                :permission="editPermission || PermissionUtil.get(entity, PermissionAction.EDIT)"
                type="EDIT"
                @click="handleEdit(getRowEntity(scope))"
              >
                {{ WebI18n.get().Update }}
              </AButton>
              <AButton
                v-if="isDetailShowInline"
                :disabled="isDetailDisabled(getRowEntity(scope))"
                :permission="detailPermission || PermissionUtil.get(entity, PermissionAction.DETAIL)"
                type="DETAIL"
                @click="handleDetail(getRowEntity(scope))"
              >
                {{ WebI18n.get().Detail }}
              </AButton>
              <template
                v-if="
                  isEnableAndDisableShowInline && (props.showEnableAndDisable)
                "
              >
                <AButton
                  v-if="getRowEntity(scope).isDisabled"
                  :disabled="isDisableChangeStatus(getRowEntity(scope))"
                  :permission="enablePermission || PermissionUtil.get(entity, PermissionAction.ENABLE)"
                  type="CLOSE"
                  @click="handleEnable(getRowEntity(scope))"
                >
                  {{ WebI18n.get().Enable }}
                </AButton>
                <AButton
                  v-else
                  :disabled="isDisableChangeStatus(getRowEntity(scope))"
                  :permission="disablePermission || PermissionUtil.get(entity, PermissionAction.ENABLE)"
                  type="CLOSE"
                  @click="handleDisable(getRowEntity(scope))"
                >
                  {{ WebI18n.get().Disable }}
                </AButton>
              </template>
              <AButton
                v-if="isDeleteShowInline"
                :danger="isForceDelete"
                :disabled="isDeleteDisabled(getRowEntity(scope))"
                :permission="deletePermission || PermissionUtil.get(entity, PermissionAction.DELETE)"
                type="DELETE"
                @click="handleDelete(getRowEntity(scope))"
              >
                {{ WebI18n.get().Delete }}
              </AButton>
            </template>
            <!-- 自定义操作列后置插槽 -->
            <slot
              v-if="scope.$index >= 0"
              :data="getRowEntity(scope)"
              :index="scope.$index as number"
              name="endRow"
            />
          </div>
        </template>
      </el-table-column>
      <template #empty>
        <img
          alt=""
          src="../../assets/img/empty.svg"
          style="width: 80px"
        >
        <div>{{ emptyText || modelConfig.tableEmptyText || WebI18n.get().NoData }}</div>
      </template>
    </el-table>
    <div class="air-field-selector">
      <div
        v-if="isColumnSelectorShow"
        class="air-field-selector-bg"
        @click.self="isColumnSelectorShow = false"
      />
      <transition name="search">
        <div
          v-if="isColumnSelectorShow"
          class="air-field-selector-dialog"
        >
          <div class="air-field-selector-title">
            {{ WebI18n.get().SelectTableColumnsToShow }}
          </div>
          <div class="air-field-selector-list">
            <ElCheckTag
              v-for="item in allColumnList"
              :key="item.key"
              :checked="!!selectColumnList.find((i: any) => i === item.key)"
              :class="item.force ? 'disabled' : ''"
              :disabled="item.force"
              @change="columnSelectChanged($event, item)"
            >
              {{ item.label }}
            </ElCheckTag>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
.ctrlRow {
  display: flex;
  padding-right: 8px;

  .el-button--default {
    font-weight: normal;
    color: var(--primary-color);
  }

  .el-button + .el-button {
    margin-left: 0;
  }

  .el-link.is-underline:hover:after {
    border-bottom: none;
  }

  .el-link {
    font-size: 16px;
    padding: 0 5px;
  }

  .el-link:not(.el-link--danger) {
    --el-link-text-color: var(--label-color);
  }
}

.ctrlRow + .el-button {
  margin-left: 12px;
}

.air-table-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 300px;
  position: relative;

  .air-field-selector {
    z-index: 100;

    .el-check-tag {
      font-weight: normal !important;
      user-select: none;
      font-size: 13px;
      margin-right: 5px;
      margin-bottom: 5px;
      padding: 4px 10px;
    }

    &-bg {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba($color: #000000, $alpha: 0.05);
    }

    &-dialog {
      box-shadow: 0 0 20px rgb(0 0 0 / 20%);
      position: absolute;
      right: 30px;
      top: 30px;
      background-color: white;
      width: 350px;
      z-index: 101;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .air-field-selector-title {
        margin-bottom: 10px;
        border-bottom: 1px solid var(--el-color-primary-light-9);
        padding: 8px 16px;
        font-size: 15px;
      }

      .air-field-selector-list {
        padding: 5px 15px 15px 15px;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        overflow-y: auto;
        flex: 1;
        height: 0;
        align-content: flex-start;
      }
    }
  }

  .image-error {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 12px;
    text-align: center;
    background-color: #f3f6f9;
    color: #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.air-table-tool-bar > * {
  margin-bottom: 10px;
}

.air-table {
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

    .air-field-select-icon {
      font-size: 16px;
      transition: all 0.3s;
      cursor: pointer;
      overflow: hidden;
      position: relative;
    }

    .el-icon:hover {
      color: var(--primary-color);
    }
  }

  .row-delete {
    color: var(--el-color-error);
  }
}

.air-table-more-button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 120px;

  .el-scrollbar {
    width: 100%;
  }

  .web-button {
    width: 100%;
    padding: 8px 0;
    color: var(--primary-color);
    font-weight: normal !important;
    background-color: transparent;
  }

  .web-button + .web-button {
    margin: 0 !important;
  }
}
</style>
