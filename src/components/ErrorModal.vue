<template>
    <Teleport to="body">
        <dialog aria-label="Ошибка" ref="dialog" class="error-modal">
            <div class="error-modal__content">
                {{ employeeStore.error }}
                <button class="error-modal__button" @click="closeError">ОК</button>
            </div>
        </dialog>
    </Teleport>
</template>

<script setup lang="ts">
import { useEmployeeStore } from "@/stores/employee";
import { computed, Ref, ref, watch } from "vue";
const employeeStore = useEmployeeStore();

const dialog: Ref<HTMLDialogElement | null> = ref(null);

const error = computed(() => {
    return employeeStore.error;
});

watch(error, (newValue) => {
    if (newValue) {
        (dialog.value as HTMLDialogElement).showModal();
    }
});
function closeError() {
    employeeStore.resetError();
    (dialog.value as HTMLDialogElement).close();
}
</script>

<style scoped lang="scss">
.error-modal {
    background: white;
    width: calc(100% - 50px);
    max-width: 580px;
    inset: 0;
    border: none;
    border-radius: 10px;
    padding: 20px;
    font-size: 16px;
    transition: transform 0.3s ease-in-out;
    position: fixed;
    &::backdrop {
        background-color: rgb(0 0 0 / 0.6);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
    }
}
.error-modal__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
}
.error-modal__button {
    font-size: 18px;
    padding: 10px 16px;
    border: 1px solid var(--color-light-gray);
    border-radius: 4px;
    color: var(--color-font-secondary);
}
</style>
