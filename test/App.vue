<script lang="ts" setup>
import { FeedbackUtil, WebDateTime, WebDesensitize, WebMoney, WebPanel } from '../src'
import { DialogUtil } from '../src/components/dialog/DialogUtil'
import UserEdit from './UserEdit.vue'

async function init() {
  await FeedbackUtil.alertInfo('弹窗确认工具类好用吗')

  DialogUtil.show(UserEdit)
}

init()
</script>

<template>
  <WebPanel title="车上">
    <WebDateTime :milli-second="new Date().valueOf() - 961238200" is-friendly />
    <WebDesensitize :head="2" :tail="6" content="17666666666" />
    <WebMoney :money="1234.5678" />
  </WebPanel>
</template>

<style lang="scss" scoped>

</style>
