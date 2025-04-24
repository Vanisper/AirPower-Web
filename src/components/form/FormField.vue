<script generic="E extends RootEntity" lang="ts" setup>
import type { IEnum } from '@airpower/enum'
import type { IJson, ITransformerConstructor } from '@airpower/transformer'
import type { PropType } from 'vue'
import type { ITree } from '../../interface/ITree'
import type { RootEntity } from '../../model/RootEntity'
import { ElFormItem } from 'element-plus'
import { inject, ref } from 'vue'
import { getFieldLabel } from '../../decorator/@Field/Field'
import { AInput } from '../index'

const props = defineProps({
  /**
   * # 实体类
   * 传入表单内容的类型，如传入则覆盖自动注入的类
   */
  entity: {
    type: Function as unknown as PropType<ITransformerConstructor<E>>,
    default: null,
  },

  /**
   * # 字段的名称
   */
  field: {
    type: String,
    required: true,
  },

  /**
   * # 手动绑定的表单对象
   */
  modelValue: {
    type: Object as PropType<E>,
    default: null,
  },

  /**
   * # 是否禁用输入
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否只读
   */
  readonly: {
    type: Boolean,
    default: false,
  },

  /**
   * # 禁用时显示的值
   * 如果被禁用时传入了这个值, 则会显示这个值.
   */
  disabledValue: {
    type: [String, Boolean, Number, Array, Object],
    default: undefined,
  },

  /**
   * # 可选数组
   * 优先级: `AInput`传入 > `@Form`
   */
  list: {
    type: Array<IEnum>,
    default: undefined,
  },

  /**
   * # 可选树结构
   * 优先级: `AInput` 传入 > `@Form`
   */
  tree: {
    type: Array<ITree>,
    default: undefined,
  },
})

const emits = defineEmits<{
  'change': [value: E]
  'update:modelValue': [value: E]
  'blur': []
  'focus': []
  'clear': []
}>()

if (!props.field) {
  throw new Error('field必传一个！！！')
}

/**
 * # 注入的表单数据
 */
const injectFormData = inject<IJson>('formData')

/**
 * # 手动绑定的 v-model 覆盖 自动注入的表单对象
 */
const formData = props.modelValue ? ref<IJson>(props.modelValue) : injectFormData

if (!formData) {
  throw new Error('请手动为AFormField绑定v-model或使用 useEditor 创建表单对象(推荐)！！！')
}

/**
 * # 手动传入的实体类 覆盖 自动注入的实体类
 */
const EntityClass = (inject('entityClass') as ITransformerConstructor<E>) || props.entity

if (!EntityClass) {
  throw new Error('请手动传入到AFormField的entity属性或使用 useEditor 创建表单对象(推荐)！！！')
}

/**
 * # 监听值变化
 * @param val 值
 */
function onChange(val: unknown) {
  formData!.value[props.field] = val
  emits('update:modelValue', formData!.value)
  emits('change', formData!.value)
  if (injectFormData) {
    ;(injectFormData.value as IJson)[props.field] = val
  }
}
</script>

<template>
  <ElFormItem
    :label="getFieldLabel(EntityClass, field)"
    :prop="field"
  >
    <slot>
      <AInput
        v-model="formData[field]"
        :disabled="disabled"
        :disabled-value="disabledValue"
        :entity="EntityClass"
        :list="list"
        :model-modifiers="{ field }"
        :modifier="field"
        :readonly="readonly"
        :tree="tree"
        @blur=" emits('blur') "
        @change="onChange($event)"
        @clear=" emits('clear') "
        @focus=" emits('focus') "
      />
    </slot>
  </ElFormItem>
</template>
