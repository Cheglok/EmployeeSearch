import { defineStore } from "pinia";
import { api } from "@/services/api";
import axios from "axios";
import { handleAxiosError } from "@/helpers/handleAxiosError";
import { Employee } from "@/typespaces/types";

interface State {
    employees: Employee[];
    abortController: AbortController | null;
    loading: boolean;
    currentEmployee: Employee | null;
    error: string | null;
}

export const useEmployeeStore = defineStore("employee", {
    state: (): State => ({
        employees: [],
        abortController: null,
        currentEmployee: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchEmployees(payload: string) {
            if (this.abortController) {
                this.abortController?.abort();
            }
            this.abortController = new AbortController();

            if (!payload) {
                return;
            }

            const fragments = payload
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);
            const ids = fragments.filter((item) => /^\d+$/.test(item));
            const usernames = fragments.filter((item) => !/^\d+$/.test(item));

            const idsQuery = ids.map((item) => `id=${item}`).join("&");
            const usernamesQuery = usernames.map((item) => `username=${item}`).join("&");

            try {
                this.loading = true;

                const requests = [];
                if (ids.length > 0) {
                    requests.push(
                        api.get(`https://jsonplaceholder.typicode.com/users?${idsQuery}`, {
                            signal: this.abortController.signal,
                        })
                    );
                }
                if (usernames.length > 0) {
                    requests.push(
                        api.get(`https://jsonplaceholder.typicode.com/users?${usernamesQuery}`, {
                            signal: this.abortController.signal,
                        })
                    );
                }
                const responses = await Promise.all(requests);
                this.employees = responses.flatMap((item) => item.data);

                this.abortController = null;
            } catch (e) {
                if (!axios.isCancel(e)) {
                    this.error = handleAxiosError(e);
                }
            } finally {
                this.loading = false;
            }
        },
        resetEmployees() {
            this.employees = [];
            this.currentEmployee = null;
        },
        resetError() {
            this.error = null;
        },
    },
});
