<template>
    <div class="employee">
        <article v-if="employee" class="employee-content">
            <div class="employee__photo-container"></div>
            <div class="employee__info info">
                <b class="info__name">{{ employee.name }}</b>
                <span class="info__email"><b>email:</b> {{ employee.email }}</span>
                <span class="info__phone"><b>phone:</b> {{ employee.phone }}</span>
                <span class="info__about-heading">О себе:</span>
                <span class="info__about"
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.</span
                >
            </div>
        </article>
        <span v-else class="no-employee">Выберите сотрудника, чтобы посмотреть его профиль</span>
    </div>
</template>

<script setup lang="ts">
import { useEmployeeStore } from "@/stores/employee";
import { computed, ComputedRef } from "vue";
import { Employee } from "@/typespaces/types";

const employeeStore = useEmployeeStore();

const employee: ComputedRef<Employee | null> = computed(() => {
    return employeeStore.currentEmployee;
});
</script>

<style scoped lang="scss">
.employee {
    padding: 30px 21px;
}
.employee-content {
    display: grid;
    gap: 20px;
    @media screen and (min-width: 800px) {
        grid-template-columns: 424fr 439fr;
        align-items: flex-start;
        gap: 6.2%;
    }
}
.employee__photo-container {
    background-image: url("@/assets/images/image-placeholder.png");
    background-position: center;
    background-size: cover;
    padding-top: 67.5%;
    border: 1px solid var(--color-light-gray);
}
.info {
    display: flex;
    flex-direction: column;
}
.info__name {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
}
.info__email,
.info__phone {
    color: var(--color-font-thirdly);
    & b {
        color: var(--color-font-secondary);
    }
}
.info__email {
    margin-bottom: 10px;
}
.info__phone {
    margin-bottom: 20px;
}
.info__about-heading {
    color: var(--color-font-secondary);
    margin-bottom: 25px;
    font-size: 16px;
    font-weight: 600;
}
.info__about {
    color: var(--color-font-thirdly);
}
.no-employee {
    display: flex;
    align-items: center;
    height: 100%;
    text-align: center;
    color: var(--color-font-thirdly);
}
</style>
