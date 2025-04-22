<script lang="ts" setup>
import type { Ref } from 'vue'
import { ref } from 'vue'
import { APanel, ATable } from '../src'
import { User } from './User'

const list: Ref<User[]> = ref([])
for (let i = 1; i < 10; i++) {
  const user = new User()
  user.name = `Hamm-${i}`
  list.value.push(user)
}
</script>

<template>
  <APanel title="哈哈">
    <ATable :data-list="list" :entity="User" show-add-row />
  </APanel>
</template>

<style lang="scss" scoped>

</style>
