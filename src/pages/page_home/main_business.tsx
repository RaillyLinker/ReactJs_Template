import React, { Component } from 'react';
import MainView from './main_view';

// [비즈니스 클래스]
class MainBusiness {
  // (페이지 View 객체)
  private mainView: MainView;

  // (페이지 Props 객체)
  private pageProps: PageProps;

  items: {
    itemTitle: string;
    itemDescription: string;
    onItemClicked: () => void;
  }[] =
    [
      {
        itemTitle: "페이지 / 라우터 샘플 리스트",
        itemDescription: "페이지 이동, 파라미터 전달 등의 샘플 리스트",
        onItemClicked: (): void => {
          console.log("페이지 / 라우터 샘플 리스트");
        }
      },
      {
        itemTitle: "다이얼로그 샘플 리스트",
        itemDescription: "다이얼로그 호출 샘플 리스트",
        onItemClicked: (): void => {
          console.log("다이얼로그 호출 샘플 리스트");
        }
      },
      {
        itemTitle: "네트워크 요청 샘플 리스트",
        itemDescription: "네트워크 요청 및 응답 처리 샘플 리스트",
        onItemClicked: (): void => {
          console.log("네트워크 요청 및 응답 처리 샘플 리스트");
        }
      },
      {
        itemTitle: "계정 샘플",
        itemDescription: "계정 관련 기능 샘플",
        onItemClicked: (): void => {
          console.log("계정 관련 기능 샘플");
        }
      },
      {
        itemTitle: "기타 샘플 리스트",
        itemDescription: "기타 테스트 샘플을 모아둔 리스트",
        onItemClicked: (): void => {
          console.log("기타 테스트 샘플을 모아둔 리스트");
        }
      },
      {
        itemTitle: "테스트",
        itemDescription: "테스트",
        onItemClicked: (): void => {
          console.log("테스트");
        }
      },
      {
        itemTitle: "테스트",
        itemDescription: "테스트",
        onItemClicked: (): void => {
          console.log("테스트");
        }
      },
      {
        itemTitle: "테스트",
        itemDescription: "테스트",
        onItemClicked: (): void => {
          console.log("테스트");
        }
      },
      {
        itemTitle: "테스트",
        itemDescription: "테스트",
        onItemClicked: (): void => {
          console.log("테스트");
        }
      },
      {
        itemTitle: "테스트",
        itemDescription: "테스트",
        onItemClicked: (): void => {
          console.log("테스트");
        }
      },
      {
        itemTitle: "테스트",
        itemDescription: "테스트",
        onItemClicked: (): void => {
          console.log("테스트");
        }
      },
      {
        itemTitle: "테스트",
        itemDescription: "테스트",
        onItemClicked: (): void => {
          console.log("테스트");
        }
      },
      {
        itemTitle: "테스트",
        itemDescription: "테스트",
        onItemClicked: (): void => {
          console.log("테스트");
        }
      },
      {
        itemTitle: "테스트",
        itemDescription: "테스트",
        onItemClicked: (): void => {
          console.log("테스트");
        }
      }
    ];

  //----------------------------------------------------------------------------
  // [생명주기 함수]
  // (비즈니스 클래스 생성자)
  constructor(mainView: MainView, pageProps: PageProps) {
    this.mainView = mainView;
    this.pageProps = pageProps;

    // 페이지 State 초기화
    this.mainView.state = {
      counter: 0,
    };
  }

  // (컴포넌트가 마운트된 직 후)
  // 컴포넌트가 마운트된 직 후에 호출됩니다. 
  // DOM 노드가 있어야 하는 초기화 작업은 이 메서드에서 이루어지면 됩니다.
  // 외부에서 데이터를 불러와야 한다면 네트워크 요청을 보내기 적절한 위치라고 할 수 있습니다.
  componentDidMount() {

  }

  // (갱신이 일어난 직후)
  // 갱신이 일어난 직후에 호출됩니다. 최초 랜더링에서는 호출되지 않습니다.
  // 컴포넌트가 갱신되었을 때 DOM을 조작하기 위하여 이 메서드를 활용하면 좋습니다. 
  // 또한, 이전과 현재의 props를 비교하여 네트워크 요청을 보내는 작업도 이 메서드에서 이루어지면 됩니다.
  // (가령, props가 변하지 않았다면 네트워크 요청을 보낼 필요가 없습니다).
  componentDidUpdate() {

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
  onCntUpBtnClick = (): void => {
    this.mainView.setState((prevState) => ({ counter: prevState.counter + 1 }));
  };

  //----------------------------------------------------------------------------
  // [private 함수]
}

//----------------------------------------------------------------------------
// [페이지 State 인터페이스]
export interface PageState {
  counter: number;
}

// [페이지 Props 인터페이스]
export interface PageProps {
}

export default MainBusiness;