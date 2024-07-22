import React from 'react';
import { NavigateFunction } from 'react-router-dom';

// [비즈니스 클래스]
// 함수는 변수 형식으로 저장합시다. 그래야 onclick 에 입력시 에러가 나지 않습니다.
class Business {

  // (컴포넌트 화면 Rerendering 플래그 및 객체)
  screenFlag: boolean = false;
  setScreenFlag: React.Dispatch<React.SetStateAction<boolean>> = () => { };

  // (Navigate 객체)
  // 사용법은 this.navigate("/test"); 이와 같습니다.
  // 파라미터가 string 이라면 path 경로로 이동하고,
  // path 가 number 일 때, 양수라면 숫자만큼 앞으로 가기, 음수라면 숫자만큼 뒤로가기를 합니다.
  navigate: NavigateFunction = () => { };

  // (초기 실행 여부)
  // 처음 컴포넌트 실행시 onComponentDidMount 가 실행되기 전까지는 true, 실행된 직후 false
  firstMount: boolean = true;

  //----------------------------------------------------------------------------
  // [멤버 변수 공간]
  // 멤버 변수는 비즈니스 클래스를 지닌 부모 컴포넌트가 히스토리에서 삭제될 때까지 유지됩니다.
  footerMsg: string;

  //----------------------------------------------------------------------------
  // [생명주기 함수]
  // (비즈니스 클래스 생성자)
  // 부모 컴포넌트에서 주입하는 값을 처리하면 됩니다.
  constructor(footerMsg: string) {
    this.footerMsg = footerMsg;
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
  // (컴포넌트 화면 랜더링 함수)
  // 이 함수를 호출하면 State 정보에 맞게 화면이 갱신됩니다.
  reRender = () => {
    this.screenFlag = !this.screenFlag;
    this.setScreenFlag!(this.screenFlag);
  }

  //----------------------------------------------------------------------------
  // [private 함수]
}

//----------------------------------------------------------------------------
// [컴포넌트 Props 인터페이스 - 변경하지 마세요]
export interface Props {
  // (view 와 연결되는 Business 객체)
  // 비즈니스 객체는 컴포넌트를 사용하는 외부에서 받아와야만 합니다.
  business: Business;
}

export default Business;