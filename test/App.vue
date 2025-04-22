<script lang="ts" setup>
import type { Ref } from 'vue'
import { ref } from 'vue'
import { ATable } from '../src'
import { User } from './User'

const list: Ref<User[]> = ref([])
for (let i = 1; i < 10; i++) {
  const user = new User()
  user.name = `Hamm-${i}`
  list.value.push(user)
}
</script>

<template>
  <ATable :data-list="list" :entity="User" />
</template>

<style lang="scss" scoped>

</style>
