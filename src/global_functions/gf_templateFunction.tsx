// [전역 필수 함수 작성 파일]
// (객체 데이터를 FormData 로 변경하는 함수)
export function objectToFormData(data: Record<string, any>): FormData {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
        if (data[key] === null || data[key] === undefined) {
            // null 또는 undefined 값은 추가하지 않음
            return;
        }

        if (Array.isArray(data[key])) {
            // 배열의 경우 각 항목을 처리
            formData.append(key, JSON.stringify(data[key]));
        } else if (data[key] instanceof File) {
            // 파일 객체는 그대로 추가
            formData.append(key, data[key]);
        } else {
            // 기본 타입의 경우 문자열로 변환 후 추가
            formData.append(key, data[key].toString());
        }
    });

    return formData;
}