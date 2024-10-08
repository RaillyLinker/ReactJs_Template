import { ComponentBusinessBasic, BusinessBasic } from '../../global_classes/gc_template_classes';


// [비즈니스 클래스]
// 비즈니스 클래스 객체는 이를 소유한 부모 페이지 컴포넌트가 히스토리에서 삭제될 때까지 유지됩니다.
class Business extends ComponentBusinessBasic {
  // [멤버 변수 공간]
  // (이미지 상태)
  // -1 : 실패
  // 0 : 로딩
  // 1 : 완료
  imageState: number = 0;

  // (이미지 주소)
  imageSrc: string;

  // (이미지 정보)
  imageAlt: string;

  // (로딩 화면)
  loadingElement: JSX.Element;

  // (로딩 실패 화면)
  loadingFailedElement: JSX.Element;

  // (외부 주입 클릭 리스너)
  onClickListener: (event: React.MouseEvent, imageState: number) => void;

  imageSrcTemp: string = "";



  //----------------------------------------------------------------------------
  // [생명주기 함수]
  // (비즈니스 클래스 생성자)
  // 부모 컴포넌트에서 값을 받을 때는 이곳으로 받습니다.
  constructor(
    parentComponentBusiness: BusinessBasic,
    imageSrc: string,
    imageAlt: string,
    loadingElement: JSX.Element,
    loadingFailedElement: JSX.Element,
    onClickListener: (event: React.MouseEvent, imageState: number) => void
  ) {
    super(parentComponentBusiness);
    if (imageSrc === "") {
      // imageSrc 는 "" 를 허용하지 않으므로 "/" 로 변경
      this.imageSrc = "/";
    } else {
      this.imageSrc = imageSrc;
    }
    this.imageAlt = imageAlt;
    this.loadingElement = loadingElement;
    this.loadingFailedElement = loadingFailedElement;
    this.onClickListener = onClickListener;
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
    // 뒤로가기를 했다가 다시 돌아가면 로딩이 새로 됩니다.
    // 여기서는 캐싱을 사용하지 않기로 하였습니다.
    // 이미지와 같은 큰 용량의 데이터를 히스토리에 쌓아두는 것은 위험하기 때문이죠.
    // 그럼에도 캐싱을 구현하려면 Image 객체를 business 객체에 저장하여 img 태그 안에 넣는 방식을 구현하여 사용하세요.
    this.imageState = 0;
  }


  //----------------------------------------------------------------------------
  // [public 함수]
  // (이미지 태그 콜백)
  // 이미지 로딩 완료
  imgOnLoad = () => {
    // 완료 상태로 변경
    this.imageState = 1;
    this.reRender();
  }

  // 이미지 로딩 실패
  imgOnError = () => {
    if (this.imageSrc === "") {
      // 이미지 리로드를 위하여 임의로 에러 발생시 => 임시 저장한 원래 src 로딩
      this.imageState = 0;
      this.imageSrc = this.imageSrcTemp;
      this.reRender();
      return
    }

    // 에러 상태로 변경
    this.imageState = -1;
    this.reRender();
  }

  // (컴포넌트 클릭 리스너)
  onClick = (event: React.MouseEvent) => {
    this.onClickListener(event, this.imageState);
  }

  // (이미지 리로드)
  // 이미지를 다시 this.imageState = 0 에서부터 this.imageState = 1 이나 this.imageState = -1 까지 불러오기
  reload = () => {
    if (this.imageSrc !== "") {
      // 이미지 리로드 처리중이 아닌 경우
      // 이미지 원래 src 저장
      this.imageSrcTemp = this.imageSrc;
      // 재 로딩을 위하여 임의로 에러가 발생하도록 처리
      this.imageSrc = "";
      this.reRender();
    }
  }

  // (이미지 변경)
  // 이미지 src 를 변경하여 리로드
  changeSrc = (src: string, alt: string) => {
    this.imageSrc = src;
    this.imageAlt = alt;
    this.reload();
  }



  //----------------------------------------------------------------------------
  // [private 함수]
}

export default Business;