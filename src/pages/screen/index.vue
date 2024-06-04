<template>
  <div class="flex-center font-size-100px">hello world</div>
</template>

<script setup lang="ts">
import '@/common/utils/flexible';
import dayjs from 'dayjs';

defineOptions({ name: 'Screen' });

console.log(dayjs().add(1, 'day').endOf('day').valueOf() / 1000);
</script>

<style scoped></style>
