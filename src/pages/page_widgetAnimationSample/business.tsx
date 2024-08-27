import { Params } from 'react-router-dom';
import { PageBusinessBasic } from '../../global_classes/gc_template_classes';
import { PathParams, QueryParams } from './view';
import GcoDialogFrameBusiness from '../../global_components/gco_dialogFrame/business';
import { Bounce, toast } from 'react-toastify';

import GcoOuterFrameBusiness from '../../global_components/gco_outerFrame/business';
import styles from './view.module.css';


// [비즈니스 클래스]
class Business extends PageBusinessBasic {
  // (페이지 파라미터)
  // null 이라면 잘못된 진입
  // Path Parameter 로 받은 값
  pathParams: PathParams | null = null;
  // Query Parameter 로 받은 값
  queryParams: QueryParams | null = null;


  //----------------------------------------------------------------------------
  // [멤버 변수 공간]
  // 멤버 변수는 컴포넌트가 히스토리에서 삭제될 때까지 유지됩니다.

  // (다이얼로그 프레임 비즈니스)
  gcoDialogFrameBusiness: GcoDialogFrameBusiness = new GcoDialogFrameBusiness(this);

  // (페이지 외곽 프레임 비즈니스)
  gcoOuterFrameBusiness: GcoOuterFrameBusiness = new GcoOuterFrameBusiness(this, "위젯 애니메이션 샘플");

  // (토스트 컨테이너 설정)
  // 새로운 토스트를 위에서 나타내게 하기(bottom 토스트에 좋습니다.)
  toastNewestOnTop = false;
  // 토스트 내용을 우측정렬
  toastRightToLeftLayout = false;
  // 포커스 해제시 멈춤
  toastPauseOnFocusLoss = true;

  // (사각형 Ref)
  squareRef: React.RefObject<HTMLDivElement> | null = null;

  // (애니메이션 실행 여부)
  doAnimationNow: boolean = false;

  // (현재 적용할 애니메이션 리스트 인덱스)
  animationIndex = 0;

  // (적용 애니메이션 style 클래스명 리스트)
  openAnimationClassNameList: string[] =
    [
      styles['Anim_fadeIn'],
      styles['Anim_slideInTop'],
      styles['Anim_zoomIn'],
      styles['Anim_rotateIn'],
      styles['Anim_flipIn']
    ]
  closeAnimationClassNameList: string[] =
    [
      styles['Anim_fadeOut'],
      styles['Anim_slideOutTop'],
      styles['Anim_zoomOut'],
      styles['Anim_rotateOut'],
      styles['Anim_flipOut']
    ]


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
  // (애니메이션 실행)
  doAnimation = () => {
    if (this.doAnimationNow) {
      return;
    }
    this.doAnimationNow = true;

    // 적용할 애니메이션 인덱스 구하기
    while (this.openAnimationClassNameList.length !== 0) {
      const randomIndex = Math.floor(Math.random() * this.openAnimationClassNameList.length);
      if (randomIndex !== this.animationIndex) {
        this.animationIndex = randomIndex;
        break;
      }
    }

    // 적용할 애니메이션 할당
    const openAnimationClassName: string = this.openAnimationClassNameList[this.animationIndex];
    const closeAnimationClassName: string = this.closeAnimationClassNameList[this.animationIndex];

    // 애니메이션 적용하기(Ref 의 classList 에 애니메이션 클래스를 add)
    if (this.squareRef !== null && this.squareRef.current !== null) {
      this.squareRef.current.classList.add(closeAnimationClassName);
      this.squareRef.current.addEventListener('animationend', () => {
        // 현재 진행중인 애니메이션 완료시점 콜백
        if (this.squareRef !== null && this.squareRef.current !== null) {
          this.squareRef.current.classList.remove(closeAnimationClassName);

          this.squareRef.current.classList.add(openAnimationClassName);
          this.squareRef.current.addEventListener('animationend', () => {
            // 현재 진행중인 애니메이션 완료시점 콜백
            if (this.squareRef !== null && this.squareRef.current !== null) {
              this.squareRef.current.classList.remove(openAnimationClassName);
              this.doAnimationNow = false;
            }
          }, { once: true });
        }
      }, { once: true });
    }
  }


  //----------------------------------------------------------------------------
  // [private 함수]
}

export default Business;