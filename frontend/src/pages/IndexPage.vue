<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <h1 class="text-h3 text-primary q-mb-md">Добро пожаловать в QPP</h1>
      <p class="text-h6 text-grey-7">Современное SPA приложение на Quasar + FastAPI</p>
      
      <q-card class="q-mt-lg q-mx-auto" style="max-width: 500px;">
        <q-card-section>
          <div class="text-h6">Статус API</div>
        </q-card-section>
        
        <q-separator />
        
        <q-card-section>
          <div v-if="loading" class="text-center">
            <q-spinner color="primary" size="3em" />
          </div>
          <div v-else-if="error" class="text-negative">
            {{ error }}
          </div>
          <div v-else class="text-positive">
            <q-icon name="check_circle" size="2em" />
            <div class="text-body1 q-mt-sm">{{ apiStatus }}</div>
          </div>
        </q-card-section>
        
        <q-card-actions align="center">
          <q-btn color="primary" label="Проверить API" @click="checkApi" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const loading = ref(false);
    const error = ref<string | null>(null);
    const apiStatus = ref('');

    const checkApi = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        const response = await api.get('/health');
        apiStatus.value = `API работает! Статус: ${response.data.status}`;
      } catch (err: any) {
        error.value = `Ошибка подключения: ${err.message}`;
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      error,
      apiStatus,
      checkApi
    };
  }
});
</script>
