
// (이미지 리사이징 함수)
export function resizeImage(
    // 변환될 이미지 파일
    // 지원 : jpeg, png, bmp, webp, gif, avif
    file: File,
    // 변환할 이미지 사이즈
    width: number,
    height: number,
    // 변환할 이미지 포멧
    // 지원 : jpeg, png, bmp, webp, gif, avif
    format: string,
    // 0 ~ 1 사이의 값으로 품질을 조절
    // 품질 조정이 가능한 것은 jpeg, webp 뿐입니다. 
    // 나머지는 모두 무손실 압축이며, AVIF 의 경우는 현 시점 품질 조정이 지원되지 않습니다.
    quality: number
): Promise<File> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    // 캔버스 초기화하여 투명도 보장
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // 주어진 크기로 이미지를 캔버스에 그림
                    ctx.drawImage(img, 0, 0, width, height);

                    // 캔버스를 Blob으로 변환하면서 품질 조절
                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                const resizedFile = new File([blob], `resized.${format}`, {
                                    type: `image/${format}`,
                                });
                                resolve(resizedFile);
                            } else {
                                reject(new Error('Image resizing failed.'));
                            }
                        },
                        `image/${format}`,
                        quality // 품질 설정
                    );
                } else {
                    reject(new Error('Canvas context is not available.'));
                }
            };
            img.onerror = () => {
                reject(new Error('Image loading failed.'));
            };
        };
        reader.onerror = () => {
            reject(new Error('File reading failed.'));
        };
        reader.readAsDataURL(file);
    });
}