import { get as getProjection } from 'ol/proj';
import { getTopLeft, getWidth } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import { WMTS } from 'ol/source';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

const getWMTSLayer = (
  type:
    | 'img_c'
    | 'cia_c'
    | 'img_w'
    | 'cia_w'
    | 'vec_w'
    | 'cva_w'
    | 'vec_c'
    | 'cva_c'
    | 'ter_c'
    | 'cta_c'
    | 'ter_w'
    | 'cta_w',
  proj: 'EPSG:3857' | 'EPSG:4326',
  opacity: number = 1,
  token: string = import.meta.env.VITE_TDT_TOKEN,
) => {
  const projection = getProjection(proj);

  const projectionExtent = projection!.getExtent();
  const size = getWidth(projectionExtent) / 256;
  const resolutions = new Array(19);
  const matrixIds = new Array(19);
  for (let z = 1; z < 19; ++z) {
    // generate resolutions and matrixIds arrays for this WMTS
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z;
  }

  return new TileLayer({
    opacity,
    source: new WMTS({
      attributions: 'Tiles © <a href="http://www.tianditu.com/service/info.html?sid=5292&type=info">天地图</a>',
      url: `http://t${Math.round(Math.random() * 7)}.tianditu.com/${type}/wmts?tk=${token}`,
      layer: type.slice(0, 3),
      matrixSet: type.substring(4),
      format: 'tiles',
      projection: projection!,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions: resolutions,
        matrixIds: matrixIds,
      }),
      style: 'default',
    }),
  });
};

export default getWMTSLayer;
