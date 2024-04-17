/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import { ConfigSvgIconsPlugin } from './svg-icons';
import { AutoRegistryComponents } from './auto-import-component.ts';
import { AutoImportDeps } from './auto-import-api.ts';
import { ConfigVisualizerConfig } from './visualizer';
import { ConfigZipPackPlugin } from './zip-pack';
import { ConfigProgressPlugin } from './progress';
// import { ConfigImageminPlugin } from './imagemin';
import { ConfigLegacyPlugin } from './legacy.ts';

export function createVitePlugins(isBuild: boolean, buildEnv: 'prod' | 'test') {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), UnoCSS()];

  // 自动按需引入组件
  vitePlugins.push(AutoRegistryComponents());

  // 使用API无需import
  vitePlugins.push(AutoImportDeps());

  // 开启.zip压缩
  vitePlugins.push(ConfigZipPackPlugin(isBuild));

  // 构建时显示进度条
  vitePlugins.push(ConfigProgressPlugin());

  // vite-plugin-svg-icons
  vitePlugins.push(ConfigSvgIconsPlugin(isBuild));

  // 观察每个插件的中间态
  // vitePlugins.push(ConfigInspect());
  /**
   * Always add plugin as last option.
   * 各个bundle占比
   */
  vitePlugins.push(ConfigVisualizerConfig(buildEnv));

  // 打包是否兼容低版本浏览器
  vitePlugins.push(ConfigLegacyPlugin(isBuild));

  // vitePlugins.push(ConfigImageminPlugin());

  return vitePlugins;
}
