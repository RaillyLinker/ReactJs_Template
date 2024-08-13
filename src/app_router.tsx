import { Route, Routes, useLocation } from "react-router-dom";
import PageTemplate from './a_template/page_template/view';
import PageHome from './pages/page_home/view';
import PagePageAndRouterSampleList from './pages/page_pageAndRouterSampleList/view';
import PageStateAndLifecycleTest from './pages/page_stateAndLifecycleTest/view';
import PageInputAndOutputTest from './pages/page_inputAndOutputTest/view';
import PageEtcSampleList from './pages/page_etcSampleList/view';
import PageUseRefAndUseStateTest from './pages/page_useRefAndUseStateTest/view';

function AppRouter(): JSX.Element {
  const location = useLocation();

  return (
    <Routes location={location} key={location.key}>
      <Route path="/*" element={<h1>존재하지 않는 페이지입니다.</h1>} />

      <Route path="/" element={<PageHome />} />
      <Route path="/page-and-router-sample-list" element={<PagePageAndRouterSampleList />} />
      <Route path="/page-and-router-sample-list/page-template" element={<PageTemplate />} />
      <Route path="/page-and-router-sample-list/state-and-lifecyle-test" element={<PageStateAndLifecycleTest />} />
      <Route path="/page-and-router-sample-list/input-and-output-test/:pathParam" element={<PageInputAndOutputTest />} />

      <Route path="/etc-sample-list" element={<PageEtcSampleList />} />
      <Route path="/etc-sample-list/use-ref-and-use-state-test" element={<PageUseRefAndUseStateTest />} />
    </Routes>
  );
}

export default AppRouter;