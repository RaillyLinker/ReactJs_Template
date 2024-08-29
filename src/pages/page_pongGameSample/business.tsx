import { Params } from 'react-router-dom';
import { PageBusinessBasic } from '../../global_classes/gc_template_classes';
import { PathParams, QueryParams } from './view';
import GcoDialogFrameBusiness from '../../global_components/gco_dialogFrame/business';
import { Bounce, toast } from 'react-toastify';

import GcoOuterFrameBusiness from '../../global_components/gco_outerFrame/business';


// [비즈니스 클래스]
class Business extends PageBusinessBasic {
  // (페이지 파라미터)
  // null 이라면 잘못된 진입
  // Path Parameter 로 받은 값
  pathParams: PathParams | null = null;
  // Query Parameter 로 받은 값
  queryParams: QueryParams | null = null;


  //----------------------------------------------------------------------------
  // [멤버 변수 공간]
  // 멤버 변수는 컴포넌트가 히스토리에서 삭제될 때까지 유지됩니다.

  // (다이얼로그 프레임 비즈니스)
  gcoDialogFrameBusiness: GcoDialogFrameBusiness = new GcoDialogFrameBusiness(this);

  // (페이지 외곽 프레임 비즈니스)
  gcoOuterFrameBusiness: GcoOuterFrameBusiness = new GcoOuterFrameBusiness(this, "Pong 게임 샘플");

  // (토스트 컨테이너 설정)
  // 새로운 토스트를 위에서 나타내게 하기(bottom 토스트에 좋습니다.)
  toastNewestOnTop = false;
  // 토스트 내용을 우측정렬
  toastRightToLeftLayout = false;
  // 포커스 해제시 멈춤
  toastPauseOnFocusLoss = true;

  // (게임 설정)
  // 패들 크기
  paddleWidth: number = 10;
  paddleHeight: number = 100;
  // 공 크기
  ballSize: number = 10;
  // 공 속도
  ballSpeed: number = 1.5;

  // (게임 상황)
  // 플레이어 위치
  playerY: number = 0;
  // 컴퓨터 위치
  computerY: number = 0;
  // 공 위치
  ballX: number = 100;
  ballY: number = 100;
  // 공 속도
  ballSpeedX: number = this.ballSpeed;
  ballSpeedY: number = this.ballSpeed;
  // 시스템 객체
  animationFrameId: number | null = null;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null> | null = null;
  canvas: HTMLCanvasElement | null = null;


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
  // (컴포넌트 실행 로직 For Pong)
  onComponentDidMountForPong = () => {
    if (!this.canvasRef || !this.canvasRef.current) return;
    // canvas 객체 할당
    this.canvas = this.canvasRef.current;
    // canvas 에 마우스 리스너 추가
    this.canvas.addEventListener('mousemove', this.handleMouseMove);

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // 게임 실행
    // requestAnimationFrame 함수는 브라우저의 화면 새로 고침 주기에 맞춰 실행되므로, 애니메이션이 더 부드럽고 자원을 적게 소모하게 됩니다.
    // 사용자의 화면 주사율(예: 60Hz, 120Hz)에 맞춰서 애니메이션이 자동으로 조정됩니다. 따라서 모든 화면에서 일관된 애니메이션이 보장됩니다.
    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  }

  // (컴포넌트 종료 로직 For Pong)
  onComponentWillUnmountForPong = () => {
    // 게임 중지
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // 마우스 리스너 제거
    if (this.canvas) {
      this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    }
  }

  // (마우스 움직임 조작)
  handleMouseMove = (e: MouseEvent) => {
    if (this.canvas) {
      // 마우스 움직임에 따라 player 패들 위치 조정
      this.playerY =
        Math.max(
          0,
          Math.min(
            e.clientY - this.canvas.getBoundingClientRect().top - this.paddleHeight / 2,
            this.canvas.height - this.paddleHeight
          )
        );
      this.reRender();
    }
  };

  // (프레임당 게임 실행 로직)
  gameLoop = () => {
    if (this.canvas) {
      const ctx = this.canvas.getContext('2d');
      if (!ctx) return;

      // 공 속도에 따라 새로운 공 x 좌표 생성
      const newBallX = this.ballX + this.ballSpeedX;

      // 새로운 공 x 좌표 검증
      if (newBallX <= this.paddleWidth) {
        if (this.ballY >= this.playerY && this.ballY <= this.playerY + this.paddleHeight) {
          // 충돌시 운동방향 반전
          this.ballSpeedX = -this.ballSpeedX;
        } else {
          this.ballX = 100;
          this.ballY = 100;
          this.ballSpeedX = this.ballSpeed;
          this.ballSpeedY = this.ballSpeed;
        }
      } else if (newBallX >= this.canvas.width - this.ballSize) {
        this.ballSpeedX = -this.ballSpeedX;
      }

      // 공 x 좌표 할당
      this.ballX = newBallX;

      // 공 속도에 따라 새로운 공 y 좌표 생성
      const newBallY = this.ballY + this.ballSpeedY;

      // 새로운 공 y 좌표 검증
      if (newBallY <= 0 || newBallY >= this.canvas.height - this.ballSize) {
        // 충돌시 운동방향 반전
        this.ballSpeedY = -this.ballSpeedY;
      }

      // 공 y 좌표 할당
      this.ballY = newBallY;

      // 컴퓨터 패들 위치 조정
      const newComputerY = this.ballY - this.paddleHeight / 2;
      this.computerY = Math.max(0, Math.min(newComputerY, this.canvas.height - this.paddleHeight));

      // 캔버스 초기화
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 플레이어 패들 그리기
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, this.playerY, this.paddleWidth, this.paddleHeight);

      // 컴퓨터 패들 그리기
      ctx.fillRect(this.canvas.width - this.paddleWidth, this.computerY, this.paddleWidth, this.paddleHeight);

      // 공 현재 위치 그리기
      ctx.beginPath();
      ctx.arc(this.ballX, this.ballY, this.ballSize / 2, 0, Math.PI * 2);
      ctx.fill();

      // 리랜더링
      this.reRender();
    }
  };


  //----------------------------------------------------------------------------
  // [private 함수]
}

export default Business;