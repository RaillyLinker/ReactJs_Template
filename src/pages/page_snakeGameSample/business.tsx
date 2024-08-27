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

  // (게임 설정)
  GRID_SIZE: number = 20;
  INIT_SNAKE: Point[] = [{ x: 8, y: 8 }];
  INIT_DIRECTION: Point = { x: 1, y: 0 };
  INIT_FOOD: Point = { x: 5, y: 5 };

  // (게임 상태)
  snake: Point[] = this.INIT_SNAKE;
  direction: Point = this.INIT_DIRECTION;
  food: Point = this.INIT_FOOD;
  isGameOver: boolean = false;
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


    if (this.isGameOver) return;

    const moveSnake = () => {
      const newSnake = [...this.snake];
      const head = {
        x: newSnake[0].x + this.direction.x,
        y: newSnake[0].y + this.direction.y,
      };

      if (head.x < 0 || head.x >= this.GRID_SIZE || head.y < 0 || head.y >= this.GRID_SIZE) {
        this.isGameOver = true;
        this.reRender();
        return;
      }

      for (let i = 1; i < newSnake.length; i++) {
        if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
          this.isGameOver = true;
          this.reRender();
          return;
        }
      }

      newSnake.unshift(head);

      if (head.x === this.food.x && head.y === this.food.y) {
        this.food = {
          x: Math.floor(Math.random() * this.GRID_SIZE),
          y: Math.floor(Math.random() * this.GRID_SIZE),
        };
        this.reRender();
      } else {
        newSnake.pop();
      }

      this.snake = newSnake;
      this.reRender();
    };

    this.intervalId = setInterval(moveSnake, 200);
  }

  // (컴포넌트가 마운트 해제되어 제거되기 직전)
  // 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 
  // 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
  // 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다. 
  // 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
  onComponentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


  //----------------------------------------------------------------------------
  // [public 함수]
  resetGame = () => {
    this.snake = this.INIT_SNAKE;
    this.direction = this.INIT_DIRECTION;
    this.food = this.INIT_FOOD;
    this.isGameOver = false;
    this.reRender();
  };


  //----------------------------------------------------------------------------
  // [private 함수]
}

interface Point {
  x: number;
  y: number;
}

export default Business;