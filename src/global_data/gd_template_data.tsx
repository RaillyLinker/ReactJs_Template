import { PageHistory } from '../global_classes/gc_template_classes';

// [템플릿 전용 데이터 모음]
// (페이지 히스토리 딕셔너리)
// idx : window.history.state["idx"] 로 가져온 히스토리 인덱스
export const pageHistoryDict: { [idx: number]: PageHistory } = {};