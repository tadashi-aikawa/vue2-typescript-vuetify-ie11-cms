<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="env.japanese" />
      <v-spacer />
      <v-btn v-if="isLogin">
        <v-icon>ログアウト</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <template v-if="isLogin">
        <v-container>
          <nuxt />
        </v-container>
      </template>
      <template v-else>
        <login />
      </template>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { getEnv } from '~/utils/env'
import Login from '~/pages/login.vue'
import { userStore } from '~/utils/store-accessor'

export default defineComponent({
  components: {
    Login,
  },
  setup() {
    const env = computed(() => getEnv())
    const isLogin = computed(() => userStore.isLogin)

    return {
      env: env.value,
      isLogin,
    }
  },
})
</script>
