<script generic="E extends RootEntity" lang="ts" setup>
import {computed} from 'vue'
import type {RootEntity} from '../../../base'
import type {ITableColumn} from '../../../decorator'
import {ACopy} from '../../copy'

const props = defineProps<{
  column: ITableColumn
  data: E
}>()

const key = props.column.key as keyof E
const value = computed(() => (props.data[key] || '').toString() || props.column.emptyValue || '-')
</script>

<template>
  <ACopy :content="value">
    {{ value }}
  </ACopy>
</template>

<style lang="scss" scoped>

</style>
