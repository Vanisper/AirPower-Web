<script lang="ts" setup>
import type { PropType } from 'vue'
import { DateTimeFormatter, DateTimeUtil } from '@airpower/util'
import { computed, ref } from 'vue'

const props = defineProps({
  /**
   * ### 时间日期对象或毫秒时间戳
   */
  time: {
    type: Object as PropType<Date | number>,
    default: undefined,
  },

  /**
   * ### 时间格式化模板
   */
  formatter: {
    type: DateTimeFormatter,
    default: DateTimeFormatter.FULL_DATE_TIME,
  },

  /**
   * ### 是否显示友好时间
   */
  isFriendly: {
    type: Boolean,
    default: false,
  },
})

const friendly = ref(props.isFriendly)

/**
 * ### 读取友好时间
 */
const getDateTimeString = computed(() => {
  if (!props.time) {
    return '-'
  }
  if (friendly.value) {
    if (props.time instanceof Date) {
      return DateTimeUtil.getFriendlyDateTime(props.time)
    }
    return DateTimeUtil.getFriendlyDateTime(props.time)
  }
  if (props.time instanceof Date) {
    return props.formatter.formatDate(props.time)
  }
  return props.formatter.formatMilliSecond(props.time)
})
</script>

<template>
  <ElLink
    underline="never"
    @click="friendly = !friendly"
  >
    {{ getDateTimeString }}
  </ElLink>
</template>

<style lang="scss" scoped>
.a-friend-datetime,
.a-friend-datetime * {
  user-select: none !important;
}
</style>
