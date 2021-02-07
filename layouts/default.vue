<template>
  <v-app dark>
    <template v-if="isLogin">
      <v-app-bar fixed app>
        <v-toolbar-title>
          <v-icon>mdi-earth</v-icon>
          <span>{{ env.japanese }}</span>
        </v-toolbar-title>
        <v-alert dense border="left" type="warning" class="ma-4 ml-15" outlined>
          <strong>
            イベント終了時刻が設定されていません。ただちに設定してください
          </strong>
        </v-alert>
        <v-spacer />
        <v-btn v-if="isLogin">
          <v-icon>mdi-logout</v-icon>
          <span class="ml-1">ログアウト</span>
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
    <v-snackbar :value="snackbar" centered>
      <div :class="centerClass">登録に成功しました</div>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from '@vue/composition-api'
import { getEnv } from '~/utils/env'
import Login from '~/pages/login.vue'
import {
  cityStore,
  goalStore,
  questStore,
  worldStore,
} from '~/utils/store-accessor'

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

    onMounted(() => {
      worldStore.fetchWorlds()
      goalStore.fetchGoals()
      cityStore.fetchCities()
      questStore.fetchAllQuests()
    })

    const snackbar = computed(() => questStore.addingStatus === 'success')

    return {
      env,
      ready,
      isLogin,
      snackbar,
      centerClass: ['d-flex', 'justify-center', 'align-center'],
    }
  },
})
</script>
