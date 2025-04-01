<script generic="E extends AirEntity" lang="ts" setup>
import type { AirEntity, ClassConstructor } from '@airpower/core'
import type { PropType } from 'vue'
import type { ITableFieldConfig } from '../decorator'
import { AirClassTransformer } from '@airpower/core'
import { ElTable, ElTableColumn } from 'element-plus'
import { computed } from 'vue'
import { getTableConfigList } from '../decorator'

const props = defineProps({
  columns: {
    type: Array<ITableFieldConfig>,
  },
  data: {
    type: Array<E>,
    required: true,
  },
  clazz: {
    type: Function as unknown as PropType<ClassConstructor<E>>,
    required: true,
  },
})
const tableColumns = computed(() => {
  if (props.columns && props.columns.length > 0) {
    return props.columns
  }
  const instance = AirClassTransformer.newInstance(props.clazz)
  console.warn('[table]: instance', instance)
  const list: ITableFieldConfig[] = getTableConfigList(instance, [])
  console.warn('[table]: list:', list)
  return list
})
</script>

<template>
  <ElTable
    :data="data"
    row-key="id"
    v-bind="$attrs"
    v-on="$attrs"
  >
    <template
      v-for="item in tableColumns"
      :key="item.key"
    >
      <template v-if="!item.key">
        这不可能
      </template>
      <ElTableColumn
        v-else
        :label="item.label"
        :prop="item.key"
      />
    </template>
  </ElTable>
</template>
