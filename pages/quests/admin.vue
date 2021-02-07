<template>
  <v-row justify="center" align="center" style="height: 100%" class="pt-5">
    <v-col cols="12" xs="6" sm="8" md="10" lg="8" xl="6">
      <v-menu
        value="true"
        :close-on-content-click="false"
        :close-on-click="false"
        :position-x="40"
        :position-y="100"
        max-width="400"
        absolute
      >
        <v-textarea
          class="debug"
          :value="debugJson"
          rows="25"
          auto-grow
          outlined
          full-width
          readonly
        />
      </v-menu>
      <v-form ref="form" v-model="state.valid" lazy-validation>
        <v-row dense>
          <v-col cols="12" md="2" :class="centerClass">
            <span>世界</span>
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

        <v-row dense class="mt-5">
          <v-col cols="12" md="2" :class="centerClass">説明</v-col>
          <v-col cols="12" md="10">
            <v-textarea
              v-model="state.description"
              counter="150"
              auto-grow
              outlined
            ></v-textarea>
          </v-col>
        </v-row>

        <hr class="my-4 grey darken-1" />

        <div class="d-flex justify-center pa-6">
          <v-btn
            :disabled="!state.valid"
            color="success darken-2"
            class="mr-4"
            @click="moveToConfirm"
          >
            確認画面へ移動する
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
  UnwrapRef,
  watch,
} from '@vue/composition-api'
import { DateTime } from 'owlelia'
import {
  cityStore,
  goalStore,
  questStore,
  worldStore,
} from '~/utils/store-accessor'
import DateTimePicker from '~/components/DateTimePicker.vue'
import { Level } from '~/domain/quests/vo/Level'
import { QuestOption } from '~/domain/quests/vo/QuestOption'
import { Quest } from '~/domain/quests/entity/Quest'
import { QuestId } from '~/domain/quests/vo/QuestId'
import { World } from '~/domain/quests/entity/World'
import { Goal } from '~/domain/quests/entity/Goal'
import { City } from '~/domain/quests/entity/City'
import { JsonString } from '~/utils/types'

interface State {
  world?: World
  goal?: Goal
  beginCity?: City
  endCity?: City
  beginDate?: DateTime
  endDate?: DateTime
  level?: Level
  questOptions: QuestOption[]
  description?: string
  valid: boolean
}

// TODO: この関数が呼ばれるときはnullになっていないはずだが、null安全な実装(例外判定)にしたい
// TODO: 組み合わせバリデーションをする場合、そこでまとめて行う (Quest.try)
const formToEntity = (form: UnwrapRef<State>): Quest =>
  Quest.of({
    id: 'test' as QuestId,
    world: form.world! as World,
    goal: form.goal! as Goal,
    beginCity: form.beginCity! as City,
    endCity: form.endCity! as City,
    beginDate: form.beginDate! as DateTime,
    endDate: form.endDate! as DateTime,
    level: form.level!,
    questOptions: form.questOptions,
    description: form.description!,
  })

const formToDebugJsonStr = (form: UnwrapRef<State>): JsonString =>
  JSON.stringify(
    {
      world: form.world?.name,
      goal: form.goal?.name,
      city: {
        begin: form.beginCity?.name,
        end: form.endCity?.name,
      },
      date: {
        begin: form.beginDate?.displayDateTime,
        end: form.endDate?.displayDateTime,
      },
      level: {
        name: form.level?.name,
        icon: form.level?.icon,
      },
      options: form.questOptions.map((x) => x.name),
      description: form.description,
    },
    null,
    '  '
  )

export default defineComponent({
  components: {
    DateTimePicker,
  },
  // Vue3に移行したらrootは使えなくなる。代わりにuseRouterを使う。
  // https://next.router.vuejs.org/guide/advanced/composition-api.html#accessing-the-router-and-current-route-inside-setup
  setup(_props, { root }) {
    const form = ref<{ validate(): boolean }>()

    const currentQuest = computed(() => questStore.currentQuest)

    const state = reactive<State>({
      world: currentQuest.value?.world,
      goal: currentQuest.value?.goal,
      beginCity: currentQuest.value?.beginCity,
      endCity: currentQuest.value?.endCity,
      beginDate: currentQuest.value?.beginDate ?? DateTime.now(),
      endDate: currentQuest.value?.endDate,
      level: currentQuest.value?.level,
      questOptions: currentQuest.value?.questOptions ?? [],
      description: currentQuest.value?.description,
      valid: false,
    })
    watch(
      () => state.world,
      (_) => {
        state.goal = undefined
      }
    )
    watch(
      () => state.goal,
      (_) => {
        state.beginCity = undefined
        state.endCity = undefined
      }
    )

    const worlds = computed(() => worldStore.worlds)
    const goals = computed(() =>
      state.world ? goalStore.getGoalsByWorld(state.world as World) : []
    )
    const cities = computed(() =>
      state.goal ? cityStore.getCitiesByGoal(state.goal as Goal) : []
    )
    // FIXME:
    const submitError = null
    // const submitError = computed(() => eventStore.submitError)

    const moveToConfirm = () => {
      if (form.value?.validate()) {
        questStore.updateCurrentQuest(formToEntity(state))
        root.$options.router?.push({ path: 'confirm' })
      }
    }

    const debugJson = computed(() => formToDebugJsonStr(state))

    return {
      debugJson,
      form,
      state,
      worlds,
      moveToConfirm,
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
.debug textarea {
  width: 25vw;
  font-size: 75%;
  line-height: 1.3rem;
  color: darkgrey !important;
}
</style>
