import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Params } from 'react-router-dom';
import { BusinessBasic } from '../../global_classes/gc_template_classes';

import GcoOuterFrameBusiness from '../../global_components/gco_outer_frame/business';
import PagePageAndRouterSampleListBusiness from '../../pages/page_pageAndRouterSampleList/business';

// [비즈니스 클래스]
// !!!페이지에서 사용할 데이터 선언 및 로직 작성!!!
// 함수는 변수 형식으로 저장합시다. 그래야 onclick 에 입력시 에러가 나지 않습니다.
// 본 클래스의 객체는 다른 페이지로 이동했다가 복귀하더라도 그대로 유지됩니다.
class Business implements BusinessBasic {
  // (이전 페이지 비즈니스 객체)
  prevPageBusiness?: BusinessBasic

  // (페이지 파라미터)
  // Path Parameter 로 받은 값
  pathParams?: PathParams
  // Query Parameter 로 받은 값
  queryParams?: QueryParams

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
  // 멤버 변수는 컴포넌트가 히스토리에서 삭제될 때까지 유지됩니다.
  gcoOuterFrameBusiness: GcoOuterFrameBusiness = new GcoOuterFrameBusiness("페이지 입/출력 테스트");


  //----------------------------------------------------------------------------
  // [생명주기 함수]
  // (컴포넌트 입력 파라미터 확인 및 초기화)
  // 컴포넌트 진입시 가장 먼저 실행됩니다.
  // this.pathParams, this.queryParams 를 입력하면 되며,
  // 만약 하나라도 undefined 이라면 에러 화면이 나오게 됩니다.
  onCheckPageInputVo = (
    // Path 파라미터 객체 (ex : pathParams["testPath"])
    pathParams: Readonly<Params<string>>,
    // Query 파라미터 객체 (ex : queryParams.get("testQuery"))
    queryParams: URLSearchParams
  ) => {
    // Query 파라미터 객체로 값 입력하기
    // (ex : const queryParam: string | null = queryParams.get("queryParam");)
    const queryParam: string | null = queryParams.get("queryParam");

    // Query 파라미터 필수 값 확인(Path 파라미터 미입력시 진입 자체가 성립되지 않습니다.)
    // ex : if (queryParam === null) { return; }
    if (queryParam === null) {
      return;
    }

    // Path 파라미터 객체로 값 입력하기
    // (ex : const pathParam: string = pathParams["pathParam"]!;)
    const pathParam: string = pathParams["pathParam"]!;

    // 파라미터 값 할당
    this.pathParams = {
      pathParam
    };

    this.queryParams = {
      queryParam
    };
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
  // (컴포넌트 화면 리랜더링 함수)
  // 이 함수를 호출하면 컴포넌트 화면이 다시 랜더링 됩니다.
  // 가볍게 일부만 변경하려면 useRef 로 DOM 을 조작하세요.
  reRender = () => {
    this.screenFlag = !this.screenFlag;
    this.setScreenFlag!(this.screenFlag);
  }

  onClickPrevPageChange = () => {
    if (this.prevPageBusiness != null && this.prevPageBusiness instanceof PagePageAndRouterSampleListBusiness) {
      // business 의 변수 값만 변경해도 해당 페이지로 복귀시 리렌더링 후 적용됩니다.
      this.prevPageBusiness.items[2].itemTitle += "+";
      this.navigate(-1);
    }
  }


  //----------------------------------------------------------------------------
  // [private 함수]
}

//----------------------------------------------------------------------------
// [Path Parameter VO 클래스]
export class PathParams {
  constructor(pathParam: string) {
    this.pathParam = pathParam;
  }

  pathParam: string
}

// [Query Parameter VO 클래스]
export class QueryParams {
  constructor(queryParam: string) {
    this.queryParam = queryParam;
  }

  queryParam: string
}

export default Business;