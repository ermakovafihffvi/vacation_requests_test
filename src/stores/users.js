import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/api';

export const useUsersStore = defineStore('users', () => {
    const users = ref([]);

    //TO DO - load roles from the backend?
    const ROLES = {
        1: 'Requestor',
        Requestor: 1,

        2: 'Validator',
        Validator: 2,
    };

    const getRequesters = () =>
        computed(() => users.value.filter((item) => item.role_id == ROLES['Requestor']));

    const loadUsers = async function () {
        const response = await api.loadUsers();
        users.value = response.data;
    };

    return {
        users,
        ROLES,
        getRequesters,
        loadUsers,
    };
});
