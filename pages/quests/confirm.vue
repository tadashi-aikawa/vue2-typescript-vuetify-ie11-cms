<template>
  <div>
    <v-row justify="center" align="center" style="height: 100%" class="pt-5">
      <v-col cols="12" xs="6" sm="8" md="10" lg="8" xl="6">
        <v-simple-table>
          <template v-if="quest" #default>
            <thead>
              <tr>
                <th class="text-left">項目</th>
                <th class="text-left">設定値</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ID</td>
                <td>{{ quest.id }}</td>
              </tr>
              <tr>
                <td>世界</td>
                <td>{{ quest.world.name }}</td>
              </tr>
              <tr>
                <td>目的</td>
                <td>{{ quest.goal.name }}</td>
              </tr>
              <tr>
                <td>発生区間</td>
                <td>{{ quest.beginCity.name }} ~ {{ quest.endCity.name }}</td>
              </tr>
              <tr>
                <td>発生期間</td>
                <td>
                  {{ quest.beginDate.displayDateTime }} ~
                  {{ quest.endDate.displayDateTime }}
                </td>
              </tr>
              <tr>
                <td>難易度</td>
                <td>{{ quest.level.name }}</td>
              </tr>
              <tr>
                <td>オプション</td>
                <td>
                  <ul v-for="name in optionNames">
                    <li>{{ name }}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>説明</td>
                <td>
                  <pre class="pa-3">{{ quest.description }}</pre>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <div class="d-flex justify-center pa-6">
          <v-btn color="success darken-2" class="mr-4"> 登録する </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { questStore } from '~/utils/store-accessor'

export default defineComponent({
  setup() {
    const quest = computed(() => questStore.currentQuest)
    const optionNames = computed(() =>
      quest.value?.questOptions.map((x) => x.name)
    )
    return {
      quest,
      optionNames,
      centerClass: ['d-flex', 'justify-center', 'align-center'],
    }
  },
})
</script>