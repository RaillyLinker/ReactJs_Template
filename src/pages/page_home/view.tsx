import React, { useEffect } from 'react';
import styles from './view.module.css';
import Business, { State, Props } from './business';
import { useNavigate } from 'react-router-dom';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

import GcHeader from '../../global_components/gc_header/view';
import GcFooter from '../../global_components/gc_footer/view';

// [함수형 컴포넌트 뷰]
const View: React.FC<Props> = (props) => {
  // (보일러 플레이트 코드)
  // 컴포넌트 Business 객체
  const mainBusiness: Business = React.useState(new Business())[0];
  mainBusiness.initMainState();

  // 컴포넌트 State 생성 및 mainBusiness 에 컴포넌트 생성 변수 할당
  mainBusiness.setMainState = React.useState<State>(mainBusiness.mainState!)[1];
  mainBusiness.mainProps = props;
  mainBusiness.navigate = useNavigate();

  // 컴포넌트 생명주기를 mainBusiness 로 전달
  useEffect(() => {
    mainBusiness.onComponentDidMount();
    return () => {
      mainBusiness.onComponentWillUnmount();
    }
  }, []);

  //----------------------------------------------------------------------------
  // (컴포넌트 화면 구성 코드)
  const Row: ({ index, style }: ListChildComponentProps) => JSX.Element =
    ({ index, style }: ListChildComponentProps) => (
      <div style={style} onClick={mainBusiness.mainState!.items[index].onItemClicked}>
        {mainBusiness.mainState!.items[index].itemTitle}
      </div>
    );

  return (
    <div className={styles.MainView}>
      <GcHeader headerTitle='홈' business={mainBusiness.mainState!.gcHeaderBusiness} />

      <List height={400} itemCount={mainBusiness.mainState!.items.length} itemSize={35} width={300} >
        {Row}
      </List>

      <GcFooter footerMsg='by Railly' business={mainBusiness.mainState!.gcFooterBusiness} />
    </div>
  );
};

export default View;