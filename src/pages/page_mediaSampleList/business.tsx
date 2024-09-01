import { Params } from 'react-router-dom';
import { PageBusinessBasic } from '../../global_classes/gc_template_classes';
import { PathParams, QueryParams } from './view';
import GcoDialogFrameBusiness from '../../global_components/gco_dialogFrame/business';
import { Bounce, toast } from 'react-toastify';

import GcoOuterFrameBusiness from '../../global_components/gco_outerFrame/business';


// [비즈니스 클래스]
// 비즈니스 클래스 객체는 이를 소유한 부모 페이지 컴포넌트가 히스토리에서 삭제될 때까지 유지됩니다.
class Business extends PageBusinessBasic {
  // (페이지 파라미터)
  // null 이라면 잘못된 진입
  // Path Parameter 로 받은 값
  pathParams: PathParams | null = null;
  // Query Parameter 로 받은 값
  queryParams: QueryParams | null = null;


  //----------------------------------------------------------------------------
  // [멤버 변수 공간]
  // (다이얼로그 프레임 비즈니스)
  gcoDialogFrameBusiness: GcoDialogFrameBusiness = new GcoDialogFrameBusiness(this);

  // (페이지 외곽 프레임 비즈니스)
  gcoOuterFrameBusiness: GcoOuterFrameBusiness = new GcoOuterFrameBusiness(this, "미디어 샘플 리스트");

  // (토스트 컨테이너 설정)
  // 새로운 토스트를 위에서 나타내게 하기(bottom 토스트에 좋습니다.)
  toastNewestOnTop = false;
  // 토스트 내용을 우측정렬
  toastRightToLeftLayout = false;
  // 포커스 해제시 멈춤
  toastPauseOnFocusLoss = true;

  // (메인 리스트)
  items: {
    uid: number,
    itemTitle: string;
    itemDescription: string;
    onItemClicked: () => void;
  }[] =
    [
      {
        uid: 0,
        itemTitle: "String to Image 변환 샘플",
        itemDescription: "서명 생성과 같이, 입력받은 String 변수를 이미지로 변환하는 샘플입니다.",
        onItemClicked: (): void => {
          this.navigate("/media-sample-list/string-to-image-sample");
        }
      },
      {
        uid: 1,
        itemTitle: "기본 그림판 샘플",
        itemDescription: "마우스로 그림을 그리는 간단한 그림판 샘플입니다.",
        onItemClicked: (): void => {
          this.navigate("/media-sample-list/simple-draw-sample");
        }
      },
      {
        uid: 2,
        itemTitle: "Component to Image 변환 샘플",
        itemDescription: "HTML 의 특정 Component 를 이미지로 변환하는 샘플입니다.",
        onItemClicked: (): void => {
          this.navigate("/media-sample-list/component-to-image-sample");
        }
      },
      {
        uid: 3,
        itemTitle: "이미지 리사이징 샘플",
        itemDescription: "이미지를 입력받아 리사이징 후 반환하는 샘플입니다.",
        onItemClicked: (): void => {
          this.navigate("/media-sample-list/image-resizing-sample");
        }
      },
      {
        uid: 4,
        itemTitle: "캠 사용 샘플",
        itemDescription: "캠 디바이스 사용 샘플입니다.",
        onItemClicked: (): void => {
          this.navigate("/media-sample-list/cam-sample");
        }
      },
      {
        uid: 5,
        itemTitle: "비디오 프레임 캡쳐 샘플",
        itemDescription: "비디오 파일을 선택하고 입력한 시간 범위 내의 무작위 프레임을 추출하는 샘플입니다.",
        onItemClicked: (): void => {
          this.navigate("/media-sample-list/video-frame-capture-sample");
        }
      },
      {
        uid: 6,
        itemTitle: "비디오 프레임 선택 샘플",
        itemDescription: "비디오 파일을 선택하고 현재 재생 시간의 프레임을 추출하는 샘플입니다.",
        onItemClicked: (): void => {
          this.navigate("/media-sample-list/video-frame-choice-sample");
        }
      },
      {
        uid: 7,
        itemTitle: "비디오 잘라내기 샘플",
        itemDescription: "비디오 파일을 선택하고 특정 구간을 잘라내는 샘플입니다.",
        onItemClicked: (): void => {
          this.navigate("/media-sample-list/video-cropper-sample");
        }
      }
    ];


  //----------------------------------------------------------------------------
  // [생명주기 함수]
  // (생성자)
  constructor(
    historyIdx: number,
    historyKey: string,
    // Path 파라미터 객체 (ex : pathParams["testPath"])
    pathParams: Readonly<Params<string>>,
    // Query 파라미터 객체 (ex : queryParams.get("testQuery"))
    queryParams: URLSearchParams
  ) {
    super(historyIdx, historyKey);

    // (컴포넌트 입력 파라미터 확인 및 초기화)
    // this.pathParams, this.queryParams 를 입력하면 되며,
    // 만약 하나라도 null 이라면 에러 화면이 나오게 됩니다.

    // Query 파라미터 객체로 값 입력하기
    // (ex : const queryParam: string | null = queryParams.get("queryParam");)

    // Query 파라미터 필수 값 확인(Path 파라미터 미입력시 진입 자체가 성립되지 않습니다.)
    // ex : if (queryParam === null) { return; }

    // Path 파라미터 객체로 값 입력하기
    // (ex : const pathParam: string = pathParams["pathParam"]!;)

    // 파라미터 값 할당
    this.pathParams = {};

    this.queryParams = {};
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


  //----------------------------------------------------------------------------
  // [private 함수]
}

export default Business;