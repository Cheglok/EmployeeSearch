<template>
    <div class="sidebar">
        <h2 class="sidebar-heading sidebar-heading__search">Поиск сотрудников</h2>
        <UiInput :placeholder="'Введите Id или имя'" v-model:value="inputValue" class="sidebar__input" />
        <h2 class="sidebar-heading sidebar-heading__results">Результаты</h2>
        <UiLoader v-if="employeeStore.loading" />
        <ul v-else-if="employeeStore.employees.length" class="sidebar__previews-list">
            <li v-for="employee in employeeStore.employees" :key="employee.id">
                <EmployeePreviewCard :employee="employee" @click="employeeStore.currentEmployee = employee" />
            </li>
        </ul>
        <template v-else>
            <span class="sidebar__no-data">{{ inputValue ? "Ничего не найдено" : "Начните поиск" }}</span>
        </template>
    </div>
</template>

<script setup lang="ts">
import EmployeePreviewCard from "@/components/EmployeePreviewCard.vue";
import UiInput from "@/components/ui/UiInput.vue";
import { debounce } from "@/helpers/debounce";
import { useEmployeeStore } from "@/stores/employee";
import UiLoader from "@/components/ui/UiLoader.vue";
import { ref, watch } from "vue";

const employeeStore = useEmployeeStore();

const inputValue = ref("");

watch(inputValue, (newValue) => {
    handleInput(newValue);
});

const handleInput = debounce((value: string) => {
    employeeStore.fetchEmployees(value);
}, 500);
</script>

<style scoped lang="scss">
.sidebar {
    padding: 27px 31px 20px 20px;
    border-right: 1px solid var(--color-light-gray);
}
.sidebar-heading {
    font-weight: 600;
    margin: 0;
    font-size: 16px;
    &__search {
        margin-bottom: 22px;
    }
    &__results {
        margin-bottom: 10px;
    }
}
.sidebar__input {
    width: 240px;
    height: 46px;
    border-radius: 8px;
    border: 1.5px solid #e9ecef;
    padding: 16px;
    margin-bottom: 22px;
}
.sidebar__previews-list {
    padding: 0;
    list-style: none;
    display: grid;
    gap: 18px;
}
.sidebar__no-data {
    color: var(--color-font-thirdly);
}
</style>
