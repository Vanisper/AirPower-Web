<script generic="T extends IMenu & RootEntity" lang="ts" setup>
import type { IMenu } from '../../interface/IMenu'
import type { RootEntity } from '../../model/RootEntity'
import { ElMenu } from 'element-plus'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ChildMenu from './ChildMenu.vue'

defineProps({
  /**
   * ### 菜单列表
   * 请确保传入的数组类型为 `IMenu` 的实现类
   */
  menuList: {
    type: Array<T>,
    required: true,
  },

  /**
   * ### 是否只保持展开一个菜单
   */
  uniqueOpened: {
    type: Boolean,
    default: false,
  },
})

/**
 * ### 菜单状态激活
 */
const defaultMenu = ref(window.location.pathname)

/**
 * ### 路由
 */
const route = useRoute()

/**
 * ### 监听路由
 */
watch(
  () => route,
  (newVal) => {
    defaultMenu.value = newVal.path || window.location.pathname
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <ElMenu
    :default-active="defaultMenu"
    :router="true"
    :unique-opened="uniqueOpened"
    class="a-menu-tree"
  >
    <ChildMenu :menu-list="menuList" />
  </ElMenu>
</template>

<style lang="scss">
.a-menu-tree {
  background-color: transparent;
  border: none;
  width: 100%;
  height: 100%;
  user-select: none;

  .is-opened {
    > .el-sub-menu__title {
      background-color: var(--el-menu-hover-bg-color);
    }
  }

  .el-sub-menu__title,
  .el-menu-item {
    height: 40px;
    border-radius: 5px;
    margin-bottom: 5px;
  }

  .el-sub-menu__title:hover,
  .el-menu-item:hover {
    background-color: var(--el-menu-hover-bg-color);
  }

  .el-menu-item.is-active {
    color: white;
    background-color: var(--primary-color);
  }

  .airpower {
    display: inline-block;
    font-size: 16px;
  }
}
</style>
