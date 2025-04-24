<script lang="ts" setup>
import type { IJson } from '@airpower/transformer'
import { ref } from 'vue'
import { DialogProps } from '../../../dialog/DialogProps'
import { WebFileUtil } from '../../../file/WebFileUtil'
import { Http } from '../../../http/Http'
import { WebI18n } from '../../../i18n/WebI18n'
import { ExportModel } from '../../../model/export/ExportModel'
import { ADialog } from '../../index'

const props = defineProps(DialogProps.withParam(new ExportModel()))

/**
 * 加载状态
 */
const isLoading = ref(false)

/**
 * 轮询Timer
 */
let loopTimer: number

/**
 * 关闭弹窗时询问是否取消导出
 */
async function cancelExport() {
  clearTimeout(loopTimer)
  props.onCancel()
}

/**
 * 导出文件的地址
 */
const exportFilePath = ref('')

/**
 * 轮询任务结果
 * @param fileCode 请求的文件code
 */
async function startLoop(fileCode: string) {
  clearTimeout(loopTimer)
  try {
    const exportModel = new ExportModel()
    exportModel.fileCode = fileCode
    const downloadPath = (await Http.create(props.param.queryExportUrl)
      .throwError()
      .request(exportModel)) as unknown as string
    isLoading.value = false
    exportFilePath.value = WebFileUtil.getStaticFileUrl(downloadPath)
  }
  catch (e) {
    console.warn(e)
    // 文件暂未生成
    loopTimer = setTimeout(() => {
      startLoop(fileCode)
    }, 1000)
  }
}

/**
 * 下载导出的文件
 */
function download() {
  window.open(exportFilePath.value)
  props.onConfirm(exportFilePath.value)
}

/**
 * # 创建下载任务
 */
async function createExportTask() {
  isLoading.value = true
  try {
    // 将请求的param参数发送到url对应的API上 开始创建一个任务
    const exportRequest = props.param.param;

    // 导出数据无需分页
    (exportRequest as IJson).page = undefined
    const fileCode: string = (await Http.create(props.param.createExportTaskUrl).request(
      exportRequest,
    )) as unknown as string
    // 轮询任务结果
    await startLoop(fileCode)
  }
  catch (e) {
    console.warn(e)
    props.onCancel()
  }
}

createExportTask()
</script>

<template>
  <ADialog
    :allow-fullscreen="false"
    :title="WebI18n.get().Export"
    class="export-dialog"
    hide-footer
    min-height="300px"
    width="400px"
    @on-cancel="cancelExport"
  >
    <div class="tips">
      <template v-if="isLoading">
        <el-progress
          :duration="1"
          :format="() => { }"
          :indeterminate="true"
          :percentage="100"
          :stroke-width="10"
        />
        {{ WebI18n.get().ExportLoadingAndWaitPlease }}
      </template>
      <template v-else>
        <el-result
          :title="WebI18n.get().ExportSuccess"
          icon="success"
        >
          <template #extra>
            <el-button
              type="primary"
              @click="download"
            >
              {{ WebI18n.get().DownloadExportFile }}
            </el-button>
          </template>
        </el-result>
      </template>
    </div>
  </ADialog>
</template>

<style lang="scss">
.export-dialog {
  .tips {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    display: flex;
    color: #999;
    flex-direction: column;
    font-size: 14px;

    .el-progress {
      width: 300px;
      margin-bottom: 50px;
      margin-top: -20px;

      .el-progress__text {
        display: none;
      }
    }
  }

  .el-result {
    padding: 0;
    margin-top: -30px;
  }
}
</style>
