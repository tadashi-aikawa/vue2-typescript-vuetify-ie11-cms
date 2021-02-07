<template>
  <div>
    <h1 class="d-flex justify-center pa-6">管理メニュー</h1>
    <v-container fluid>
      <v-row>
        <template v-for="item in items">
          <v-card
            :key="item.path"
            width="400"
            class="mx-auto card"
            outlined
            shaped
            nuxt
            :to="item.path"
          >
            <v-card-title class="headline" v-text="item.name" />
            <v-card-text v-text="item.description" />
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
      {
        name: 'クエスト管理',
        path: 'quests/admin',
        description: 'クエストの追加をする画面です',
      },
      {
        name: 'クエスト一覧',
        path: 'quests',
        description: 'クエストの一覧を表示し、編集/削除する画面です',
      },
      {
        name: 'ガチャマスタ管理',
        path: 'gacha-master',
        description: 'Comming soon..',
      },
      {
        name: 'お知らせ管理',
        path: 'information',
        description: 'ユーザー向けのお知らせを管理する画面です',
      },
    ]

    return { items }
  },
})
</script>
