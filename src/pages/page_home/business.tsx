import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Params } from 'react-router-dom';
import { BusinessBasic } from '../../global_classes/gc_template_classes';
import cloneDeep from 'lodash/cloneDeep';

import GcoHeaderBusiness from '../../global_components/gco_header/business';
import GcoFooterBusiness from '../../global_components/gco_footer/business';

// [비즈니스 클래스]
// 함수는 변수 형식으로 저장합시다. 그래야 onclick 에 입력시 에러가 나지 않습니다.
// 본 클래스의 객체는 다른 페이지로 이동했다가 복귀하더라도 그대로 유지됩니다.
class Business implements BusinessBasic {
  // (페이지 파라미터)
  // Path Parameter 로 받은 값
  pathParams?: PathParams
  // Query Parameter 로 받은 값
  queryParams?: QueryParams

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
  // (컴포넌트 State 초기화)
  // 컴포넌트 진입시 가장 먼저 실행됩니다.
  // this.pathParams, this.queryParams, this.mainState 를 입력하면 되며,
  // 만약 하나라도 undefined 이라면 에러 화면이 나오게 됩니다.
  initMainState = (
    // Path 파라미터 객체 (ex : pathParams["testPath"])
    pathParams: Readonly<Params<string>>,
    // Query 파라미터 객체 (ex : queryParams.get("testQuery"))
    queryParams: URLSearchParams
  ) => {
    // Path 파라미터 객체로 값 입력하기
    // (ex : pathParams["testPath"])
    this.pathParams = {};

    // Query 파라미터 객체로 값 입력하기
    // (ex : queryParams.get("testQuery"))
    this.queryParams = {};

    this.mainState = {
      items: [
        {
          itemTitle: "페이지 / 라우터 샘플 리스트",
          itemDescription: "페이지 이동, 파라미터 전달 등의 샘플 리스트",
          onItemClicked: (): void => {
            console.log("페이지 / 라우터 샘플 리스트");
            this.navigate(-1);
          }
        },
        {
          itemTitle: "다이얼로그 샘플 리스트",
          itemDescription: "다이얼로그 호출 샘플 리스트",
          onItemClicked: (): void => {
            console.log("다이얼로그 호출 샘플 리스트");
            this.navigate(1);
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
            this.navigate("/test");
          }
        }
      ],
      gcoHeaderBusiness: new GcoHeaderBusiness("홈"),
      gcoFooterBusiness: new GcoFooterBusiness("by Railly")
    };
  }

  // (컴포넌트가 마운트된 직 후)
  // 컴포넌트가 마운트된 직 후에 호출됩니다. 
  // DOM 노드가 있어야 하는 초기화 작업은 이 메서드에서 이루어지면 됩니다.
  // 외부에서 데이터를 불러와야 한다면 네트워크 요청을 보내기 적절한 위치라고 할 수 있습니다.
  onComponentDidMount = () => {
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
    if (this.mainState != undefined) {
      this.setMainState!(cloneDeep(this.mainState));
    }
  }

  //----------------------------------------------------------------------------
  // [private 함수]
}

//----------------------------------------------------------------------------
// [컴포넌트 State 인터페이스]
export interface State {
  gcoHeaderBusiness: GcoHeaderBusiness,
  gcoFooterBusiness: GcoFooterBusiness,
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