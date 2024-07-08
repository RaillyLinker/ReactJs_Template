import React, { Component } from 'react';
import Home from './Home';

// [비즈니스 클래스]
class HomeBusiness {
  // (페이지 View 객체)
  private view: Home;

  // (비즈니스 클래스 생성자)
  constructor(view: Home) {
    this.view = view;

    // 페이지 State 초기화
    this.view.state = {
      counter: 0,
    };
  }

  //----------------------------------------------------------------------------
  // [public 함수]
  onCntUpBtnClick = (): void => {
    this.view.setState((prevState) => ({ counter: prevState.counter + 1 }));
  };

  //----------------------------------------------------------------------------
  // [private 함수]
}

//----------------------------------------------------------------------------
// [페이지 State 인터페이스]
export interface PageState {
  counter: number;
}

export default HomeBusiness;