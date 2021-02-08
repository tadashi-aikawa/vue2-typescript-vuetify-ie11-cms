<template>
  <div>
    <v-row justify="center" align="center" style="height: 100%" class="pt-5">
      <v-col cols="12" xs="6" sm="8" md="10" lg="8" xl="6">
        <v-card
          v-for="quest of quests"
          :key="quest.id"
          class="mx-auto ma-5"
          max-width="600"
        >
          <div class="d-flex blue-grey darken-3 pa-3">
            <v-icon>mdi-earth</v-icon>
            <span class="text--primary">
              {{ quest.world.name }} > {{ quest.goal.name }}
            </span>
            <span class="ml-2">
              ({{ quest.beginCity.name }} ~ {{ quest.endCity.name }})
            </span>
            <div style="flex: 1"></div>
            <v-icon :color="quest.level.icon.color">
              {{ quest.level.icon.name }}
            </v-icon>
            <span class="text--primary">
              {{ quest.level.name }}
            </span>
          </div>
          <v-card-text>
            <div class="text--primary text-h6 mt-3 mb-5" :class="centerClass">
              <v-icon>mdi-clock</v-icon>
              <span>{{ quest.beginDate.displayDateTime }}</span>
              <span class="display-1 mx-3">~</span>
              <span>{{ quest.endDate.displayDateTime }}</span>
            </div>

            <div class="rounded pa-3" style="border: 1px solid lightgrey">
              {{ quest.description }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="teal accent-4"> Learn More </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from '@vue/composition-api'
import { questStore } from '~/utils/store-accessor'

export default defineComponent({
  setup(_props) {
    const quests = computed(() => questStore.quests)
    const loading = computed(() => questStore.fetchingStatus === 'loading')
    const error = computed(() => questStore.fetchingError)

    onMounted(async () => {
      await questStore.fetchAllQuests()
    })

    return {
      quests,
      loading,
      error,
      centerClass: ['d-flex', 'justify-center', 'align-center'],
    }
  },
})
</script>
