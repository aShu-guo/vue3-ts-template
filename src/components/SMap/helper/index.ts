import { Viewer } from 'cesium';

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
