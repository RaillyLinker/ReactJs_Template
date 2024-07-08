import React, { Component } from 'react';
import { Route, Routes } from "react-router-dom";
import PageHome from './pages/page_home/main_view';
import PageStateChangeTest from './pages/page_state_change_test/main_view';

// [프로그램 라우터 설정 파일]
// 프로그램 내에서 사용할 모든 페이지는 여기에 등록 되어야 접근 및 사용이 가능합니다.
function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<PageHome />} />
      <Route path="/state-change-test" element={<PageStateChangeTest />} />
    </Routes>
  );
}

export default AppRouter;