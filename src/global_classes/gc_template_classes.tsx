import { NavigateFunction } from 'react-router-dom';

// [템플릿 전용 클래스 모음]
// (페이지 Business 클래스 기본타입)
export interface PageBusinessBasic {
  // (본 페이지 히스토리 인덱스 / 키)
  historyIdx: number;
  historyKey: string;

  // (이전 페이지 비즈니스 객체)
  // null 이라면 이전 페이지가 없음
  prevPageBusiness: PageBusinessBasic | null;

  // (페이지 파라미터)
  // null 이라면 잘못된 진입
  // Path Parameter 로 받은 값
  pathParams: PagePathParamBasic | null;
  // Query Parameter 로 받은 값
  queryParams: PageQueryParamBasic | null;

  // (컴포넌트 화면 Rerendering 플래그 및 객체)
  screenFlag: boolean;
  setScreenFlag: React.Dispatch<React.SetStateAction<boolean>>;

  // (Navigate 객체)
  // 사용법은 this.navigate("/test"); 이와 같습니다.
  // 파라미터가 string 이라면 path 경로로 이동하고,
  // path 가 number 일 때, 양수라면 숫자만큼 앞으로 가기, 음수라면 숫자만큼 뒤로가기를 합니다.
  navigate: NavigateFunction;

  // (초기 실행 여부)
  // 처음 컴포넌트 실행시 onComponentDidMount 가 실행되기 전까지는 true, 실행된 직후 false
  firstMount: boolean;

  // (컴포넌트가 마운트된 직 후)
  // 컴포넌트가 마운트된 직 후에 호출됩니다. 
  // DOM 노드가 있어야 하는 초기화 작업은 이 메서드에서 이루어지면 됩니다.
  // 외부에서 데이터를 불러와야 한다면 네트워크 요청을 보내기 적절한 위치라고 할 수 있습니다.
  onComponentDidMount: (firstMount: boolean) => void

  // (컴포넌트가 마운트 해제되어 제거되기 직전)
  // 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 
  // 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
  // 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다. 
  // 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
  onComponentWillUnmount: () => void

  // (컴포넌트 화면 리랜더링 함수)
  // 이 함수를 호출하면 컴포넌트 화면이 다시 랜더링 됩니다.
  // 가볍게 일부만 변경하려면 useRef 로 DOM 을 조작하세요.
  reRender: () => void
}

// (페이지 Path Parameter 인터페이스)
export interface PagePathParamBasic {
}

// (페이지 Query Parameter 인터페이스)
export interface PageQueryParamBasic {
}

// (컴포넌트 Business 클래스 기본타입)
export interface ComponentBusinessBasic {
  // (컴포넌트 화면 Rerendering 플래그 및 객체)
  screenFlag: boolean;
  setScreenFlag: React.Dispatch<React.SetStateAction<boolean>>;

  // (Navigate 객체)
  // 사용법은 this.navigate("/test"); 이와 같습니다.
  // 파라미터가 string 이라면 path 경로로 이동하고,
  // path 가 number 일 때, 양수라면 숫자만큼 앞으로 가기, 음수라면 숫자만큼 뒤로가기를 합니다.
  navigate: NavigateFunction;

  // (초기 실행 여부)
  // 처음 컴포넌트 실행시 onComponentDidMount 가 실행되기 전까지는 true, 실행된 직후 false
  firstMount: boolean;

  // (컴포넌트가 마운트된 직 후)
  // 컴포넌트가 마운트된 직 후에 호출됩니다. 
  // DOM 노드가 있어야 하는 초기화 작업은 이 메서드에서 이루어지면 됩니다.
  // 외부에서 데이터를 불러와야 한다면 네트워크 요청을 보내기 적절한 위치라고 할 수 있습니다.
  onComponentDidMount: (firstMount: boolean) => void

  // (컴포넌트가 마운트 해제되어 제거되기 직전)
  // 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 
  // 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
  // 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다. 
  // 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
  onComponentWillUnmount: () => void

  // (컴포넌트 화면 리랜더링 함수)
  // 이 함수를 호출하면 컴포넌트 화면이 다시 랜더링 됩니다.
  // 가볍게 일부만 변경하려면 useRef 로 DOM 을 조작하세요.
  reRender: () => void
}