import { UrlTemplateImageryProvider } from 'cesium';

const TILE_URL = '//t{s}.tianditu.gov.cn/DataServer?T={style}_w&x={x}&y={y}&l={z}&tk={key}';

class TdtImageryProvider extends UrlTemplateImageryProvider {
  constructor(
    options: UrlTemplateImageryProvider.ConstructorOptions & {
      protocol?: 'https' | 'http';
      style?: 'vec' | 'cva' | 'img' | 'cia' | 'ter';
      key: string;
    },
  ) {
    super({
      url: [
        options.protocol || '',
        TILE_URL.replace(/\{style\}/g, options.style || 'vec').replace(/\{key\}/g, options.key || ''),
      ].join(''),
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      maximumLevel: 18,
    });
  }
}

export default TdtImageryProvider;
