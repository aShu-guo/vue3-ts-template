/**
 * @name ConfigProgressPlugin
 * @description 构建显示进度条
 */

import legacy from '@vitejs/plugin-legacy';

export const ConfigLegacyPlugin = (isBuild: boolean) => {
  if (isBuild) {
    return legacy({
      targets: ['defaults', 'not IE 11'],
    });
  }
  return [];
};
