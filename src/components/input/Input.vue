<script generic="E extends RootEntity, T extends ITree, EM extends IEnum" lang="ts" setup>
import type { IEnum } from '@airpower/enum'
import type { EnumKey } from '@airpower/enum/dist/enum/type'
import type { IJson, ITransformerConstructor } from '@airpower/transformer'
import type { PropType, Ref } from 'vue'
import type { RootEntity } from '../../base'
import type { IFieldConfig, IFormField } from '../../decorator'
import type { IWebEnum } from '../../enum'
import type { ITree } from '../../model'
import { Transformer } from '@airpower/transformer'
import { DateTimeFormatter, ValidateUtil } from '@airpower/util'
import { CircleClose } from '@element-plus/icons-vue'
import { computed, ref, useSlots, watch } from 'vue'
import { WebConfig } from '../../config'
import { FormTrim, getFieldConfig, getFormConfig } from '../../decorator'
import { WebColor } from '../../enum'
import { WebI18n } from '../../i18n'
import { DateTimeType } from './DateTimeType'

const props = defineProps({
  modelValue: {
    type: [String, Boolean, Number, Array, Object],
    default: undefined,
  },
  modelModifiers: {
    type: Object,
    default: () => ({}),
  },

  /**
   * # 如果是循环, 则此项必须传入
   * 字段名
   */
  modifier: {
    type: String,
    default: undefined,
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
   * # 显示的格式化方式
   */
  dateShowFormatter: {
    type: String,
    default: undefined,
  },

  /**
   * # 传入的实体类
   * 如同时传入了 `modifier` 或 `v-model` 指令的 `modifier` 则自动生成兜底的 `placeholder` 等信息
   */
  entity: {
    type: Function as unknown as PropType<ITransformerConstructor<E>>,
    default: undefined,
  },

  /**
   * # 自定义提示文字
   * 优先级: `AInput` 传入 > `@Form` > 自动生成
   */
  placeholder: {
    type: String,
    default: '',
  },

  /**
   * # 可选数组
   * 优先级: `AInput` 传入 > `@Form`
   */
  list: {
    type: Array<EM>,
    default: undefined,
  },

  /**
   * # 可选树结构
   * 优先级: `AInput` 传入 > `@Form`
   */
  tree: {
    type: Array<T>,
    default: undefined,
  },

  /**
   * # 是否显示清空的图标
   * 仅在普通输入框的 `readonly` 下有效
   */
  showClear: {
    type: Boolean,
    default: false,
  },

  /**
   * # 远程搜索的回调方法
   * 如传入 则会回调此方法进行自定义搜索
   */
  onSearch: {
    type: Function,
    default: null,
  },
})
const emits = defineEmits([
  'blur',
  'focus',
  'change',
  'update:modelValue',
  'clear',
])

/**
 * # 实体的实例
 */
const entityInstance: E | undefined = props.entity ? Transformer.parse({}, props.entity) : undefined

/**
 * 绑定的数据
 */
const value: Ref<string | number | boolean | Array<unknown> | IJson | undefined> = ref(props.modelValue)

/**
 * # 触发 change 事件
 */
function emitChange() {
  emits('change', value.value)
}

/**
 * # 触发 blur 事件
 */
function emitBlur() {
  emits('blur')
}

/**
 * # 触发 clear 事件
 */
function emitClear() {
  emits('clear')
}

/**
 * # 是否显示清空按钮
 */
const isClearButtonShow = ref(props.showClear)

/**
 * # 占位内容
 */
const placeholderRef = ref(props.placeholder)

/**
 * # 字段的表单配置信息
 */
const formConfig: Ref<IFormField | undefined> = ref(undefined)

/**
 * # 字段的配置信息
 */
const fieldConfig: Ref<IFieldConfig | undefined> = ref(undefined)

/**
 * # 字段名称
 */
const fieldName = ref('')

/**
 * # 枚举数据
 */
const dictionary: Ref<IWebEnum<EnumKey>[] | undefined> = ref(undefined)

/**
 * # Props的value变化
 */
function onPropsValueUpdated(newProps?: typeof props) {
  if (newProps) {
    if (newProps.disabled) {
      // disabled
      value.value = newProps.disabledValue === undefined ? newProps.modelValue : newProps.disabledValue
    }
    else {
      value.value = newProps.modelValue
    }
  }
  else {
    value.value = props.modelValue
  }
}

/**
 * # 获取显示的格式化
 */
const getShowFormatter = computed(() => {
  if (formConfig.value) {
    switch (formConfig.value?.dateType) {
      case DateTimeType.DATE:
        return DateTimeFormatter.FULL_DATE
      case DateTimeType.WEEK:
        return '第ww周'
      case DateTimeType.YEAR:
        return 'YYYY'
      case DateTimeType.MONTH:
        return 'YYYY-MM'
      case DateTimeType.DATETIME:
        return DateTimeFormatter.FULL_DATE_TIME
    }
  }
  return DateTimeFormatter.FULL_DATE_TIME
})

/**
 * # 获取switch的颜色
 * @param status
 */
function getSwitchColor(status: boolean): string {
  return dictionary.value?.find(item => !!item.key === status)?.color || ''
}

/**
 * # 获取Switch的文案
 * @param status
 */
function getSwitchLabel(status: boolean): string {
  return dictionary.value?.find(item => !!item.key === status)?.label || ''
}

/**
 * # 获取输入类型的字符串
 */
const getInputType = computed(() => {
  if (formConfig.value?.textarea) {
    return 'textarea'
  }
  if (formConfig.value?.password) {
    return 'password'
  }
  if (formConfig.value?.number) {
    return 'number'
  }
  return 'text'
})

/**
 * # 监听Props变化, 同步数据
 */
watch(props, (newProps) => {
  isClearButtonShow.value = props.showClear
  onPropsValueUpdated(newProps)
})

/**
 * # 验证输入的值
 */
function checkNumberValue() {
  if (formConfig.value?.number) {
    // 数字输入
    let tempValue = value.value as number | string | undefined | null
    const max = Math.min(formConfig.value.max ?? WebConfig.maxNumber, Number.MAX_SAFE_INTEGER)
    const min = Math.max(formConfig.value.min ?? WebConfig.minNumber, Number.MIN_SAFE_INTEGER)
    if (
      tempValue !== ''
      && tempValue !== undefined
      && tempValue !== null
      && ValidateUtil.isNumber(tempValue.toString())
    ) {
      tempValue = Number.parseFloat(tempValue.toString())
      // 按最大值最小值做边界处理
      tempValue = Math.max(tempValue, min)
      tempValue = Math.min(tempValue, max)
      tempValue = Number.parseFloat(tempValue.toFixed(formConfig.value.precision ?? WebConfig.numberPrecision))
      value.value = tempValue
      value.value = Number.parseFloat(value.value?.toString() || '0')
    }
    value.value = Number.parseFloat(value.value?.toString() || '0')
  }
}

/**
 * # 清空事件
 */
function onClear() {
  emitClear()
  emitChange()
}

/**
 * # 将数据丢出去
 */
function emitValue() {
  if (formConfig.value && value.value) {
    switch (formConfig.value.trim) {
      case FormTrim.ALL:
        value.value = value.value.toString().trim()
        break
      case FormTrim.END:
        value.value = value.value.toString().trimEnd()
        break
      case FormTrim.START:
        value.value = value.value.toString().trimStart()
        break
      default:
    }
  }
  emits('update:modelValue', value.value)
  emitChange()
}

/**
 * # 输入键盘按下事件
 * @param event
 */
function onKeyDown(event: KeyboardEvent) {
  switch (event.code) {
    case 'KeyE':
      if (formConfig.value?.number) {
        // 数字类型输入不允许输入科学计数的e
        event.preventDefault()
      }
      break
    case 'Escape':
      if (formConfig.value?.clearable !== false) {
        value.value = undefined
        emitValue()
      }
      break
    default:
  }
}

/**
 * # 输入框失去焦点
 */
function onBlur() {
  checkNumberValue()
  emitValue()
  emitBlur()
}

/**
 * # 监听Value变化, 同步数据
 */
watch(value, () => {
  emitValue()
})

function initFieldName() {
  if (props.modifier) {
    // 如传入了自定义的modifier 则优先使用
    fieldName.value = props.modifier
  }
  else {
    for (const key in props.modelModifiers) {
      fieldName.value = key
    }
  }
}

/**
 * # 初始化
 */
function init() {
  initFieldName()
  // 初始化配置信息
  if (props.entity && fieldName && entityInstance) {
    formConfig.value = getFormConfig(entityInstance, fieldName.value)
    fieldConfig.value = getFieldConfig(entityInstance, fieldName.value)

    if (!placeholderRef.value) {
      const field = fieldConfig.value.label || getFieldConfig(entityInstance, fieldName.value).label || fieldName
      // 默认生成输入的placeholder
      placeholderRef.value = `请输入${field}...`

      if (formConfig.value) {
        // 装饰了FormField
        if (
          dictionary.value
          || fieldConfig.value.dictionary
          || props.list
          || props.tree
          || formConfig.value.dateType !== undefined
        ) {
          // 传入了枚举值
          placeholderRef.value = WebI18n.get().SelectPlease
        }
        if (formConfig.value.placeholder) {
          // 传入了自定义placeholder
          placeholderRef.value = formConfig.value.placeholder
        }
      }
    }
  }
  if (props.modelValue === undefined && formConfig.value?.defaultValue !== undefined) {
    // 没有初始化的值 但装饰器设置了默认值
    value.value = formConfig.value.defaultValue
    emitValue()
    return
  }
  dictionary.value = props.list ? props.list : (formConfig.value && fieldConfig.value?.dictionary) ? fieldConfig.value.dictionary.toArray() : undefined

  // 初始化同步值
  onPropsValueUpdated(props)
}

const slots: Readonly<any> = useSlots()
init()
</script>

<template>
  <div class="a-input">
    <template v-if="formConfig && formConfig.dateType !== undefined">
      <el-date-picker
        v-if="formConfig.dateType !== DateTimeType.DATE"
        v-model="value"
        :clearable="formConfig?.clearable"
        :disabled="disabled"
        :format="formConfig.dateShowFormatter || getShowFormatter"
        :placeholder="placeholderRef"
        :prefix-icon="formConfig?.prefixIcon"
        :readonly="readonly"
        :suffix-icon="formConfig?.suffixIcon"
        :type="formConfig.dateType"
        :value-format="formConfig.dateFormatter"
        style="width: 100%"
        @clear="onClear"
        @focus="emits('focus')"
        @keydown="onKeyDown"
      />
      <el-time-picker
        v-else
        v-model="value"
        :clearable="formConfig?.clearable"
        :disabled="disabled"
        :format="formConfig.dateShowFormatter || DateTimeFormatter.FULL_TIME"
        :placeholder="placeholderRef"
        :prefix-icon="formConfig?.prefixIcon"
        :readonly="readonly"
        :suffix-icon="formConfig?.suffixIcon"
        :value-format="formConfig.dateFormatter"
        style="width: 100%"
        @clear="onClear"
        @focus="emits('focus')"
        @keydown="onKeyDown"
      />
    </template>
    <template v-else-if="list || dictionary">
      <el-switch
        v-if="formConfig?.switch"
        v-model="value"
        :active-text="getSwitchLabel(true)"
        :inactive-text="getSwitchLabel(false)"
        :readonly="readonly"
        :style="{
          '--el-switch-on-color': getSwitchColor(true),
          '--el-switch-off-color': getSwitchColor(false),
        }"
      />
      <el-radio-group
        v-else-if="formConfig?.radioButton"
        v-model="value"
        :readonly="readonly"
      >
        <el-radio-button
          v-for="item in dictionary"
          :key="item.key"
          :value="item.key"
        >
          {{ item.label }}
        </el-radio-button>
      </el-radio-group>
      <el-radio-group
        v-else-if="formConfig?.radio"
        v-model="value"
        :readonly="readonly"
      >
        <el-radio
          v-for="item in dictionary"
          :key="item.key"
          :value="item.key"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
      <el-select
        v-else
        v-model="value"
        :clearable="formConfig?.clearable"
        :collapse-tags="formConfig?.collapseTags"
        :disabled="disabled"
        :filterable="formConfig?.filterable"
        :multiple="formConfig?.multiple"
        :multiple-limit="formConfig?.multipleLimit"
        :placeholder="placeholderRef"
        :prefix-icon="formConfig?.prefixIcon"
        :readonly="readonly"
        :remote="!!onSearch"
        :remote-method="onSearch"
        :suffix-icon="formConfig?.suffixIcon"
        collapse-tags-tooltip
        fit-input-width
        @clear="onClear"
        @focus="emits('focus')"
        @keydown="onKeyDown"
      >
        <el-option
          v-for="item in dictionary"
          :key="item.key.toString()"
          :disabled="item.disabled"
          :label="item.label"
          :value="item.key"
        >
          <div
            v-if="formConfig?.color"
            class="a-input-select"
          >
            <span class="label">{{ item.label }}</span>
            <span
              :style="{ backgroundColor: item.color || WebColor.NORMAL }"
              class="light"
            />
          </div>
        </el-option>
      </el-select>
    </template>

    <el-cascader
      v-else-if="formConfig && tree"
      v-model="value"
      :clearable="formConfig?.clearable"
      :collapse-tags="formConfig?.collapseTags"
      :disabled="disabled"
      :options="tree"
      :placeholder="placeholderRef"
      :props="{
        value: 'id',
        label: 'name',
        multiple: formConfig?.multiple,
        emitPath: formConfig?.emitPath,
        checkStrictly: formConfig?.checkStrictly,
      }"
      :readonly="readonly"
      :show-all-levels="formConfig?.showAllLevels"
      class="a-input-cascader"
      collapse-tags-tooltip
      popper-class="a-input-cascader-popper"
      @clear="onClear"
      @focus="emits('focus')"
      @keydown="onKeyDown"
    />
    <el-input
      v-else
      v-model="value"
      :autosize="formConfig?.autoSize ? { minRows: formConfig.minRows, maxRows: formConfig.maxRows } : false"
      :clearable="formConfig?.clearable"
      :disabled="disabled"
      :max="formConfig?.max"
      :maxlength="
        formConfig?.maxLength || (formConfig?.textarea ? WebConfig.maxTextAreaLength : WebConfig.maxTextLength)
      "
      :min="formConfig?.min ?? 0"
      :placeholder="placeholderRef"
      :prefix-icon="formConfig?.prefixIcon"
      :readonly="readonly"
      :rows="formConfig?.textarea ? WebConfig.textareaMinRows : 0"
      :show-word-limit="formConfig?.showLimit !== false"
      :suffix-icon="formConfig?.suffixIcon"
      :type="getInputType"
      @blur="onBlur"
      @change="checkNumberValue"
      @clear="onClear"
      @focus="emits('focus')"
      @keydown="onKeyDown"
    >
      <template
        v-for="(_, name) in slots"
        #[name]
      >
        <slot :name="name">
          <template v-if="name === 'append'">
            {{ formConfig?.suffixText }}
          </template>
          <template v-if="name === 'suffix'">
            <el-icon
              v-if="isClearButtonShow"
              @click="onClear()"
            >
              <CircleClose />
            </el-icon>
          </template>
        </slot>
      </template>
      <template
        v-if="!$slots.append && formConfig?.suffixText"
        #append
      >
        {{ formConfig.suffixText }}
      </template>
    </el-input>
  </div>
</template>

<style lang="scss">
.a-input {
  width: 100%;

  .a-input-cascader {
    display: inline;
    width: 100%;
  }

  .a-input-cascader-popper {
    margin-top: 8px !important;

    .el-cascader-menu__list {
      width: 100%;
    }
  }

  .a-input-number {
    .el-input__inner {
      text-align: left;
    }
  }
}

.a-input-select {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .label {
    width: 0;
    flex: 1;
  }

  .light {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: -15px;
    border-radius: 100%;
  }
}
</style>
