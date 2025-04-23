<script generic="E extends RootEntity, S extends AbstractCurdService<E>" lang="ts" setup>
import type { IJson, ITransformerConstructor } from '@airpower/transformer'
import type { Component, Ref } from 'vue'
import type { RootEntity } from '../../base'
import type {
  AbstractCurdService,
  CurdServiceConstructor,
  ISearchField,
  ISelectorOption,
  ITableColumn,
  QueryRequestPage,
} from '../../curd'
import { Transformer } from '@airpower/transformer'
import { computed, useSlots } from 'vue'
import { getSearchConfigList, getTableConfigList, useSelector } from '../../curd'
import { FeedbackUtil } from '../../util'
import { AButton, ADialog, APage, ATable, DialogUtil } from '../index'

const props = defineProps<{
  /**
   * # 选择器使用的实体类
   */
  entity: ITransformerConstructor<E>

  /**
   * # 选择器使用的服务类
   */
  service: CurdServiceConstructor<E, S>

  /**
   * # 选择器的添加按钮的权限标识
   * 则默认使用 `EntityConfig` 的 `addPermission` 配置
   */
  addPermission?: string

  /**
   * # 选择器使用的字段列表
   */
  fieldList?: Array<ITableColumn>

  /**
   * # `Editor`
   * 传入后方可开启选择器快捷添加功能
   */
  editor?: Component

  /**
   * # 搜索使用的字段列表
   */
  searchParams?: ISearchField[]

  /**
   * # 选择器宽度
   */
  width?: string

  /**
   * # 选择器的高度
   */
  height?: string

  /**
   * # 选择器标题
   */
  title?: string

  /**
   * # 不分页
   * 默认请求分页接口 如配置了 `treeList` 则此项自动失效
   */
  unPaginate?: boolean

  /**
   * # 请求专用的 `treeList` 接口
   */
  treeList?: boolean

  /**
   * # 搜索前的拦截方法
   * 参数为发起请求的数据,请处理后返回
   *
   * @param requestData 请求对象
   */

  beforeSearch?: (requestData: QueryRequestPage<E>) => QueryRequestPage<E> | void

  /**
   * # Props参数
   * ```typescript
   * const props = defineProps(airPropsSelector<?>())
   * ```
   * 使用上面的方式声明后传入
   */
  props: {
    /**
     * # 查询参数
     */
    param: any

    /**
     * # 是否多选
     */
    isMultiple: boolean

    /**
     * # 已选中的列表
     */
    selectList: E[]

    /**
     * # 确认按钮的回调事件
     * @param data [可选] 回调的数据
     */

    onConfirm: (data?: E | E[]) => void

    /**
     * # 取消按钮的回调事件
     */
    onCancel: () => void
  }
}>()
const slots: IJson = useSlots()
const { entity, service } = props

const hookOptions: ISelectorOption<E> = {}
if (props.beforeSearch) {
  hookOptions.beforeSearch = props.beforeSearch
}
if (props.unPaginate) {
  hookOptions.unPaginate = props.unPaginate
}
if (props.treeList) {
  hookOptions.treeList = props.treeList
}
if (props.props.param) {
  hookOptions.defaultFilter = props.props.param
}

const {
  title,
  selectList,
  isLoading,
  response,
  list,
  disableConfirm,
  onSearch,
  onPageChanged,
  onSelected,
  onReloadData,
} = useSelector(props.props, service, hookOptions)

const entityInstance = Transformer.parse({}, props.entity)

/**
 * # 弹窗标题
 */
const dialogTitle = computed(() => {
  if (props.title) {
    return props.title
  }
  return title.value
})

/**
 * # 列定义
 */
const fields = computed(() => {
  if (props.fieldList) {
    return props.fieldList
  }
  return getTableConfigList(entityInstance)
})

/**
 * # 搜索参数
 */
const searchParamList: Ref<ISearchField[]> = computed(() => {
  let list = getSearchConfigList(entityInstance)
  if (props.searchParams) {
    list = props.searchParams
  }
  const defaultFilter = props.props.param
  if (!defaultFilter) {
    return list
  }
  return list.filter(item => !(defaultFilter[item.key!] !== null && defaultFilter[item.key!] !== undefined))
})

/**
 * # 弹出编辑器
 */
async function onAdd() {
  if (!props.editor) {
    FeedbackUtil.toastError('请先配置编辑器')
    return
  }
  await DialogUtil.show(props.editor)
  onReloadData()
}
</script>

<template>
  <ADialog
    :disable-confirm="disableConfirm"
    :height="height || '70%'"
    :hide-footer="!props.props.isMultiple"
    :loading="isLoading"
    :title="dialogTitle"
    :width="width || '70%'"
    is-selector
    @on-confirm="props.props.onConfirm(selectList.filter((item) => !item.isDisabled))"
    @on-cancel="props.props.onCancel()"
  >
    <ATable
      :data-list="unPaginate || treeList ? list : response.list"
      :entity="entity"
      :field-list="fields"
      :hide-ctrl="props.props.isMultiple"
      :search-params="searchParamList"
      :select-list="selectList"
      :show-select="props.props.isMultiple"
      ctrl-width="80"
      hide-delete
      hide-edit
      hide-field-selector
      @add="onAdd"
      @search="onSearch"
      @select-changed="onSelected"
    >
      <template
        v-for="(index, name) in slots"
        #[name]="row"
      >
        <slot
          :data="row.data"
          :index="index"
          :name="name"
        />
      </template>
      <template
        v-if="!props.props.isMultiple"
        #customRow="{ data }"
      >
        <AButton
          :disabled="data.isDisabled"
          link-button
          tooltip="选择"
          @click="props.props.onConfirm(data)"
        >
          选择
        </AButton>
      </template>
    </ATable>
    <template #status>
      <APage
        :response="response"
        @changed="onPageChanged"
      />
    </template>
  </ADialog>
</template>

<style lang="scss" scoped></style>
