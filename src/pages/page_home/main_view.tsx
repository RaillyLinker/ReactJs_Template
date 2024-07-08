import React, { Component } from 'react';
import './main_view.css';
import MainBusiness, { PageState } from './main_business';

// [페이지 뷰 클래스]
class MainView extends Component<{}, PageState> {
  // (페이지 Business 객체)
  private mainBusiness: MainBusiness;

  // (뷰 클래스 생성자)
  constructor(props: {}) {
    super(props);
    this.mainBusiness = new MainBusiness(this);
  }

  //----------------------------------------------------------------------------
  // (페이지 화면 반환 함수)
  render(): JSX.Element {
    return (
      <div className="MainView">
        <h1>{this.state.counter}</h1>
        <button onClick={this.mainBusiness.onCntUpBtnClick}>Click me</button>
      </div>
    );
  }
}

export default MainView;