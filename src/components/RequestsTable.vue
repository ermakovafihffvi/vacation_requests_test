<template>
    <DataTable :value="sortedVacations" tableStyle="min-width: 50rem" dataKey="id">
        <Column field="start_date" header="Start Data">
            <template #body="slotProps">
                {{ useDateFormat(slotProps.data.start_date, 'YYYY-MM-DD') }}
            </template>
        </Column>
        <Column field="end_date" header="End Date">
            <template #body="slotProps">
                {{ useDateFormat(slotProps.data.end_date, 'YYYY-MM-DD') }}
            </template>
        </Column>
        <Column field="reason" header="Reason">
            <template #body="slotProps">
                <p>{{ slotProps.data.reason }}</p>
            </template>
        </Column>
        <Column field="status" header="Status">
            <template #body="slotProps">
                <StatusBadge :status="vacationsStore.STATUS[slotProps.data.status]" />
            </template>
        </Column>
        <Column field="Action" header="">
            <template #body="slotProps">
                <Button
                    :onClick="() => acceptVacation(slotProps.data.id)"
                    label="Accept"
                    severity="success"
                />
                <Button
                    :onClick="() => showConfirmRejection(slotProps.data.id)"
                    label="Reject"
                    class="ml-2"
                    severity="danger"
                />
            </template>
        </Column>

        <template #empty>
            <div class="flex justify-center">No data</div>
        </template>
    </DataTable>

    <Dialog
        v-model:visible="showDialog"
        modal
        v-on:after-hide="clearDialog"
        header="Reject vacation request"
        :style="{ width: '25rem' }"
    >
        <IftaLabel>
            <Textarea v-model="comment" name="comment" rows="5" autoResize class="w-full" />
            <label for="reason">Leave a comment</label>
        </IftaLabel>

        <div class="flex justify-end gap-2 mt-3">
            <Button
                type="button"
                label="Cancel"
                severity="secondary"
                @click="showDialog = false"
            ></Button>
            <Button type="button" label="Confirm" severity="info" @click="rejectVacation"></Button>
        </div>
    </Dialog>
</template>

<script setup>
import IftaLabel from 'primevue/iftalabel';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useVacationsStore } from '@/stores/vacations';
import { useDateFormat } from '@vueuse/core';
import Button from 'primevue/button';
import { computed, ref, watch } from 'vue';
import StatusBadge from './StatusBadge.vue';
import { useToast } from 'primevue';

const vacationsStore = useVacationsStore();
const props = defineProps(['userId']);
const toast = useToast();

const userId = computed(() => props.userId);
const showDialog = ref(false);
const comment = ref('');
const selectedVacationId = ref();

const sortedVacations = ref([]);

const acceptVacation = async (vacationId) => {
    try {
        await vacationsStore.handleVacationRequest(vacationId, vacationsStore.STATUS['APPROVED']);
        toast.add({ severity: 'success', summary: 'Vacation approved', life: 1000 });
    } catch ($e) {
        console.error($e);
        toast.add({ severity: 'danger', summary: 'Error', life: 1000 });
    }
};

const showConfirmRejection = (vacationId) => {
    showDialog.value = true;
    selectedVacationId.value = vacationId;
};

const rejectVacation = async () => {
    try {
        await vacationsStore.handleVacationRequest(
            selectedVacationId.value,
            vacationsStore.STATUS['REJECTED'],
            comment.value,
        );
        toast.add({ severity: 'success', summary: 'Vacation rejected', life: 1000 });
    } catch ($e) {
        console.error($e);
        toast.add({ severity: 'danger', summary: 'Error', life: 1000 });
    }
    showDialog.value = false;
};

const clearDialog = () => {
    comment.value = '';
    selectedVacationId.value = null;
};

const sort = {
    direction: 'asc',
    param: 'status',
};
watch(
    userId,
    async () => {
        await vacationsStore.loadVacationsByUserId(userId.value, sort);
        sortedVacations.value = vacationsStore.getVacationsByUserId(userId.value).value;
    },
    {
        immediate: true,
    },
);
</script>
