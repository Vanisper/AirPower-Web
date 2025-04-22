<script lang="ts" setup>
import type { Ref } from 'vue'
import { RandomUtil } from '@airpower/util'
import { ref } from 'vue'
import { APanel, ATable } from '../src'
import { WebConfig } from '../src/config'
import { FileEntity } from './FileEntity'
import { User, UserService } from './User'

WebConfig.disablePermission = true
const list: Ref<User[]> = ref([])
for (let i = 1; i < 10; i++) {
  const user = new User()
  user.name = `Hamm-${i}`
  user.age = RandomUtil.getRandNumber(10, 20)
  user.addr = `addr-${i}`
  list.value.push(user)
}
</script>

<template>
  <APanel title="哈哈">
    <ATable
      :data-list="list"
      :entity="User"
      :file-entity="FileEntity"
      :service="UserService" show-add-row
      show-export
      show-import
    />
  </APanel>
</template>

<style lang="scss" scoped>

</style>
