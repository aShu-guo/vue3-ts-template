import { Cartesian3, ImageryLayer, Viewer } from 'cesium';
import { Ref } from 'vue';
import { AMapTilesUrl } from '@components/SMap/helper/amap.ts';
import AMapImageryProvider from '@/common/transform/AMapImageryProvider.ts';
import { defaultViewerOptions, resetCesium } from '@components/SMap/helper';

const useViewer = (viewContainer: Ref<HTMLElement | undefined>) => {
  const viewer = shallowRef<Viewer>();

  onMounted(() => {
    if (viewContainer.value) {
      viewer.value = new Viewer(viewContainer.value, {
        ...defaultViewerOptions,
        baseLayer: new ImageryLayer(
          new AMapImageryProvider({
            url: AMapTilesUrl.Imagery,
            minimumLevel: 3,
            maximumLevel: 18,
          }),
        ),
        // terrain: Terrain.fromWorldTerrain(),
      });
      viewer.value.imageryLayers.add(
        new ImageryLayer(
          new AMapImageryProvider({
            url: AMapTilesUrl.ImageryRoadLabel,
            minimumLevel: 3,
            maximumLevel: 18,
          }),
        ),
      );

      viewer.value.camera.flyTo({
        destination: Cartesian3.fromDegrees(120.051941383957, 30, 500000), // 空域
      });

      resetCesium(viewer);
    }
  });

  return {
    viewer,
  };
};

export default useViewer;
