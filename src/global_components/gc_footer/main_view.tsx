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

  //----------------------------------------------------------------------------
  // (페이지 화면 반환 함수)
  render(): JSX.Element {
    return (
      <div className={styles.MainView}>
        <footer>
          <div>{this.mainBusiness.pageProps.footerMsg}</div>
        </footer>
      </div>
    );
  }
}

export default MainView;