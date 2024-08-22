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

      <Route path="/dialog-example-list" element={<PageDialogExampleList />} />
      <Route path="/dialog-example-list/dialog-sample-list" element={<PageDialogSampleList />} />
      <Route path="/dialog-example-list/dialog-animation-list" element={<PageDialogAnimationList />} />

      <Route path="/network-sample-list" element={<PageNetworkSampleList />} />
      <Route path="/network-sample-list/basic-network-request-sample" element={<PageBasicNetworkRequestSampleList />} />
      <Route path="/network-sample-list/streaming-sample" element={<PageStreamingSampleList />} />
      <Route path="/network-sample-list/streaming-sample/video-streaming-sample" element={<PageVideoStreamingSample />} />
      <Route path="/network-sample-list/streaming-sample/audio-streaming-sample" element={<PageAudioStreamingSample />} />
      <Route path="/network-sample-list/sse-sample" element={<PageSseSample />} />
      <Route path="/network-sample-list/socket-sample-list" element={<PageSocketSampleList />} />
      <Route path="/network-sample-list/socket-sample-list/sock-js-sample" element={<PageSockJsSample />} />

      <Route path="/etc-sample-list" element={<PageEtcSampleList />} />
      <Route path="/etc-sample-list/crypt-sample" element={<PageCryptSample />} />
      <Route path="/etc-sample-list/shared-preferences-sample" element={<PageSharedPreferencesSample />} />
      <Route path="/etc-sample-list/open-new-tap-test" element={<PageOpenNewTapTest />} />
      <Route path="/etc-sample-list/iframe-sample" element={<PageIframeSample />} />
      <Route path="/etc-sample-list/context-menu-sample" element={<PageContextMenuSample />} />
    </Routes>
  );
}

// (Navigate 객체)
export let navigate: NavigateFunction = () => { };

export default AppRouter;