<template>
  <div class="olmap-box">
    <div ref="olmap" :style="style"></div>
  </div>
</template>

<script setup lang="ts">
/**
 * 基于Openlayers的地图组件
 */
import useMap from '@components/OlMap/hooks/useMap.ts';
import { ref } from 'vue';
import { OlMapProps } from '@components/OlMap/helper/types.ts';

defineOptions({ name: 'OlMap' });
const props = withDefaults(defineProps<OlMapProps>(), {
  width: '100vw',
  height: '100vh',
});

const style = computed(() => ({
  width: props.width,
  height: props.height,
}));

const olmap = ref();
const { map } = useMap(olmap, {}, 'AMap');
console.log('>>>map:', map);
</script>

<style scoped></style>
