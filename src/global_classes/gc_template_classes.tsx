// [템플릿 전용 클래스 모음]
// (컴포넌트 State 클래스 기본타입)
export interface StateBasic { }

export class PageHistory {
    // (히스토리 인덱스)
    // window.history.state["idx"] 로 가져온 히스토리 인덱스
    historyIdx: number;

    // (히스토리 키)
    // window.history.state["key"] 로 가져온 히스토리 고유키
    historyKey: string;

    // (Page State)
    pageState: StateBasic;

    constructor(historyIdx: number, historyKey: string, pageState: StateBasic) {
        this.historyIdx = historyIdx;
        this.historyKey = historyKey;
        this.pageState = pageState;
    }
}