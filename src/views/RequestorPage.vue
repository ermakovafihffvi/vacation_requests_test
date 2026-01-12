<template>
    <div class="flex flex-row gap-x-4">
        <Panel>
            <DataTable v-model:expandedRows="expandedRows" :value="vacations" dataKey="id">
                <Column expander style="width: 5rem" />
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
                <Column field="status" header="Status">
                    <template #body="slotProps">
                        <StatusBadge :status="vacationsStore.STATUS[slotProps.data.status]" />
                    </template>
                </Column>

                <template #expansion="slotProps">
                    <div class="p-4">
                        <p>Reason:&nbsp;{{ slotProps.data.reason }}</p>
                        <p>Comment:&nbsp;{{ slotProps.data.comment }}</p>
                        <p>
                            Created&nbsp;at:&nbsp;{{
                                useDateFormat(slotProps.data.created_at, 'YYYY-MM-DD HH:mm')
                            }}
                        </p>
                        <p>
                            Updated&nbsp;at:&nbsp;{{
                                useDateFormat(slotProps.data.updated_at, 'YYYY-MM-DD HH:mm')
                            }}
                        </p>
                    </div>
                </template>

                <template #empty>
                    <div class="flex justify-center">No data</div>
                </template>
            </DataTable>
        </Panel>

        <Panel>
            <DatePicker
                v-model="dates"
                showIcon
                selectionMode="range"
                :manualInput="false"
                placeholder="Vacation Dates"
                class="mb-4"
            />
            <IftaLabel>
                <Textarea v-model="reason" name="reason" rows="5" cols="30" autoResize />
                <label for="reason">Reason</label>
            </IftaLabel>
            <Button label="Submit" :onClick="submitVacationRequest" />
        </Panel>
    </div>
</template>

<script setup>
import Panel from 'primevue/panel';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Textarea from 'primevue/textarea';
import IftaLabel from 'primevue/iftalabel';
import { computed, onMounted, ref } from 'vue';
import api from '@/api';
import { useVacationsStore } from '@/stores/vacations';
import { useRoute } from 'vue-router';
import { useDateFormat } from '@vueuse/core';
import StatusBadge from '@/components/StatusBadge.vue';

const route = useRoute();
const toast = useToast();
const vacationsStore = useVacationsStore();

const userId = computed(() => route.params.userId);
const vacations = vacationsStore.getVacationsByUserId(userId.value);
const expandedRows = ref([]);

const dates = ref();
const reason = ref('');

const submitVacationRequest = async () => {
    if (dates.value && reason.value) {
        const data = {
            start_date: useDateFormat(dates.value[0], 'YYYY-MM-DD').value,
            end_date: useDateFormat(dates.value[1], 'YYYY-MM-DD').value,
            reason: reason.value,
            user_id: Number(userId.value),
        };
        try {
            await api.sendVacationRequest(data);
            toast.add({ severity: 'success', summary: 'Vacation request was sent', life: 1000 });
            vacationsStore.addVacation({ ...data, status: vacationsStore.STATUS['NEW'] });
            reason.value = '';
            dates.value = [];
        } catch (error) {
            console.error(error);
            toast.add({ severity: 'danger', summary: 'Error', life: 1000 });
        }
    } else {
        toast.add({ severity: 'info', summary: 'Please, fill all fields', life: 1000 });
    }
};

onMounted(async () => {
    await vacationsStore.loadVacationsByUserId(userId.value);
});
</script>
