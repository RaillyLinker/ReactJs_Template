import { ComponentBusinessBasic, BusinessBasic } from '../../global_classes/gc_template_classes';


// [비즈니스 클래스]
// 비즈니스 클래스 객체는 이를 소유한 부모 페이지 컴포넌트가 히스토리에서 삭제될 때까지 유지됩니다.
class Business extends ComponentBusinessBasic {
  // [멤버 변수 공간]
  // (화면 본문 레퍼런스)
  contentRef: React.RefObject<HTMLDivElement> | null = null;
  // (content 스크롤 상하 위치)
  contentScrollTop: number = 0;
  // (content 스크롤 좌우 위치)
  contentScrollLeft: number = 0;
  // (스크롤 content 객체)
  contentElement: HTMLDivElement | null = null;


  //----------------------------------------------------------------------------
  // [생명주기 함수]
  // (비즈니스 클래스 생성자)
  // 부모 컴포넌트에서 값을 받을 때는 이곳으로 받습니다.
  constructor(
    parentComponentBusiness: BusinessBasic
  ) {
    super(parentComponentBusiness);
  }

  // (컴포넌트가 마운트된 직 후)
  // 컴포넌트가 마운트된 직 후에 호출됩니다. 
  // DOM 노드가 있어야 하는 초기화 작업은 이 메서드에서 이루어지면 됩니다.
  // 외부에서 데이터를 불러와야 한다면 네트워크 요청을 보내기 적절한 위치라고 할 수 있습니다.
  onComponentDidMount = (firstMount: boolean) => {
    // 기존 스크롤 위치 적용 및 스크롤 리스너 설정
    if (this.contentRef !== null && this.contentRef.current) {
      this.contentElement = this.contentRef.current;
      this.contentElement.scrollTop = this.contentScrollTop;
      this.contentElement.scrollLeft = this.contentScrollLeft;
      this.contentElement.addEventListener('scroll', this.handleScroll);
    }
  }

  // (컴포넌트가 마운트 해제되어 제거되기 직전)
  // 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 
  // 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
  // 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다. 
  // 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
  onComponentWillUnmount = () => {
    // 스크롤 리스너 제거
    if (this.contentElement) {
      this.contentElement.removeEventListener('scroll', this.handleScroll);
      this.contentElement = null;
    }
  }


  //----------------------------------------------------------------------------
  // [public 함수]
  // (스크롤 핸들러)
  // 스크롤 변경때마다 스크롤 위치 저장
  handleScroll = () => {
    if (this.contentElement) {
      this.contentScrollTop = this.contentElement.scrollTop;
      this.contentScrollLeft = this.contentElement.scrollLeft;
    }
  };


  //----------------------------------------------------------------------------
  // [private 함수]
}

export default Business;