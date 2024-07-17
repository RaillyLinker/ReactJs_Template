// [템플릿 전용 클래스 모음]
// (컴포넌트 State 클래스 기본타입)
export interface StateBasic { }

// (페이지 히스토리 VO 클래스)
export class PageHistory {
  // (히스토리 키)
  // window.history.state["key"] 로 가져온 히스토리 고유키
  historyKey: any;

  // (Page State)
  pageState: StateBasic;

  // (클래스 생성자)
  constructor(historyKey: string, pageState: StateBasic) {
    this.historyKey = historyKey;
    this.pageState = pageState;
  }
}