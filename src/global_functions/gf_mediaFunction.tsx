

export function resizeImage(
    file: File,
    width: number,
    height: number,
    format: string
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
                    // Clear the canvas to ensure transparency
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Draw the image on the canvas with the specified dimensions
                    ctx.drawImage(img, 0, 0, width, height);

                    // Convert canvas to Blob and resolve it
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
                        `image/${format}`
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
};