import { Params } from 'react-router-dom';
import { PageBusinessBasic } from '../../global_classes/gc_template_classes';
import { PathParams, QueryParams } from './view';
import GcoDialogFrameBusiness from '../../global_components/gco_dialog_frame/business';
import { Bounce, toast } from 'react-toastify';

import GcoOuterFrameBusiness from '../../global_components/gco_outer_frame/business';
import ky from 'ky';


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
  gcoOuterFrameBusiness: GcoOuterFrameBusiness = new GcoOuterFrameBusiness(this, "SSE 샘플");

  // (토스트 컨테이너 설정)
  // 새로운 토스트를 위에서 나타내게 하기(bottom 토스트에 좋습니다.)
  toastNewestOnTop = false;
  // 토스트 내용을 우측정렬
  toastRightToLeftLayout = false;
  // 포커스 해제시 멈춤
  toastPauseOnFocusLoss = true;

  // (SSE 객체)
  sse: EventSource | null = null;

  // (SSE 이벤트를 기록할 로그 Div Ref)
  sseEventLogRef: React.RefObject<HTMLDivElement> | null = null;


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
    // 초기 SSE 구독
    this.sseSubscribe();
  }

  // (컴포넌트가 마운트 해제되어 제거되기 직전)
  // 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 
  // 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
  // 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다. 
  // 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
  onComponentWillUnmount = () => {
    if (this.sse !== null) {
      // SSE 닫기
      this.sse.close();
      this.sse = null;
    }
  }


  //----------------------------------------------------------------------------
  // [public 함수]
  // (SSE 이벤트 트리거 버튼 클릭 핸들러)
  // 버튼을 누르면 서버로 요청이 가고, 서버는 SSE 이벤트를 발행합니다.
  handleEventTriggerClick = async () => {
    try {
      await ky.post('http://127.0.0.1:8080/service1/tk/v1/request-test/sse-test/event-trigger');
    } catch (error) {
      console.error('Failed to trigger event', error);
    }
  };

  // (SSE 토글 버튼 클릭 핸들러)
  // SSE 연결 / 비연결 토글링
  handleSseToggleClick = () => {
    if (this.sse === null) {
      // sse 객체 null 일 때
      this.sseSubscribe();
    } else {
      // sse 객체 null 이 아닐 때
      this.sse.close();
      this.sse = null;
      this.reRender();
    }
  };


  //----------------------------------------------------------------------------
  // [private 함수]
  // (SSE 구독 및 설정 함수)
  private sseSubscribe = () => {
    // SSE 연결 설정
    const eventSource = new EventSource("http://localhost:8080/service1/tk/v1/request-test/sse-test/subscribe");

    // SSE 이벤트 수신 리스너 (event type : system)
    eventSource.addEventListener('system', (e: MessageEvent) => {
      const receivedData = e.data;
      if (this.sseEventLogRef !== null && this.sseEventLogRef.current) {
        const p = document.createElement("p");
        p.innerText = receivedData;
        this.sseEventLogRef.current.prepend(p);
      }
    });

    // SSE 이벤트 수신 리스너 (event type : triggerTest)
    eventSource.addEventListener('triggerTest', (e: MessageEvent) => {
      const receivedData = e.data;
      if (this.sseEventLogRef !== null && this.sseEventLogRef.current) {
        const p = document.createElement("p");
        p.innerText = receivedData;
        this.sseEventLogRef.current.prepend(p);
      }
    });

    this.sse = eventSource;
    this.reRender();
  };
}

export default Business;