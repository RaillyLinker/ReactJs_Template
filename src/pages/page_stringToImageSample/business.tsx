import { Params } from 'react-router-dom';
import { PageBusinessBasic } from '../../global_classes/gc_template_classes';
import { PathParams, QueryParams } from './view';
import GcoDialogFrameBusiness from '../../global_components/gco_dialogFrame/business';
import { Bounce, toast } from 'react-toastify';

import GcoOuterFrameBusiness from '../../global_components/gco_outerFrame/business';


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
  gcoOuterFrameBusiness: GcoOuterFrameBusiness = new GcoOuterFrameBusiness(this, "String to Image 변환 샘플");

  // (토스트 컨테이너 설정)
  // 새로운 토스트를 위에서 나타내게 하기(bottom 토스트에 좋습니다.)
  toastNewestOnTop = false;
  // 토스트 내용을 우측정렬
  toastRightToLeftLayout = false;
  // 포커스 해제시 멈춤
  toastPauseOnFocusLoss = true;

  // (이미지로 생성할 텍스트)
  srcText: string = "";


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
  // (텍스트 입력창 변경 리스너)
  textInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.srcText = e.target.value;
    this.reRender();
  }

  // (서명 생성)
  handleGenerateSignature = () => {
    // 설정 데이터
    const fontSize = 24;
    const fontFamily = 'Cursive';
    const fontColorConfig = 'black';
    const canvasColorConfig = 'rgba(255, 255, 255, 0)';
    const widthMargin = 20;
    const heightMargin = 10;

    // 이미지 생성 시작
    const fontConfig = `${fontSize}px ${fontFamily}`;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context) {
      context.font = fontConfig;

      // 폰트 크기에 비례한 캔버스 높이 설정
      const lineHeight = fontSize * 1.2; // 폰트 크기에 따른 라인 높이
      canvas.width = context.measureText(this.srcText).width + widthMargin; // 여백 포함
      canvas.height = lineHeight + heightMargin; // 위아래 여백 포함

      // 캔버스 배경 색상 설정
      context.fillStyle = canvasColorConfig;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // 텍스트 그리기
      context.fillStyle = fontColorConfig;
      context.font = fontConfig;
      // 텍스트 위치 중앙 조정
      context.fillText(this.srcText, 10, lineHeight);

      // // 이미지를 네트워크 전송
      // canvas.toBlob(async (blob) => {
      //   if (blob) {
      //     // Blob을 FormData에 추가
      //     const formData = new FormData();
      //     formData.append('signature', blob, 'signature.png');

      //     try {
      //       // POST 요청 보내기
      //       const response = await ky.post('https://example.com/upload', {
      //         body: formData,
      //       });

      //       // 서버의 응답 처리
      //       console.log('Image uploaded successfully', await response.json());
      //     } catch (error) {
      //       console.error('Error uploading image:', error);
      //     }
      //   }
      // }, 'image/png');

      // 이미지 다운로드
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'signature.png';
      link.click();
    }
  };


  //----------------------------------------------------------------------------
  // [private 함수]
}

export default Business;