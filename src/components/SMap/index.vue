<template>
  <div class="flex-center">
    <div id="cesium-container" ref="viewContainer" :style="style"></div>
  </div>
</template>

<script setup lang="ts">
import 'cesium/Build/Cesium/Widgets/widgets.css';
import useViewer from '@components/SMap/hooks/useViewer.ts';
import { SMapProps } from '@components/SMap/helper/types.ts';
import { Cesium3DTileset, Cesium3DTileStyle } from 'cesium';
import HZ3Dtiles from '@assets/3dtiles/hangzhou/tileset.json?url';

defineOptions({ name: 'SMap' });

const props = withDefaults(defineProps<SMapProps>(), {
  width: '100vw',
  height: '100vh',
});

const style = computed(() => ({
  width: props.width,
  height: props.height,
}));

const viewContainer = ref<HTMLElement>();
const { viewer } = useViewer(viewContainer);
provide('viewer', viewer);
onMounted(async () => {
  const tileset = await Cesium3DTileset.fromUrl(HZ3Dtiles as string);
  tileset.style = new Cesium3DTileStyle({
    show: true,
    // color: "color('rgba(0,0,255,1)')",
  });
  viewer.value?.scene.primitives.add(tileset);
  viewer.value?.zoomTo(tileset);
});
</script>

<style scoped></style>
