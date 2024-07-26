import { Cartesian2, Cartographic, Math as CesiumMath, WebMercatorProjection, WebMercatorTilingScheme } from 'cesium';
import { GCJ02ToWGS84, WGS84ToGCJ02 } from '@/common/transform/index.ts';

class GCJ02TilingScheme extends WebMercatorTilingScheme {
  constructor(options?: any) {
    super(options);
    const projection = new WebMercatorProjection();

    this._projection.project = function (cartographic: any, result: any) {
      result = WGS84ToGCJ02(CesiumMath.toDegrees(cartographic.longitude), CesiumMath.toDegrees(cartographic.latitude));
      result = projection.project(new Cartographic(CesiumMath.toRadians(result[0]), CesiumMath.toRadians(result[1])));
      return new Cartesian2(result.x, result.y);
    };
    this._projection.unproject = function (cartesian: any, result: any) {
      const cartographic = projection.unproject(cartesian);
      result = GCJ02ToWGS84(CesiumMath.toDegrees(cartographic.longitude), CesiumMath.toDegrees(cartographic.latitude));
      return new Cartographic(CesiumMath.toRadians(result[0]), CesiumMath.toRadians(result[1]));
    };
  }
}

export default GCJ02TilingScheme;
