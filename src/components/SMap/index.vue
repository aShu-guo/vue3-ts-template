<template>
  <div class="flex-center">
    <div id="cesium-container" ref="viewContainer" :style="style"></div>
  </div>
</template>

<script setup lang="ts">
import 'cesium/Build/Cesium/Widgets/widgets.css';
import useViewer from '@components/SMap/hooks/useViewer.ts';
import { Props } from '@components/SMap/helper/types.ts';

defineOptions({ name: 'SMaq' });

const props = withDefaults(defineProps<Props>(), {
  width: '100vw',
  height: '100vh',
  tileType: 'tianditu',
});

const style = computed(() => ({
  width: props.width,
  height: props.height,
}));

const viewContainer = ref<HTMLElement>();
useViewer(viewContainer);
</script>

<style scoped></style>
