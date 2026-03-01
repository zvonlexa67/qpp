<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <h1 class="text-h1 text-primary">404</h1>
      <p class="text-h5 text-grey-7">Страница не найдена</p>
      <q-btn color="primary" label="На главную" to="/" class="q-mt-md" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorNotFound'
});
</script>
