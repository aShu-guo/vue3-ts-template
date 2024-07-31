import { UrlTemplateImageryProvider } from 'cesium';
import GCJ02TilingScheme from '@/common/gis/transform/GCJ02TilingScheme.ts';

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
