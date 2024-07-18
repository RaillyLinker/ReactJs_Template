import React, { useEffect } from 'react';
import styles from './view.module.css';
import { useNavigate, useParams, useSearchParams, Params } from 'react-router-dom';
import Business, { State, PathParams, QueryParams } from './business';
import { pageHistoryDict } from '../../global_data/gd_template_data';
import { PageHistory } from '../../global_classes/gc_template_classes';

import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import GcoHeader from '../../global_components/gco_header/view';
import GcoFooter from '../../global_components/gco_footer/view';

// [함수형 컴포넌트 뷰]
const View: React.FC = () => {
  // (보일러 플레이트 코드)
  // 본 페이지 히스토리 정보
  const pageHistoryIdx = window.history.state["idx"];
  const pageHistoryKey = window.history.state["key"];

  // Path 파라미터 객체
  const pathParamsSrc: Readonly<Params<string>> = useParams();
  // Query 파라미터 객체
  const queryParamsSrc: URLSearchParams = useSearchParams()[0];

  if (!(pageHistoryIdx in pageHistoryDict) || pageHistoryDict[pageHistoryIdx].historyKey != pageHistoryKey) {
    // 히스토리 내에 저장되지 않은 페이지 혹은 히스토리 키가 다른 경우
    // 비즈니스 객체 생성
    const mainBusiness: Business = new Business();
    // 히스토리에 비즈니스 객체 할당
    pageHistoryDict[pageHistoryIdx] = new PageHistory(pageHistoryKey, mainBusiness);
    // 비즈니스 객체에 초기 State 설정
    mainBusiness.initMainState(pathParamsSrc, queryParamsSrc);
  }

  // 히스토리에서 페이지의 비즈니스 객체 가져오기
  const mainBusiness: Business = pageHistoryDict[pageHistoryIdx].pageBusiness as Business;

  // 컴포넌트 생명주기를 mainBusiness 로 전달
  useEffect(() => {
    mainBusiness.onComponentDidMount();
    return () => {
      mainBusiness.onComponentWillUnmount();
    }
  }, []);

  // mainBusiness 에 컴포넌트에서만 생성 가능한 변수 할당
  mainBusiness.setMainState = React.useState<any>(mainBusiness.mainState)[1];
  mainBusiness.navigate = useNavigate();

  //----------------------------------------------------------------------------
  // (진입 에러 발생 화면 구성 코드)
  // mainBusiness.initMainState 를 했을 때, 
  // 페이지 구성에 필요한 State, PathParams, QueryParams 가 undefined 일 경우 보여줄 화면을 반환하세요.
  if (
    mainBusiness.mainState == undefined ||
    mainBusiness.pathParams == undefined ||
    mainBusiness.queryParams == undefined
  ) {
    return (
      <div className={styles.MainView}>
        Error
      </div>
    );
  }

  // 페이지 진입 필수정보가 null 이 아니라고 검증된 시점
  const mainState: State = mainBusiness.mainState!;
  const pathParams: PathParams = mainBusiness.pathParams!;
  const queryParams: QueryParams = mainBusiness.queryParams!;

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
      <GcoHeader business={mainState.gcoHeaderBusiness} />

      <List height={400} itemCount={mainState.items.length} itemSize={35} width={300} >
        {Row}
      </List>

      <GcoFooter business={mainState.gcoFooterBusiness} />
    </div>
  );
};

export default View;