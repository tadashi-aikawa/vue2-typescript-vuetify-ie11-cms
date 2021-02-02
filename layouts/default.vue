<template>
  <v-app dark>
    <template v-if="isLogin">
      <v-app-bar fixed app>
        <v-toolbar-title v-text="env.japanese" />
        <v-alert dense border="left" type="warning" class="ma-4">
          <strong>
            イベント終了時刻が設定されていません。ただちに設定してください
          </strong>
        </v-alert>
        <v-spacer />
        <v-btn v-if="isLogin">
          <v-icon>ログアウト</v-icon>
        </v-btn>
      </v-app-bar>
      <template v-if="ready">
        <v-main>
          <v-container>
            <nuxt />
          </v-container>
        </v-main>
      </template>
    </template>
    <template v-else>
      <login />
    </template>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from '@vue/composition-api'
import { getEnv } from '~/utils/env'
import Login from '~/pages/login.vue'
import { worldStore } from '~/utils/store-accessor'

export default defineComponent({
  components: {
    Login,
  },
  setup() {
    const env = computed(() => getEnv())

    const ready = computed(() => worldStore.status === 'success')
    // FIXME: ちゃんと判定する
    // const isLogin = computed(() => userStore.isLogin)
    const isLogin = true

    onMounted(() => worldStore.fetchWorlds())

    return {
      env,
      ready,
      isLogin,
    }
  },
})
</script>
