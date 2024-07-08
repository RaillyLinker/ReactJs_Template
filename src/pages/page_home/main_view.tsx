import React, { Component } from 'react';
import styles from './main_view.module.css';
import MainBusiness, { PageState, PageProps } from './main_business';
import GcHeader from '../../global_components/gc_header/main_view';
import GcFooter from '../../global_components/gc_footer/main_view';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

// [페이지 뷰 클래스]
class MainView extends Component<{}, PageState> {
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
    const Row = ({ index, style }: ListChildComponentProps) => (
      <div style={style} onClick={this.mainBusiness.items[index].onItemClicked}>
        {this.mainBusiness.items[index].itemTitle}
      </div>
    );

    return (
      <div className={styles.MainView}>
        <GcHeader headerTitle='홈' />

        <List
          height={400}
          itemCount={this.mainBusiness.items.length}
          itemSize={35}
          width={300}
        >
          {Row}
        </List>

        <GcFooter footerMsg='by Railly' />
      </div>
    );
  }
}


export default MainView;