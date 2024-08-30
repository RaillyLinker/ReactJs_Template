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
  mainBusiness.mediaRecorderRef = useRef<MediaRecorder | null>(null);
  mainBusiness.recordedChunks = useRef<Blob[]>([]);

  useEffect(() => {
    if (mainBusiness.isCameraOn) {
      startCamera();
    } else {
      stopCamera();
    }

    // 페이지를 떠나거나 뒤로 가기 시 카메라 정리
    return () => {
      stopCamera();
    };
  }, [mainBusiness.isCameraOn]);

  const startCamera = async () => {
    try {
      mainBusiness.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (mainBusiness.videoRef && mainBusiness.videoRef.current) {
        mainBusiness.videoRef.current.srcObject = mainBusiness.stream;
      }
      mainBusiness.error = null;
      mainBusiness.reRender();

      mainBusiness.stream.getTracks()[0].onended = () => {
        handleCameraDisconnected();
      };
    } catch (err) {
      mainBusiness.error = 'Cannot access the camera. Please check your device.';
      mainBusiness.reRender();
    }
  };

  const stopCamera = () => {
    if (mainBusiness.videoRef && mainBusiness.videoRef.current?.srcObject) {
      const stream = mainBusiness.videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      mainBusiness.videoRef.current.srcObject = null;
    }
    if (mainBusiness.stream) {
      mainBusiness.stream.getTracks().forEach(track => track.stop());
      mainBusiness.stream = null;
    }
    mainBusiness.isRecording = false;
    mainBusiness.isMirrored = false;
    mainBusiness.reRender();
  };

  const handleMirrorToggle = () => {
    mainBusiness.isMirrored = !mainBusiness.isMirrored;
    mainBusiness.reRender();
  };

  const handleCapture = () => {
    if (mainBusiness.videoRef && mainBusiness.videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = mainBusiness.videoRef.current.videoWidth;
      canvas.height = mainBusiness.videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        if (mainBusiness.isMirrored) {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        context.drawImage(mainBusiness.videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'capture.png';
        link.click();
      }
    }
  };

  const handleRecordToggle = () => {
    if (mainBusiness.isRecording) {
      if (mainBusiness.mediaRecorderRef) {
        mainBusiness.mediaRecorderRef.current?.stop();
      }
    } else {
      startRecording();
    }
    mainBusiness.isRecording = !mainBusiness.isRecording;
    mainBusiness.reRender();
  };

  const startRecording = () => {
    if (mainBusiness.videoRef && mainBusiness.videoRef.current?.srcObject && mainBusiness.mediaRecorderRef) {
      const stream = mainBusiness.videoRef.current.srcObject as MediaStream;
      mainBusiness.mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });

      mainBusiness.mediaRecorderRef.current.ondataavailable = event => {
        if (event.data.size > 0 && mainBusiness.recordedChunks) {
          mainBusiness.recordedChunks.current.push(event.data);
        }
      };

      mainBusiness.mediaRecorderRef.current.onstop = () => {
        if (mainBusiness.recordedChunks) {
          const blob = new Blob(mainBusiness.recordedChunks.current, { type: 'video/webm' });
          mainBusiness.recordedChunks.current = [];
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'recording.webm';
          link.click();
          URL.revokeObjectURL(url);
        }
      };

      mainBusiness.mediaRecorderRef.current.start();
    }
  };

  const handleCameraDisconnected = () => {
    mainBusiness.isCameraOn = false;
    mainBusiness.isRecording = false;
    mainBusiness.error = 'Camera has been disconnected.';
    mainBusiness.reRender();
  };


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
            <button onClick={() => { mainBusiness.isCameraOn = !mainBusiness.isCameraOn; mainBusiness.reRender(); }}>
              {mainBusiness.isCameraOn ? 'Camera Off' : 'Camera On'}
            </button>

            <div style={{ marginTop: '20px', width: '40rem', height: '40rem', border: '2px solid black', position: 'relative' }}>
              {mainBusiness.error && <div style={{ color: 'red', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>{mainBusiness.error}</div>}
              <video
                ref={mainBusiness.videoRef}
                style={{ width: '100%', height: '100%', transform: mainBusiness.isMirrored ? 'scaleX(-1)' : 'none' }}
                autoPlay
                playsInline
              />
            </div>

            {mainBusiness.isCameraOn && !mainBusiness.error && (
              <div style={{ marginTop: '10px' }}>
                <button onClick={handleMirrorToggle}>
                  {mainBusiness.isMirrored ? 'Unmirror' : 'Mirror'}
                </button>
                <button onClick={handleCapture}>Capture</button>
                <button onClick={handleRecordToggle}>
                  {mainBusiness.isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
              </div>
            )}
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