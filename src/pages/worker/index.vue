<template>
  <div>111</div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Index1' });

const worker = new SharedWorker(new URL('./worker.js', import.meta.url), { type: 'module' });

worker.port.onmessage = (event) => {
  console.log('>>>event:', event);
};
worker.port.start();

worker.port.postMessage({ type: 'init', data: { key: 'index.vue' } });

const count = ref(0);

const { pause } = useRafFn(
  () => {
    worker.port.postMessage({ type: 'broadcast', data: { key: 'index2.vue', data: count.value++ } });
  },
  {
    immediate: true,
    fpsLimit: 1,
  },
);

onUnmounted(() => {
  worker.port.postMessage({ type: 'unmounted', data: { key: 'index.vue' } });
  pause();
});
</script>

<style scoped></style>
