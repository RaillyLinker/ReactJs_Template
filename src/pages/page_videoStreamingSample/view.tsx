import React, { useEffect, useRef, useState } from 'react';
import styles from './view.module.css';
import { useParams, useSearchParams, Params } from 'react-router-dom';
import Business from './business';
import { pageHistoryDict, currentPageHistoryIdx } from '../../global_data/gd_template_data';
import { PagePathParamBasic, PageQueryParamBasic } from '../../global_classes/gc_template_classes';
import GcoDialogFrame from '../../global_components/gco_dialogFrame/view';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GcoOuterFrame from '../../global_components/gco_outerFrame/view';


// [뷰 함수]
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

  // State 할당
  [mainBusiness.screenFlag, mainBusiness.setScreenFlag] = React.useState<{}>(mainBusiness.screenFlag);


  // !!!아래부터 코딩!!!
  //----------------------------------------------------------------------------
  // (컴포넌트에서만 실행 가능한 함수 사용)
  // useRef, useState 와 같은 컴포넌트 전용 함수를 사용하세요.
  mainBusiness.videoRef = useRef<HTMLVideoElement>(null);


  //----------------------------------------------------------------------------
  // (진입 에러 발생 화면 구성 코드)
  // mainBusiness.onCheckPageInputVo 함수를 실행 했을 때, 
  // 페이지 구성에 필요한 pathParams, queryParams 가 null 일 경우 보여줄 화면을 반환하세요.
  if (
    mainBusiness.pathParams === null ||
    mainBusiness.queryParams === null
  ) {
    return (
      <div id={styles.MainView}>
        <GcoDialogFrame business={mainBusiness.gcoDialogFrameBusiness}>
          <GcoOuterFrame business={mainBusiness.gcoOuterFrameBusiness} >
            <p>Entering Error</p>
            <ToastContainer
              newestOnTop={mainBusiness.toastNewestOnTop}
              rtl={mainBusiness.toastRightToLeftLayout}
              pauseOnFocusLoss={mainBusiness.toastPauseOnFocusLoss}
            />
          </GcoOuterFrame>
        </GcoDialogFrame>
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
      <GcoDialogFrame business={mainBusiness.gcoDialogFrameBusiness}>
        <GcoOuterFrame business={mainBusiness.gcoOuterFrameBusiness} >
          <div id={styles.MainContent}>

            <div style={{ padding: '10px 20px' }}>
              <h2>해상도 선택</h2>
              <button className={styles.ResolutionButton} onClick={() => mainBusiness.handleResolutionChange('H240', '240p')}>240p</button>
              <button className={styles.ResolutionButton} onClick={() => mainBusiness.handleResolutionChange('H360', '360p')}>360p</button>
              <button className={styles.ResolutionButton} onClick={() => mainBusiness.handleResolutionChange('H480', '480p')}>480p</button>
              <button className={styles.ResolutionButton} onClick={() => mainBusiness.handleResolutionChange('H720', '720p')}>720p</button>

              <h2>비디오 <span>{`(${mainBusiness.videoResolutionText})`}</span></h2>
              <video
                id={styles.Video}
                ref={mainBusiness.videoRef}
                preload="auto"
                controls
                onTimeUpdate={mainBusiness.videoTimeUpdateHandler}
                onPause={mainBusiness.videoPauseHandler}
                onPlay={mainBusiness.videoPlayHandler}
                // 다운로드 방지 방법
                // 1. 서버에서 클라이언트를 통하지 않은 직접 다운로드를 차단합니다.
                // 2. 아래 설정으로 다운로드 버튼 없애기
                controlsList="nodownload"
                // 3. 아래 설정으로 우클릭 방지
                onContextMenu={(e) => e.preventDefault()}
              >
                <source
                  id="movie_src"
                  type="video/mp4"
                  src={mainBusiness.videoSrc}
                />
              </video>
            </div>

          </div>
          <ToastContainer
            newestOnTop={mainBusiness.toastNewestOnTop}
            rtl={mainBusiness.toastRightToLeftLayout}
            pauseOnFocusLoss={mainBusiness.toastPauseOnFocusLoss}
          />
        </GcoOuterFrame>
      </GcoDialogFrame>
    </div>
  );
};


//----------------------------------------------------------------------------
// [Path Parameter VO 클래스]
export class PathParams implements PagePathParamBasic {
}


// [Query Parameter VO 클래스]
export class QueryParams implements PageQueryParamBasic {
}

export default View;