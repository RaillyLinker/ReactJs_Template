import { navigate } from '../app_router';
import { NavigateFunction } from 'react-router-dom';
import GcoDialogFrameBusiness from '../global_components/gco_dialog_frame/business';


// [템플릿 전용 클래스 모음]
// (Business 클래스 기본타입)
export abstract class BusinessBasic {
  // (컴포넌트 화면 Rerendering 플래그 및 객체)
  screenFlag: boolean = false;
  setScreenFlag: React.Dispatch<React.SetStateAction<boolean>> = () => { };

  // (Navigate 객체)
  // 사용법은 this.navigate("/test"); 이와 같습니다.
  // 파라미터가 string 이라면 path 경로로 이동하고,
  // path 가 number 일 때, 양수라면 숫자만큼 앞으로 가기, 음수라면 숫자만큼 뒤로가기를 합니다.
  navigate: NavigateFunction = navigate;

  // (초기 실행 여부)
  // 처음 컴포넌트 실행시 onComponentDidMount 가 실행되기 전까지는 true, 실행된 직후 false
  firstMount: boolean = true;

  // (컴포넌트가 마운트된 직 후)
  // 컴포넌트가 마운트된 직 후에 호출됩니다. 
  // DOM 노드가 있어야 하는 초기화 작업은 이 메서드에서 이루어지면 됩니다.
  // 외부에서 데이터를 불러와야 한다면 네트워크 요청을 보내기 적절한 위치라고 할 수 있습니다.
  abstract onComponentDidMount: (firstMount: boolean) => void;

  // (컴포넌트가 마운트 해제되어 제거되기 직전)
  // 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 
  // 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
  // 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다. 
  // 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
  abstract onComponentWillUnmount: () => void;

  // (컴포넌트 화면 리랜더링 함수)
  // 이 함수를 호출하면 컴포넌트 화면이 다시 랜더링 됩니다.
  // useRef 로도 DOM 을 조작할 수 있지만, 화면 변경에 관련하여 왠만하면 이것을 사용합시다.
  // (간편하기도 하고, 통일성도 있으며, 성능 차이도 없습니다.)
  reRender: () => void = () => {
    this.screenFlag = !this.screenFlag;
    this.setScreenFlag(this.screenFlag);
  };
}

// (페이지 Business 클래스 기본타입)
export abstract class PageBusinessBasic extends BusinessBasic {
  // (본 페이지 히스토리 인덱스 / 키)
  historyIdx: number;
  historyKey: string;

  // (이전 페이지 비즈니스 객체)
  // null 이라면 이전 페이지가 없음
  prevPageBusiness: PageBusinessBasic | null = null;

  // (페이지 파라미터)
  // null 이라면 잘못된 진입
  // Path Parameter 로 받은 값
  abstract pathParams: PagePathParamBasic | null;
  // Query Parameter 로 받은 값
  abstract queryParams: PageQueryParamBasic | null;

  // (생성자)
  constructor(historyIdx: number, historyKey: string) {
    super();
    this.historyIdx = historyIdx;
    this.historyKey = historyKey;
  }
}

// (페이지 Path Parameter 인터페이스)
export interface PagePathParamBasic {
}

// (페이지 Query Parameter 인터페이스)
export interface PageQueryParamBasic {
}

// (컴포넌트 Business 클래스 기본타입)
export abstract class ComponentBusinessBasic extends BusinessBasic {
  // (부모 컴포넌트 비즈니스 객체)
  // 최상위에는 항상 페이지 컴포넌트가 있으므로 not null
  parentComponentBusiness: BusinessBasic;

  // (생성자)
  constructor(parentComponentBusiness: BusinessBasic) {
    super();
    this.parentComponentBusiness = parentComponentBusiness;
  }
}

// (컴포넌트 Props 인터페이스)
export interface ComponentProps<Business extends ComponentBusinessBasic> {
  // (view 와 연결되는 Business 객체)
  // 비즈니스 객체는 컴포넌트를 사용하는 외부에서 받아와야만 합니다.
  business: Business;

  // (컴포넌트 Children 객체)
  // <MyTag> ... </MyTag>
  // 위와 같이 태그와 태그 사이에 입력한 컴포넌트는 여기서 받습니다.
  // 만약 <MyTag /> 이렇게 태그 사이를 설정하지 않았다면 null 로 받습니다.
  children?: React.ReactNode;
}

// (다이얼로그 Business 클래스 기본타입)
export abstract class DialogBusinessBasic extends BusinessBasic {
  // (부모 컴포넌트 비즈니스 객체)
  // 다이얼로그를 호출한 페이지 비즈니스 객체
  parentComponentBusiness: BusinessBasic;

  // (다이얼로그 프레임 비즈니스)
  gcoDialogFrameBusiness: GcoDialogFrameBusiness;

  // (생성자)
  constructor(gcoDialogFrameBusiness: GcoDialogFrameBusiness, parentComponentBusiness: BusinessBasic) {
    super();
    this.parentComponentBusiness = parentComponentBusiness;
    this.gcoDialogFrameBusiness = gcoDialogFrameBusiness;
  }
}

// (다이얼로그 Business 임시 클래스)
// Nullable 을 막기 위해 임시로 사용하는 클래스
export class VoidDialogBusinessBasic extends DialogBusinessBasic {
  onComponentDidMount: (firstMount: boolean) => void = () => { };
  onComponentWillUnmount: () => void = () => { };
  constructor(gcoDialogFrameBusiness: GcoDialogFrameBusiness, parentComponentBusiness: BusinessBasic) {
    super(gcoDialogFrameBusiness, parentComponentBusiness);
  }
}

// (다이얼로그 Props 인터페이스)
export interface DialogProps<Business extends DialogBusinessBasic> {
  // (view 와 연결되는 Business 객체)
  // 비즈니스 객체는 컴포넌트를 사용하는 외부에서 받아와야만 합니다.
  business: Business;

  // (컴포넌트 Children 객체)
  // <MyTag> ... </MyTag>
  // 위와 같이 태그와 태그 사이에 입력한 컴포넌트는 여기서 받습니다.
  // 만약 <MyTag /> 이렇게 태그 사이를 설정하지 않았다면 null 로 받습니다.
  children?: React.ReactNode;
}