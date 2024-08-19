import { Semaphore } from "async-mutex";

// [클래스 모음]

// (스레드 병합 클래스)
export class ThreadMerger {
    constructor(
        // 병합할 스레드 총개수
        threadTotalCount: number,
        // 스레드 병합이 모두 끝나면 실행할 콜백 함수
        onComplete: () => void
    ) {
        this.threadTotalCount = threadTotalCount;
        this.onComplete = onComplete;
    }

    // (병합할 스레드 총개수)
    threadTotalCount: number;
    // (스레드 병합이 모두 끝나면 실행할 콜백 함수)
    onComplete: () => void;

    // (현재 병합된 스레드 개수 및 세마포어)
    mergedThreadCount: number = 0;
    mergedThreadCountSemaphore = new Semaphore(1);

    // (스레드 병합 개수 +1)
    threadComplete = async () => {
        this.mergedThreadCountSemaphore.acquire()
        try {
            // 스레드 병합 카운트 +1
            ++this.mergedThreadCount
            if (this.mergedThreadCount == this.threadTotalCount) {
                // 병합 카운트가 스레드 총 개수에 다다랐을 때
                this.mergedThreadCountSemaphore.release()
                this.onComplete()
            } else {
                // 병합 카운트가 스레드 총 개수에 다다르지 못했을 때
                this.mergedThreadCountSemaphore.release()
            }
        } catch (e) {
            this.mergedThreadCountSemaphore.release()
        }
    };

    // (스레드 병합 개수 초기화)
    rewind = () => {
        this.mergedThreadCountSemaphore.acquire()
        try {
            this.mergedThreadCount = 0
        } finally {
            this.mergedThreadCountSemaphore.release()
        }
    }
}