import { StateBasic } from './gc_ancestor_classes'

// [템플릿 전용 클래스 모음]
// (페이지 히스토리 클래스)
export class History {
    private componentState: StateBasic;

    constructor(componentState: StateBasic) {
        this.componentState = componentState;
    }
}