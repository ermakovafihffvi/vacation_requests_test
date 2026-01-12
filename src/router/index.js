import MainCover from '@/components/layout/MainCover.vue';
import RequestorPage from '@/views/RequestorPage.vue';
import StartPage from '@/views/StartPage.vue';
import ValidatorPage from '@/views/ValidatorPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'start',
            component: StartPage,
        },
        {
            path: '/my-requests/:userId',
            name: 'my-requests',
            component: RequestorPage,
            meta: {
                layout: MainCover,
            },
        },
        {
            path: '/requests/',
            name: 'requests',
            component: ValidatorPage,
            meta: {
                layout: MainCover,
            },
        },
    ],
});

export default router;
