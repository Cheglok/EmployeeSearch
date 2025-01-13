import axios from "axios";

export function handleAxiosError(error: unknown): string {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            // Сервер вернул ответ с кодом ошибки
            return `Ошибка: ${error.response.status} - ${error.response.statusText}\nСообщение: ${error.response.data?.message || "Неизвестная ошибка"}`;
        } else if (error.request) {
            // Запрос был отправлен, но ответа не получено
            return "Ошибка: Сервер не отвечает. Проверьте подключение к интернету.";
        } else {
            // Ошибка на этапе настройки запроса
            return `Ошибка запроса: ${error.message}`;
        }
    } else {
        // Ошибка не связана с Axios
        return `Неизвестная ошибка: ${String(error)}`;
    }
}
