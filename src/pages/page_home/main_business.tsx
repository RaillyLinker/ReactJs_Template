import React, { Component } from 'react';

// [비즈니스 클래스]
class MainBusiness {
  // (페이지 Props 객체)
  pageProps: PageProps = {};

  // (페이지 State 및 State 갱신자)
  pageState: PageState = this.initPageState();
  setPageState: React.Dispatch<React.SetStateAction<PageState>> = () => { };

  //----------------------------------------------------------------------------
  // [생명주기 함수]
  // (비즈니스 클래스 생성자)
  constructor() {
  }

  // (페이지 State 초기화)
  private initPageState(): PageState {
    return {
      items: [
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
      ]
    };
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
// [페이지 State 인터페이스]
// 페이지에서 사용할 모든 변수는 여기에 저장하여 사용하세요.
export interface PageState {
  items: {
    itemTitle: string;
    itemDescription: string;
    onItemClicked: () => void;
  }[]
}

// [페이지 Props 인터페이스]
export interface PageProps {
  // (view 와 연결되는 Business 객체)
  // 외부에서 주입받는다면 외부의 Business 객체를 사용하고, 아니라면 내부에서 만들어서 사용합니다.
  mainBusiness?: MainBusiness;
}

export default MainBusiness;