import { Ref } from 'vue';
import { getEl } from '@/common/utils/dom-helper.ts';
import { Map, View } from 'ol';
import { defaults } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import { MapOptions } from 'ol/Map';
import getWMTSLayer from '@components/OlMap/helper/getWMTSLayer.ts';

const useMap = (
  container: HTMLElement | Ref<HTMLElement | undefined> | string,
  options: MapOptions = {
    controls: defaults({ attribution: false, zoom: false, rotate: false }).extend([]),
    layers: [getWMTSLayer('img_w', 'EPSG:3857'), getWMTSLayer('cia_w', 'EPSG:3857')],
    view: new View({
      center: fromLonLat([120.004686, 30.297546]),
      zoom: 11,
      maxZoom: 18,
      minZoom: 8,
    }),
  },
) => {
  const map = shallowRef<Map>();

  onMounted(() => {
    initMap();
  });

  const initMap = () => {
    const el = getEl(container);
    if (el) {
      map.value = new Map({
        target: el as HTMLElement,
        ...options,
      });
    }
  };

  return { map };
};

export default useMap;
