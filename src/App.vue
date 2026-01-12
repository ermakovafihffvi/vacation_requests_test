<script setup>
import { RouterView } from 'vue-router';
import Toast from 'primevue/toast';
</script>

<template>
    <Toast />
    <component :is="$route.meta.layout || 'div'">
        <RouterView />
    </component>
</template>
