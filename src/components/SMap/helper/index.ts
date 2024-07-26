import { CameraEventType, createWorldTerrainAsync, KeyboardEventModifier, Viewer } from 'cesium';
import { ShallowRef } from 'vue';

export const defaultViewerOptions: Viewer.ConstructorOptions = {
  geocoder: false,
  homeButton: false,
  sceneModePicker: false,
  baseLayerPicker: false,
  navigationHelpButton: false,
  animation: false,
  fullscreenButton: false,
  vrButton: false,
  scene3DOnly: true,
  selectionIndicator: false,
  shouldAnimate: true, //是否允许动画
  infoBox: false,
  timeline: false,
  navigationInstructionsInitiallyVisible: false,
  showRenderLoopErrors: false,
  shadows: false,
};

export const resetCesium = async (viewer: ShallowRef<Viewer | undefined>) => {
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

    // 叠加地形服务
    viewer.value.terrainProvider = await createWorldTerrainAsync({
      requestWaterMask: true,
    });
  }
};
