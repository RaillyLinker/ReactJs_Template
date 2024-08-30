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
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";


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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const ffmpeg = new FFmpeg();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const captureFrame = async () => {
    if (!videoFile || !videoRef.current) return;
    if (startTime < 0 || endTime < 0) {
      alert("Start time and end time must be non-negative.");
      return;
    }
    if (endTime <= startTime) {
      alert("End time must be greater than start time.");
      return;
    }

    setLoading(true);

    // FFmpeg.js 초기화
    await ffmpeg.load();
    await ffmpeg.writeFile(videoFile.name, await fetchFile(videoFile));

    // 영상 길이 확인
    const duration = videoRef.current.duration * 1000;
    const actualEndTime = Math.min(endTime, duration);

    // 무작위 프레임 선정
    const randomTime = Math.floor(Math.random() * (actualEndTime - startTime)) + startTime;

    // 무작위 프레임 추출
    const outputFilename = `frame-${randomTime}.jpg`;
    await ffmpeg.exec([
      "-i", videoFile.name,
      "-ss", (randomTime / 1000).toFixed(2),
      "-vframes", "1",
      outputFilename,
    ]);

    const data = await ffmpeg.readFile(outputFilename);
    const url = URL.createObjectURL(new Blob([data], { type: "image/jpeg" }));

    // 이미지 다운로드
    const a = document.createElement("a");
    a.href = url;
    a.download = `frame-${randomTime}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setLoading(false);
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
            <h2>캡쳐할 동영상 파일 선택</h2>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <br />
            <input
              type="number"
              placeholder="Start time (ms)"
              onChange={(e) => setStartTime(parseInt(e.target.value))}
              min={0}
            />
            <input
              type="number"
              placeholder="End time (ms)"
              onChange={(e) => setEndTime(parseInt(e.target.value))}
              min={0}
            />
            {videoFile && (
              <div id={styles.VideoSample}>
                <video
                  ref={videoRef}
                  src={URL.createObjectURL(videoFile)}
                  controls
                  width="600px"
                  height="400px"
                />
                <button onClick={captureFrame} disabled={loading} style={{ marginTop: "10px" }}>
                  Capture Frame
                </button>
              </div>
            )}
            {loading && <p>Capturing frame...</p>}
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