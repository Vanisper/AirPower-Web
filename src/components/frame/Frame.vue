<script generic="T extends IMenu<T> & RootEntity" lang="ts" setup>
import type { RootEntity } from '../../base'
import type { IMenu } from '../menu'
import { AMenu } from '../menu'

defineProps({
  /**
   * # 左侧宽度
   */
  menuWidth: {
    type: Number,
    default: 220,
  },

  /**
   * # 菜单列表
   * 请确保传入的数组类型为 `IMenu` 的实现类
   */
  menuList: {
    type: Array<T>,
    default: () => [],
  },

  /**
   * # 是否只保持展开一个菜单
   */
  uniqueOpened: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否隐藏菜单
   */
  hideMenu: {
    type: Boolean,
    default: false,
  },

  headerHeight: {
    type: Number,
    default: 40,
  },
})
</script>

<template>
  <div class="a-frame">
    <div
      :style="{ height: `${headerHeight}px` }"
      class="a-header"
    >
      <div class="a-logo">
        <slot name="logo">
          <span>AirPower4T</span>
        </slot>
      </div>
      <div class="a-navigator">
        <slot name="navigator" />
      </div>
      <slot name="user" />
    </div>
    <div class="a-main">
      <div
        v-if="!hideMenu"
        :style="{ width: `${menuWidth}px` }"
        class="air-left"
      >
        <div
          v-loading="!menuList"
          class="a-menu"
        >
          <AMenu
            v-if="menuList"
            :menu-list="menuList"
            :unique-opened="uniqueOpened"
          />
        </div>
      </div>
      <div class="a-right">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.a-frame {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;

  .a-header {
    padding: 5px 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    height: 40px;

    .a-logo {
      word-break: keep-all;
      text-align: center;
      cursor: pointer;
      user-select: none;
      height: 100%;

      span {
        margin-left: 16px;
        font-size: 24px;
        font-weight: bold;
        color: var(--el-color-primary);
        user-select: none;
      }
    }

    .a-navigator {
      flex: 1;
      font-size: 14px;
      color: #aaa;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      width: 0;
      margin: 0 20px;
    }
  }

  .a-main {
    flex: 1;
    height: 0;
    display: flex;
    flex-direction: row;
    background-color: var(--el-color-primary-light-9);

    .air-left {
      display: flex;
      flex-direction: column;
      background: #fff;
      margin: 5px;
      border-radius: 4px;

      .a-menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        height: 0;
        overflow: hidden;
        overflow-y: auto;
        padding: 10px;

        .item {
          padding: 5px 15px;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
          border-radius: 5px;
          color: var(--el-color-primary);
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          i {
            margin-right: 3px;
            font-weight: bold;
          }
        }

        .item:hover {
          background-color: #f5f5f5;
        }
      }

      .a-menu::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }

    .a-right {
      flex: 1;
      width: 0;
      display: flex;
      flex-direction: column;
      background: var(--el-color-primary-light-9);
      margin: 5px 5px 5px 0;
    }
  }
}
</style>
