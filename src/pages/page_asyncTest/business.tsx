import { Params } from 'react-router-dom';
import { PageBusinessBasic } from '../../global_classes/gc_template_classes';
import { PathParams, QueryParams } from './view';
import GcoDialogFrameBusiness from '../../global_components/gco_dialog_frame/business';

import GcoOuterFrameBusiness from '../../global_components/gco_outer_frame/business';
import { Semaphore } from 'async-mutex';
import { ThreadMerger } from '../../global_classes/gc_my_classes';


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
  gcoOuterFrameBusiness: GcoOuterFrameBusiness = new GcoOuterFrameBusiness(this, "비동기 테스트");

  // (작업 상태 및 버튼 이름)
  // 상태 0 = 초기화, 버튼 이름 : 작업 시작
  // 상태 1 = 진행 중, 버튼 이름 : 일시 중지
  // 상태 2 = 일시 중지, 버튼 이름 : 다시 시작
  // 상태 3 = 완료, 버튼 이름 : 초기화
  workState = 0;
  workButtonName = "작업 시작";

  // (스레드 상태)
  thread1Work: boolean = false;
  thread1WorkSemaphore = new Semaphore(1);
  thread2Work: boolean = false;
  thread2WorkSemaphore = new Semaphore(1);

  // (프로그래스 value)
  // 스레드 1이 담당
  progress1Value: number = 0;
  // 스레드 2가 담당
  progress2Value: number = 0;

  // (공유 카운터)
  // 스레드 1, 2 모두 접근 (뮤텍스 처리 필요)
  sharedCounter: number = 0;
  sharedCounterSemaphore = new Semaphore(1);

  // (스레드 병합 객체)
  threadMergerOnComplete = new ThreadMerger(2, () => {
    // 상태 변경 및 화면 변경
    this.workState = 3;
    this.workButtonName = "초기화";
    this.reRender();
  });



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
  onClickWorkButton = async () => {
    // todo
    switch (this.workState) {
      case 0: {
        // 작업 시작 버튼 클릭(초기화 -> 진행중)

        // 스레드가 하나라도 동작중이라면 return
        await this.thread1WorkSemaphore.acquire();
        await this.thread2WorkSemaphore.acquire();
        if (this.thread1Work || this.thread2Work) {
          this.thread2WorkSemaphore.release();
          this.thread1WorkSemaphore.release();
          return;
        }
        this.thread2WorkSemaphore.release();
        this.thread1WorkSemaphore.release();

        // 작업 시작
        this.work1();
        this.work2();

        // 상태 변경 및 화면 변경
        this.workState = 1;
        this.workButtonName = "일시 중지";
        this.reRender();
        break;
      }
      case 1: {
        // 일시 중지 버튼 클릭(진행 중 -> 일시 중지)
        // todo 작업 일시 중지 (일시중지 완료 될 때까지 대기)

        break;
      }
      case 2: {
        // 다시 시작 버튼 클릭(일시 중지 -> 진행중)
        // todo

        break;
      }
      case 3: {
        // 초기화 버튼 클릭(완료 -> 초기화)
        // 스레드가 하나라도 동작중이라면 return
        await this.thread1WorkSemaphore.acquire();
        await this.thread2WorkSemaphore.acquire();
        if (this.thread1Work || this.thread2Work) {
          this.thread2WorkSemaphore.release();
          this.thread1WorkSemaphore.release();
          return;
        }
        this.thread2WorkSemaphore.release();
        this.thread1WorkSemaphore.release();

        // 초기화 작업
        this.workState = 0;
        this.workButtonName = "작업 시작";
        this.progress1Value = 0;
        this.progress2Value = 0;
        this.sharedCounter = 0;
        this.reRender();

        this.threadMergerOnComplete.rewind();

        break;
      }
    }
  }


  //----------------------------------------------------------------------------
  // [private 함수]
  // todo 각 비동기 작업 완료시 합류 스레드 만들어서 완료 처리하기, 일시정지 처리 하기
  // (프로그래스1 작업)
  private work1 = async () => {
    // 스레드 동작 상태로 변경
    await this.thread1WorkSemaphore.acquire();
    this.thread1Work = true;
    this.thread1WorkSemaphore.release();

    // 스레드 작업
    while (this.progress1Value < 100) {
      // 대기
      await new Promise(resolve => setTimeout(resolve, 50));

      // 값 증가
      this.progress1Value += 1;

      // 뮤텍스 처리
      await this.sharedCounterSemaphore.acquire();
      // 값 증가
      this.sharedCounter += 1;
      this.sharedCounterSemaphore.release();

      this.reRender();
    }
    // 루프 탈출

    if (this.progress1Value == 100) {
      // 작업 완료 -> 스레드 병합
      this.threadMergerOnComplete.mergeThread();
    }

    // 스레드 정지 상태로 변경
    await this.thread1WorkSemaphore.acquire();
    this.thread1Work = false;
    this.thread1WorkSemaphore.release();
  };

  // (프로그래스2 작업)
  private work2 = async () => {
    // 스레드 동작 상태로 변경
    await this.thread2WorkSemaphore.acquire();
    this.thread2Work = true;
    this.thread2WorkSemaphore.release();

    // 스레드 작업
    while (this.progress2Value < 100) {
      // 대기
      await new Promise(resolve => setTimeout(resolve, 20));

      // 값 증가
      this.progress2Value += 1;

      // 뮤텍스 처리
      await this.sharedCounterSemaphore.acquire();
      // 값 증가
      this.sharedCounter += 1;
      this.sharedCounterSemaphore.release();

      this.reRender();
    }
    // 루프 탈출

    if (this.progress2Value == 100) {
      // 작업 완료 -> 스레드 병합
      this.threadMergerOnComplete.mergeThread();
    }

    // 스레드 정지 상태로 변경
    await this.thread2WorkSemaphore.acquire();
    this.thread2Work = false;
    this.thread2WorkSemaphore.release();
  };
}

export default Business;