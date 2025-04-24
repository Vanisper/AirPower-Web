<script lang="ts" setup>
import type { PropType } from 'vue'
import type { IUser } from './IUser'
import { SwitchButton } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { computed, ref } from 'vue'
import defaultAvatar from '../../assets/img/avatar.svg'
import { WebConfig } from '../../config/WebConfig'
import { WebFileUtil } from '../../file/WebFileUtil'
import { WebI18n } from '../../i18n/WebI18n'
import { PermissionUtil } from '../../permission/PermissionUtil'

const props = defineProps({
  /**
   * # 用户信息
   */
  user: {
    type: Object as PropType<IUser>,
    required: true,
  },

  /**
   * # 宽度
   */
  width: {
    type: Number,
    default: 400,
  },

  /**
   * # 宽度
   */
  height: {
    type: Number,
    default: 300,
  },
})

const isDialogShow = ref(false)

const userAvatar = computed(() => {
  if (props.user.avatar) {
    return WebFileUtil.getStaticFileUrl(props.user.avatar)
  }
  return defaultAvatar
})

/**
 * # 退出登录
 */
async function logout() {
  await ElMessageBox.confirm(WebI18n.get().ConfirmToLogout, WebI18n.get().ConfirmPlease, {
    confirmButtonText: WebI18n.get().Confirm,
    cancelButtonText: WebI18n.get().Cancel,
    confirmButtonClass: 'danger',
    type: 'warning',
  })
  WebConfig.removeAccessToken()
  PermissionUtil.saveList([])
  window.location.replace(WebConfig.loginUrl)
}
</script>

<template>
  <div class="a-user">
    <div
      class="a-user-head"
      @click="isDialogShow = true"
    >
      <el-image :src="userAvatar" />
    </div>
    <div
      v-if="isDialogShow"
      class="a-user-cover"
      @click.self="isDialogShow = false"
    />
    <transition name="search">
      <div
        v-if="isDialogShow"
        :style="{ width: `${width}px`, height: `${height}px` }"
        class="a-user-dialog"
      >
        <div class="a-user-header">
          <div class="a-user-title">
            <slot name="title">
              {{ user.nickname }}
            </slot>
          </div>
          <div class="a-user-logout">
            <el-button
              text
              type="danger"
              @click="logout"
            >
              <el-icon>
                <SwitchButton />
              </el-icon>
              {{ WebI18n.get().Logout }}
            </el-button>
          </div>
        </div>
        <div class="a-user-body">
          <slot>
            <div class="slot">
              User Profile Card...
            </div>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.a-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  .a-user-head {
    border-radius: 8px;
    cursor: pointer;
    width: 36px;
    height: 36px;
    background-color: #eee;
    overflow: hidden;

    * {
      width: 100%;
      height: 100%;
    }
  }

  .a-user-cover {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba($color: #000000, $alpha: 0.05);
  }

  .a-user-dialog {
    position: absolute;
    right: 0;
    top: 50px;
    background-color: white;
    box-shadow: 0 0 20px rgb(0 0 0 / 20%);
    border-radius: 6px;
    z-index: 99;
    display: flex;
    flex-direction: column;

    .a-user-body {
      flex: 1;
      height: 0;
      overflow: hidden;
      overflow-y: auto;
      padding: 10px;

      .slot {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
    }

    .a-user-header {
      border-bottom: 1px solid #f5f5f5;
      padding: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;

      .a-user-title {
        flex: 1;
        font-size: 16px;
        font-weight: bold;
        margin-left: 10px;
      }
    }
  }
}
</style>
