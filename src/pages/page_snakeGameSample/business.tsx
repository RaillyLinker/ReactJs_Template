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
  gcoOuterFrameBusiness: GcoOuterFrameBusiness = new GcoOuterFrameBusiness(this, "뱀 게임 샘플");

  // (토스트 컨테이너 설정)
  // 새로운 토스트를 위에서 나타내게 하기(bottom 토스트에 좋습니다.)
  toastNewestOnTop = false;
  // 토스트 내용을 우측정렬
  toastRightToLeftLayout = false;
  // 포커스 해제시 멈춤
  toastPauseOnFocusLoss = true;

  // (게임판 설정)
  // 게임판 크기
  AREA_WIDTH = 20;
  AREA_HEIGHT = 20;
  // 프레임 딜레이 (몇 밀리초마다 한번 프레임이 돌아가는지)
  frameDelay: number = 200;

  // (게임 상태)
  // 뱀 좌표
  snake: Point[];
  // 뱀 진행 방향
  direction: Point;
  // 1프레임 이전 뱀 진행 방향
  beforeDirection: Point;
  // 뱀 먹이 좌표
  food: Point;
  // 게임 상태 코드 (0 : 일시중지, -1 : 게임오버, 1 : 진행중, 2 : 클리어)
  gameStateCode: number;

  // (게임 엔진)
  handleKeyDown: (e: KeyboardEvent) => void = () => { };
  intervalId: NodeJS.Timer | null = null;


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

    // (초기화)
    this.snake = [{ x: Math.round(this.AREA_WIDTH / 2), y: Math.round(this.AREA_HEIGHT / 2) }];
    this.direction = { x: 0, y: 0 };
    this.beforeDirection = this.direction;
    this.food = this.generateFoodPosition(this.snake)!;
    this.gameStateCode = 0;
  }

  // (컴포넌트가 마운트된 직 후)
  // 컴포넌트가 마운트된 직 후에 호출됩니다. 
  // DOM 노드가 있어야 하는 초기화 작업은 이 메서드에서 이루어지면 됩니다.
  // 외부에서 데이터를 불러와야 한다면 네트워크 요청을 보내기 적절한 위치라고 할 수 있습니다.
  onComponentDidMount = (firstMount: boolean) => {
    // 키보드 설정
    this.handleKeyDown = (e: KeyboardEvent) => {
      if (this.gameStateCode === -1 || this.gameStateCode === 2) {
        // 게임오버 혹은 게임 클리어시 아무 버튼 클릭시
        // 초기화
        this.snake = [{ x: Math.round(this.AREA_WIDTH / 2), y: Math.round(this.AREA_HEIGHT / 2) }];
        this.direction = { x: 0, y: 0 };
        this.beforeDirection = this.direction;
        this.food = this.generateFoodPosition(this.snake)!;
        this.pauseGame();
      } else if (this.gameStateCode === 0) {
        // 일시중지 상태
        this.startGame(); // 게임 시작
      } else if (this.gameStateCode === 1) {
        // 게임 진행 상태
        if (e.key === 'Escape') {
          // ESC 로 일시정지
          this.pauseGame();
        }
      }

      //  방향키 처리 로직
      switch (e.key) {
        case 'ArrowUp':
          if (this.beforeDirection.y === 0) {
            this.direction = { x: 0, y: -1 };
            this.reRender();
          }
          break;
        case 'ArrowDown':
          if (this.beforeDirection.y === 0) {
            this.direction = { x: 0, y: 1 };
            this.reRender();
          }
          break;
        case 'ArrowLeft':
          if (this.beforeDirection.x === 0) {
            this.direction = { x: -1, y: 0 };
            this.reRender();
          }
          break;
        case 'ArrowRight':
          if (this.beforeDirection.x === 0) {
            this.direction = { x: 1, y: 0 };
            this.reRender();
          }
          break;
      }
    };

    window.addEventListener('keydown', this.handleKeyDown);
  }

  // (컴포넌트가 마운트 해제되어 제거되기 직전)
  // 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 
  // 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
  // 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다. 
  // 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
  onComponentWillUnmount = () => {
    // 키보드 핸들러 지우기
    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.gameStateCode !== -1 && this.gameStateCode !== 2) {
      // 게임 멈춤 처리
      this.pauseGame();
    }
  }


  //----------------------------------------------------------------------------
  // [public 함수]
  // (게임 시작)
  startGame = () => {
    if (this.gameStateCode === 0) {
      this.gameStateCode = 1;
      this.intervalId = setInterval(this.moveSnake, this.frameDelay);
      this.reRender();
    }
  };

  // (일시정지)
  pauseGame = () => {
    this.gameStateCode = 0;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.reRender();
  };

  // (게임오버)
  gameOver = () => {
    if (this.gameStateCode === 1) {
      this.gameStateCode = -1;
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.reRender();
    }
  };

  // (게임 클리어)
  gameClear = () => {
    if (this.gameStateCode === 1) {
      this.gameStateCode = 2;
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.reRender();
    }
  };

  // (게임 진행)
  moveSnake = () => {
    this.beforeDirection = this.direction;

    // 기존 뱀 위치 가져오기
    const newSnake = [...this.snake];
    // 현재 설정된 방향으로 이동했을 때의 머리 위치
    const newHead = {
      x: newSnake[0].x + this.direction.x,
      y: newSnake[0].y + this.direction.y,
    };

    // 머리 위치가 게임판 밖으로 나갔는지 확인
    if (newHead.x < 0 || newHead.x >= this.AREA_WIDTH || newHead.y < 0 || newHead.y >= this.AREA_HEIGHT) {
      this.gameOver();
      return;
    }

    // 머리 위치가 뱀 몸통에 닿았는지 확인
    for (let i = 1; i < newSnake.length; i++) {
      if (newSnake[i].x === newHead.x && newSnake[i].y === newHead.y) {
        this.gameOver();
        return;
      }
    }

    // 새 머리 위치를 앞쪽에 추가
    newSnake.unshift(newHead);

    // 머리가 먹이를 먹었는지 확인
    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      if (!this.generateFoodPosition(newSnake)) {
        // 더이상 먹이를 생성할 공간이 없음 = 클리어
        this.gameClear();
        return;
      }
      this.reRender();
    } else {
      // 먹이를 먹지 않았다면 꼬리부분 제거
      newSnake.pop();
    }

    // 뱀 상태를 새 뱀으로 치환
    this.snake = newSnake;
    this.reRender();
  };


  //----------------------------------------------------------------------------
  // [private 함수]
  // (뱀 먹이 생성)
  // 뱀 몸통이 없는 곳에 무작위로 생성하고, 생성할 위치가 없다면 null 반환
  private generateFoodPosition = (newSnake: Point[]): Point | null => {
    const availablePositions: Point[] = [];

    for (let x = 0; x < this.AREA_WIDTH; x++) {
      for (let y = 0; y < this.AREA_HEIGHT; y++) {
        const position: Point = { x, y };
        const isOnSnake = newSnake.some(
          (segment) => segment.x === position.x && segment.y === position.y
        );
        if (!isOnSnake) {
          availablePositions.push(position);
        }
      }
    }

    if (availablePositions.length === 0) {
      return null; // 가능한 위치가 없는 경우
    }

    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    this.food = availablePositions[randomIndex];
    return this.food;
  };
}

interface Point {
  x: number;
  y: number;
}

export default Business;