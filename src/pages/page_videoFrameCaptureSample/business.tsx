import { Params } from 'react-router-dom';
import { PageBusinessBasic } from '../../global_classes/gc_template_classes';
import { PathParams, QueryParams } from './view';
import GcoDialogFrameBusiness from '../../global_components/gco_dialogFrame/business';
import { Bounce, toast } from 'react-toastify';

import GcoOuterFrameBusiness from '../../global_components/gco_outerFrame/business';
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import DialogLoadingSpinner from '../../dialog_components/dialog_loadingSpinner/view';
import DialogLoadingSpinnerBusiness from '../../dialog_components/dialog_loadingSpinner/business';


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
  gcoOuterFrameBusiness: GcoOuterFrameBusiness = new GcoOuterFrameBusiness(this, "비디오 프레임 캡쳐 샘플");

  // (토스트 컨테이너 설정)
  // 새로운 토스트를 위에서 나타내게 하기(bottom 토스트에 좋습니다.)
  toastNewestOnTop = false;
  // 토스트 내용을 우측정렬
  toastRightToLeftLayout = false;
  // 포커스 해제시 멈춤
  toastPauseOnFocusLoss = true;

  //
  videoRef: React.RefObject<HTMLVideoElement> | null = null;
  videoFile: File | null = null;
  startTime: number = 0;
  endTime: number = 0;
  ffmpeg = new FFmpeg();
  videoUrl: string | null = null;


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
  handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      this.videoFile = e.target.files[0];
      this.reRender();
    }
  };

  captureFrame = async () => {
    if (!this.videoFile || !this.videoRef || !this.videoRef.current) return;
    if (this.startTime < 0 || this.endTime < 0) {
      alert("Start time 과 end time 은 음수일 수 없습니다.");
      return;
    }
    if (this.endTime <= this.startTime) {
      alert("End time 은 반드시 start time 보다 커야합니다.");
      return;
    }

    this.gcoDialogFrameBusiness.showDialog(false, DialogLoadingSpinner, new DialogLoadingSpinnerBusiness(this.gcoDialogFrameBusiness, this));
    try {
      // FFmpeg.js 초기화
      await this.ffmpeg.load();
      await this.ffmpeg.writeFile(this.videoFile.name, await fetchFile(this.videoFile));

      // 영상 길이 확인
      const duration = this.videoRef.current.duration * 1000;
      const actualEndTime = Math.min(this.endTime, duration);

      // 무작위 프레임 선정
      const randomTime = Math.floor(Math.random() * (actualEndTime - this.startTime)) + this.startTime;

      // 무작위 프레임 추출
      const outputFilename = `frame-${randomTime}.jpg`;
      await this.ffmpeg.exec([
        "-ss", (randomTime / 1000).toFixed(2),
        "-i", this.videoFile.name,
        "-vframes", "1",
        outputFilename,
      ]);

      const data = await this.ffmpeg.readFile(outputFilename);
      const url = URL.createObjectURL(new Blob([data], { type: "image/jpeg" }));

      // 이미지 다운로드
      const a = document.createElement("a");
      a.href = url;
      a.download = `frame-${randomTime}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      this.gcoDialogFrameBusiness.closeDialog();
    }
  };

  videoFileChange = () => {
    if (this.videoFile) {
      const url = URL.createObjectURL(this.videoFile);
      this.videoUrl = url;
      this.reRender();

      return () => {
        if (this.videoUrl) URL.revokeObjectURL(this.videoUrl);
      };
    }
  }


  //----------------------------------------------------------------------------
  // [private 함수]
}

export default Business;