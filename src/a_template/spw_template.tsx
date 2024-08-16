import { aes256Encrypt, aes256Decrypt } from '../global_functions/gf_crypto';

export class SharedPreferenceWrapper {
    // (전역 키 이름)
    // !!!전역 키 이름 설정!!!
    // 적용 구역이 전역이므로 중복되지 않도록 spws 안의 파일명을 적을 것
    static globalKeyName = "spw_template";

    // (저장 데이터 암호 설정)
    // !!!AES256 에서 사용할 secretKey, secretIv 설정!!!
    // 암복호화에 들어가는 연산량 증가가 존재하지만, 보안적 측면의 우위를 위해 암호화를 사용하기로 결정
    // 암호화 키 (32 byte)
    static secretKey = "aaaaaaaaaabbbbbbbbbbccccccccccdd";

    // 암호 초기화 백터 (16 byte)
    static secretIv = "aaaaaaaaaabbbbbb";

    // (SPW 값 가져오기)
    static get(): SharedPreferenceWrapperVo | null {
        // 키를 사용하여 저장된 jsonString 가져오기
        const savedJsonString = localStorage.getItem(this.globalKeyName) || "";

        if (savedJsonString.trim() === "") {
            // 아직 아무 값도 저장되지 않은 경우
            return null;
        } else {
            try {
                // 값 복호화
                const decryptedJsonString = aes256Decrypt(savedJsonString, this.secretKey, this.secretIv);

                // Map 을 Object 로 변경
                const map = JSON.parse(decryptedJsonString);
                const resultObject = new SharedPreferenceWrapperVo(map.sampleString);
                return resultObject;
            } catch (e) {
                // 복호화시 에러가 난 경우를 가정
                console.error(e);

                // 기존 값을 대신하여 null 값을 집어넣기
                localStorage.setItem(this.globalKeyName, "");
                return null;
            }
        }
    }

    // (SPW 값 저장하기)
    static async set(value: SharedPreferenceWrapperVo | null): Promise<void> {
        if (value === null) {
            // 값을 null로 설정
            localStorage.setItem(this.globalKeyName, "");
        } else {
            // Object 를 Map 으로 변경
            const map = { sampleString: value.sampleString };

            // 값 암호화
            const encryptedJsonString = aes256Encrypt(JSON.stringify(map), this.secretKey, this.secretIv);

            // 키에 암호화된 값을 저장
            localStorage.setItem(this.globalKeyName, encryptedJsonString);
        }
    }
}

// !!!저장 정보 데이터 형태 작성!!!
export class SharedPreferenceWrapperVo {
    constructor(sampleString: string) {
        this.sampleString = sampleString;
    }

    // 샘플 int 데이터
    sampleString: string
}
