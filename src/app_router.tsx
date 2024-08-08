import { Route, Routes } from "react-router-dom";
import PageHome from './pages/page_home/view';
import PagePageAndRouterSampleList from './pages/page_pageAndRouterSampleList/view';

// [프로그램 라우터 설정 파일]
// !!!프로그램 내에서 사용할 모든 페이지는 이곳에 등록!!!
// path Parameter 는 /:pathParam 이렇게 입력합니다.
function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<PageHome />} />
      <Route path="/page-and-router-sample-list" element={<PagePageAndRouterSampleList />} />
    </Routes>
  );
}

export default AppRouter;