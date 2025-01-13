<template>
    <input :type="props.type" :placeholder="props.placeholder" :value="props.value" @input="handleInput" />
</template>

<script setup lang="ts">
const props = defineProps({
    placeholder: String,
    type: {
        type: String,
        default: "text",
        validator(value: string) {
            return ["text", "number", "radio", "checkbox"].includes(value);
        },
    },
    value: [String, Number],
});

const emit = defineEmits(["update:value"]);

function handleInput(event: Event) {
    emit("update:value", (event.target as HTMLInputElement).value);
}
</script>
