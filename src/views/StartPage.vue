<template>
    <header>
        <div class="wrapper">
            <h1>Who are you?</h1>
            <div class="card flex justify-center" v-if="loading">
                <ProgressSpinner />
            </div>
            <div v-else>
                <p v-for="user in users" :key="user.id">
                    <router-link
                        :to="{
                            name:
                                user.role_id === usersStore.ROLES['Requestor']
                                    ? 'my-requests'
                                    : 'requests',
                            params: { userId: user.id },
                        }"
                    >
                        {{ user.name }}&nbsp;-&nbsp;<strong>{{ user.role_name }}</strong>
                    </router-link>
                </p>
            </div>
        </div>
    </header>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useUsersStore } from '@/stores/users';
import ProgressSpinner from 'primevue/progressspinner';

const loading = ref(true);
const users = computed(() => usersStore.users ?? []);
const usersStore = useUsersStore();

onMounted(async () => {
    loading.value = true;
    await usersStore.loadUsers();
    loading.value = false;
});
</script>
