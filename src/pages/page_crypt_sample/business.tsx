import { Params } from 'react-router-dom';
import { PageBusinessBasic } from '../../global_classes/gc_template_classes';
import { PathParams, QueryParams } from './view';
import GcoDialogFrameBusiness from '../../global_components/gco_dialog_frame/business';

import GcoOuterFrameBusiness from '../../global_components/gco_outer_frame/business';
import { aes256Encrypt, aes256Decrypt } from '../../global_functions/gf_crypto';

// [비즈니스 클래스]
// !!!페이지에서 사용할 데이터 선언 및 로직 작성!!!
// 함수는 변수 형식으로 저장합시다. 그래야 onclick 에 입력시 에러가 나지 않습니다.
// 본 클래스의 객체는 다른 페이지로 이동했다가 복귀하더라도 그대로 유지됩니다.
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
  gcoOuterFrameBusiness: GcoOuterFrameBusiness = new GcoOuterFrameBusiness(this, "암/복호화 샘플");

  // (AES256 테스트 암호키 입력창)
  aes256SecretKey: string = "";
  onChangeAes256SecretKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.aes256SecretKey = event.target.value;
    this.aes256SecretKeyWordCount = this.aes256SecretKey.length;
    this.aes256SecretKeyErrorMsg = "";
    this.reRender();
  }
  aes256SecretKeyErrorMsg: string = "";
  aes256SecretKeyWordCount: number = 0;

  // (AES256 테스트 초기화 벡터 입력창)
  aes256SecretIv: string = "";
  onChangeAes256SecretIv = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.aes256SecretIv = event.target.value;
    this.aes256SecretIvWordCount = this.aes256SecretIv.length;
    this.aes256SecretIvErrorMsg = "";
    this.reRender();
  }
  aes256SecretIvErrorMsg: string = "";
  aes256SecretIvWordCount: number = 0;

  // (AES256 테스트 암호화할 평문 입력창)
  aes256PlainText: string = "";
  onChangeAes256PlainText = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.aes256PlainText = event.target.value;
    this.reRender();
  }

  // (AES256 테스트 복호화할 평문 입력창)
  aes256CipherText: string = "";
  onChangeAes256CipherText = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.aes256CipherText = event.target.value;
    this.reRender();
  }

  // (암호화 결과)
  encryptResult: string = "";

  // (복호화 결과)
  decryptResult: string = "";


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
  // (암호화)
  doEncrypt = () => {
    let valid = true;
    if (this.aes256SecretKey == "") {
      this.aes256SecretKeyErrorMsg = "암호화 키를 입력해주세요.";
      valid = false;
    } else if (this.aes256SecretKey.length < 32) {
      this.aes256SecretKeyErrorMsg = "암호화 키는 32 자로 입력해주세요.";
      valid = false;
    }

    if (this.aes256SecretIv == "") {
      this.aes256SecretIvErrorMsg = "암호화 벡터를 입력해주세요.";
      valid = false;
    } else if (this.aes256SecretIv.length < 16) {
      this.aes256SecretIvErrorMsg = "암호화 벡터는 16 자로 입력해주세요.";
      valid = false;
    }

    if (valid) {
      this.encryptResult = aes256Encrypt(this.aes256PlainText, this.aes256SecretKey, this.aes256SecretIv);
    }

    this.reRender();
  }

  // (복호화)
  doDecrypt = () => {
    let valid = true;
    if (this.aes256SecretKey == "") {
      this.aes256SecretKeyErrorMsg = "암호화 키를 입력해주세요.";
      valid = false;
    } else if (this.aes256SecretKey.length < 32) {
      this.aes256SecretKeyErrorMsg = "암호화 키는 32 자로 입력해주세요.";
      valid = false;
    }

    if (this.aes256SecretIv == "") {
      this.aes256SecretIvErrorMsg = "암호화 벡터를 입력해주세요.";
      valid = false;
    } else if (this.aes256SecretIv.length < 16) {
      this.aes256SecretIvErrorMsg = "암호화 벡터는 16 자로 입력해주세요.";
      valid = false;
    }

    if (valid) {
      this.decryptResult = aes256Decrypt(this.aes256CipherText, this.aes256SecretKey, this.aes256SecretIv);
    }

    this.reRender();
  }


  //----------------------------------------------------------------------------
  // [private 함수]
}

export default Business;