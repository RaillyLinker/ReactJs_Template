import React, { Component } from 'react';
import styles from './main_view.module.css';
import MainBusiness, { PageState, PageProps } from './main_business';

// [페이지 뷰 클래스]
class MainView extends Component<PageProps, PageState> {
  // (페이지 Business 객체)
  private mainBusiness: MainBusiness;

  // (뷰 클래스 생성자)
  constructor(props: PageProps) {
    super(props);
    this.mainBusiness = new MainBusiness(this, props);
  }

  // (컴포넌트 생명주기 함수들)
  // 그외 생명주기 : https://ko.legacy.reactjs.org/docs/react-component.html
  componentDidMount() {
    this.mainBusiness.componentDidMount();
  }
  componentDidUpdate() {
    this.mainBusiness.componentDidUpdate();
  }
  componentWillUnmount() {
    this.mainBusiness.componentWillUnmount();
  }

  //----------------------------------------------------------------------------
  // (페이지 화면 반환 함수)
  render(): JSX.Element {
    return (
      <div className={styles.MainView}>
        <header>
          <h1>{this.mainBusiness.pageProps.headerTitle}</h1>
        </header>
      </div>
    );
  }
}

export default MainView;