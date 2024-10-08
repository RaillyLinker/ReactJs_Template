import { Params } from 'react-router-dom';
import { PageBusinessBasic } from '../../global_classes/gc_template_classes';
import { PathParams, QueryParams } from './view';
import GcoDialogFrameBusiness from '../../global_components/gco_dialogFrame/business';
import { Bounce, toast } from 'react-toastify';

import GcoOuterFrameBusiness from '../../global_components/gco_outerFrame/business';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';


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
  gcoOuterFrameBusiness: GcoOuterFrameBusiness = new GcoOuterFrameBusiness(this, "STOMP 샘플");

  // (토스트 컨테이너 설정)
  // 새로운 토스트를 위에서 나타내게 하기(bottom 토스트에 좋습니다.)
  toastNewestOnTop = false;
  // 토스트 내용을 우측정렬
  toastRightToLeftLayout = false;
  // 포커스 해제시 멈춤
  toastPauseOnFocusLoss = true;

  // (STOMP 클라이언트 객체)
  stompClient: CompatClient | null = null;

  // (소켓 전달 메세지)
  messages: string[] = [];

  // (소켓 전송 메세지 입력창 Ref)
  msgInputRef: React.RefObject<HTMLInputElement> | null = null;


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
    const socket = new SockJS('http://localhost:8080/stomp');
    const client = Stomp.over(socket);
    client.connect({}, (frame: string) => {
      const systemMessage = "<b>System: 서버와 연결되었습니다.</b>";
      this.messages.unshift(systemMessage);
      this.reRender();

      client.subscribe('/topic', (greeting) => {
        const receivedMessage = `<b>Server: ${JSON.parse(greeting.body).content}</b>`;
        this.messages.unshift(receivedMessage);
        this.reRender();
      });
    });
    this.stompClient = client;
    this.reRender();
  }

  // (컴포넌트가 마운트 해제되어 제거되기 직전)
  // 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 
  // 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
  // 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다. 
  // 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
  onComponentWillUnmount = () => {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        const systemMessage = "<b>System: 서버와의 연결이 해제되었습니다.</b>";
        this.messages.unshift(systemMessage);
        this.reRender();
      });
    }
  }


  //----------------------------------------------------------------------------
  // [public 함수]
  // (전송 버튼 클릭)
  handleSend = () => {
    if (this.msgInputRef !== null && this.msgInputRef.current && this.stompClient !== null) {
      // 입력 메세지 가져오기
      const msg = this.msgInputRef.current?.value;
      if (msg) {
        this.stompClient.send("/app/test", {}, JSON.stringify({ chat: msg }));

        // 내가 전송한 메세지를 로그에 표시
        const clientMessage = `<b>Client: ${msg}</b>`;
        this.messages.unshift(clientMessage);
        this.reRender();

        if (this.msgInputRef.current) {
          // 입력창 비우기
          this.msgInputRef.current.value = '';
          this.msgInputRef.current.focus();
        }
      }
    }
  };


  //----------------------------------------------------------------------------
  // [private 함수]
}

export default Business;