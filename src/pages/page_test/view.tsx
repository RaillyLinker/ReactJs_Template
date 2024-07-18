import React, { useEffect } from 'react';
import styles from './view.module.css';
import { useNavigate, useParams, useSearchParams, Params } from 'react-router-dom';
import Business, { State } from './business';
import { pageHistoryDict } from '../../global_data/gd_template_data';
import { PageHistory } from '../../global_classes/gc_template_classes';

import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import GcHeader from '../../global_components/gc_header/view';
import GcFooter from '../../global_components/gc_footer/view';

// [함수형 컴포넌트 뷰]
const View: React.FC = () => {
  // (보일러 플레이트 코드)
  // 본 페이지 히스토리 정보
  const pageHistoryIdx = window.history.state["idx"];
  const pageHistoryKey = window.history.state["key"];

  // Path 파라미터 객체
  const pathParams: Readonly<Params<string>> = useParams();
  // Query 파라미터 객체
  const queryParams: URLSearchParams = useSearchParams()[0];

  if (!(pageHistoryIdx in pageHistoryDict) || pageHistoryDict[pageHistoryIdx].historyKey != pageHistoryKey) {
    // 히스토리 내에 저장되지 않은 페이지
    // 비즈니스 객체 생성
    const mainBusiness: Business = new Business();
    // 히스토리에 비즈니스 객체 할당
    pageHistoryDict[pageHistoryIdx] = new PageHistory(pageHistoryKey, mainBusiness);
    // 비즈니스 객체에 초기 State 할당
    mainBusiness.mainState = mainBusiness.initMainState(pathParams, queryParams);
  }

  // 히스토리에서 본 페이지의 비즈니스 객체 가져오기
  const mainBusiness: Business = pageHistoryDict[pageHistoryIdx].pageBusiness as Business;
  const mainState: State = mainBusiness.mainState!;

  // mainBusiness 에 컴포넌트에서만 생성 가능한 변수 할당
  mainBusiness.setMainState = React.useState<State>(mainState)[1];
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