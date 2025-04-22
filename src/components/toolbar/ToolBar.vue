<script generic="E extends RootEntity, S extends AbstractCurdService<E>" lang="ts" setup>
import type { IJson, ITransformerConstructor } from '@airpower/transformer'
import type { ComputedRef, PropType, Ref } from 'vue'
import type { RootEntity } from '../../base'
import type { AbstractCurdService, CurdServiceConstructor } from '../../curd'
import type { IModelConfig, ISearchField } from '../../decorator'
import type { QueryRequest } from '../../model'
import type { IFile } from '../../util'
import { Transformer } from '@airpower/transformer'
import { ElInput, ElOption, ElSelect } from 'element-plus'
import { computed, ref } from 'vue'
import { WebConfig } from '../../config'
import { getModelConfig, getSearchConfigList } from '../../decorator'
import { WebI18n } from '../../i18n'
import { ExportModel, QueryRequestPage } from '../../model'
import { FeedbackUtil, Http, PermissionAction, PermissionUtil } from '../../util'
import { AButton } from '../button'
import { DialogUtil } from '../dialog'

const props = defineProps({
  /**
   * # 左侧添加按钮的权限标识
   * 则默认使用 `EntityConfig` 的 `addPermission` 配置
   */
  addPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 右侧导出按钮的权限标识
   * 则默认使用 `EntityConfig` 的 `exportPermission` 配置
   */
  exportPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 左侧导入按钮的权限标识
   * 则默认使用 `EntityConfig` 的 `importPermission` 配置
   */
  importPermission: {
    type: String,
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
   * # 加载的状态
   */
  loading: {
    type: Boolean,
    default: false,
  },

  /**
   * # 实体类
   */
  entity: {
    type: Function as unknown as PropType<ITransformerConstructor<E>>,
    required: true,
  },

  /**
   * # 是否显示搜索框
   * 优先级: `Entity` 配置 > 组件传入
   */
  showSearch: {
    type: Boolean,
    default: undefined,
  },

  /**
   * # 是否显示更多筛选器
   * 优先级: 组件传入 > `EntityConfig` 配置
   */
  showFilter: {
    type: Boolean,
    default: undefined,
  },

  /**
   * # 隐藏添加按钮
   */
  hideAdd: {
    type: Boolean,
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
   * # 导入上传的标题
   * 默认按传入的 `service` 自动生成
   */
  importTitle: {
    type: String,
    default: undefined,
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
   * # 导入的文件实体类
   */
  fileEntity: {
    type: Function as unknown as PropType<ITransformerConstructor<IFile & RootEntity>>,
    default: undefined,
  },

  /**
   * # 接口服务类
   */
  service: {
    type: Function as unknown as PropType<CurdServiceConstructor<E, S>>,
    required: true,
  },

  /**
   * # 搜索框提示文案
   * 优先级: 组件传入 > `EntityConfig` 配置 > `AirConfig` 默认值
   */
  searchPlaceholder: {
    type: String,
    default: undefined,
  },

  /**
   * # 默认的筛选器
   */
  defaultFilter: {
    type: Object as PropType<E>,
    default: undefined,
  },
})

const emits = defineEmits<{
  search: [request: QueryRequestPage<E>]
  add: []
  reset: []
}>()

/**
 * # `Entity` 的实例
 */
const entityInstance: Ref<E> = computed(() => Transformer.newInstance(props.entity))

/**
 * # 查询数据
 */
const data: Ref<IJson> = ref(props.defaultFilter ? (props.defaultFilter as IJson) : {})

/**
 * # 内部使用的配置
 */
const modelConfig: Ref<IModelConfig> = computed(() => getModelConfig(entityInstance.value))

/**
 * # 查询对象
 */
const request = ref(new QueryRequestPage(props.entity)) as Ref<QueryRequestPage<E>>

/**
 * # 添加按钮的标题
 */
const addTitle: Ref<string> = computed(() => modelConfig.value.addTitle || WebI18n.get().Add)

/**
 * # 是否显示搜索框
 */
const isSearchEnabled = computed(() => props.showSearch ?? modelConfig.value.showSearch ?? true)

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
 * # 导出方法
 */
function onExport() {
  const service = Transformer.newInstance(props.service)
  const exportModel = new ExportModel()
  exportModel.param = request.value
  exportModel.createExportTaskUrl = `${service.baseUrl}${WebConfig.exportUrl}`
  exportModel.queryExportUrl = `${service.baseUrl}${WebConfig.exportQueryUrl}`
  DialogUtil.createExportTask(exportModel)
}

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
 * # 下载导入的模板
 */
function onDownloadTemplate() {
  let url = props.importTemplateUrl
  if (url) {
    window.open(WebConfig.apiUrl + getUrlWithAccessToken(url))
    return
  }

  const service = Transformer.newInstance(props.service)
  url = `${service.baseUrl}/${WebConfig.importTemplateUrl}`
  url = getApiUrl(url)
  window.open(getUrlWithAccessToken(url))
}

/**
 * # 高级搜索字段列表
 */
const searchFieldList: ComputedRef<ISearchField[]> = computed(() => props.searchParams || getSearchConfigList(entityInstance.value, []))

/**
 * # 查询用的临时JSON
 */
const filter = ref<IJson>({})

/**
 * # 查询事件
 */
function onSearch() {
  request.value = new QueryRequestPage(props.entity)
  const keys = Object.keys(data.value)
  keys.forEach((key) => {
    if (data.value[key] === '') {
      data.value[key] = undefined
    }
  })
  request.value.filter = Transformer.newInstance(props.entity).recoverBy(data.value)
  if (request.value.page) {
    request.value.page.pageNum = 1
  }
  emits('search', request.value)
}

/**
 * # 重置表单
 */
function onResetSearch() {
  filter.value = {}
  request.value = new QueryRequestPage(props.entity)
  request.value.exclude('filter')
  emits('reset')
  emits('search', request.value)
}

/**
 * # 导入
 */
async function onImport() {
  let url = props.importUrl
  if (!url) {
    const service = Transformer.newInstance(props.service)
    url = `${service.baseUrl}/${WebConfig.importUrl}`
    url = getApiUrl(url)
  }
  if (!props.fileEntity) {
    await FeedbackUtil.alertError('请为ToolBar传入fileEntity', '导入失败')
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
  onResetSearch()
}

/**
 * # 暴露一个重置搜索的方法
 */
defineExpose({
  resetSearch: onResetSearch,
  search: onSearch,
})
</script>

<template>
  <div class="a-tool-bar">
    <div class="a-tool-bar--left">
      <slot name="beforeButton" />
      <AButton
        v-if="props.entity && !hideAdd"
        :permission="addPermission || PermissionUtil.get(entity, PermissionAction.ADD)"
        primary
        type="ADD"
        @click="emits('add')"
      >
        {{ addTitle }}
      </AButton>
      <AButton
        v-if="showImport"
        :permission="importPermission || PermissionUtil.get(entity, PermissionAction.IMPORT)"
        type="IMPORT"
        @click="onImport()"
      >
        {{ WebI18n.get().Import }}
      </AButton>
      <slot name="afterButton" />
    </div>
    <div class="a-tool-bar--right">
      <slot name="beforeSearch" />
      <template v-if="isSearchEnabled">
        <template
          v-for="item in searchFieldList"
          :key="item.key"
        >
          <div
            v-if="!item.hide"
            :style="{ width: `${item.width || 160}px` }"
            class="item"
          >
            <slot
              :data="data"
              :name="item.key"
            >
              <ElSelect
                v-if="item.dictionary"
                v-model="data[item.key!]"
                :clearable="item.clearable"
                :filterable="item.filterable"
                :placeholder="`${item.label}...`"
                @change="onSearch()"
                @clear="data[item.key!] = undefined"
              >
                <template v-for="enumItem of item.dictionary.toArray()">
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
                v-model="data[item.key!]"
                :clearable="item.clearable"
                :placeholder="`${item.label}...`"
                @blur="onSearch()"
                @clear="onSearch"
                @keydown.enter="onSearch"
              />
            </slot>
          </div>
        </template>
      </template>
      <AButton
        v-if="showExport"
        :permission="exportPermission || PermissionUtil.get(entity, PermissionAction.EXPORT)"
        custom-class="export-button"
        type="EXPORT"
        @click="onExport()"
      >
        {{ WebI18n.get().Export }}
      </AButton>
      <slot name="afterSearch" />
    </div>
  </div>
</template>

<style lang="scss">
.a-tool-bar {
  padding: 0 0 10px 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  .el-button + .el-button {
    margin-left: 5px;
  }

  .export-button {
    margin-left: 5px;
  }

  .el-input-number {
    .el-input__inner {
      text-align: left;
    }
  }

  &--left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &--right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap-reverse;

    > * {
      margin: 0 2px 5px;
    }

    .el-input,
    .el-select {
      cursor: pointer;
      border: none;
    }

    .item {
      display: flex;
      width: 200px;
    }
  }
}
</style>
