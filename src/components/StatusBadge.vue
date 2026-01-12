<template>
    <Badge :value="props.status" :severity="severity" />
</template>

<script setup>
import { useVacationsStore } from '@/stores/vacations';
import Badge from 'primevue/badge';
import { computed } from 'vue';

const vacationsStore = useVacationsStore();
const props = defineProps(['status']);

const severity = computed(() => {
    switch (vacationsStore.STATUS[props.status]) {
        case vacationsStore.STATUS['REJECTED']:
            return 'danger';
        case vacationsStore.STATUS['APPROVED']:
            return 'success';
        default:
            return 'info';
    }
});
</script>
