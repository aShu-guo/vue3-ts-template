<template>
  <div>222</div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Index2' });

const worker = new SharedWorker(new URL('./worker.js', import.meta.url), { type: 'module' });
worker.port.onmessage = (event) => {
  console.log('>>>event:', event);
};

worker.port.postMessage({ type: 'init', data: { key: 'index2.vue' } });
onUnmounted(() => {
  worker.port.postMessage({ type: 'unmounted', data: { key: 'index2.vue' } });
});
</script>

<style scoped></style>
