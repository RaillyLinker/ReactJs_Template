// [템플릿 전용 클래스 모음]
// (컴포넌트 Business 클래스 기본타입)
export interface BusinessBasic { }

// (페이지 히스토리 VO 클래스)
export class PageHistory {
  // (히스토리 키)
  // window.history.state["key"] 로 가져온 히스토리 고유키
  historyKey: string;

  // (Page Business)
  pageBusiness: BusinessBasic;

  // (클래스 생성자)
  constructor(historyKey: string, pageBusiness: BusinessBasic) {
    this.historyKey = historyKey;
    this.pageBusiness = pageBusiness;
  }
}