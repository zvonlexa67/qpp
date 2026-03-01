<template>
  <q-page padding>
    <div class="row justify-between items-center q-mb-md">
      <h4 class="text-h5">Пользователи</h4>
      <q-btn color="primary" label="Добавить" icon="add" @click="showDialog = true" />
    </div>

    <q-table
      :rows="users"
      :columns="columns"
      row-key="id"
      :loading="loading"
      flat
      bordered
    >
      <template v-slot:body-cell-is_active="props">
        <q-td :props="props">
          <q-badge :color="props.value ? 'positive' : 'negative'">
            {{ props.value ? 'Активен' : 'Не активен' }}
          </q-badge>
        </q-td>
      </template>
      
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat dense color="primary" icon="edit" @click="editUser(props.row)" />
          <q-btn flat dense color="negative" icon="delete" @click="deleteUser(props.row)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showDialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ editMode ? 'Редактировать' : 'Новый пользователь' }}</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="submitUser">
            <q-input
              v-model="formData.email"
              label="Email"
              type="email"
              outlined
              :rules="[val => !!val || 'Email обязателен', val => /.+@.+\..+/.test(val) || 'Некорректный email']"
            />
            
            <q-input
              v-model="formData.username"
              label="Имя пользователя"
              outlined
              :rules="[val => !!val || 'Имя обязательно']"
            />
            
            <q-input
              v-if="!editMode"
              v-model="formData.password"
              label="Пароль"
              type="password"
              outlined
              :rules="[val => !!val || 'Пароль обязателен', val => val.length >= 6 || 'Минимум 6 символов']"
            />

            <div class="q-mt-md">
              <q-btn type="submit" color="primary" label="Сохранить" />
              <q-btn flat label="Отмена" v-close-popup class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

interface User {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  created_at: string;
}

export default defineComponent({
  name: 'UsersPage',

  setup() {
    const $q = useQuasar();
    const users = ref<User[]>([]);
    const loading = ref(false);
    const showDialog = ref(false);
    const editMode = ref(false);
    const editingUser = ref<User | null>(null);
    
    const formData = ref({
      email: '',
      username: '',
      password: ''
    });

    const columns = [
      { name: 'id', label: 'ID', field: 'id', align: 'left' as const },
      { name: 'email', label: 'Email', field: 'email', align: 'left' as const },
      { name: 'username', label: 'Имя', field: 'username', align: 'left' as const },
      { name: 'is_active', label: 'Статус', field: 'is_active', align: 'center' as const },
      { name: 'created_at', label: 'Создан', field: 'created_at', align: 'left' as const },
      { name: 'actions', label: 'Действия', field: 'actions', align: 'center' as const }
    ];

    const fetchUsers = async () => {
      loading.value = true;
      try {
        const response = await api.get<User[]>('/users');
        users.value = response.data;
      } catch (err: any) {
        $q.notify({
          color: 'negative',
          message: 'Ошибка загрузки пользователей',
          icon: 'error'
        });
      } finally {
        loading.value = false;
      }
    };

    const submitUser = async () => {
      try {
        if (editMode.value && editingUser.value) {
          await api.put(`/users/${editingUser.value.id}`, {
            email: formData.value.email,
            username: formData.value.username
          });
          $q.notify({
            color: 'positive',
            message: 'Пользователь обновлен',
            icon: 'check'
          });
        } else {
          await api.post('/users', formData.value);
          $q.notify({
            color: 'positive',
            message: 'Пользователь создан',
            icon: 'check'
          });
        }
        
        showDialog.value = false;
        resetForm();
        fetchUsers();
      } catch (err: any) {
        $q.notify({
          color: 'negative',
          message: err.response?.data?.detail || 'Ошибка сохранения',
          icon: 'error'
        });
      }
    };

    const editUser = (user: User) => {
      editMode.value = true;
      editingUser.value = user;
      formData.value = {
        email: user.email,
        username: user.username,
        password: ''
      };
      showDialog.value = true;
    };

    const deleteUser = (user: User) => {
      $q.dialog({
        title: 'Подтверждение',
        message: `Удалить пользователя ${user.username}?`,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          await api.delete(`/users/${user.id}`);
          $q.notify({
            color: 'positive',
            message: 'Пользователь удален',
            icon: 'check'
          });
          fetchUsers();
        } catch (err: any) {
          $q.notify({
            color: 'negative',
            message: 'Ошибка удаления',
            icon: 'error'
          });
        }
      });
    };

    const resetForm = () => {
      formData.value = { email: '', username: '', password: '' };
      editMode.value = false;
      editingUser.value = null;
    };

    onMounted(fetchUsers);

    return {
      users,
      loading,
      showDialog,
      editMode,
      formData,
      columns,
      submitUser,
      editUser,
      deleteUser
    };
  }
});
</script>
