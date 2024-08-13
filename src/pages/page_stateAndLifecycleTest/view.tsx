import React, { useEffect, useRef } from 'react';
import styles from './view.module.css';
import { useNavigate, useParams, useSearchParams, Params } from 'react-router-dom';
import Business, { PathParams, QueryParams } from './business';
import { pageHistoryDict, currentPageHistoryIdx } from '../../global_data/gd_template_data';

import GcoOuterFrame from '../../global_components/gco_outer_frame/view';
import GcoTest from '../../global_components/gco_test/view';

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
  const setScreenFlag = React.useState<boolean>(mainBusiness.screenFlag)[1];
  const navigate = useNavigate();
  useEffect(() => {
    mainBusiness.setScreenFlag = setScreenFlag;
    mainBusiness.navigate = navigate;
    mainBusiness.onComponentDidMount(mainBusiness.firstMount);
    mainBusiness.firstMount = false;
    return () => {
      mainBusiness.onComponentWillUnmount();
      mainBusiness.setScreenFlag = undefined;
      mainBusiness.navigate = undefined;
    }
  }, [mainBusiness]);

  // 이전 페이지 비즈니스 객체 저장 및 현재 페이지 인덱스를 전역 변수에 저장
  if (currentPageHistoryIdx.idx !== pageHistoryIdx &&
    currentPageHistoryIdx.idx !== null &&
    currentPageHistoryIdx.idx in pageHistoryDict) {
    mainBusiness.prevPageBusiness = pageHistoryDict[currentPageHistoryIdx.idx];
  }
  currentPageHistoryIdx.idx = pageHistoryIdx;


  // !!!아래부터 코딩!!!
  //----------------------------------------------------------------------------
  // (컴포넌트에서만 실행 가능한 함수 사용)
  // useRef, useState 와 같은 컴포넌트 전용 함수를 사용하세요.

  // 테스트 숫자 레퍼런스
  mainBusiness.testNumberRef = useRef<HTMLDivElement>(null);


  //----------------------------------------------------------------------------
  // (진입 에러 발생 화면 구성 코드)
  // mainBusiness.onCheckPageInputVo 함수를 실행 했을 때, 
  // 페이지 구성에 필요한 pathParams, queryParams 가 undefined 일 경우 보여줄 화면을 반환하세요.
  if (
    mainBusiness.pathParams === undefined ||
    mainBusiness.queryParams === undefined
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
        <span id={styles.MainContent}>
          <div className={styles.SampleLabel}>Gco 컴포넌트 State</div>
          <GcoTest business={mainBusiness.gcoTestBusiness} />
          <div id={styles.PageStateLabel} className={styles.SampleLabel}>페이지 State</div>
          <div id={styles.PageStateNumber} ref={mainBusiness.testNumberRef} onClick={mainBusiness.onClickTestNumber}>
            {mainBusiness.testNumber}
          </div>

          <button id={styles.PageChangeButton} onClick={mainBusiness.onClickPageChange}>페이지 이동</button>
        </span>
      </GcoOuterFrame>
    </div>
  );
};

export default View;