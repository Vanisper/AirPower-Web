<script generic="E extends AirEntity" lang="ts" setup>
import type { AirAny, AirEntity, ClassConstructor, IJson } from '@airpower/core'
import type { PropType } from 'vue'
import type { ITableFieldConfig } from '../decorator'
import { AirClassTransformer } from '@airpower/core'
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
  // 可选：定义需要覆盖的默认属性
  // pagination: { type: Boolean, default: true },
})
console.warn(props)
// 合并默认列配置与父组件传入的配置
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
function getRowEntityField(scope: IJson, key: string): AirAny {
  return scope.row[key]
}
</script>

<template>
  <el-table
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
      <el-table-column
        v-else
        :label="item.label"
        :prop="item.key"
      >
        <template #default="scope">
          <slot
            v-if="scope.$index >= 0"
            :data="getRowEntity(scope)"
            :index="scope.$index as number"
            :name="item.key"
          >
            {{ getRowEntityField(scope, item.key) }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
