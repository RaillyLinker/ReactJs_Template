import React from 'react';
import { NavigateFunction } from 'react-router-dom';

// [비즈니스 클래스]
class Business {
  // (컴포넌트 State)
  // 컴포넌트 ViewModel 입니다.
  mainState?: State;
  // 컴포넌트 화면을 Rerendering 하려면 State 변경 후 이것을 사용하세요.
  setMainState?: React.Dispatch<React.SetStateAction<State>>;

  // (Navigate 객체)
  // 사용법은 this.navigate("/test"); 이와 같습니다.
  // 파라미터가 string 이라면 path 경로로 이동하고,
  // path 가 number 일 때, 양수라면 숫자만큼 앞으로 가기, 음수라면 숫자만큼 뒤로가기를 합니다.
  navigate: NavigateFunction = () => { };

  //----------------------------------------------------------------------------
  // [생명주기 함수]
  // (비즈니스 클래스 생성자)
  // this.mainState 를 입력하면 되며 만약 undefined 라면 에러 화면이 나오게 됩니다.
  constructor(headerTitle: string) {
    this.mainState = {
      headerTitle: headerTitle
    };
  }

  // (컴포넌트가 마운트된 직 후)
  // 컴포넌트가 마운트된 직 후에 호출됩니다. 
  // DOM 노드가 있어야 하는 초기화 작업은 이 메서드에서 이루어지면 됩니다.
  // 외부에서 데이터를 불러와야 한다면 네트워크 요청을 보내기 적절한 위치라고 할 수 있습니다.
  onComponentDidMount() {
  }

  // (컴포넌트가 마운트 해제되어 제거되기 직전)
  // 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 
  // 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
  // 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다. 
  // 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
  onComponentWillUnmount() {
  }

  //----------------------------------------------------------------------------
  // [public 함수]

  //----------------------------------------------------------------------------
  // [private 함수]
}

//----------------------------------------------------------------------------
// [컴포넌트 State 인터페이스]
export interface State {
  headerTitle: string;
}

// [컴포넌트 Props 인터페이스 - 변경하지 마세요]
export interface Props {
  // (view 와 연결되는 Business 객체)
  // 비즈니스 객체는 컴포넌트를 사용하는 외부에서 받아와야만 합니다.
  business: Business;
}

export default Business;