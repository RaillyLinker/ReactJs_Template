import { Stack } from '../global_classes/gc_my_classes'
import { StateBasic } from '../global_classes/gc_template_classes'

// [템플릿 전용 데이터 모음]
// (페이지 히스토리 스택)
export const historyStack: Stack<StateBasic> = new Stack();