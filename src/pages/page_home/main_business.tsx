import React, { Component } from 'react';
import MainView from './main_view';

// [비즈니스 클래스]
class MainBusiness {
  // (페이지 View 객체)
  private mainView: MainView;

  // (비즈니스 클래스 생성자)
  constructor(mainView: MainView) {
    this.mainView = mainView;

    // 페이지 State 초기화
    this.mainView.state = {
      counter: 0,
    };
  }

  //----------------------------------------------------------------------------
  // [public 함수]
  onCntUpBtnClick = (): void => {
    this.mainView.setState((prevState) => ({ counter: prevState.counter + 1 }));
  };

  //----------------------------------------------------------------------------
  // [private 함수]
}

//----------------------------------------------------------------------------
// [페이지 State 인터페이스]
export interface PageState {
  counter: number;
}

export default MainBusiness;