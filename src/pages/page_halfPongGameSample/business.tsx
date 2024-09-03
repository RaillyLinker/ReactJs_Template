import { Params } from 'react-router-dom';
import { PageBusinessBasic } from '../../global_classes/gc_template_classes';
import { PathParams, QueryParams } from './view';
import GcoDialogFrameBusiness from '../../global_components/gco_dialogFrame/business';
import { Bounce, toast } from 'react-toastify';

import GcoOuterFrameBusiness from '../../global_components/gco_outerFrame/business';


// [비즈니스 클래스]
// 비즈니스 클래스 객체는 이를 소유한 부모 페이지 컴포넌트가 히스토리에서 삭제될 때까지 유지됩니다.
class Business extends PageBusinessBasic {
  // (페이지 파라미터)
  // null 이라면 잘못된 진입
  // Path Parameter 로 받은 값
  pathParams: PathParams | null = null;
  // Query Parameter 로 받은 값
  queryParams: QueryParams | null = null;


  //----------------------------------------------------------------------------
  // [멤버 변수 공간]
  // (다이얼로그 프레임 비즈니스)
  gcoDialogFrameBusiness: GcoDialogFrameBusiness = new GcoDialogFrameBusiness(this);

  // (페이지 외곽 프레임 비즈니스)
  gcoOuterFrameBusiness: GcoOuterFrameBusiness = new GcoOuterFrameBusiness(this, "Half Pong 게임 샘플");

  // (토스트 컨테이너 설정)
  // 새로운 토스트를 위에서 나타내게 하기(bottom 토스트에 좋습니다.)
  toastNewestOnTop = false;
  // 토스트 내용을 우측정렬
  toastRightToLeftLayout = false;
  // 포커스 해제시 멈춤
  toastPauseOnFocusLoss = true;

  //
  canvasRef: React.RefObject<HTMLCanvasElement> | null = null;


  //----------------------------------------------------------------------------
  // [생명주기 함수]
  // (생성자)
  constructor(
    historyIdx: number,
    historyKey: string,
    // Path 파라미터 객체 (ex : pathParams["testPath"])
    pathParams: Readonly<Params<string>>,
    // Query 파라미터 객체 (ex : queryParams.get("testQuery"))
    queryParams: URLSearchParams
  ) {
    super(historyIdx, historyKey);

    // (컴포넌트 입력 파라미터 확인 및 초기화)
    // this.pathParams, this.queryParams 를 입력하면 되며,
    // 만약 하나라도 null 이라면 에러 화면이 나오게 됩니다.

    // Query 파라미터 객체로 값 입력하기
    // (ex : const queryParam: string | null = queryParams.get("queryParam");)

    // Query 파라미터 필수 값 확인(Path 파라미터 미입력시 진입 자체가 성립되지 않습니다.)
    // ex : if (queryParam === null) { return; }

    // Path 파라미터 객체로 값 입력하기
    // (ex : const pathParam: string = pathParams["pathParam"]!;)

    // 파라미터 값 할당
    this.pathParams = {};

    this.queryParams = {};
  }

  // (컴포넌트가 마운트된 직 후)
  // 컴포넌트가 마운트된 직 후에 호출됩니다. 
  // DOM 노드가 있어야 하는 초기화 작업은 이 메서드에서 이루어지면 됩니다.
  // 외부에서 데이터를 불러와야 한다면 네트워크 요청을 보내기 적절한 위치라고 할 수 있습니다.
  onComponentDidMount = (firstMount: boolean) => {
  }

  // (컴포넌트가 마운트 해제되어 제거되기 직전)
  // 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 
  // 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
  // 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다. 
  // 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
  onComponentWillUnmount = () => {
  }


  //----------------------------------------------------------------------------
  // [public 함수]
  gameHook = () => {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.current;
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
    let ballSpeedX = 10;
    // Y 축 공 속도
    let ballSpeedY = 5;

    // 공 최소 속도
    const minSpeedX = 10;
    const minSpeedY = 5;
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
        ballSpeedX = ballSpeedX > 0 ? -minSpeedX : minSpeedX;
        ballSpeedY = minSpeedY;
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
  }


  //----------------------------------------------------------------------------
  // [private 함수]
}

export default Business;