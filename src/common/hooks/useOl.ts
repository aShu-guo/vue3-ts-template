import { Tile } from 'ol/layer';
import { XYZ } from 'ol/source';
import { Collection, Map, View } from 'ol';
import { Control, defaults } from 'ol/control';
import { fromLonLat } from 'ol/proj';

interface UseOlOptions {
  el: string | HTMLElement;
  center?: [number, number];
  controls?: Collection<Control> | Control[];
  zoom?: number;
  maxZoom?: number;
  minZoom?: number;
}

const getTarget = (el: string | HTMLElement) => {
  if (typeof el === 'string') {
    return document.querySelector(el) as HTMLElement;
  } else {
    return el;
  }
};

const layer1 =
  import.meta.env.VITE_MAP_URL + '/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=199ab58f2998947886ce67cabe5e0e20';
const layer2 =
  import.meta.env.VITE_MAP_URL + '/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=199ab58f2998947886ce67cabe5e0e20';

/**
 * 使用该hook之前，约定已经将经纬度标准转换为84标准下
 * @param opts
 */

// 默认中心为杭州市余杭区
const _defaultCenter = [120.004686, 30.297546];

export default function useOl(opts: UseOlOptions) {
  const map = shallowRef<Map>();

  onMounted(() => {
    map.value = new Map({
      target: getTarget(opts.el),
      controls: opts.controls || defaults({ attribution: false, zoom: false, rotate: false }).extend([]),
      view: new View({
        ...(opts.center ? { center: fromLonLat(opts.center) } : { center: fromLonLat(_defaultCenter) }),
        zoom: opts.zoom || 12,
        maxZoom: opts.maxZoom || 18,
        minZoom: opts.minZoom || 8,
      }),

      layers: [
        new Tile({
          source: new XYZ({
            url: layer1,
          }),
        }),
        new Tile({
          source: new XYZ({
            url: layer2,
          }),
        }),
      ],
    });
  });

  return {
    map,
  };
}
