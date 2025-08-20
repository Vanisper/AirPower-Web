<script lang="ts" setup>
import { FullScreen } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  /**
   * ### 卡片的标题
   */
  title: {
    type: String,
    default: '',
  },

  /**
   * ### 描述
   */
  description: {
    type: String,
    default: '',
  },

  /**
   * ### 是否显示标题
   */
  showTitle: {
    type: Boolean,
    default: true,
  },

  /**
   * ### 是否显示图标
   */
  hideIcon: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 是否允许全屏
   */
  allowFullscreen: {
    type: Boolean,
    default: false,
  },
})

/**
 * ### 是否全屏
 */
const isFullScreen = ref(false)

const realTitle = computed(() => props.title || useRouter().currentRoute.value.meta?.name || '')
</script>

<template>
  <div
    :class="isFullScreen ? 'fullscreen' : ''"
    class="web-panel"
  >
    <div
      v-if="showTitle"
      class="panel-header"
    >
      <div class="panel-left">
        <div
          v-if="!hideIcon"
          class="panel-icon"
        >
          <slot name="icon" />
        </div>
        <div
          v-if="realTitle"
          class="panel-title"
        >
          {{ realTitle }}
        </div>
      </div>
      <div class="panel-right">
        <slot name="headerRight" />
        <div
          v-if="allowFullscreen"
          class="panel-full"
          @click="isFullScreen = !isFullScreen"
        >
          <ElIcon>
            <FullScreen />
          </ElIcon>
        </div>
      </div>
    </div>
    <div class="panel-body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.web-panel {
  display: flex;
  flex: 1;
  flex-direction: column;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  height: 0;

  .panel-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    padding: 10px 15px;
    user-select: none;

    .panel-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex: 1;
      width: 0;

      .panel-icon {
        font-size: 20px;
        color: var(--el-color-primary);
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .panel-title {
        font-size: 16px;
        color: #333;
        font-weight: bold;
        margin-left: 3px;
      }
    }

    .panel-right {
      color: #aaa;
      font-size: 14px;

      .panel-full {
        font-size: 20px;
        cursor: pointer;
        font-weight: bold;
        margin: -5px 0px;
        transition: all 0.3s;
      }

      .panel-full:hover {
        color: var(--primary-color);
      }
    }
  }

  .panel-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    height: 0;
    padding: 10px;
    position: relative;
  }
}

.fullscreen {
  position: fixed !important;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 10;
}
</style>
