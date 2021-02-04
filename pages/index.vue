<template>
  <div>
    <h1 class="d-flex justify-center pa-6">管理メニュー</h1>
    <v-container fluid>
      <v-row>
        <template v-for="item in items">
          <v-card
            :key="item.path"
            max-width="400"
            class="mx-auto"
            nuxt
            :to="item.path"
          >
            <v-card-title class="headline" v-text="item.name" />
          </v-card>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const items: { name: string; path: string }[] = [
      { name: 'クエスト管理', path: 'quests/admin' },
      { name: 'ガチャ情報管理', path: 'gacha' },
      { name: 'ガチャマスタ管理', path: 'gacha-master' },
      { name: 'お知らせ管理', path: 'information' },
    ]

    return { items }
  },
})
</script>
