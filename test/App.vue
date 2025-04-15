<script lang="ts" setup>
import type { Ref } from 'vue'
import { Entity } from '@airpower/core'
import { ref } from 'vue'
import { Table, WebTable } from '../src'
import { WebButton, WebCopy } from '../src/components'

class User extends Entity {
  @Table()
  name!: string
}

const list: Ref<User[]> = ref([])

function init() {
  const user = new User()
  user.id = 1
  user.name = 'Hamm'
  list.value.push(user)
}

init()
</script>

<template>
  <WebButton>我是按钮</WebButton>
  <WebCopy content="我是复制的内容">
    我是按钮
  </WebCopy>
  <WebTable :clazz="User" :data="list" />
</template>

<style lang="scss" scoped>

</style>
