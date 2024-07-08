import React, { Component } from 'react';
import MainView from './main_view';

// [비즈니스 클래스]
class MainBusiness {
  // (페이지 View 객체)
  private mainView: MainView;

  // (페이지 Props 객체)
  pageProps: PageProps;

  // (비즈니스 클래스 생성자)
  constructor(mainView: MainView, pageProps: PageProps) {
    this.mainView = mainView;
    this.pageProps = pageProps;

    // 페이지 State 초기화
    this.mainView.state = {
    };
  }

  //----------------------------------------------------------------------------
  // [public 함수]

  //----------------------------------------------------------------------------
  // [private 함수]
}

//----------------------------------------------------------------------------
// [페이지 State 인터페이스]
export interface PageState {
}

// [페이지 Props 인터페이스]
export interface PageProps {
  headerTitle: string;
}

export default MainBusiness;