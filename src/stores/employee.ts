import { defineStore } from "pinia";

interface State {
    employees: string[];
}

export const useEmployeeStore = defineStore("employee", {
    state: (): State => ({
        employees: [],
    }),
    actions: {},
});
