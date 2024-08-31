import { DialogBusinessBasic, PageBusinessBasic } from '../../global_classes/gc_template_classes';
import GcoDialogFrameBusiness from '../../global_components/gco_dialogFrame/business';


// [비즈니스 클래스]
// 비즈니스 클래스 객체는 이를 소유한 부모 페이지 컴포넌트가 히스토리에서 삭제될 때까지 유지됩니다.
class Business extends DialogBusinessBasic {
  // [멤버 변수 공간]


  //----------------------------------------------------------------------------
  // [생명주기 함수]
  // (비즈니스 클래스 생성자)
  // 부모 컴포넌트에서 값을 받을 때는 이곳으로 받습니다.
  constructor(
    gcoDialogFrameBusiness: GcoDialogFrameBusiness,
    parentPageBusiness: PageBusinessBasic
  ) {
    super(gcoDialogFrameBusiness, parentPageBusiness);
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

  // (다이얼로그 외곽을 클릭했을 때)
  onTouchDialogBackground = (close: boolean) => {
  }


  //----------------------------------------------------------------------------
  // [public 함수]


  //----------------------------------------------------------------------------
  // [private 함수]
}

export default Business;