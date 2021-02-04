<template>
  <v-row justify="center" align="center" style="height: 100%">
    <v-col cols="12" xs="6" sm="8" md="10" lg="8" xl="6">
      <v-form ref="form" v-model="state.valid" lazy-validation>
        <v-row dense>
          <v-col cols="12" md="2" :class="centerClass">
            <v-menu
              value="true"
              :close-on-content-click="false"
              :close-on-click="false"
              left
              nudge-left="300"
            >
              <template #activator="{ on, attrs }"><span>世界</span></template>
              <pre class="debug" v-text="debugJson" />
            </v-menu>
          </v-col>
          <v-col cols="12" md="4" :class="centerClass">
            <v-select
              v-model="state.world"
              :items="worlds"
              label="世界(必須)"
              return-object
              item-text="name"
            ></v-select>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" md="2" :class="centerClass"> 目的 </v-col>
          <v-col cols="12" md="4" :class="centerClass">
            <v-select
              v-model="state.goal"
              :disabled="!state.world"
              :items="goals"
              label="目的(必須)"
              return-object
              item-text="name"
            ></v-select>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" md="2" :class="centerClass"> 発生区間 </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="state.beginCity"
              :disabled="!state.goal"
              :items="cities"
              label="区間(開始)"
              return-object
              item-text="name"
            ></v-select>
          </v-col>
          <v-col cols="12" md="1" :class="centerClass">
            <span class="display-1">~</span>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="state.endCity"
              :disabled="!state.goal"
              :items="cities"
              label="区間(終了)"
              return-object
              item-text="name"
            ></v-select>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" md="2" :class="centerClass"> 発生期間 </v-col>
          <v-col cols="12" md="4">
            <date-time-picker :date-time.sync="state.beginDate" />
          </v-col>
          <v-col cols="12" md="1" :class="centerClass">
            <span class="display-1">~</span>
          </v-col>
          <v-col cols="12" md="4">
            <date-time-picker :date-time.sync="state.endDate" />
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" md="2" :class="centerClass"> 難易度 </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="state.level"
              :items="levels"
              label="難易度"
              return-object
              item-text="name"
            >
              <template #item="{ item }">
                <v-icon :color="item.icon.color">{{ item.icon.name }}</v-icon>
                <span class="ml-1" v-text="item.name"></span>
              </template>
              <template #selection="{ item }">
                <v-icon :color="item.icon.color">{{ item.icon.name }}</v-icon>
                <span class="ml-1" v-text="item.name"></span>
              </template>
            </v-select>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" md="2" :class="centerClass"> オプション </v-col>
          <v-col cols="12" md="10">
            <v-row>
              <template v-for="option in questOptions">
                <v-checkbox
                  :key="option.name"
                  v-model="state.questOptions"
                  dense
                  class="pl-4"
                  multiple
                  :label="option.name"
                  :value="option"
                />
              </template>
            </v-row>
          </v-col>
        </v-row>

        <div class="d-flex justify-center pa-6">
          <v-btn
            :disabled="!state.valid"
            color="success darken-2"
            class="mr-4"
            @click="submit"
          >
            登録
          </v-btn>
        </div>
      </v-form>
      <div v-if="submitError" class="d-flex justify-center">
        <v-alert dense outlined type="error" v-text="submitError.message" />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
} from '@vue/composition-api'
import { DateTime } from 'owlelia'
import { World } from '~/domain/quests/entity/World'
import { worldStore } from '~/utils/store-accessor'
import { Goal } from '~/domain/quests/entity/Goal'
import { City } from '~/domain/quests/entity/City'
import { Nullable } from '~/utils/types'
import DateTimePicker from '~/components/DateTimePicker.vue'
import { Level } from '~/domain/quests/vo/Level'
import { QuestOption } from '~/domain/quests/vo/QuestOption'

export default defineComponent({
  components: {
    DateTimePicker,
  },
  setup() {
    const form = ref<{ validate(): boolean }>()

    const state = reactive({
      world: null as Nullable<World>,
      goal: null as Nullable<Goal>,
      beginCity: null as Nullable<City>,
      endCity: null as Nullable<City>,
      beginDate: null as Nullable<DateTime>,
      endDate: null as Nullable<DateTime>,
      level: null as Nullable<Level>,
      questOptions: [] as QuestOption[],
      valid: false,
    })
    watch(
      () => state.world,
      (_) => {
        state.goal = null
      }
    )
    watch(
      () => state.goal,
      (_) => {
        state.beginCity = null
        state.endDate = null
      }
    )

    const worlds = computed(() => worldStore.worlds)
    const goals = computed(() => state.world?.goals ?? [])
    const cities = computed(() => state.goal?.cities ?? [])
    // FIXME:
    const submitError = null
    // const submitError = computed(() => eventStore.submitError)

    const submit = () => {
      if (form.value?.validate()) {
        // TODO: 登録処理
      }
    }

    const debugJson = computed(() =>
      JSON.stringify(
        {
          world: state.world?.name,
          goal: state.goal?.name,
          city: {
            begin: state.beginCity?.name,
            end: state.endCity?.name,
          },
          date: {
            begin: state.beginDate?.displayDateTime,
            end: state.endDate?.displayDateTime,
          },
          level: {
            name: state.level?.name,
            icon: state.level?.icon,
          },
          options: state.questOptions.map((x) => x.name),
        },
        null,
        '  '
      )
    )

    return {
      debugJson,
      form,
      state,
      worlds,
      submit,
      submitError,
      goals,
      cities,
      levels: Level.values(),
      questOptions: QuestOption.values(),
      centerClass: ['d-flex', 'justify-center', 'align-center'],
    }
  },
})
</script>

<style>
.debug {
  font-size: 75%;
  overflow-y: scroll;
  height: 80vh;
  padding: 20px;
}
</style>
