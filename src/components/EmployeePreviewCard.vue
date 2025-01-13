<template>
    <div :class="['employee-preview', { 'employee-preview_active': isActive }]">
        <div class="employee-preview__photo-container"></div>
        <div class="employee-preview__info info">
            <span class="info__username">{{ employee.username }}</span>
            <span class="info__email">{{ employee.email }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEmployeeStore } from "@/stores/employee";
import { Employee } from "@/typespaces/types";

const employeeStore = useEmployeeStore();

const props = defineProps<{ employee: Employee }>();

const isActive = computed(() => {
    return props.employee.id === employeeStore.currentEmployee?.id;
});
</script>

<style scoped lang="scss">
.employee-preview {
    min-height: 70px;
    max-width: 241px;
    box-shadow: var(--small-shadow);
    background-color: white;
    display: grid;
    grid-template-columns: 70px auto;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid white;
    &_active {
        box-shadow: none;
        border-color: var(--color-light-gray);
        & .info {
            background-color: var(--color-light-gray);
        }
    }
}
.employee-preview__photo-container {
    background-image: url("@/assets/images/image-placeholder.png");
    background-position: center;
    background-size: cover;
    width: 70px;
    height: 70px;
}
.info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    word-break: break-all;
    padding: 15px 13px;
    border-left: 1px solid var(--color-light-gray);
    &__username {
        font-weight: 600;
        color: var(--color-font-secondary);
    }
    &__email {
        color: var(--color-font-thirdly);
    }
}
</style>
