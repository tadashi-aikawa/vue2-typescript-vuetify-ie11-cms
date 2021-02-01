<template>
  <v-row justify="center" align="center" style="height: 100%">
    <v-col cols="12" md="2">
      <v-form ref="form" v-model="state.valid" lazy-validation>
        <v-text-field
          v-model="state.userId"
          :rules="[(v) => !!v || 'IDは必須です']"
          label="ユーザーID"
          required
        ></v-text-field>
        <v-text-field
          v-model="state.password"
          :rules="[(v) => !!v || 'パスワードは必須です']"
          label="パスワード"
          required
        ></v-text-field>

        <div class="d-flex justify-center pa-6">
          <v-btn
            :disabled="!state.valid"
            :loading="isLoading"
            color="success"
            class="mr-4"
            @click="login"
          >
            ログイン
          </v-btn>
        </div>
      </v-form>
      <div v-if="loginError" class="d-flex justify-center">
        <v-alert dense outlined type="error" v-text="loginError.message" />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from '@vue/composition-api'
import { userStore } from '~/utils/store-accessor'
import { UserId } from '~/domain/users/vo/UserId'

export default defineComponent({
  setup() {
    const state = reactive({
      userId: '',
      password: '',
      valid: false,
    })

    const form = ref<{ validate(): boolean }>()

    const isLoading = computed(() => userStore.loginStatus === 'loading')
    const loginError = computed(() => userStore.loginError)

    const login = () => {
      if (form.value?.validate()) {
        userStore.login({
          userId: state.userId as UserId,
          password: state.password,
        })
      }
    }

    return {
      form,
      state,
      login,
      isLoading,
      loginError,
    }
  },
})
</script>
