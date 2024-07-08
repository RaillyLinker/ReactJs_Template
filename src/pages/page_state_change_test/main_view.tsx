import React, { Component } from 'react';
import './main_view.css';
import MainBusiness, { PageState, PageProps } from './main_business';
import GcHeader from '../../global_components/gc_header/main_view';
import GcFooter from '../../global_components/gc_footer/main_view';

// [페이지 뷰 클래스]
class MainView extends Component<{}, PageState> {
  // (페이지 Business 객체)
  private mainBusiness: MainBusiness;

  // (뷰 클래스 생성자)
  constructor(props: PageProps) {
    super(props);
    this.mainBusiness = new MainBusiness(this, props);
  }

  //----------------------------------------------------------------------------
  // (페이지 화면 반환 함수)
  render(): JSX.Element {
    return (
      <div className="MainView">
        <GcHeader headerTitle='홈'/>

        <h1>{this.state.counter}</h1>
        <button onClick={this.mainBusiness.onCntUpBtnClick}>Click me</button>
        
        <GcFooter footerMsg='by Railly'/>
      </div>
    );
  }
}

export default MainView;