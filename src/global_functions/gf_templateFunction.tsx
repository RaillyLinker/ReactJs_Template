// [전역 필수 함수 작성 파일]
// (객체 데이터를 FormData 로 변경하는 함수)
export function objectToFormData(data: Record<string, any>): FormData {
    const formData = new FormData();

    function appendData(key: string, value: any) {
        if (value === null || value === undefined) {
            // null 또는 undefined 값은 추가하지 않음
            return;
        }

        if (Array.isArray(value)) {
            // 배열의 경우 각 항목을 처리
            formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
            // 파일 객체는 그대로 추가
            formData.append(key, value);
        } else if (typeof value === 'object') {
            // 객체의 경우 중첩 처리
            Object.keys(value).forEach(subKey => {
                appendData(`${key}[${subKey}]`, value[subKey]);
            });
        } else {
            // 기본 타입의 경우 문자열로 변환 후 추가
            formData.append(key, value.toString());
        }
    }

    Object.keys(data).forEach(key => {
        appendData(key, data[key]);
    });

    return formData;
}