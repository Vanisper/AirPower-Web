<script lang="ts" setup>
import { DateTimeFormatter, DateTimeUtil } from '@airpower/core'
import { computed } from 'vue'

const props = defineProps({
  /**
   * # 毫秒时间戳
   */
  time: {
    type: Number,
    default: 0,
  },

  /**
   * # 时间格式化模板
   * 建议使用 `AirDateTimeFormatter`
   */
  formatter: {
    type: DateTimeFormatter,
    default: DateTimeFormatter.FULL_DATE_TIME,
  },

  /**
   * # 是否显示友好时间
   */
  isFriendly: {
    type: Boolean,
    default: false,
  },
})

/**
 * # 读取友好时间
 */
const getDateTimeString = computed(() => {
  if (!props.time) {
    return '-'
  }
  if (props.isFriendly) {
    return DateTimeUtil.getFriendlyDateTime(props.time)
  }
  return props.formatter.formatMilliSecond(props.time)
})

/**
 * # 提示信息
 */
const toolTips = computed(() => {
  if (!props.time) {
    return '-'
  }
  if (!props.isFriendly) {
    return DateTimeUtil.getFriendlyDateTime(props.time)
  }
  return props.formatter.formatMilliSecond(props.time)
})
</script>

<template>
  <el-tooltip :content="toolTips">
    <el-link
      :underline="false"
      class="web-friend-datetime"
    >
      {{ getDateTimeString }}
    </el-link>
  </el-tooltip>
</template>

<style lang="scss" scoped>
.web-friend-datetime,
.web-friend-datetime * {
  user-select: none !important;
}
</style>
