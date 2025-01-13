<template>
    <div class="container">
        <MainHeader />
        <main class="main-content">
            <MainSidebar />
            <EmployeeDetails />
        </main>
    </div>
</template>

<script setup lang="ts">
import MainHeader from "@/components/MainHeader.vue";
import MainSidebar from "@/components/MainSidebar.vue";
import EmployeeDetails from "@/components/EmployeeDetails.vue";
</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 1px;
}
.main-content {
    display: grid;
    grid-template-columns: 290px auto;
    margin: 0 50px 58px;
    flex-grow: 1;
    box-shadow: var(--small-shadow);
    background-color: #fdfdfd;
    border-radius: 10px;
}
</style>
