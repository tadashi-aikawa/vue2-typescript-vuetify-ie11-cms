<template>
  <v-row>
    <v-col class="text-center">
      <ul>
        <li v-for="user in users" :key="user.id">
          <span v-text="user.name"></span>
        </li>
      </ul>
      <v-btn @click="handleClickAddUser">
        ユーザーを追加 (現在 {{ userCount }} 人)
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { userStore } from '~/utils/store-accessor'

export default defineComponent({
  setup() {
    const users = computed(() => userStore.users)
    const userCount = computed(() => users.value.length)

    const handleClickAddUser = () => {
      const newId = userCount.value + 1
      userStore.add({ id: newId, name: `User${newId}` })
    }

    return {
      users: users.value,
      userCount,
      handleClickAddUser,
    }
  },
})
</script>
