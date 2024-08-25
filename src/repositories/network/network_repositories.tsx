import axios from 'axios';
import { isDebugMode } from '../../global_data/gd_const_config';


// [네트워크 요청 객체 모음]
// 로컬 주소 사용시 윈도우 환경이라면 127.0.0.1, 그외 환경이라면 라우터 내의 ip 를 사용해야합니다.
// (메인 서버 요청 객체)
export const mainServerRequestObj = axios.create({
    baseURL: (isDebugMode)
        // 개발 서버
        ? "http://127.0.0.1:8080"
        // 배포 서버
        : "http://127.0.0.1:8080",
    // 기본 타임아웃 설정(밀리초)
    timeout: 10000
});



// -----------------------------------------------------------------------------
// [요청 객체 초기 설정]