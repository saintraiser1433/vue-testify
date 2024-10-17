<template>
    <BaseList link="Home" title="Dashboard">
        <template #icon>
            <i-lucide-home class="text-center" />
        </template>
    </BaseList>
    <BaseList link="Examinee" title="Examinee">
        <template #icon>
            <i-fluent-hat-graduation-12-regular class="text-center" />
        </template>
    </BaseList>
    <BaseList link="Deans" title="Deans">
        <template #icon>
            <i-eos-icons-master-outlined class="text-center" />
        </template>
    </BaseList>
    <BaseList link="Department" title="Department">
        <template #icon>
            <i-gala-book class="text-center" />
        </template>
    </BaseList>
    <BaseList link="Course" title="Course">
        <template #icon>
            <i-gala-book class="text-center" />
        </template>
    </BaseList>
    <BaseList link="Exam" title="Exam">
        <template #icon>
            <i-gala-book class="text-center" />
        </template>
    </BaseList>
    <BaseList link="Rankings" title="Ranking">
        <template #icon>
            <i-ph-ranking class="text-center" />
        </template>
    </BaseList>
    <BaseCollapsible title="Settings" :children="settingsData">
        <template #icon>
            <i-ant-design-setting-outlined class="text-center" />
        </template>
    </BaseCollapsible>
</template>
<script setup>
</script>