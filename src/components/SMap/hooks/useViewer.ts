import { CameraEventType, Cartesian3, ImageryLayer, KeyboardEventModifier, Terrain, Viewer } from 'cesium';
import { Ref } from 'vue';
import AMapImageryProvider from '@/common/gis/transform/AMapImageryProvider.ts';
import { defaultViewerOptions } from '@components/SMap/helper';
import { Degree } from '@components/SMap/helper/types.ts';
import { AMapTemplateURL } from '@/common/constants/map-layer-source.ts';

const useViewer = (
  viewContainer: Ref<HTMLElement | undefined>,
  options: Viewer.ConstructorOptions = defaultViewerOptions,
  center: Degree = { longitude: 120.051941383957, latitude: 30, height: 500000 },
) => {
  const viewer = shallowRef<Viewer>();

  onMounted(() => {
    initViewer();
    resetCesium();
  });

  const initViewer = () => {
    if (viewContainer.value) {
      viewer.value = new Viewer(viewContainer.value, {
        baseLayer: new ImageryLayer(
          new AMapImageryProvider({
            url: AMapTemplateURL.Imagery,
            minimumLevel: 3,
            maximumLevel: 18,
          }),
        ),
        // 叠加地形服务
        terrain: Terrain.fromWorldTerrain({
          // requestWaterMask: true,
          // requestVertexNormals: true,
        }),
        ...options,
      });
      viewer.value.imageryLayers.add(
        new ImageryLayer(
          new AMapImageryProvider({
            url: AMapTemplateURL.ImageryRoadLabel,
            minimumLevel: 3,
            maximumLevel: 18,
          }),
        ),
      );

      viewer.value.camera.flyTo({
        destination: Cartesian3.fromDegrees(center.longitude, center.latitude, center.height), // 空域
      });
    }
  };

  const resetCesium = () => {
    if (viewer.value) {
      viewer.value._cesiumWidget._creditContainer.style.display = 'none';

      // 抗锯齿
      viewer.value.scene.postProcessStages.fxaa.enabled = true;
      // 水雾特效
      viewer.value.scene.globe.showGroundAtmosphere = true;
      // 设置最大俯仰角，[-90,0]区间内，默认为-30，单位弧度
      viewer.value.scene.screenSpaceCameraController.inertiaZoom = 0.5;
      viewer.value.scene.screenSpaceCameraController.minimumZoomDistance = 50;
      viewer.value.scene.screenSpaceCameraController.maximumZoomDistance = 20000000;
      viewer.value.scene.screenSpaceCameraController.zoomEventTypes = [
        CameraEventType.RIGHT_DRAG,
        CameraEventType.WHEEL,
        CameraEventType.PINCH,
      ];
      viewer.value.scene.screenSpaceCameraController.tiltEventTypes = [
        CameraEventType.MIDDLE_DRAG,
        CameraEventType.PINCH,
        {
          eventType: CameraEventType.LEFT_DRAG,
          modifier: KeyboardEventModifier.CTRL,
        },
        {
          eventType: CameraEventType.RIGHT_DRAG,
          modifier: KeyboardEventModifier.CTRL,
        },
      ];
      // 取消默认的双击事件
      // viewer.value.cesiumWidget.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

      // 禁止进入地下
      viewer.value.scene.screenSpaceCameraController.enableCollisionDetection = true;

      // 控件
      // viewer.value.animation.container.style.visibility = 'hidden';
      // viewer.value.timeline.container.style.visibility = 'hidden';
    }
  };

  return {
    viewer,
  };
};
export default useViewer;
