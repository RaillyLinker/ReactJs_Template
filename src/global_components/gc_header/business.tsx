import React, { Component } from 'react';

// [비즈니스 클래스]
class Business {
  // (컴포넌트 Props 객체)
  mainProps?: Props;

  // (컴포넌트 State 및 State 갱신자)
  mainState: State = this.initMainState();
  setMainState: React.Dispatch<React.SetStateAction<State>> = () => { };

  //----------------------------------------------------------------------------
  // [생명주기 함수]
  // (비즈니스 클래스 생성자)
  constructor() {
  }

  // (컴포넌트 State 초기화)
  private initMainState(): State {
    return {};
  }

  // (컴포넌트가 마운트된 직 후)
  // 컴포넌트가 마운트된 직 후에 호출됩니다. 
  // DOM 노드가 있어야 하는 초기화 작업은 이 메서드에서 이루어지면 됩니다.
  // 외부에서 데이터를 불러와야 한다면 네트워크 요청을 보내기 적절한 위치라고 할 수 있습니다.
  componentDidMount() {
  }

  // (컴포넌트가 마운트 해제되어 제거되기 직전)
  // 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 
  // 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
  // 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다. 
  // 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
  componentWillUnmount() {
  }

  //----------------------------------------------------------------------------
  // [public 함수]

  //----------------------------------------------------------------------------
  // [private 함수]
}

//----------------------------------------------------------------------------
// [컴포넌트 State 인터페이스]
// 컴포넌트에서 사용할 모든 변수는 여기에 저장하여 사용하세요.
export interface State {
}

// [컴포넌트 Props 인터페이스]
export interface Props {
  // (view 와 연결되는 Business 객체)
  // 외부에서 주입받는다면 외부의 Business 객체를 사용하고, 아니라면 내부에서 만들어서 사용합니다.
  business?: Business;

  headerTitle: string;
}

export default Business;