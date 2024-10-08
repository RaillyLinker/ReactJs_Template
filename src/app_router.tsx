import { Route, Routes, NavigateFunction, useNavigate } from "react-router-dom";

import PageTemplate from './a_template/page_template/view';
import PageErrorNotExists from './pages/page_errorNotExists/view';
import PageHome from './pages/page_home/view';
import PageTemplateBasicFunctionSampleList from './pages/page_templateBasicFunctionSampleList/view';
import PageStateAndLifecycleTest from './pages/page_stateAndLifecycleTest/view';
import PageInputAndOutputTest from './pages/page_inputAndOutputTest/view';
import PageEtcSampleList from './pages/page_etcSampleList/view';
import PageUseRefAndUseStateTest from './pages/page_useRefAndUseStateTest/view';
import PageDialogExampleList from './pages/page_dialogExampleList/view';
import PageDialogSampleList from './pages/page_dialogSampleList/view';
import PageGlobalVariableStateTest from './pages/page_globalVariableStateTest/view';
import PageCryptSample from './pages/page_cryptSample/view';
import PageSharedPreferencesSample from './pages/page_sharedPreferencesSample/view';
import PageAsyncTest from './pages/page_asyncTest/view';
import PageToastSample from './pages/page_toastSample/view';
import PageDialogAnimationList from './pages/page_dialogAnimationList/view';
import PageOpenNewTapTest from './pages/page_openNewTapTest/view';
import PageIframeSample from './pages/page_iframeSample/view';
import PageNetworkSampleList from './pages/page_networkSampleList/view';
import PageBasicNetworkRequestSampleList from './pages/page_basicNetworkRequestSampleList/view';
import PageContextMenuSample from './pages/page_contextMenuSample/view';
import PageStreamingSampleList from './pages/page_streamingSampleList/view';
import PageVideoStreamingSample from './pages/page_videoStreamingSample/view';
import PageAudioStreamingSample from './pages/page_audioStreamingSample/view';
import PageSseSample from './pages/page_sseSample/view';
import PageSocketSampleList from './pages/page_socketSampleList/view';
import PageSockJsSample from './pages/page_sockJsSample/view';
import PageStompSample from './pages/page_stompSample/view';
import PageImageLoadingSample from './pages/page_imageLoadingSample/view';
import PageFileChoiceSample from './pages/page_fileChoiceSample/view';
import PageMediaSampleList from './pages/page_mediaSampleList/view';
import PageStringToImageSample from './pages/page_stringToImageSample/view';
import PageSimpleDrawSample from './pages/page_simpleDrawSample/view';
import PageComponentToImageSample from './pages/page_componentToImageSample/view';
import PageGetRequestSample from './pages/page_getRequestSample/view';
import PagePostRequestSample1 from './pages/page_postRequestSample1/view';
import PagePostRequestSample2 from './pages/page_postRequestSample2/view';
import PagePostRequestSample3 from './pages/page_postRequestSample3/view';
import PagePostRequestSample4 from './pages/page_postRequestSample4/view';
import PagePostRequestSample5 from './pages/page_postRequestSample5/view';
import PagePostRequestSample6 from './pages/page_postRequestSample6/view';
import PagePostRequestSample7 from './pages/page_postRequestSample7/view';
import PageGridSample from './pages/page_gridSample/view';
import PageWidgetAnimationSample from './pages/page_widgetAnimationSample/view';
import PageImageResizingSample from './pages/page_imageResizingSample/view';
import PageThreeDimensionSample from './pages/page_threeDimensionSample/view';
import PageSnakeGameSample from './pages/page_snakeGameSample/view';
import PageFilesToZipSample from './pages/page_filesToZipSample/view';
import PageZipToFilesSample from './pages/page_zipToFilesSample/view';
import PageGameSampleList from './pages/page_gameSampleList/view';
import PageComplexScrollSample from './pages/page_complexScrollSample/view';
import PageTooltipSample from './pages/page_tooltipSample/view';
import PageCamSample from './pages/page_camSample/view';
import PageVideoFrameCaptureSample from './pages/page_videoFrameCaptureSample/view';
import PageVideoFrameChoiceSample from './pages/page_videoFrameChoiceSample/view';
import PageVideoCropperSample from './pages/page_videoCropperSample/view';
import PageGeoSampleList from './pages/page_geoSampleList/view';
import PageDaumAddressSearchSample from './pages/page_daumAddressSearchSample/view';
import PageDataChartSample from './pages/page_dataChartSample/view';
import PageHalfPongGameSample from './pages/page_halfPongGameSample/view';
import PageBrowserGpsSample from './pages/page_browserGpsSample/view';
import PageGetMyIpAddressSample from './pages/page_getMyIpAddressSample/view';


// [라우터 클래스]
// !!!웹에서 사용할 라우터 설정을 아래에 추가하세요.!!!
function AppRouter(): JSX.Element {
  navigate = useNavigate();
  return (
    <Routes location={window.location} key={window.location.pathname}>
      <Route path="/*" element={<PageErrorNotExists />} />

      <Route path="/" element={<PageHome />} />

      <Route path="/template-basic-function-sample-list" element={<PageTemplateBasicFunctionSampleList />} />
      <Route path="/template-basic-function-sample-list/page-template" element={<PageTemplate />} />
      <Route path="/template-basic-function-sample-list/state-and-lifecyle-test" element={<PageStateAndLifecycleTest />} />
      <Route path="/template-basic-function-sample-list/input-and-output-test/:pathParam" element={<PageInputAndOutputTest />} />
      <Route path="/template-basic-function-sample-list/use-ref-and-use-state-test" element={<PageUseRefAndUseStateTest />} />
      <Route path="/template-basic-function-sample-list/global-variable-state-test" element={<PageGlobalVariableStateTest />} />
      <Route path="/template-basic-function-sample-list/async-test" element={<PageAsyncTest />} />
      <Route path="/template-basic-function-sample-list/toast-sample" element={<PageToastSample />} />
      <Route path="/template-basic-function-sample-list/shared-preferences-sample" element={<PageSharedPreferencesSample />} />
      <Route path="/template-basic-function-sample-list/open-new-tap-test" element={<PageOpenNewTapTest />} />
      <Route path="/template-basic-function-sample-list/iframe-sample" element={<PageIframeSample />} />
      <Route path="/template-basic-function-sample-list/context-menu-sample" element={<PageContextMenuSample />} />
      <Route path="/template-basic-function-sample-list/image-loading-sample" element={<PageImageLoadingSample />} />
      <Route path="/template-basic-function-sample-list/file-choice-sample" element={<PageFileChoiceSample />} />
      <Route path="/template-basic-function-sample-list/grid-sample" element={<PageGridSample />} />
      <Route path="/template-basic-function-sample-list/widget-animation-sample" element={<PageWidgetAnimationSample />} />
      <Route path="/template-basic-function-sample-list/complex-scroll-sample" element={<PageComplexScrollSample />} />
      <Route path="/template-basic-function-sample-list/tooltip-sample" element={<PageTooltipSample />} />

      <Route path="/dialog-example-list" element={<PageDialogExampleList />} />
      <Route path="/dialog-example-list/dialog-sample-list" element={<PageDialogSampleList />} />
      <Route path="/dialog-example-list/dialog-animation-list" element={<PageDialogAnimationList />} />

      <Route path="/network-sample-list" element={<PageNetworkSampleList />} />
      <Route path="/network-sample-list/basic-network-request-sample" element={<PageBasicNetworkRequestSampleList />} />
      <Route path="/network-sample-list/basic-network-request-sample/get-request-sample" element={<PageGetRequestSample />} />
      <Route path="/network-sample-list/basic-network-request-sample/post-request-sample1" element={<PagePostRequestSample1 />} />
      <Route path="/network-sample-list/basic-network-request-sample/post-request-sample2" element={<PagePostRequestSample2 />} />
      <Route path="/network-sample-list/basic-network-request-sample/post-request-sample3" element={<PagePostRequestSample3 />} />
      <Route path="/network-sample-list/basic-network-request-sample/post-request-sample4" element={<PagePostRequestSample4 />} />
      <Route path="/network-sample-list/basic-network-request-sample/post-request-sample5" element={<PagePostRequestSample5 />} />
      <Route path="/network-sample-list/basic-network-request-sample/post-request-sample6" element={<PagePostRequestSample6 />} />
      <Route path="/network-sample-list/basic-network-request-sample/post-request-sample7" element={<PagePostRequestSample7 />} />
      <Route path="/network-sample-list/streaming-sample" element={<PageStreamingSampleList />} />
      <Route path="/network-sample-list/streaming-sample/video-streaming-sample" element={<PageVideoStreamingSample />} />
      <Route path="/network-sample-list/streaming-sample/audio-streaming-sample" element={<PageAudioStreamingSample />} />
      <Route path="/network-sample-list/sse-sample" element={<PageSseSample />} />
      <Route path="/network-sample-list/socket-sample-list" element={<PageSocketSampleList />} />
      <Route path="/network-sample-list/socket-sample-list/sock-js-sample" element={<PageSockJsSample />} />
      <Route path="/network-sample-list/socket-sample-list/stomp-sample" element={<PageStompSample />} />

      <Route path="/media-sample-list" element={<PageMediaSampleList />} />
      <Route path="/media-sample-list/string-to-image-sample" element={<PageStringToImageSample />} />
      <Route path="/media-sample-list/simple-draw-sample" element={<PageSimpleDrawSample />} />
      <Route path="/media-sample-list/component-to-image-sample" element={<PageComponentToImageSample />} />
      <Route path="/media-sample-list/image-resizing-sample" element={<PageImageResizingSample />} />
      <Route path="/media-sample-list/cam-sample" element={<PageCamSample />} />
      <Route path="/media-sample-list/video-frame-capture-sample" element={<PageVideoFrameCaptureSample />} />
      <Route path="/media-sample-list/video-frame-choice-sample" element={<PageVideoFrameChoiceSample />} />
      <Route path="/media-sample-list/video-cropper-sample" element={<PageVideoCropperSample />} />

      <Route path="/game-sample-list" element={<PageGameSampleList />} />
      <Route path="/game-sample-list/snake-game-sample" element={<PageSnakeGameSample />} />
      <Route path="/game-sample-list/half-pong-game-sample" element={<PageHalfPongGameSample />} />

      <Route path="/geo-sample-list" element={<PageGeoSampleList />} />
      <Route path="/geo-sample-list/daum-address-search-sample" element={<PageDaumAddressSearchSample />} />
      <Route path="/geo-sample-list/browser-gps-sample" element={<PageBrowserGpsSample />} />

      <Route path="/etc-sample-list" element={<PageEtcSampleList />} />
      <Route path="/etc-sample-list/crypt-sample" element={<PageCryptSample />} />
      <Route path="/etc-sample-list/three-dimension-sample" element={<PageThreeDimensionSample />} />
      <Route path="/etc-sample-list/files-to-zip-sample" element={<PageFilesToZipSample />} />
      <Route path="/etc-sample-list/zip-to-files-sample" element={<PageZipToFilesSample />} />
      <Route path="/etc-sample-list/data-chart-sample" element={<PageDataChartSample />} />
      <Route path="/etc-sample-list/get-my-ip-address-sample" element={<PageGetMyIpAddressSample />} />
    </Routes>
  );
}

// (Navigate 객체)
export let navigate: NavigateFunction = () => { };

export default AppRouter;