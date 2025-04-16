<script lang="ts" setup>
import type { Ref } from 'vue'
import { Page, QueryPageResponse } from '@airpower/core'
import { ref } from 'vue'
import { WebDateTime, WebDesensitize, WebMoney, WebPage, WebPanel, WebTable } from '../src'
import { User } from './User'

const list: Ref<User[]> = ref([])

function init() {
  const user = new User()
  user.id = 1
  user.name = 'Hamm'
  list.value.push(user)
}

const response = ref(new QueryPageResponse<User>())

response.value.list = [new User()]
response.value.total = 100
response.value.page = new Page()
response.value.page.pageNum = 1
response.value.page.pageSize = 10
response.value.pageCount = 10
init()
</script>

<template>
  <WebPanel title="车上">
    <WebDateTime :milli-second="new Date().valueOf() - 961238200" is-friendly />
    <WebTable :clazz="User" :data="list" />
    <WebDesensitize :head="2" :tail="6" content="17666666666" />
    <WebMoney :money="1234.5678" />
    <WebPage :response="response" @change="console.log($event)" />
  </WebPanel>
</template>

<style lang="scss" scoped>

</style>
