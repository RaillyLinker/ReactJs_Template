import { Route, Routes } from "react-router-dom";
import App from './app';

import PageTemplate from './a_template/page_template/view';
import PageHome from './pages/page_home/view';
import PagePageAndRouterSampleList from './pages/page_pageAndRouterSampleList/view';
import PageStateAndLifecycleTest from './pages/page_stateAndLifecycleTest/view';
import PageInputAndOutputTest from './pages/page_inputAndOutputTest/view';
import PageEtcSampleList from './pages/page_etcSampleList/view';
import PageUseRefAndUseStateTest from './pages/page_useRefAndUseStateTest/view';

// [라우터 클래스]
// !!!웹에서 사용할 라우터 설정을 아래에 추가하세요.!!!
// 모든 라우트는 <Route path="/" element={<App />} > 이 태그 안에 위치해야 합니다.
function AppRouter(): JSX.Element {
  return (
    <Routes location={window.location} key={window.location.pathname}>
      <Route path="/" element={<App />} >

        <Route path="/*" element={<h1>존재하지 않는 페이지입니다.</h1>} />

        <Route path="/" element={<PageHome />} />
        <Route path="/page-and-router-sample-list" element={<PagePageAndRouterSampleList />} />
        <Route path="/page-and-router-sample-list/page-template" element={<PageTemplate />} />
        <Route path="/page-and-router-sample-list/state-and-lifecyle-test" element={<PageStateAndLifecycleTest />} />
        <Route path="/page-and-router-sample-list/input-and-output-test/:pathParam" element={<PageInputAndOutputTest />} />

        <Route path="/etc-sample-list" element={<PageEtcSampleList />} />
        <Route path="/etc-sample-list/use-ref-and-use-state-test" element={<PageUseRefAndUseStateTest />} />

      </Route>
    </Routes>
  );
}

export default AppRouter;