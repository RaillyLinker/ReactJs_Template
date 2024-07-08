import React, { Component } from 'react';
import './Home.css';
import Business, { PageState } from './HomeBusiness';

// [페이지 뷰 클래스]
class Home extends Component<{}, PageState> {
  // (페이지 Business 객체)
  private business: Business;

  // (뷰 클래스 생성자)
  constructor(props: {}) {
    super(props);
    this.business = new Business(this);
  }

  //----------------------------------------------------------------------------
  // (페이지 화면 반환 함수)
  render(): JSX.Element {
    return (
      <div className="Home">
        <h1>{this.state.counter}</h1>
        <button onClick={this.business.onCntUpBtnClick}>Click me</button>
      </div>
    );
  }
}

export default Home;