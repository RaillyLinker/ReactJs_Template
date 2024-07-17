import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Params } from 'react-router-dom';
import { StateBasic } from '../../global_classes/gc_template_classes';

import GcHeaderBusiness from '../../global_components/gc_header/business';
import GcFooterBusiness from '../../global_components/gc_footer/business';

// [비즈니스 클래스]
class Business {
  // (컴포넌트 State 및 State 갱신자)
  mainState?: State;
  setMainState?: React.Dispatch<React.SetStateAction<State>>;

  // (Navigate 객체)
  // 사용법은,
  // if (this.navigate) {
  //   this.navigate("/test");
  // }
  // 위와 같으며, 파라미터가 string 이라면 path 경로로 이동하고,
  // path 가 number 일 때, 양수라면 숫자만큼 앞으로 가기, 음수라면 숫자만큼 뒤로가기
  navigate?: NavigateFunction;

  //----------------------------------------------------------------------------
  // [생명주기 함수]
  // (컴포넌트 State 초기화)
  initMainState(
    // Path 파라미터 객체 (ex : pathParams["testPath"])
    pathParams: Readonly<Params<string>>,
    // Query 파라미터 객체 (ex : queryParams.get("testQuery"))
    queryParams: URLSearchParams
  ): State {
    return {
      pathParams: {},
      queryParams: {},
      items: [
        {
          itemTitle: "페이지 / 라우터 샘플 리스트",
          itemDescription: "페이지 이동, 파라미터 전달 등의 샘플 리스트",
          onItemClicked: (): void => {
            console.log("페이지 / 라우터 샘플 리스트");
            if (this.navigate) {
              this.navigate(-1);
            }
          }
        },
        {
          itemTitle: "다이얼로그 샘플 리스트",
          itemDescription: "다이얼로그 호출 샘플 리스트",
          onItemClicked: (): void => {
            console.log("다이얼로그 호출 샘플 리스트");
            if (this.navigate) {
              this.navigate(1);
            }
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
            if (this.navigate) {
              this.navigate("/test");
            }
          }
        }
      ],
      gcHeaderBusiness: new GcHeaderBusiness(),
      gcFooterBusiness: new GcFooterBusiness()
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
// 컴포넌트에서 사용할 모든 변수는 여기에 저장하여 사용하세요.
export interface State extends StateBasic {
  // Path Parameter 로 받은 값
  pathParams: PathParams,
  // Query Parameter 로 받은 값
  queryParams: QueryParams,

  gcHeaderBusiness: GcHeaderBusiness,
  gcFooterBusiness: GcFooterBusiness,
  items: {
    itemTitle: string;
    itemDescription: string;
    onItemClicked: () => void;
  }[]
}

// [Path Parameter VO 클래스]
export class PathParams {
}

// [Query Parameter VO 클래스]
export class QueryParams {
}

export default Business;