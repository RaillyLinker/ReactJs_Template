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

  //
  paddleWidth: number = 10;
  paddleHeight: number = 100;
  ballSize: number = 10;
  ballSpeed: number = 1; // 공의 속도를 설정합니다.
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null> | null = null;
  playerY: number = 0;
  ballX: number = 100;
  ballY: number = 100;
  animationFrameId: number | null = null;
  ballSpeedX: number = this.ballSpeed;
  ballSpeedY: number = this.ballSpeed;
  computerY: number = 0;


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
    if (!this.canvasRef) return;
    if (!this.canvasRef.current) return;

    this.canvasRef.current.removeEventListener('mousemove', this.handleMouseMove);
    this.canvasRef.current.addEventListener('mousemove', this.handleMouseMove);

    // Start the game loop
    if (!this.animationFrameId) {
      this.animationFrameId = requestAnimationFrame(this.gameLoop);
    }
  }

  // (컴포넌트가 마운트 해제되어 제거되기 직전)
  // 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 
  // 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
  // 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다. 
  // 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
  onComponentWillUnmount = () => {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }


  //----------------------------------------------------------------------------
  // [public 함수]
  // (마우스 움직임 조작)
  handleMouseMove = (e: MouseEvent) => {
    if (this.canvasRef && this.canvasRef.current) {
      this.playerY = Math.max(0, Math.min(e.clientY - this.canvasRef.current.getBoundingClientRect().top - this.paddleHeight / 2, this.canvasRef.current.height - this.paddleHeight));
      this.reRender();
    }
  };

  gameLoop = () => {

    // Update ball position
    if (this.canvasRef && this.canvasRef.current) {
      const ctx = this.canvasRef.current.getContext('2d');
      if (!ctx) return;

      const newBallX = this.ballX + this.ballSpeedX;
      if (newBallX <= this.paddleWidth) {
        if (this.ballY >= this.playerY && this.ballY <= this.playerY + this.paddleHeight) {
          this.ballSpeedX = -this.ballSpeedX;
          this.reRender();
        } else {
          this.ballX = 100;
          this.ballY = 100;
          this.ballSpeedX = this.ballSpeed;
          this.ballSpeedY = this.ballSpeed;
          this.reRender();
        }
      } else if (newBallX >= this.canvasRef.current.width - this.ballSize) {
        this.ballSpeedX = -this.ballSpeedX;
        this.reRender();
      }

      this.ballX = newBallX;

      const newBallY = this.ballY + this.ballSpeedY;
      if (newBallY <= 0 || newBallY >= this.canvasRef.current.height - this.ballSize) {
        this.ballSpeedY = -this.ballSpeedY;
        this.reRender();
      }
      this.ballY = newBallY;
      this.reRender();

      // Update computer paddle position
      const newComputerY = this.ballY - this.paddleHeight / 2;
      this.computerY = Math.max(0, Math.min(newComputerY, this.canvasRef.current.height - this.paddleHeight));
      this.reRender();

      // Clear canvas and redraw
      ctx.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);

      // Draw player paddle
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, this.playerY, this.paddleWidth, this.paddleHeight);

      // Draw computer paddle
      ctx.fillRect(this.canvasRef.current.width - this.paddleWidth, this.computerY, this.paddleWidth, this.paddleHeight);

      // Draw ball
      ctx.beginPath();
      ctx.arc(this.ballX, this.ballY, this.ballSize / 2, 0, Math.PI * 2);
      ctx.fill();

      // Request the next frame
      if (!this.animationFrameId) {
        this.animationFrameId = requestAnimationFrame(this.gameLoop);
      }
    }
  };


  //----------------------------------------------------------------------------
  // [private 함수]
}

export default Business;