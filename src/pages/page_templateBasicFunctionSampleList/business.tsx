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
  gcoOuterFrameBusiness: GcoOuterFrameBusiness = new GcoOuterFrameBusiness(this, "템플릿 기본 기능 샘플 리스트");

  // (토스트 컨테이너 설정)
  // 새로운 토스트를 위에서 나타내게 하기(bottom 토스트에 좋습니다.)
  toastNewestOnTop = false;
  // 토스트 내용을 우측정렬
  toastRightToLeftLayout = false;
  // 포커스 해제시 멈춤
  toastPauseOnFocusLoss = true;

  // (메인 리스트)
  items: {
    uid: number,
    itemTitle: string;
    itemDescription: string;
    onItemClicked: () => void;
  }[] =
    [
      {
        uid: 0,
        itemTitle: "페이지 템플릿",
        itemDescription: "템플릿 페이지를 호출합니다.",
        onItemClicked: (): void => {
          this.navigate("/template-basic-function-sample-list/page-template");
        }
      },
      {
        uid: 1,
        itemTitle: "페이지 State 및 생명주기 테스트",
        itemDescription: "페이지 State 및 생명주기를 테스트 합니다.",
        onItemClicked: (): void => {
          this.navigate("/template-basic-function-sample-list/state-and-lifecyle-test");
        }
      },
      {
        uid: 2,
        itemTitle: "페이지 입/출력 테스트",
        itemDescription: "페이지 이동시 전달하는 입력값, 복귀시 반환하는 출력값 테스트",
        onItemClicked: (): void => {
          this.navigate("/template-basic-function-sample-list/input-and-output-test/pathParamTest?queryParam=queryParamTest");
        }
      },
      {
        uid: 3,
        itemTitle: "useRef / useState 테스트",
        itemDescription: "useRef, useState 를 이용한 화면 갱신 테스트",
        onItemClicked: (): void => {
          this.navigate("/template-basic-function-sample-list/use-ref-and-use-state-test");
        }
      },
      {
        uid: 4,
        itemTitle: "전역 변수 상태 확인 테스트",
        itemDescription: "컴포넌트 뷰모델이 아닌 전역 변수 사용시 데이터 유지 테스트",
        onItemClicked: (): void => {
          this.navigate("/template-basic-function-sample-list/global-variable-state-test");
        }
      },
      {
        uid: 5,
        itemTitle: "비동기 테스트",
        itemDescription: "React 의 비동기 프로그래밍 동작 테스트",
        onItemClicked: (): void => {
          this.navigate("/template-basic-function-sample-list/async-test");
        }
      },
      {
        uid: 6,
        itemTitle: "존재하지 않는 페이지",
        itemDescription: "Router 에 등록하지 않은 페이지 주소를 호출했을 때의 테스트",
        onItemClicked: (): void => {
          this.navigate("/template-basic-function-sample-list/not-exists-page");
        }
      },
      {
        uid: 7,
        itemTitle: "토스트 메세지 샘플",
        itemDescription: "토스트 메세지 발생 샘플",
        onItemClicked: (): void => {
          this.navigate("/template-basic-function-sample-list/toast-sample");
        }
      }
    ];


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


  //----------------------------------------------------------------------------
  // [private 함수]
}

export default Business;