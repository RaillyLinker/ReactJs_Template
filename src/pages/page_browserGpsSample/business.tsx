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
  gcoOuterFrameBusiness: GcoOuterFrameBusiness = new GcoOuterFrameBusiness(this, "브라우저 GPS 샘플");

  // (토스트 컨테이너 설정)
  // 새로운 토스트를 위에서 나타내게 하기(bottom 토스트에 좋습니다.)
  toastNewestOnTop = false;
  // 토스트 내용을 우측정렬
  toastRightToLeftLayout = false;
  // 포커스 해제시 멈춤
  toastPauseOnFocusLoss = true;

  // 현 좌표
  position: Position | null = null;
  // 좌표 추적 ID
  watchId: number | null = null;
  // 좌표 가져오기 에러
  error: String | null = null;


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
    // 권한 상태를 감지
    if ("permissions" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
        // 권한 상태 변화를 감지
        permissionStatus.onchange = () => {
          if (permissionStatus.state === "granted") {
            // 권한이 허용되면 위치 정보를 다시 요청
            this.requestLocation();
          } else if (permissionStatus.state === "denied") {
            // 권한이 거부되면 에러 표시
            this.error = "위치 정보 사용 권한이 거부되었습니다.";
            this.reRender();
          }
        };
      });
    }

    // 최초 위치 요청 (초기 렌더링 시)
    this.requestLocation();
  }

  // (컴포넌트가 마운트 해제되어 제거되기 직전)
  // 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 
  // 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
  // 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다. 
  // 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
  onComponentWillUnmount = () => {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }


  //----------------------------------------------------------------------------
  // [public 함수]


  //----------------------------------------------------------------------------
  // [private 함수]
  // (현재 위치 가져오기 함수)
  private requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.position = { latitude, longitude };
          this.error = null;
          this.reRender();

          // 위치 정보 요청 성공 후 watchLocation 실행
          this.watchLocation();
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              this.error = "위치 정보 사용 권한이 거부되었습니다.";
              this.reRender();
              break;
            case err.POSITION_UNAVAILABLE:
              this.error = "위치 정보를 사용할 수 없습니다.";
              this.reRender();
              break;
            case err.TIMEOUT:
              this.error = "위치 정보를 가져오는 시간이 초과되었습니다.";
              this.reRender();
              break;
            default:
              this.error = "알 수 없는 오류가 발생했습니다.";
              this.reRender();
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      this.error = "이 브라우저는 Geolocation API를 지원하지 않습니다.";
      this.reRender();
    }
  };

  // (현재 위치 좌표 추적 함수)
  private watchLocation = () => {
    if ("geolocation" in navigator) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.position = { latitude, longitude };
          this.error = null;
          this.reRender();
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              this.error = "위치 정보 사용 권한이 거부되었습니다.";
              this.reRender();
              break;
            case err.POSITION_UNAVAILABLE:
              this.error = "위치 정보를 사용할 수 없습니다.";
              this.reRender();
              break;
            case err.TIMEOUT:
              this.error = "위치 정보를 가져오는 시간이 초과되었습니다.";
              this.reRender();
              break;
            default:
              this.error = "알 수 없는 오류가 발생했습니다.";
              this.reRender();
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
      // watchId 저장
      this.watchId = id;
    } else {
      this.error = "이 브라우저는 Geolocation API를 지원하지 않습니다.";
      this.reRender();
    }
  };
}

// (좌표 정보 인터페이스)
interface Position {
  latitude: number;
  longitude: number;
}

export default Business;