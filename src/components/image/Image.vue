<script generic="F extends IFile & RootEntity" lang="ts" setup>
import type { IJson, ITransformerConstructor } from '@airpower/transformer'
import type { PropType } from 'vue'
import type { IFile } from '../../interface/IFile'
import type { RootEntity } from '../../model/RootEntity'
import { Transformer } from '@airpower/transformer'
import { FileUtil } from '@airpower/util'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'
import { WebConfig } from '../../config/WebConfig'
import { FeedbackUtil } from '../../feedback/FeedbackUtil'
import { WebFileUtil } from '../../file/WebFileUtil'
import { WebI18n } from '../../i18n/WebI18n'

const props = defineProps({
  /**
   * ### 显示的URL
   */
  src: {
    type: String,
    default: () => undefined,
  },

  /**
   * ### 是否显示删除图标
   * 仅 `upload` 时有效, 如传入 `false`, 则上传后不允许删除
   */
  clearable: {
    type: Boolean,
    default: true,
  },

  /**
   * ### 提示文本
   */
  placeholder: {
    type: String,
    default: undefined,
  },

  /**
   * ### 允许上传
   */
  upload: {
    type: Boolean,
    default: false,
  },

  /**
   * 请求头
   */
  headers: {
    type: Object as PropType<IJson>,
    default: () => {
    },
  },

  /**
   * 请求数据
   */
  data: {
    type: Object as PropType<IJson>,
    default: () => {
    },
  },

  /**
   * ### 显示上传 `tips`
   */
  showTips: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 图片宽度
   */
  width: {
    type: Number,
    default: 100,
  },

  /**
   * ### 图片高度
   */
  height: {
    type: Number,
    default: 100,
  },

  /**
   * ### 限制上传的大小
   */
  limit: {
    type: Number,
    default: () => 3 * 1024 * 1024,
  },

  /**
   * ### 允许上传的格式
   */
  extensions: {
    type: Array,
    default: () => ['jpg', 'jpeg', 'png'],
  },

  /**
   * ### 上传地址
   */
  uploadUrl: {
    type: String,
    default: '',
  },

  /**
   * ### 上传文件的字段名
   * 默认为 `file`
   */
  uploadFileName: {
    type: String,
    default: 'file',
  },

  /**
   * ### 接收的文件实体类
   */
  entity: {
    type: Function as unknown as PropType<ITransformerConstructor<F>>,
    default: undefined,
  },
})

const emits = defineEmits<{
  uploaded: [file: F]
  removed: []
}>()

/**
 * ### 真实上传地址
 */
const uploadUrl = computed(() => props.uploadUrl || WebConfig.uploadUrl)

/**
 * ### 显示的文件地址
 */
const imageUrl = ref('')

/**
 * ### 是否正在上传
 */
const isUploading = ref(false)

function init() {
  if (props.src) {
    imageUrl.value = WebFileUtil.getStaticFileUrl(props.src)
    return
  }
  imageUrl.value = ''
}

watch(props, () => {
  if (props.src) {
    imageUrl.value = WebFileUtil.getStaticFileUrl(props.src)
  }
})

/**
 * ### 上传文件的头
 */
const uploadHeader = ref<IJson>({})
uploadHeader.value = { ...uploadHeader.value, ...props.headers }
uploadHeader.value[WebConfig.authorizationHeaderKey] = WebConfig.getAccessToken()

/**
 * ### 移除图像事件
 */
function imageRemoved() {
  imageUrl.value = ''
  emits('removed')
}

/**
 * ### 显示本地选择的图片
 */
function showLocalFile(file: File) {
  const reader = new FileReader()
  reader.onload = (e) => {
    if (e.target && e.target.result) {
      imageUrl.value = e.target.result.toString()
    }
  }
  reader.readAsDataURL(file)
}

/**
 * ### 文件格式校验
 * @param file 文件
 * @return 是否成功
 */
function beforeUpload(file: File): boolean {
  const fileExt = file.name.substring(file.name.lastIndexOf('.') + 1)
  if (!props.extensions.includes(fileExt.toLocaleLowerCase())) {
    FeedbackUtil.toastError(`${WebI18n.get().ImageSupportExtensions} ${props.extensions.join('/')}`)
    return false
  }
  if (file.size > props.limit) {
    FeedbackUtil.toastError(
      `${WebI18n.get().FileMaxSizeAllowed}${FileUtil.getFileSizeFriendly(props.limit)}`,
    )
    return false
  }
  isUploading.value = true
  showLocalFile(file)
  return true
}

/**
 * ### 上传失败事件
 */
function onUploadError() {
  isUploading.value = false
  FeedbackUtil.toastError(
    WebI18n.get().FileUploadErrorAndRetryPlease,
  )
}

/**
 * ### 上传成功事件
 * @param response 成功响应
 * @param response.code 响应码
 * @param response.data 响应数据
 * @param response.data.url 文件地址
 */
function onUploadSuccess(response: { code: number, data: { url: string } }) {
  if (response.code === WebConfig.successCode) {
    if (!props.entity) {
      FeedbackUtil.toastError('请先传入 entity 参数')
      return
    }
    const entityData = Transformer.parse(response.data, props.entity)
    if (entityData && entityData.url) {
      emits('uploaded', entityData)
      isUploading.value = false
      return
    }
  }
  onUploadError()
}

init()
</script>

<template>
  <div
    :style="{ width: `${width}px`, height: `${height}px` }"
    class="a-image"
  >
    <el-image
      :preview-src-list="[imageUrl]"
      :src="imageUrl"
      :z-index="99"
      fit="contain"
      lazy
      preview-teleported
    >
      <template #error>
        <div class="image-error">
          {{
            placeholder
              || (upload && entity ? WebI18n.get().UploadImage : WebI18n.get().NoPicture)
          }}
        </div>
      </template>
    </el-image>
    <div
      v-if="uploadHeader && upload"
      v-loading="isUploading"
      :class="imageUrl ? 'image-preview-color' : ''"
      class="image-upload"
    >
      <el-upload
        v-if="!imageUrl"
        :action="uploadUrl"
        :before-upload="beforeUpload"
        :data="data"
        :headers="uploadHeader"
        :name="uploadFileName"
        :on-error="onUploadError"
        :on-success="onUploadSuccess"
        :show-file-list="false"
        class="image-upload-box"
      />
    </div>
    <div
      v-if="imageUrl && upload && entity"
      class="action"
    >
      <el-icon
        v-if="clearable"
        @click="imageRemoved"
      >
        <CircleCloseFilled />
      </el-icon>
    </div>
  </div>
</template>

<style lang="scss">
.a-image {
  display: inline-block;
  position: relative;
  background: #f5f7fa;
  border-radius: 5px;
  overflow: hidden;
  user-select: none;

  .el-image {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    .image-error {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      justify-content: center;
      align-items: center;
      display: flex;
      color: #aaa;
      font-size: 14px;
    }
  }

  .image-upload {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 0.3s;

    .image-upload-box {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      .el-upload {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    }
  }

  .action {
    position: absolute;
    right: -100px;
    bottom: 5px;
    background-color: white;
    color: orangered;
    border-radius: 100%;
    font-size: 24px;
    display: inline-block;
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    pointer-events: auto;
    font-weight: bold;
  }
}

.a-image:hover {
  cursor: pointer;

  .action {
    display: flex;
    z-index: 99;
    right: 5px;
  }

  .image-upload {
    background-color: rgba($color: #000000, $alpha: 0.3);
  }

  .image-preview-color {
    pointer-events: none;
  }
}
</style>
