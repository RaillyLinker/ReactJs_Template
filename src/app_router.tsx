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

      <Route path="/dialog-example-list" element={<PageDialogExampleList />} />
      <Route path="/dialog-example-list/dialog-sample-list" element={<PageDialogSampleList />} />

      <Route path="/etc-sample-list" element={<PageEtcSampleList />} />
      <Route path="/etc-sample-list/crypt-sample" element={<PageCryptSample />} />
      <Route path="/etc-sample-list/shared-preferences-sample" element={<PageSharedPreferencesSample />} />
    </Routes>
  );
}

// (Navigate 객체)
export let navigate: NavigateFunction = () => { };

export default AppRouter;