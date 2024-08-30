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
  gcoOuterFrameBusiness: GcoOuterFrameBusiness = new GcoOuterFrameBusiness(this, "캠 사용 샘플");

  // (토스트 컨테이너 설정)
  // 새로운 토스트를 위에서 나타내게 하기(bottom 토스트에 좋습니다.)
  toastNewestOnTop = false;
  // 토스트 내용을 우측정렬
  toastRightToLeftLayout = false;
  // 포커스 해제시 멈춤
  toastPauseOnFocusLoss = true;

  // (vidio 태그 Ref)
  videoRef: React.RefObject<HTMLVideoElement> | null = null;

  // (카메라 상태 정보)
  // 카메라가 현재 실행중인지
  isCameraOn: boolean = false;
  // 카메라 동작 에러 문구
  error: string | null = null;
  // 카메라 스트림
  cameraStream: MediaStream | null = null;
  // 카메라 반전 여부
  isMirrored: boolean = false;
  // 녹화 여부
  isRecording: boolean = false;

  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null> | null = null;
  recordedChunks: React.MutableRefObject<Blob[]> | null = null;


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
    this.stopCamera();
  }


  //----------------------------------------------------------------------------
  // [public 함수]
  // (카메라 시작)
  startCamera = async () => {
    if (this.isCameraOn) {
      return;
    }
    this.isCameraOn = true;
    this.reRender();

    try {
      // 카메라 스트림 생성
      this.cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (this.videoRef && this.videoRef.current) {
        // video 태그에 카메라 스트림 입력
        this.videoRef.current.srcObject = this.cameraStream;
      }
      this.error = null;
      this.reRender();

      this.cameraStream.getTracks()[0].onended = () => {
        // 카메라 연결이 끊겼을 때 처리
        this.stopCamera();
        this.error = '카메라 디바이스 연결이 끊겼습니다.';
        this.reRender();
      };
    } catch (err) {
      // 카메라 디바이스 접근 불가
      this.stopCamera();
      this.error = '카메라 디바이스에 접근할 수 없습니다. 다시 시도해주세요.';
      this.reRender();
    }
  };

  // (카메라 종료)
  stopCamera = () => {
    if (!this.isCameraOn) {
      return;
    }
    this.isCameraOn = false;
    this.reRender();

    // 녹화 중지
    this.stopRecording();

    // video 태그에서 카메라 스트림 분리
    if (this.videoRef && this.videoRef.current) {
      this.videoRef.current.srcObject = null;
    }

    // 카메라 스트림 종료
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach(track => track.stop());
      this.cameraStream = null;
    }
    this.isRecording = false;
    this.reRender();
  };

  // (카메라 on/off 토글 버튼 클릭)
  onCameraButtonClick = async () => {
    if (this.isCameraOn) {
      this.stopCamera();
    } else {
      await this.startCamera();
    }
  }

  // (카메라 반전 태그 클릭)
  handleMirrorToggle = () => {
    this.isMirrored = !this.isMirrored;
    this.reRender();
  };

  // (캡쳐 버튼 클릭)
  handleCapture = () => {
    if (this.isCameraOn && this.videoRef && this.videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = this.videoRef.current.videoWidth;
      canvas.height = this.videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        if (this.isMirrored) {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        context.drawImage(this.videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'capture.png';
        link.click();
      }
    }
  };

  // (녹화 시작)
  startRecording = () => {
    if (this.isRecording) {
      return;
    }
    this.isRecording = true;
    this.reRender();

    if (this.videoRef && this.videoRef.current?.srcObject && this.mediaRecorderRef) {
      const stream = this.videoRef.current.srcObject as MediaStream;
      this.mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });

      this.mediaRecorderRef.current.ondataavailable = event => {
        if (event.data.size > 0 && this.recordedChunks) {
          this.recordedChunks.current.push(event.data);
        }
      };

      this.mediaRecorderRef.current.onstop = () => {
        if (this.recordedChunks) {
          const blob = new Blob(this.recordedChunks.current, { type: 'video/webm' });
          this.recordedChunks.current = [];
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'recording.webm';
          link.click();
          URL.revokeObjectURL(url);
        }
      };

      this.mediaRecorderRef.current.start();
    }
  };

  // (녹화 중지)
  stopRecording = () => {
    if (!this.isRecording) {
      return;
    }
    this.isRecording = false;
    this.reRender();

    if (this.mediaRecorderRef) {
      this.mediaRecorderRef.current?.stop();
    }
  }

  // (녹화하기 토글 버튼)
  handleRecordToggle = () => {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  };


  //----------------------------------------------------------------------------
  // [private 함수]
}

export default Business;