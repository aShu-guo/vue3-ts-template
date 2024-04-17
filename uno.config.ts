import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  safelist: ['py-16px', 'pb-16px'],
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    // presetRemToPx(),
    // presetPxTovw({ viewportWidth: 1920 }),
  ],
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
    ['flex-between', 'flex items-center justify-between'],
    ['flex-end', 'flex items-end justify-between'],
    ['absolute-center', 'top-50% -translate-y-50% left-50% -translate-x-50%'],
    ['absolute-x-center', 'left-50% -translate-x-50%'],
    ['absolute-y-center', 'top-50% -translate-y-50%'],
  ],
  rules: [
    [/^flex-(\d+)$/, ([, d]) => ({ flex: d })],
    [/^lh-(\d+)$/, ([, d]) => ({ 'line-height': `${d}` })],
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  postprocess: [
    /*(util) => {
      // implement postcss-pxtorem
      const pxRE = /(-?[\.\d]+)px/g;
      util.entries.forEach((entry) => {
        const value = entry[1];
        if (typeof value === 'string' && pxRE.test(value)) {
          // 100 is [rootValue] of postcss-pxtorem in my project
          // eslint-disable-next-line no-param-reassign
          entry[1] = value.replace(pxRE, (_, pixelValue) => `${pixelValue / 80}rem`);
        }
      });
    },*/
  ],
});
