<template>
  <div class="flex-center font-size-100px">hello world</div>
</template>

<script setup lang="ts">
import screenAPIs from '@/apis/Screen.ts';
import { get } from '@/common/http';
import '@/common/utils/flexible';

defineOptions({ name: 'Screen' });

const uavCount = reactive({ offline: 0, online: 0 });

onMounted(async () => {
  const { offline, online } = await get(
    screenAPIs.uavOnlineCount,
    {},
    { unAuth: true, baseURL: import.meta.env.VITE_API_HOST1 },
  );
  uavCount.offline = offline;
  uavCount.online = online;
});
</script>

<style scoped></style>
