/**
 * @name ConfigZipPackPlugin
 * @description 开启.gz压缩；减少打包后的大小，运维在发布时仍需要重新解压
 */
import zipPack from 'vite-plugin-zip-pack';

export const ConfigZipPackPlugin = (isBuild: boolean) => {
  if (isBuild) {
    return zipPack({});
  }
  return [];
};
