<template>
  <v-row justify="center" align="center" style="height: 100%">
    <v-col cols="12" md="4">
      <v-form ref="form" v-model="state.valid" lazy-validation>
        <v-select
          v-model="state.world"
          :items="worlds"
          label="世界"
          return-object
          item-text="name"
        ></v-select>
        <v-select
          v-if="state.world"
          v-model="state.goal"
          :items="state.world.goals"
          label="目的"
          return-object
          item-text="name"
        ></v-select>
        <v-row v-if="state.goal">
          <v-col cols="12" md="6">
            <v-select
              v-model="state.section.begin"
              :items="state.goal.cities"
              label="区間(開始)"
              return-object
              item-text="name"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="state.section.end"
              :items="state.goal.cities"
              label="区間(終了)"
              return-object
              item-text="name"
            ></v-select>
          </v-col>
        </v-row>

        <div class="d-flex justify-center pa-6">
          <v-btn
            :disabled="!state.valid"
            color="success"
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
import { computed, defineComponent, reactive, ref } from '@vue/composition-api'
import { World } from '~/domain/quests/entity/World'
import { worldStore } from '~/utils/store-accessor'
import { Goal } from '~/domain/quests/entity/Goal'
import { City } from '~/domain/quests/entity/City'
import { Section } from '~/domain/common/vo/Section'

export default defineComponent({
  setup() {
    const state = reactive({
      world: null as World | null,
      goal: null as Goal | null,
      section: {
        begin: null,
        end: null,
      } as Section<City | null>,
      valid: false,
    })

    const form = ref<{ validate(): boolean }>()

    const worlds = computed(() => worldStore.worlds)
    // FIXME:
    const submitError = null
    // const submitError = computed(() => eventStore.submitError)

    const submit = () => {
      if (form.value?.validate()) {
        // TODO: 登録処理
      }
    }

    return {
      form,
      state,
      worlds,
      submit,
      submitError,
    }
  },
})
</script>
