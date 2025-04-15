<script lang="ts" setup>
import type { Ref } from 'vue'
import { ref } from 'vue'
import { WebDateTime, WebTable } from '../src'
import { User } from './User'

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
  <WebDateTime :milli-second="new Date().valueOf() - 96123821000000000" is-friendly />
  <WebTable :clazz="User" :data="list" />
</template>

<style lang="scss" scoped>

</style>
