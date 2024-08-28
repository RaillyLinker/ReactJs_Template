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

  // (초기 게임판 설정)
  // 게임판 크기
  GRID_SIZE: number = 20;
  // 초기 뱀 위치(사이즈 1개)
  INIT_SNAKE: Point[] = [{ x: 8, y: 8 }];
  // 초기 뱀 방향
  INIT_DIRECTION: Point = { x: 1, y: 0 };
  // 초기 뱀 먹이 위치
  INIT_FOOD: Point = { x: 5, y: 5 };
  // 프레임 딜레이 (몇 밀리초마다 한번 프레임이 돌아가는지)
  frameDelay: number = 200;

  // (게임 상태)
  // 뱀 좌표
  snake: Point[] = this.INIT_SNAKE;
  // 뱀 진행 방향
  direction: Point = this.INIT_DIRECTION;
  // 뱀 먹이 좌표
  food: Point = this.INIT_FOOD;
  // 게임오버 여부
  isGameOver: boolean = false;

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
  }

  // (컴포넌트가 마운트된 직 후)
  // 컴포넌트가 마운트된 직 후에 호출됩니다. 
  // DOM 노드가 있어야 하는 초기화 작업은 이 메서드에서 이루어지면 됩니다.
  // 외부에서 데이터를 불러와야 한다면 네트워크 요청을 보내기 적절한 위치라고 할 수 있습니다.
  onComponentDidMount = (firstMount: boolean) => {
    // (키보드 핸들러 처리)
    // 방향버튼에 따라 다음 이동 방향 설정
    this.handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (this.direction.y === 0) {
            this.direction = { x: 0, y: -1 };
            this.reRender();
          };
          break;
        case 'ArrowDown':
          if (this.direction.y === 0) {
            this.direction = { x: 0, y: 1 };
            this.reRender();
          };
          break;
        case 'ArrowLeft':
          if (this.direction.x === 0) {
            this.direction = { x: -1, y: 0 };
            this.reRender();
          };
          break;
        case 'ArrowRight':
          if (this.direction.x === 0) {
            this.direction = { x: 1, y: 0 };
            this.reRender();
          };
          break;
      }
    };

    window.addEventListener('keydown', this.handleKeyDown);

    // 게임오버가 아니라면 게임 시작하기
    if (this.isGameOver) return;

    // 1 프레임 마다 게임을 진행하는 코드
    const moveSnake = () => {
      // 이전 뱀 위치 가져오기
      const newSnake = [...this.snake];
      // 새 머리 위치 이동
      const head = {
        x: newSnake[0].x + this.direction.x,
        y: newSnake[0].y + this.direction.y,
      };

      // 이번 뱀 머리가 게임판을 나갔는지 확인
      if (head.x < 0 || head.x >= this.GRID_SIZE || head.y < 0 || head.y >= this.GRID_SIZE) {
        this.isGameOver = true;
        this.reRender();
        return;
      }

      // 이번 뱀 머리가 뱀 몸에 닿았는지 확인
      for (let i = 1; i < newSnake.length; i++) {
        if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
          this.isGameOver = true;
          this.reRender();
          return;
        }
      }

      // 뱀 머리를 리스트 앞에 추가
      newSnake.unshift(head);

      // 먹이를 먹었는지 확인
      if (head.x === this.food.x && head.y === this.food.y) {
        // 먹이를 먹었다면 새로 생성
        if (!this.generateFoodPosition(newSnake)) {
          // 더이상 생성 불가시 게임 오버
          this.isGameOver = true;
          this.reRender();
          return;
        }
        this.reRender();
      } else {
        // 먹이를 먹지 않았다면 기존 꼬리 제거
        newSnake.pop();
      }

      // 새 뱀 위치를 화면에 표시하기
      this.snake = newSnake;
      this.reRender();
    };

    // 1 프레임마다 게임 진행을 반복
    this.intervalId = setInterval(moveSnake, this.frameDelay);
  }

  // (컴포넌트가 마운트 해제되어 제거되기 직전)
  // 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 
  // 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
  // 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다. 
  // 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
  onComponentWillUnmount = () => {
    // 키보드 핸들러 지우기
    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.intervalId) {
      // 게임 멈추기
      clearInterval(this.intervalId);
    }
  }


  //----------------------------------------------------------------------------
  // [public 함수]
  // (게임 재시작)
  // 초기화 후 재시작
  resetGame = () => {
    this.snake = this.INIT_SNAKE;
    this.direction = this.INIT_DIRECTION;
    this.food = this.INIT_FOOD;
    this.isGameOver = false;
    this.reRender();
  };


  //----------------------------------------------------------------------------
  // [private 함수]
  // (뱀 먹이 생성)
  private generateFoodPosition = (newSnake: Point[]): Point | null => {
    const availablePositions: Point[] = [];

    for (let x = 0; x < this.GRID_SIZE; x++) {
      for (let y = 0; y < this.GRID_SIZE; y++) {
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