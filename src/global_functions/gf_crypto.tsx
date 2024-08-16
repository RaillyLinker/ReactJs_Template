import CryptoJS from 'crypto-js';

// [암호화 함수 작성 파일]

// -----------------------------------------------------------------------------
// (Base64 인코딩)
export function base64Encode(plainText: string): string {
    return Buffer.from(plainText, 'utf8').toString('base64');
}

// (Base64 디코딩)
export function base64Decode(encodedText: string): string {
    return Buffer.from(encodedText, 'base64').toString('utf8');
}

// (AES 256 암호화 함수)
// plainText 가 "" 라면 에러 발생
// plainText : 암호화하려는 평문
// secretKey : 암호화 키 (32 byte)
// secretIv : 암호 초기화 백터 (16 byte)
export function aes256Encrypt(plainText: string, secretKey: string, secretIv: string): string {
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const iv = CryptoJS.enc.Utf8.parse(secretIv);

    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
}

// (AES 256 복호화 함수)
// cipherText 가 "" 라면 에러 발생
// cipherText : 복호화하려는 암호문
// secretKey : 암호화 키 (32 byte)
// secretIv : 암호 초기화 백터 (16 byte)
export function aes256Decrypt(cipherText: string, secretKey: string, secretIv: string): string {
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const iv = CryptoJS.enc.Utf8.parse(secretIv);

    const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}
