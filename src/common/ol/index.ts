import { transform } from 'ol/proj';

/**
 * webgis的几种常见标准
 * EPSG:4326：wgs84 常用GPS设备上
 * EPSG:3857：墨卡托投影 从3D投影到2D
 * GCJ-02：火星坐标系，国测局02标准，在84的基础上进行一次加密，天地图、高德地图均使用这个标准
 */
const PI = Math.PI;
const a = 6378245.0;
const ee = 0.006693421622965943;

const transformlat = (lon: number, lat: number) => {
  let ret = -100.0 + 2.0 * lon + 3.0 * lat + 0.2 * lat * lat + 0.1 * lon * lat + 0.2 * Math.sqrt(Math.abs(lon));
  ret += ((20.0 * Math.sin(6.0 * lon * PI) + 20.0 * Math.sin(2.0 * lon * PI)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) / 3.0;
  ret += ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) * 2.0) / 3.0;
  return ret;
};

const transformlon = (lon: number, lat: number) => {
  let ret = 300.0 + lon + 2.0 * lat + 0.1 * lon * lon + 0.1 * lon * lat + 0.1 * Math.sqrt(Math.abs(lon));
  ret += ((20.0 * Math.sin(6.0 * lon * PI) + 20.0 * Math.sin(2.0 * lon * PI)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(lon * PI) + 40.0 * Math.sin((lon / 3.0) * PI)) * 2.0) / 3.0;
  ret += ((150.0 * Math.sin((lon / 12.0) * PI) + 300.0 * Math.sin((lon / 30.0) * PI)) * 2.0) / 3.0;
  return ret;
};

/**
 * 经纬度是否在国境内
 * @param lon 经度
 * @param lat 纬度
 */
const out_of_china = (lon: number, lat: number) => {
  return lon < 72.004 || lon > 137.8347 || lat < 0.8293 || lat > 55.8271 || false;
};

/**
 *
 * @param lon 经度
 * @param lat 纬度
 */
export const transform3857to4326 = (lon: number, lat: number) => {
  return transform([lon, lat], 'EPSG:3857', 'EPSG:4326');
};

export const transform4326to3857 = (lon: number, lat: number) => {
  return transform([lon, lat], 'EPSG:4326', 'EPSG:3857');
};

/**
 * 将gcj02标准下的经纬度转换为wgs84标准下的
 * 例如：将高德地图下的经纬度转换为openlayers下的经纬度坐标
 * @param lon
 * @param lat
 */
export const gcj02towgs84 = (lon: number, lat: number) => {
  if (out_of_china(lon, lat)) {
    return [lon, lat];
  } else {
    let dlat = transformlat(lon - 105.0, lat - 35.0);
    let dlon = transformlon(lon - 105.0, lat - 35.0);
    const radlat = (lat / 180.0) * PI;
    let magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    const sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
    dlon = (dlon * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
    const mglat = lat + dlat;
    const mglon = lon + dlon;
    return [lon * 2 - mglon, lat * 2 - mglat];
  }
};
