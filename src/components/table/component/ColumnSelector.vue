<script generic="E extends RootEntity" lang="ts" setup>
import type { Ref } from 'vue'
import type { RootEntity } from '../../../base'
import type { ITableColumn } from '../../../decorator'
import { ElCheckTag } from 'element-plus'
import { ref } from 'vue'
import { WebI18n } from '../../../i18n'
import { AButton } from '../../button'

const props = defineProps<{
  columnList: Array<ITableColumn>
}>()

const emits = defineEmits<{
  changed: [Array<string>]
}>()

const isShow = ref(false)

const list: Ref<string[]> = ref([])

/**
 * # 字段选择变更事件
 * @param status 是否即将选择
 * @param config 配置
 */
function changed(status: boolean, config: ITableColumn) {
  if (config.force) {
    return
  }
  for (let i = 0; i < list.value.length; i += 1) {
    if (config.key === list.value[i]) {
      list.value.splice(i, 1)
      break
    }
  }
  if (status) {
    list.value.push(config.key!)
  }
  emits('changed', list.value)
}

if (list.value.length === 0) {
  list.value = props.columnList.map(i => i.key as string)
}
</script>

<template>
  <AButton class="a-field-selector" icon="SETTING" @click="isShow = true">
    {{ WebI18n.get().Column }}
  </AButton>
  <div
    v-if="isShow"
    class="a-field-selector-bg"
    @click.self="isShow = false"
  />
  <transition name="search">
    <div
      v-if="isShow"
      class="a-field-selector-dialog"
    >
      <div class="a-field-selector-title">
        {{ WebI18n.get().SelectTableColumnsToShow }}
      </div>
      <div class="a-field-selector-list">
        <ElCheckTag
          v-for="item in columnList"
          :key="item.key"
          :checked="!!list.find((i: string) => i === item.key)"
          :class="item.force ? 'disabled' : ''"
          :disabled="item.force"
          @change="changed($event, item)"
        >
          {{ item.label }}
        </ElCheckTag>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.a-field-selector {
  position: relative;

}

.el-check-tag {
  font-weight: normal !important;
  user-select: none;
  font-size: 13px;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 4px 10px;
}

.a-field-selector-bg {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.1);
  z-index: 9999999;
}

.a-field-selector-dialog {
  box-shadow: 0 0 20px rgb(0 0 0 / 10%);
  position: absolute;
  right: 0;
  top: 40px;
  background-color: white;
  width: 350px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 99999991;

  .a-field-selector-title {
    margin-bottom: 10px;
    border-bottom: 1px solid var(--el-color-primary-light-9);
    padding: 8px 16px;
    font-size: 15px;
  }

  .a-field-selector-list {
    padding: 5px 15px 10px 15px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    overflow-y: auto;
    flex: 1;
    height: 0;
    align-content: flex-start;
  }
}
</style>
