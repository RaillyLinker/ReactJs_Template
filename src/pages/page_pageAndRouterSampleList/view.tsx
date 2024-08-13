import React, { useEffect } from 'react';
import styles from './view.module.css';
import { useNavigate, useParams, useSearchParams, Params, Outlet } from 'react-router-dom';
import Business, { PathParams, QueryParams } from './business';
import { pageHistoryDict, currentPageHistoryIdx } from '../../global_data/gd_template_data';

import GcoOuterFrame from '../../global_components/gco_outer_frame/view';

// [함수형 컴포넌트 뷰]
const View: React.FC = () => {
  // (보일러 플레이트 코드)
  // 본 페이지 히스토리 정보
  const pageHistoryIdx: number = window.history.state["idx"];
  const pageHistoryKey: string = window.history.state["key"];

  // Path 파라미터 객체
  const pathParamsSrc: Readonly<Params<string>> = useParams();
  // Query 파라미터 객체
  const queryParamsSrc: URLSearchParams = useSearchParams()[0];

  let mainBusinessOpt: Business | null = null;
  if (!(pageHistoryIdx in pageHistoryDict)) {
    // 히스토리 내에 저장되지 않은 경우
    // 비즈니스 객체 생성
    mainBusinessOpt = new Business(pageHistoryIdx, pageHistoryKey, pathParamsSrc, queryParamsSrc);
    // 히스토리에 비즈니스 객체 할당
    pageHistoryDict[pageHistoryIdx] = mainBusinessOpt;
  } else if (pageHistoryDict[pageHistoryIdx].historyKey !== pageHistoryKey) {
    // 히스토리 키가 다른 경우
    // 페이지 히스토리 인덱스 큰 값을 제거
    for (const historyIdx in pageHistoryDict) {
      const numIdx = Number(historyIdx);
      if (numIdx > pageHistoryIdx) {
        delete pageHistoryDict[numIdx];
      }
    }

    // 비즈니스 객체 생성
    mainBusinessOpt = new Business(pageHistoryIdx, pageHistoryKey, pathParamsSrc, queryParamsSrc);
    // 히스토리에 비즈니스 객체 할당
    pageHistoryDict[pageHistoryIdx] = mainBusinessOpt;
  }

  if (mainBusinessOpt === null) {
    // Business 가 새로 생성되지 않은 경우
    // 히스토리에서 가져오기
    mainBusinessOpt = pageHistoryDict[pageHistoryIdx] as Business;
  }

  // 비즈니스 객체 할당
  const mainBusiness: Business = mainBusinessOpt;

  // 컴포넌트 생명주기를 mainBusiness 로 전달
  useEffect(() => {
    mainBusiness.onComponentDidMount(mainBusiness.firstMount);
    mainBusiness.firstMount = false;
    return () => {
      mainBusiness.onComponentWillUnmount();
    }
  }, [mainBusiness]);

  // 이전 페이지 비즈니스 객체 저장 및 현재 페이지 인덱스를 전역 변수에 저장
  if (currentPageHistoryIdx.idx !== pageHistoryIdx &&
    currentPageHistoryIdx.idx !== null &&
    currentPageHistoryIdx.idx in pageHistoryDict) {
    mainBusiness.prevPageBusiness = pageHistoryDict[currentPageHistoryIdx.idx];
  }
  currentPageHistoryIdx.idx = pageHistoryIdx;

  const setScreenFlag = React.useState<boolean>(mainBusiness.screenFlag)[1];
  mainBusiness.setScreenFlag = setScreenFlag;
  const navigate = useNavigate();
  mainBusiness.navigate = navigate;


  // !!!아래부터 코딩!!!
  //----------------------------------------------------------------------------
  // (컴포넌트에서만 실행 가능한 함수 사용)
  // useRef, useState 와 같은 컴포넌트 전용 함수를 사용하세요.


  //----------------------------------------------------------------------------
  // (진입 에러 발생 화면 구성 코드)
  // mainBusiness.onCheckPageInputVo 함수를 실행 했을 때, 
  // 페이지 구성에 필요한 pathParams, queryParams 가 null 일 경우 보여줄 화면을 반환하세요.
  if (
    mainBusiness.pathParams === null ||
    mainBusiness.queryParams === null
  ) {
    return (
      <div>
        Entering Error
      </div>
    );
  }

  // 페이지 진입 필수정보가 null 이 아니라고 검증된 시점
  const pathParams: PathParams = mainBusiness.pathParams!;
  const queryParams: QueryParams = mainBusiness.queryParams!;


  //----------------------------------------------------------------------------
  // (컴포넌트 화면 구성 코드)
  return (
    <div id={styles.MainView}>
      <GcoOuterFrame business={mainBusiness.gcoOuterFrameBusiness} >
        <div id={styles.MainContent}>
          {mainBusiness.items.map(item => (
            <div key={item.uid}>
              <div id={styles.ListItem} onClick={item.onItemClicked}>
                <div id={styles.ListTitle} >{item.itemTitle}</div>
                <div id={styles.ListDescription}>{item.itemDescription}</div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </GcoOuterFrame>
      <Outlet />
    </div>
  );
};

export default View;