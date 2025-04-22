<script lang="ts" setup>
import { DesensitizeType, DesensitizeUtil, ValidateUtil } from '@airpower/util'
import { Iphone } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { DialogUtil } from '../dialog'
import { ACall } from './index'

const props = defineProps({
  /**
   * # 电话号码
   */
  phone: {
    type: String,
    required: true,
  },

  /**
   * # 是否脱敏
   */
  desensitize: {
    type: DesensitizeType,
    default: undefined,
  },

  /**
   * # 脱敏开始保留
   * 默认使用传入的参数
   */
  desensitizeHead: {
    type: Number,
    default: 0,
  },

  /**
   * # 脱敏末尾保留
   * 默认使用传入的参数
   */
  desensitizeTail: {
    type: Number,
    default: 0,
  },
})

/**
 * # 显示拨打电话弹窗
 */
async function callPhone() {
  await DialogUtil.show(ACall, props.phone)
}

/**
 * # 脱敏电话号
 */
const desensitizePhone = computed(() => {
  if (!props.desensitize) {
    return props.phone
  }
  return DesensitizeUtil.desensitize(props.phone, props.desensitize, props.desensitizeHead, props.desensitizeTail)
})
</script>

<template>
  <div
    v-if="phone && ValidateUtil.isTelephoneOrMobilePhone(phone)"
    class="a-phone"
    @click="callPhone()"
  >
    <el-icon>
      <Iphone />
    </el-icon>
    {{ desensitizePhone }}
  </div>
  <div v-else>
    {{ phone || '-' }}
  </div>
</template>

<style lang="scss" scoped>
.a-phone {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}

.a-phone:hover {
  color: var(--primary-color);
}
</style>
