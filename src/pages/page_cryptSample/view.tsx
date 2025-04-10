import React, { useEffect, useRef, useState } from 'react';
import styles from './view.module.css';
import { useParams, useSearchParams, Params } from 'react-router-dom';
import Business from './business';
import { pageHistoryDict, currentPageHistoryIdx } from '../../global_data/gd_template_data';
import { PagePathParamBasic, PageQueryParamBasic, PageOutputBasic } from '../../global_classes/gc_template_classes';
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
  }, []);

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
  // useRef, useState, useEffect 와 같은 컴포넌트 전용 함수를 사용하세요.


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
          <div id={styles.Aes256Container}>
            <h2>AES256 알고리즘</h2>

            <div>
              <input type="text" id={styles.Aes256SecretKey} maxLength={32} placeholder="암호키 (32자)" value={mainBusiness.aes256SecretKey} onChange={mainBusiness.onChangeAes256SecretKey} />
              <div id={styles.Aes256SecretKeyInfoContainer}><span id={styles.Aes256SecretKeyErrorMsg}>{mainBusiness.aes256SecretKeyErrorMsg}</span><span id={styles.Aes256SecretKeyWordCount}>{mainBusiness.aes256SecretKeyWordCount}/32</span></div>
            </div>

            <div>
              <input type="text" id={styles.Aes256SecretIv} maxLength={16} placeholder="초기화 벡터 (16자)" value={mainBusiness.aes256SecretIv} onChange={mainBusiness.onChangeAes256SecretIv} />
              <div id={styles.Aes256SecretIvInfoContainer}><span id={styles.Aes256SecretIvErrorMsg}>{mainBusiness.aes256SecretIvErrorMsg}</span><span id={styles.Aes256SecretIvWordCount}>{mainBusiness.aes256SecretIvWordCount}/16</span></div>
            </div>

            <div id={styles.Aes256PlainTextGroup}>
              <input type="text" id={styles.Aes256PlainText} placeholder="암호화할 평문" value={mainBusiness.aes256PlainText} onChange={mainBusiness.onChangeAes256PlainText} />
              <button id={styles.Aes256EncryptButton} onClick={mainBusiness.doAes256Encrypt}>암호화</button>
            </div>

            <div id={styles.Aes256EncryptedResult} >결과 : <span>{mainBusiness.aes256EncryptResult}</span></div>

            <div id={styles.Aes256CipherTextGroup}>
              <input type="text" id={styles.Aes256CipherText} placeholder="복호화할 암호문" value={mainBusiness.aes256CipherText} onChange={mainBusiness.onChangeAes256CipherText} />
              <button id={styles.Aes256DecryptButton} onClick={mainBusiness.doAes256Decrypt}>복호화</button>
            </div>

            <div id={styles.Aes256DecryptedResult} >결과 : <span>{mainBusiness.aes256DecryptResult}</span></div>
          </div>


          <div id={styles.Base64Container}>
            <h2>Base64 알고리즘</h2>

            <div id={styles.Base64PlainTextGroup}>
              <input type="text" id={styles.Base64PlainText} placeholder="암호화할 평문" value={mainBusiness.base64PlainText} onChange={mainBusiness.onChangeBase64PlainText} />
              <button id={styles.Base64EncryptButton} onClick={mainBusiness.doBase64Encrypt}>암호화</button>
            </div>

            <div id={styles.Base64EncryptedResult} >결과 : <span>{mainBusiness.base64EncryptResult}</span></div>

            <div id={styles.Base64CipherTextGroup}>
              <input type="text" id={styles.Base64CipherText} placeholder="복호화할 암호문" value={mainBusiness.base64CipherText} onChange={mainBusiness.onChangeBase64CipherText} />
              <button id={styles.Base64DecryptButton} onClick={mainBusiness.doBase64Decrypt}>복호화</button>
            </div>

            <div id={styles.Base64DecryptedResult} >결과 : <span>{mainBusiness.base64DecryptResult}</span></div>
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

// [Page Output VO 클래스]
export class PageOutputVo implements PageOutputBasic {
}

export default View;