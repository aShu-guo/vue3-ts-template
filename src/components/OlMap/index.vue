<template>
  <div>
    <div class="w-1920px h-1080px" id="map"></div>
    <div v-if="uav.list.length > 0" class="markers-box absolute">
      <img
        v-for="item in uav.list"
        :key="item.uavNum"
        :src="item.uavNum === uav.item?.uavNum ? UavIconSelected : UavIcon"
        class="w-54px object-contain"
        :class="'marker-' + item.uavNum"
        @click="toggle(item)"
        alt=""
      />
    </div>

    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div v-if="uav.item" class="uav-info-box w-220px ma p-16px box-content absolute">
        <div class="flex flex-justify-between">
          <span class="color-#AABBBF font-size-13px lh-19px">机构名称：</span>
          <span class="color-#E2EEF1 font-size-13px lh-19px">{{ uav.item?.orgName }}</span>
        </div>
        <div class="flex flex-justify-between mt-11px">
          <span class="color-#AABBBF font-size-13px lh-19px">位置：</span>
          <span class="color-#E2EEF1 font-size-13px lh-19px"
            >{{ (uav.item?.longitude as number).toFixed(6) }}, {{ (uav.item?.latitude as number).toFixed(6) }}</span
          >
        </div>
        <div class="flex flex-justify-between mt-11px">
          <span class="color-#AABBBF font-size-13px lh-19px">海拔高度：</span>
          <span class="color-#E2EEF1 font-size-13px lh-19px">
            <span>{{ uav.item?.altitudeHeight }}</span>
            <span class="color-#AABBBF">m</span>
          </span>
        </div>
        <div class="flex flex-justify-between mt-11px">
          <span class="color-#AABBBF font-size-13px lh-19px">速度：</span>
          <span class="color-#E2EEF1 font-size-13px lh-19px">
            <span>{{ uav.item?.speed }}</span>
            <span class="color-#AABBBF">m/s</span>
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import useOl from '@/common/hooks/useOl.ts';
import { get } from '@/common/http';
import screenAPIs from '@/apis/Screen.ts';
// import data from './data.json';
import { Overlay } from 'ol';
import { transform4326to3857 } from '@/common/ol';
import UavIcon from '@/assets/imgs/screen/uav-icon.png';
import UavIconSelected from '@/assets/imgs/screen/uav-icon-select.png';

defineOptions({ name: 'OlMap' });

const { map } = useOl({ el: '#map' });
const uav = reactive<{ item: Record<string, unknown> | null; list: any[] }>({ item: null, list: [] });

const toggle = (item: any) => {
  if (uav.item) {
    uav.item = null;
  } else {
    uav.item = item;
    nextTick(() => {
      map.value?.addOverlay(
        new Overlay({
          element: document.querySelector('.uav-info-box') as HTMLElement,
          positioning: 'bottom-center',
          offset: [30, -50],
          stopEvent: true,
          position: transform4326to3857(item.longitude, item.latitude),
        }),
      );
    });
  }
};

useRafFn(
  async () => {
    const { data } = await get(screenAPIs.getFlyingListUav, {}, { unAuth: true });
    uav.list = data;

    uav.list.forEach((item) => {
      map.value?.addOverlay(
        new Overlay({
          element: document.querySelector(`.marker-${item.uavNum}`) as HTMLElement,
          positioning: 'bottom-center',
          offset: [0, 0],
          stopEvent: true,
          position: transform4326to3857(item.longitude, item.latitude),
        }),
      );
    });
  },
  { fpsLimit: 1 },
);
</script>

<style scoped>
.uav-info-box {
  background-image: url('@/assets/imgs/screen/bg/uav-info-bg.png');
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
