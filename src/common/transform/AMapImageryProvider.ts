/**
 * @Author: Caven Chen
 * @Date: 2020-01-15
 */

import { UrlTemplateImageryProvider } from 'cesium';
import GCJ02TilingScheme from '@/common/transform/GCJ02TilingScheme.ts';

class AMapImageryProvider extends UrlTemplateImageryProvider {
  constructor(options: UrlTemplateImageryProvider.ConstructorOptions) {
    if (!options.subdomains || !options.subdomains.length) {
      options['subdomains'] = ['01', '02', '03', '04'];
    }
    options['tilingScheme'] = new GCJ02TilingScheme();
    super(options);
  }
}
export default AMapImageryProvider;
