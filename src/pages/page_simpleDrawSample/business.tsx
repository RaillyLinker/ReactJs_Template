import { Params } from 'react-router-dom';
import { PageBusinessBasic } from '../../global_classes/gc_template_classes';
import { PathParams, QueryParams } from './view';
import GcoDialogFrameBusiness from '../../global_components/gco_dialogFrame/business';
import { Bounce, toast } from 'react-toastify';

import GcoOuterFrameBusiness from '../../global_components/gco_outerFrame/business';
import { MouseEvent } from 'react';


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
  gcoOuterFrameBusiness: GcoOuterFrameBusiness = new GcoOuterFrameBusiness(this, "기본 그림판 샘플");

  // (토스트 컨테이너 설정)
  // 새로운 토스트를 위에서 나타내게 하기(bottom 토스트에 좋습니다.)
  toastNewestOnTop = false;
  // 토스트 내용을 우측정렬
  toastRightToLeftLayout = false;
  // 포커스 해제시 멈춤
  toastPauseOnFocusLoss = true;

  // (그림판 캔버스 Ref)
  canvasRef: React.RefObject<HTMLCanvasElement> | null = null;

  // (그림판 상태)
  isDrawing: boolean = false;


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
    this.resizeCanvas(); // 초기 사이즈 설정
    window.addEventListener('resize', this.resizeCanvas); // 윈도우 리사이즈 이벤트 핸들러 등록
  }

  // (컴포넌트가 마운트 해제되어 제거되기 직전)
  // 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 
  // 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
  // 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다. 
  // 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
  onComponentWillUnmount = () => {
    window.removeEventListener('resize', this.resizeCanvas); // 클린업
  }


  //----------------------------------------------------------------------------
  // [public 함수]
  // (캔버스 콜백)
  startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const { offsetX, offsetY } = this.getEventCoordinates(event, canvas);

    context.beginPath();
    context.moveTo(offsetX, offsetY);
    this.isDrawing = true;
    this.reRender();
  };

  draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (!this.isDrawing || !this.canvasRef) return;

    const canvas = this.canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const { offsetX, offsetY } = this.getEventCoordinates(event, canvas);

    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  stopDrawing = () => {
    if (!this.isDrawing || !this.canvasRef) return;

    const canvas = this.canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (context) {
      context.closePath();
    }
    this.isDrawing = false;
    this.reRender();
  };

  // (캔버스에 그린 그림 저장하기)
  saveDrawing = () => {
    if (this.canvasRef === null) return;
    const canvas = this.canvasRef.current;
    if (canvas) {
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

      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'drawing.png';
      link.click();
    }
  };


  //----------------------------------------------------------------------------
  // [private 함수]
  // 이벤트에서 캔버스 좌표를 가져오는 함수
  getEventCoordinates = (event: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    return {
      offsetX: clientX - rect.left,
      offsetY: clientY - rect.top,
    };
  };

  resizeCanvas = () => {
    if (!this.canvasRef) { return; }
    const canvas = this.canvasRef.current;
    const container = canvas?.parentElement;
    if (canvas && container) {
      const containerWidth = container.clientWidth * 0.8;
      const containerHeight = container.clientHeight * 0.8;

      // 4:3 비율에 맞게 크기 조정
      const widthBasedHeight = containerWidth;
      const heightBasedWidth = containerHeight * (4 / 3);

      if (widthBasedHeight <= containerHeight) {
        canvas.width = containerWidth;
        canvas.height = widthBasedHeight;
      } else {
        canvas.width = heightBasedWidth;
        canvas.height = containerHeight;
      }
    }
  };
}

export default Business;