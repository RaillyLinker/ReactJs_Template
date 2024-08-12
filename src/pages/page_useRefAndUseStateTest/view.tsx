import React, { useEffect, useRef } from 'react';
import styles from './view.module.css';
import { useNavigate, useParams, useSearchParams, Params } from 'react-router-dom';
import Business, { PathParams, QueryParams } from './business';
import { pageHistoryDict, currentPageHistoryIdx } from '../../global_data/gd_template_data';
import { PageHistory } from '../../global_classes/gc_template_classes';

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

  if (!(pageHistoryIdx in pageHistoryDict) || pageHistoryDict[pageHistoryIdx].historyKey != pageHistoryKey) {
    if (pageHistoryIdx in pageHistoryDict && pageHistoryDict[pageHistoryIdx].historyKey != pageHistoryKey) {
      // 페이지 히스토리 인덱스 큰 값을 제거
      for (const key in pageHistoryDict) {
        const numKey = Number(key);
        if (numKey > pageHistoryIdx) {
          delete pageHistoryDict[numKey];
        }
      }
    }

    // 히스토리 내에 저장되지 않은 페이지 혹은 히스토리 키가 다른 경우
    // 비즈니스 객체 생성
    const mainBusiness: Business = new Business();
    // 히스토리에 비즈니스 객체 할당
    pageHistoryDict[pageHistoryIdx] = new PageHistory(pageHistoryKey, mainBusiness);
    // 컴포넌트 입력 파라미터 확인 및 초기화
    mainBusiness.onCheckPageInputVo(pathParamsSrc, queryParamsSrc);
  }

  // 히스토리에서 페이지의 비즈니스 객체 가져오기
  const historyMainBusiness = pageHistoryDict[pageHistoryIdx].pageBusiness
  let mainBusiness: Business = historyMainBusiness as Business;

  // pageHistoryIdx 가 다를 경우에 대한 처리
  // 페이지 이동 애니메이션 적용시 pageHistoryIdx 는 새로운 페이지의 인덱스인 상태로 본 페이지가 한번 더 랜더링 됩니다.
  // 이는 페이지 이동시 기존 페이지를 보여주려는 동작에서 나타난 현상입니다.
  if (!(historyMainBusiness instanceof Business)) {
    mainBusiness = mainBusiness.prevPageBusiness as Business;
  }

  // 컴포넌트 생명주기를 mainBusiness 로 전달
  useEffect(() => {
    mainBusiness.onComponentDidMount(mainBusiness.firstMount);
    mainBusiness.firstMount = false;
    return () => {
      mainBusiness.onComponentWillUnmount();
    }
  }, []);

  mainBusiness.setScreenFlag = React.useState<boolean>(mainBusiness.screenFlag)[1];
  mainBusiness.navigate = useNavigate();

  // 이전 페이지 비즈니스 객체 저장 및 현재 페이지 인덱스를 전역 변수에 저장
  if (currentPageHistoryIdx.idx != pageHistoryIdx &&
    currentPageHistoryIdx.idx != null &&
    currentPageHistoryIdx.idx in pageHistoryDict) {
    mainBusiness.prevPageBusiness = pageHistoryDict[currentPageHistoryIdx.idx].pageBusiness;
  }
  currentPageHistoryIdx.idx = pageHistoryIdx;


  // !!!아래부터 코딩!!!
  //----------------------------------------------------------------------------
  // (컴포넌트에서만 실행 가능한 함수 사용)
  // useRef, useState 와 같은 컴포넌트 전용 함수를 사용하세요.

  // 테스트 숫자 레퍼런스
  mainBusiness.testNumberForUseRefRef = useRef<HTMLDivElement>(null);


  //----------------------------------------------------------------------------
  // (진입 에러 발생 화면 구성 코드)
  // mainBusiness.onCheckPageInputVo 함수를 실행 했을 때, 
  // 페이지 구성에 필요한 pathParams, queryParams 가 undefined 일 경우 보여줄 화면을 반환하세요.
  if (
    mainBusiness.pathParams == undefined ||
    mainBusiness.queryParams == undefined
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
          <div className={styles.SampleLabel}>useState 화면 갱신</div>
          <div id={styles.PageStateNumber} onClick={mainBusiness.onClickTestNumberForUseState}>
            {mainBusiness.testNumberForUseState}
          </div>
          <div id={styles.PageStateLabel} className={styles.SampleLabel}>useRef 요소 갱신</div>
          <div id={styles.PageStateNumber} ref={mainBusiness.testNumberForUseRefRef} onClick={mainBusiness.onClickTestNumberForUseRef}>
            {mainBusiness.testNumberForUseRef}
          </div>
        </span>
      </GcoOuterFrame>
    </div>
  );
};

export default View;