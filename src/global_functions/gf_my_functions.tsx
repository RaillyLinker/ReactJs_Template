import axios from 'axios';


// [전역 함수 작성 파일]
// 프로그램 전역에서 사용할 함수들은 여기에 모아둡니다.
// (URL 을 입력하면 파일 다운로드)
export async function downloadFile(url: string, filename: string) {
    try {
        // axios를 사용하여 파일 데이터를 가져옵니다.
        const response = await axios.get(url, {
            responseType: 'blob' // 응답 데이터를 Blob 형태로 처리
        });

        // 응답을 Blob 형태로 변환합니다.
        const blob = new Blob([response.data], { type: response.headers['content-type'] });

        // Blob URL을 생성하고 다운로드 링크를 만들어 클릭합니다.
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Download failed:', error);
    }
}

// (영문, 숫자 랜덤 String 을 length 만큼의 길이로 반환)
export function generateRandomString(length: number): string {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result: string = '';

    for (let i = 0; i < length; i++) {
        const randomIndex: number = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}

// (string 을 정수로 변환 가능한지 확인)
export function isInteger(value: string): boolean {
    const num = Number(value);
    return !isNaN(num);
}

// (string 을 실수로 변환 가능한지 확인)
export function isNumber(value: string): boolean {
    const num = parseFloat(value);
    return !isNaN(num);
}