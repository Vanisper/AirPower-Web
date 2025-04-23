<script generic="E extends RootEntity" lang="ts" setup>
import type {EnumKey} from '@airpower/enum'
import {computed} from 'vue'
import type {RootEntity} from '../../../base'
import type {ITableColumn} from '../../../decorator'
import type {WebEnumConstructor} from '../../../enum'
import {WebColor} from '../../../enum'

const props = defineProps<{
  column: ITableColumn
  data: E
  dictionary: WebEnumConstructor
}>()
const key = props.column.key as keyof E
const value = computed(() => props.data[key] as EnumKey)
</script>

<template>
  <div
      class="a-enum-column"
  >
    <span
        v-if="column.color"
        :style="{
        backgroundColor: dictionary.get(value)?.color || WebColor.NORMAL,
      }"
        class="light"
    />
    {{
      dictionary.getLabel(value, column.emptyValue)
    }}
  </div>
</template>

<style lang="scss" scoped>
.a-enum-column {

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .light {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    display: inline-block;
    margin-right: 4px;
    margin-top: -1px;
  }
}
</style>
