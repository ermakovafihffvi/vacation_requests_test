<template>
    <div class="flex flex-row gap-x-4">
        <Listbox
            v-model="selectedUser"
            :options="users"
            optionLabel="name"
            class="w-full md:w-56"
        />

        <Panel v-if="selectedUser?.id">
            <RequestsTable :userId="selectedUser.id" />
        </Panel>
    </div>
</template>

<script setup>
import Panel from 'primevue/panel';
import RequestsTable from '@/components/RequestsTable.vue';
import Listbox from 'primevue/listbox';
import { useUsersStore } from '@/stores/users';
import { onMounted, ref } from 'vue';

const usersStore = useUsersStore();

const users = usersStore.getRequesters();
const selectedUser = ref();

onMounted(async () => {
    if (!usersStore.users.length) {
        await usersStore.loadUsers();
    }
});
</script>
