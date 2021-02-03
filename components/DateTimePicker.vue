<template>
  <div class="d-flex">
    <v-menu
      v-model="state.dateMenu"
      :close-on-content-click="false"
      offset-y
      min-width="auto"
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          :value="state.displayDate"
          label="日付"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          style="width: 120px"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="state.displayDate"
        no-title
        scrollable
        color="cyan darken-1"
        @change="changeDate"
      />
    </v-menu>
    <v-menu
      v-model="state.timeMenu"
      :close-on-content-click="false"
      offset-y
      min-width="auto"
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          :value="state.displayTime"
          label="時間"
          prepend-icon="mdi-clock"
          readonly
          v-bind="attrs"
          class="ml-3"
          style="width: 80px"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-model="state.displayTime"
        format="24hr"
        color="cyan darken-1"
        @change="changeTime"
      ></v-time-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import { DateTime } from 'owlelia'
import { Nullable } from '~/utils/types'

export default defineComponent({
  props: {
    dateTime: { type: Object as () => Nullable<DateTime>, required: true },
  },
  setup(_props, { emit }) {
    const state = reactive({
      displayDate: '',
      displayTime: '',
      dateMenu: false,
      timeMenu: false,
    })

    const changeDate = (date: string) => {
      emit('update:dateTime', DateTime.of(`${date} ${state.displayTime}`))
    }
    const changeTime = (time: string) => {
      emit('update:dateTime', DateTime.of(`${state.displayDate} ${time}`))
    }

    return {
      state,
      changeDate,
      changeTime,
    }
  },
})
</script>
