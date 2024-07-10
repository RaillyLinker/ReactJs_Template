import React, { useEffect, useState } from 'react';
import styles from './view.module.css';
import Business, { MainState, Props } from './business';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

import GcHeader from '../../global_components/gc_header/main_view';
import GcFooter from '../../global_components/gc_footer/main_view';

const View: React.FC<Props> = (props) => {
  // (보일러 플레이트 코드)
  // 컴포넌트 Business 객체
  const [mainBusiness] = useState(() => props.mainBusiness || new Business());
  mainBusiness.mainProps = props;

  // 컴포넌트 State 생성 및 mainBusiness 에 할당
  const [pageState, setPageState] = React.useState<MainState>(mainBusiness.mainState);
  mainBusiness.mainState = pageState;
  mainBusiness.setMainState = setPageState;

  // 컴포넌트 생명주기를 mainBusiness 로 전달
  useEffect(() => {
    mainBusiness.componentDidMount();
    return () => {
      mainBusiness.componentWillUnmount();
    }
  }, []);

  //----------------------------------------------------------------------------
  // (컴포넌트 화면 구성 코드)
  const Row = ({ index, style }: ListChildComponentProps) => (
    <div style={style} onClick={pageState.items[index].onItemClicked}>
      {pageState.items[index].itemTitle}
    </div>
  );

  return (
    <div className={styles.MainView}>
      <GcHeader headerTitle='홈' />

      <List height={400} itemCount={pageState.items.length} itemSize={35} width={300} >
        {Row}
      </List>

      <GcFooter footerMsg='by Railly' />
    </div>
  );
};

export default View;