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

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    // 패들 높이
    const paddleHeight = 100;
    // 패들 너비
    const paddleWidth = 10;
    // 공 반지름
    const ballRadius = 10;
    // 플레이어 패들 X 좌표
    const playerPaddleX = 10;

    // 플레이어 패들 Y 좌표(초기에는 canvas 중간)
    let playerPaddleY = (canvas.height - paddleHeight) / 2;
    // 공 X 좌표 (초기에는 canvas 중간)
    let ballX = canvas.width / 2;
    // 공 Y 좌표 (초기에는 canvas 중간)
    let ballY = canvas.height / 2;
    // X 축 공 속도
    let ballSpeedX = 5;
    // Y 축 공 속도
    let ballSpeedY = 3;

    // 공 최소 속도
    const minSpeed = 5;
    // 패들에 부딪쳤을 때의 공 가속
    const speedIncrement = 0.1;


    // 게임판 그리기 함수(재귀적으로 반복됨)
    const moveBall = () => {
      // 공 속도에 따른 이동
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        // 공이 canvas 위아래에 부딪쳤을 경우
        // 공의 Y축 운동 방향 반전
        ballSpeedY = -ballSpeedY;
      }

      if (ballX + ballRadius > canvas.width) {
        // 공이 canvas 우측에 부딪쳤을 경우
        // 공의 X축 운동 방향 변경
        ballSpeedX = -ballSpeedX;
      }

      if (
        ballX - ballRadius < playerPaddleX + paddleWidth &&
        ballY > playerPaddleY &&
        ballY < playerPaddleY + paddleHeight
      ) {
        // 공이 플레이어 패들에 부딪친 경우
        // 공의 X축 운동 방향 변경
        ballSpeedX = -ballSpeedX;

        // 운동량 증가
        ballSpeedX *= 1 + speedIncrement;
        ballSpeedY *= 1 + speedIncrement;
      }

      if (ballX - ballRadius < 0) {
        // 공이 좌측 벽에 충돌한 경우 (게임오버)
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        // 공 속도 초기화 및 방향 변경
        ballSpeedX = ballSpeedX > 0 ? -minSpeed : minSpeed;
        ballSpeedY = 3;
      }
    };

    // 게임 엔진
    const intervalId = setInterval(moveBall, 20);

    // 그래픽 엔진
    // 게임판 그리기 함수(재귀적으로 반복됨)
    const draw = () => {
      // 게임판 그리기
      context.clearRect(0, 0, canvas.width, canvas.height);

      // 플레이어 패들 현재 상태 그리기
      context.fillStyle = 'black';
      context.fillRect(playerPaddleX, playerPaddleY, paddleWidth, paddleHeight);

      // 공 현재 상태 그리기
      context.beginPath();
      context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      context.fill();
      context.closePath();

      // 게임판 그리기 반복
      requestAnimationFrame(draw);
    };

    // 마우스 핸들러
    const handleMouseMove = (event: MouseEvent) => {
      // 마우스의 Y 축 움직임에 따른 플레이어 패들 Y 좌표 수정
      const mouseY = event.clientY - canvas.getBoundingClientRect().top - document.documentElement.scrollTop;
      playerPaddleY = mouseY - paddleHeight / 2;

      // 플레이어 패들의 양 끝이 상하단 게임판을 넘지 않도록 처리
      if (playerPaddleY < 0) {
        playerPaddleY = 0;
      } else if (playerPaddleY + paddleHeight > canvas.height) {
        playerPaddleY = canvas.height - paddleHeight;
      }
    };

    // 마우스 핸들러 입력
    canvas.addEventListener('mousemove', handleMouseMove);

    // 게임판 그리기 시작
    draw();

    return () => {
      // 마우스 핸들러 제거
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


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
            <div style={{ textAlign: 'center', color: 'black', backgroundColor: 'white', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <canvas
                ref={canvasRef}
                width="800"
                height="600"
                style={{ backgroundColor: 'white', border: '2px solid black' }}
              />
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