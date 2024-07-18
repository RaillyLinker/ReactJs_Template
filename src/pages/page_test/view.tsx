import React, { useEffect } from 'react';
import styles from './view.module.css';
import { useNavigate, useParams, useSearchParams, Params } from 'react-router-dom';
import Business, { State } from './business';

import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import GcHeader from '../../global_components/gc_header/view';
import GcFooter from '../../global_components/gc_footer/view';

// [함수형 컴포넌트 뷰]
const View: React.FC = () => {
  // (보일러 플레이트 코드)
  // 본 페이지 히스토리 정보
  const pageHistoryIdx = window.history.state["idx"];
  const pageHistoryKey = window.history.state["key"];

  // 컴포넌트 Business 객체
  const mainBusiness: Business = React.useState(new Business())[0];

  // Path 파라미터 객체
  const pathParams: Readonly<Params<string>> = useParams()
  // Query 파라미터 객체
  const queryParams: URLSearchParams = useSearchParams()[0];

  // State 할당
  const mainState: State = mainBusiness.initMainState(pathParams, queryParams);

  // mainBusiness 에 컴포넌트 생성 변수 할당
  mainBusiness.setMainState = React.useState<State>(mainState)[1];
  mainBusiness.mainState = mainState;
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
      <div style={style} onClick={mainState.items[index].onItemClicked}>
        {mainState.items[index].itemTitle}
      </div>
    );

  return (
    <div className={styles.MainView}>
      <GcHeader headerTitle='테스트' business={mainState.gcHeaderBusiness} />

      <List height={400} itemCount={mainState.items.length} itemSize={35} width={300} >
        {Row}
      </List>

      <GcFooter footerMsg='by Railly' business={mainState.gcFooterBusiness} />
    </div>
  );
};

export default View;