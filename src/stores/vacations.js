import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/api';

export const useVacationsStore = defineStore('vacations', () => {
    const vacations = ref([]);

    const STATUS = {
        1: 'NEW',
        NEW: 1,

        2: 'APPROVED',
        APPROVED: 2,

        3: 'REJECTED',
        REJECTED: 3,
    };

    const getVacationsByUserId = (userId) =>
        computed(() => vacations.value.filter((item) => item.user_id == userId));

    const addVacation = (data) => vacations.value.push({ ...data });

    const loadVacationsByUserId = async (userId, sort) => {
        const response = await api.loadVacations(userId, sort);
        vacations.value = vacations.value.filter((item) => item.user_id != userId);
        vacations.value.push(...response.data);
    };

    const handleVacationRequest = async (id, status, comment = '') => {
        await api.handleVacationRequest(id, { status: status, comment: comment });
        vacations.value = vacations.value.map((item) => {
            if (item.id == id) {
                item.status = status;
                item.comment = comment;
                item.updated_at = new Date();
            }
            return item;
        });
    };

    return {
        vacations,
        STATUS,
        addVacation,
        getVacationsByUserId,
        loadVacationsByUserId,
        handleVacationRequest,
    };
});
