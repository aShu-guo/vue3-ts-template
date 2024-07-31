import { Ref } from 'vue';
import { getEl } from '@/common/utils/dom-helper.ts';
import { Map, View } from 'ol';
import { defaults } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import { MapOptions } from 'ol/Map';
import { getAMapXYZLayer, getTMapWMTSLayer } from '@/common/gis/layers/getLayer.ts';

const useMap = (
  container: HTMLElement | Ref<HTMLElement | undefined> | string,
  options?: Omit<MapOptions, 'layers' | 'view'>,
  tileType: 'TMap' | 'AMap' = 'TMap',
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
        layers:
          tileType === 'TMap'
            ? [getTMapWMTSLayer('img_w', 'EPSG:3857'), getTMapWMTSLayer('cia_w', 'EPSG:3857')]
            : getAMapXYZLayer('img'),
        view: new View({
          center: fromLonLat([120.004686, 30.297546]),
          zoom: 11,
          maxZoom: 18,
          minZoom: 8,
        }),
        controls: defaults({ attribution: false, zoom: false, rotate: false }).extend([]),
        ...options,
      });
    }
  };

  return { map };
};

export default useMap;
