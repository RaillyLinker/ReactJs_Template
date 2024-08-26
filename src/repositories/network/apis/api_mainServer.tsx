import { mainServerRequestObj } from "../network_repositories";
import { NetworkResponse, NetworkResponseOk } from "../../../global_classes/gc_template_classes";
import { isDebugMode } from "../../../global_data/gd_const_config";
import qs from 'qs';
import qstr from 'query-string';
import axios from "axios";
import { objectToFormData } from "../../../global_functions/gf_templateFunction";


// (Get 요청 테스트 (Query Parameter))
export async function getService1TkV1RequestTestGetRequestAsync(
    requestHeader: GetService1TkV1RequestTestGetRequestAsyncRequestHeaderType,
    requestQuery: GetService1TkV1RequestTestGetRequestAsyncRequestQueryType
) {
    // !!!요청 경로 작성!!!
    let serverUrl: string
    if (isDebugMode) {
        // 개발 환경
        serverUrl = "/service1/tk/v1/request-test/get-request";
    } else {
        // 배포 환경
        serverUrl = "/service1/tk/v1/request-test/get-request";
    }

    let networkResponseOk: NetworkResponseOk<GetService1TkV1RequestTestGetRequestAsyncResponseHeader, GetService1TkV1RequestTestGetRequestAsyncResponseBody> | null = null;
    let networkError: unknown | null = null;

    try {
        const response =
            await mainServerRequestObj.get<GetService1TkV1RequestTestGetRequestAsyncResponseBody>(
                serverUrl,
                {
                    headers: requestHeader,
                    params: requestQuery,
                    // 쿼리 파라미터에서 array 를 직렬화
                    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
                }
            );

        networkResponseOk = new NetworkResponseOk<GetService1TkV1RequestTestGetRequestAsyncResponseHeader, GetService1TkV1RequestTestGetRequestAsyncResponseBody>(
            response.status,
            // !!!응답 헤더 매핑!!!
            {
                "content-type": response.headers["content-type"]
            },
            response.data
        );
    } catch (error) {
        if (axios.isAxiosError(error) && error.response !== undefined) {
            networkResponseOk = new NetworkResponseOk<GetService1TkV1RequestTestGetRequestAsyncResponseHeader, GetService1TkV1RequestTestGetRequestAsyncResponseBody>(
                error.response.status,
                // !!!응답 헤더 매핑!!!
                {
                    "content-type": error.response.headers["content-type"]
                },
                error.response.data
            );
        } else {
            networkError = error;
        }
    }

    return new NetworkResponse<GetService1TkV1RequestTestGetRequestAsyncResponseHeader, GetService1TkV1RequestTestGetRequestAsyncResponseBody>(
        networkResponseOk,
        networkError
    );
}

export type GetService1TkV1RequestTestGetRequestAsyncRequestHeaderType = {
}

export type GetService1TkV1RequestTestGetRequestAsyncRequestQueryType = {
    "queryParamString": string;
    "queryParamStringNullable": string | null;
    "queryParamInt": number;
    "queryParamIntNullable": number | null;
    "queryParamDouble": number;
    "queryParamDoubleNullable": number | null;
    "queryParamBoolean": boolean;
    "queryParamBooleanNullable": boolean | null;
    "queryParamStringList": string[];
    "queryParamStringListNullable": string[] | null;
}

export type GetService1TkV1RequestTestGetRequestAsyncResponseHeader = {
    "content-type": string;
}

export type GetService1TkV1RequestTestGetRequestAsyncResponseBody = {
    "queryParamString": string;
    "queryParamStringNullable": string | null;
    "queryParamInt": number;
    "queryParamIntNullable": number | null;
    "queryParamDouble": number;
    "queryParamDoubleNullable": number | null;
    "queryParamBoolean": boolean;
    "queryParamBooleanNullable": boolean | null;
    "queryParamStringList": string[];
    "queryParamStringListNullable": string[] | null;
}


// (Post 요청 테스트 (Request Body))
export async function postService1TkV1RequestTestPostRequestApplicationJsonAsync(
    requestHeader: PostService1TkV1RequestTestPostRequestApplicationJsonAsyncRequestHeaderType,
    requestQuery: PostService1TkV1RequestTestPostRequestApplicationJsonAsyncRequestQueryType,
    requestBody: PostService1TkV1RequestTestPostRequestApplicationJsonAsyncRequestBody
) {
    // !!!요청 경로 작성!!!
    let serverUrl: string
    if (isDebugMode) {
        // 개발 환경
        serverUrl = "/service1/tk/v1/request-test/post-request-application-json";
    } else {
        // 배포 환경
        serverUrl = "/service1/tk/v1/request-test/post-request-application-json";
    }

    let networkResponseOk: NetworkResponseOk<PostService1TkV1RequestTestPostRequestApplicationJsonAsyncResponseHeader, PostService1TkV1RequestTestPostRequestApplicationJsonAsyncResponseBody> | null = null;
    let networkError: unknown | null = null;

    try {
        const response =
            await mainServerRequestObj.post<PostService1TkV1RequestTestPostRequestApplicationJsonAsyncResponseBody>(
                serverUrl,
                requestBody,
                {
                    headers: requestHeader,
                    params: requestQuery,
                    // 쿼리 파라미터에서 array 를 직렬화
                    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
                }
            );

        networkResponseOk = new NetworkResponseOk<PostService1TkV1RequestTestPostRequestApplicationJsonAsyncResponseHeader, PostService1TkV1RequestTestPostRequestApplicationJsonAsyncResponseBody>(
            response.status,
            // !!!응답 헤더 매핑!!!
            {
                "content-type": response.headers["content-type"]
            },
            response.data
        );
    } catch (error) {
        if (axios.isAxiosError(error) && error.response !== undefined) {
            networkResponseOk = new NetworkResponseOk<PostService1TkV1RequestTestPostRequestApplicationJsonAsyncResponseHeader, PostService1TkV1RequestTestPostRequestApplicationJsonAsyncResponseBody>(
                error.response.status,
                // !!!응답 헤더 매핑!!!
                {
                    "content-type": error.response.headers["content-type"]
                },
                error.response.data
            );
        } else {
            networkError = error;
        }
    }

    return new NetworkResponse<PostService1TkV1RequestTestPostRequestApplicationJsonAsyncResponseHeader, PostService1TkV1RequestTestPostRequestApplicationJsonAsyncResponseBody>(
        networkResponseOk,
        networkError
    );
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonAsyncRequestHeaderType = {
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonAsyncRequestQueryType = {
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonAsyncRequestBody = {
    "requestBodyString": string;
    "requestBodyStringNullable": string | null;
    "requestBodyInt": number;
    "requestBodyIntNullable": number | null;
    "requestBodyDouble": number;
    "requestBodyDoubleNullable": number | null;
    "requestBodyBoolean": boolean;
    "requestBodyBooleanNullable": boolean | null;
    "requestBodyStringList": string[];
    "requestBodyStringListNullable": string[] | null;
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonAsyncResponseHeader = {
    "content-type": string;
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonAsyncResponseBody = {
    "requestBodyString": string;
    "requestBodyStringNullable": string | null;
    "requestBodyInt": number;
    "requestBodyIntNullable": number | null;
    "requestBodyDouble": number;
    "requestBodyDoubleNullable": number | null;
    "requestBodyBoolean": boolean;
    "requestBodyBooleanNullable": boolean | null;
    "requestBodyStringList": string[];
    "requestBodyStringListNullable": string[] | null;
}


// (Post 요청 테스트 (x-www-form-urlencoded))
export async function postService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsync(
    requestHeader: PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncRequestHeaderType,
    requestQuery: PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncRequestQueryType,
    requestBody: PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncRequestBody
) {
    // !!!요청 경로 작성!!!
    let serverUrl: string
    if (isDebugMode) {
        // 개발 환경
        serverUrl = "/service1/tk/v1/request-test/post-request-x-www-form-urlencoded";
    } else {
        // 배포 환경
        serverUrl = "/service1/tk/v1/request-test/post-request-x-www-form-urlencoded";
    }

    let networkResponseOk: NetworkResponseOk<PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncResponseHeader, PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncResponseBody> | null = null;
    let networkError: unknown | null = null;

    try {
        // requestHeader에 'Content-Type'을 추가합니다.
        const combinedRequestHeader = {
            ...requestHeader,
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const response =
            await mainServerRequestObj.post<PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncResponseBody>(
                serverUrl,
                qstr.stringify(requestBody),
                {
                    headers: combinedRequestHeader,
                    params: requestQuery,
                    // 쿼리 파라미터에서 array 를 직렬화
                    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
                }
            );

        networkResponseOk = new NetworkResponseOk<PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncResponseHeader, PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncResponseBody>(
            response.status,
            // !!!응답 헤더 매핑!!!
            {
                "content-type": response.headers["content-type"]
            },
            response.data
        );
    } catch (error) {
        if (axios.isAxiosError(error) && error.response !== undefined) {
            networkResponseOk = new NetworkResponseOk<PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncResponseHeader, PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncResponseBody>(
                error.response.status,
                // !!!응답 헤더 매핑!!!
                {
                    "content-type": error.response.headers["content-type"]
                },
                error.response.data
            );
        } else {
            networkError = error;
        }
    }

    return new NetworkResponse<PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncResponseHeader, PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncResponseBody>(
        networkResponseOk,
        networkError
    );
}

export type PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncRequestHeaderType = {
}

export type PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncRequestQueryType = {
}

export type PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncRequestBody = {
    "requestFormString": string;
    "requestFormStringNullable": string | null;
    "requestFormInt": number;
    "requestFormIntNullable": number | null;
    "requestFormDouble": number;
    "requestFormDoubleNullable": number | null;
    "requestFormBoolean": boolean;
    "requestFormBooleanNullable": boolean | null;
    "requestFormStringList": string[];
    "requestFormStringListNullable": string[] | null;
}

export type PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncResponseHeader = {
    "content-type": string;
}

export type PostService1TkV1RequestTestPostRequestXWwwFromUrlencodedAsyncResponseBody = {
    "requestFormString": string;
    "requestFormStringNullable": string | null;
    "requestFormInt": number;
    "requestFormIntNullable": number | null;
    "requestFormDouble": number;
    "requestFormDoubleNullable": number | null;
    "requestFormBoolean": boolean;
    "requestFormBooleanNullable": boolean | null;
    "requestFormStringList": string[];
    "requestFormStringListNullable": string[] | null;
}


// (Post 요청 테스트 (multipart/form-data))
export async function postService1TkV1RequestTestPostRequestMultipartFormDataAsync(
    requestHeader: PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncRequestHeaderType,
    requestQuery: PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncRequestQueryType,
    requestBody: PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncRequestBody
) {
    // !!!요청 경로 작성!!!
    let serverUrl: string
    if (isDebugMode) {
        // 개발 환경
        serverUrl = "/service1/tk/v1/request-test/post-request-multipart-form-data";
    } else {
        // 배포 환경
        serverUrl = "/service1/tk/v1/request-test/post-request-multipart-form-data";
    }

    let networkResponseOk: NetworkResponseOk<PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncResponseHeader, PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncResponseBody> | null = null;
    let networkError: unknown | null = null;

    try {
        // requestHeader에 'Content-Type'을 추가합니다.
        const combinedRequestHeader = {
            ...requestHeader,
            'Content-Type': 'multipart/form-data',
        };

        const response =
            await mainServerRequestObj.post<PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncResponseBody>(
                serverUrl,
                objectToFormData(requestBody),
                {
                    headers: combinedRequestHeader,
                    params: requestQuery,
                    // 쿼리 파라미터에서 array 를 직렬화
                    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
                }
            );

        networkResponseOk = new NetworkResponseOk<PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncResponseHeader, PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncResponseBody>(
            response.status,
            // !!!응답 헤더 매핑!!!
            {
                "content-type": response.headers["content-type"]
            },
            response.data
        );
    } catch (error) {
        if (axios.isAxiosError(error) && error.response !== undefined) {
            networkResponseOk = new NetworkResponseOk<PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncResponseHeader, PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncResponseBody>(
                error.response.status,
                // !!!응답 헤더 매핑!!!
                {
                    "content-type": error.response.headers["content-type"]
                },
                error.response.data
            );
        } else {
            networkError = error;
        }
    }

    return new NetworkResponse<PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncResponseHeader, PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncResponseBody>(
        networkResponseOk,
        networkError
    );
}

export type PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncRequestHeaderType = {
}

export type PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncRequestQueryType = {
}

export type PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncRequestBody = {
    "requestFormString": string;
    "requestFormStringNullable": string | null;
    "requestFormInt": number;
    "requestFormIntNullable": number | null;
    "requestFormDouble": number;
    "requestFormDoubleNullable": number | null;
    "requestFormBoolean": boolean;
    "requestFormBooleanNullable": boolean | null;
    "requestFormStringList": string[];
    "requestFormStringListNullable": string[] | null;
    "multipartFile": File;
    "multipartFileNullable": File | null;
}

export type PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncResponseHeader = {
    "content-type": string;
}

export type PostService1TkV1RequestTestPostRequestMultipartFormDataAsyncResponseBody = {
    "requestFormString": string;
    "requestFormStringNullable": string | null;
    "requestFormInt": number;
    "requestFormIntNullable": number | null;
    "requestFormDouble": number;
    "requestFormDoubleNullable": number | null;
    "requestFormBoolean": boolean;
    "requestFormBooleanNullable": boolean | null;
    "requestFormStringList": string[];
    "requestFormStringListNullable": string[] | null;
}


// (Post 요청 테스트 (multipart/form-data - JsonString))
// Multipart File 과 함께 객체 타입 리스트를 받고 싶을 때 서버측에서는 이런 형식으로 API 를 설계합니다.
export async function postService1TkV1RequestTestPostRequestMultipartFormDataJsonAsync(
    requestHeader: PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncRequestHeaderType,
    requestQuery: PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncRequestQueryType,
    requestBody: PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncRequestBody
) {
    // !!!요청 경로 작성!!!
    let serverUrl: string
    if (isDebugMode) {
        // 개발 환경
        serverUrl = "/service1/tk/v1/request-test/post-request-multipart-form-data-json";
    } else {
        // 배포 환경
        serverUrl = "/service1/tk/v1/request-test/post-request-multipart-form-data-json";
    }

    let networkResponseOk: NetworkResponseOk<PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncResponseHeader, PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncResponseBody> | null = null;
    let networkError: unknown | null = null;

    try {
        // requestHeader에 'Content-Type'을 추가합니다.
        const combinedRequestHeader = {
            ...requestHeader,
            'Content-Type': 'multipart/form-data',
        };

        const response =
            await mainServerRequestObj.post<PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncResponseBody>(
                serverUrl,
                objectToFormData(requestBody),
                {
                    headers: combinedRequestHeader,
                    params: requestQuery,
                    // 쿼리 파라미터에서 array 를 직렬화
                    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
                }
            );

        networkResponseOk = new NetworkResponseOk<PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncResponseHeader, PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncResponseBody>(
            response.status,
            // !!!응답 헤더 매핑!!!
            {
                "content-type": response.headers["content-type"]
            },
            response.data
        );
    } catch (error) {
        if (axios.isAxiosError(error) && error.response !== undefined) {
            networkResponseOk = new NetworkResponseOk<PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncResponseHeader, PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncResponseBody>(
                error.response.status,
                // !!!응답 헤더 매핑!!!
                {
                    "content-type": error.response.headers["content-type"]
                },
                error.response.data
            );
        } else {
            networkError = error;
        }
    }

    return new NetworkResponse<PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncResponseHeader, PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncResponseBody>(
        networkResponseOk,
        networkError
    );
}

export type PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncRequestHeaderType = {
}

export type PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncRequestQueryType = {
}

export type PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncRequestBody = {
    "jsonString": string;
    "multipartFile": File;
    "multipartFileNullable": File | null;
}

export type PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncRequestBodyJsonStringType = {
    "requestFormString": string;
    "requestFormStringNullable": string | null;
    "requestFormInt": number;
    "requestFormIntNullable": number | null;
    "requestFormDouble": number;
    "requestFormDoubleNullable": number | null;
    "requestFormBoolean": boolean;
    "requestFormBooleanNullable": boolean | null;
    "requestFormStringList": string[];
    "requestFormStringListNullable": string[] | null;
}

export type PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncResponseHeader = {
    "content-type": string;
}

export type PostService1TkV1RequestTestPostRequestMultipartFormDataJsonAsyncResponseBody = {
    "requestFormString": string;
    "requestFormStringNullable": string | null;
    "requestFormInt": number;
    "requestFormIntNullable": number | null;
    "requestFormDouble": number;
    "requestFormDoubleNullable": number | null;
    "requestFormBoolean": boolean;
    "requestFormBooleanNullable": boolean | null;
    "requestFormStringList": string[];
    "requestFormStringListNullable": string[] | null;
}


// (Post 요청 테스트 (multipart/form-data, File List))
export async function postService1TkV1RequestTestPostRequestMultipartFormData2Async(
    requestHeader: PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncRequestHeaderType,
    requestQuery: PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncRequestQueryType,
    requestBody: PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncRequestBody
) {
    // !!!요청 경로 작성!!!
    let serverUrl: string
    if (isDebugMode) {
        // 개발 환경
        serverUrl = "/service1/tk/v1/request-test/post-request-multipart-form-data2";
    } else {
        // 배포 환경
        serverUrl = "/service1/tk/v1/request-test/post-request-multipart-form-data2";
    }

    let networkResponseOk: NetworkResponseOk<PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncResponseHeader, PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncResponseBody> | null = null;
    let networkError: unknown | null = null;

    try {
        // requestHeader에 'Content-Type'을 추가합니다.
        const combinedRequestHeader = {
            ...requestHeader,
            'Content-Type': 'multipart/form-data',
        };

        const response =
            await mainServerRequestObj.post<PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncResponseBody>(
                serverUrl,
                objectToFormData(requestBody),
                {
                    headers: combinedRequestHeader,
                    params: requestQuery,
                    // 쿼리 파라미터에서 array 를 직렬화
                    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
                }
            );

        networkResponseOk = new NetworkResponseOk<PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncResponseHeader, PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncResponseBody>(
            response.status,
            // !!!응답 헤더 매핑!!!
            {
                "content-type": response.headers["content-type"]
            },
            response.data
        );
    } catch (error) {
        if (axios.isAxiosError(error) && error.response !== undefined) {
            networkResponseOk = new NetworkResponseOk<PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncResponseHeader, PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncResponseBody>(
                error.response.status,
                // !!!응답 헤더 매핑!!!
                {
                    "content-type": error.response.headers["content-type"]
                },
                error.response.data
            );
        } else {
            networkError = error;
        }
    }

    return new NetworkResponse<PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncResponseHeader, PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncResponseBody>(
        networkResponseOk,
        networkError
    );
}

export type PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncRequestHeaderType = {
}

export type PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncRequestQueryType = {
}

export type PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncRequestBody = {
    "requestFormString": string;
    "requestFormStringNullable": string | null;
    "requestFormInt": number;
    "requestFormIntNullable": number | null;
    "requestFormDouble": number;
    "requestFormDoubleNullable": number | null;
    "requestFormBoolean": boolean;
    "requestFormBooleanNullable": boolean | null;
    "requestFormStringList": string[];
    "requestFormStringListNullable": string[] | null;
    "multipartFileList": File[];
    "multipartFileNullableList": File[] | null;
}

export type PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncResponseHeader = {
    "content-type": string;
}

export type PostService1TkV1RequestTestPostRequestMultipartFormData2AsyncResponseBody = {
    "requestFormString": string;
    "requestFormStringNullable": string | null;
    "requestFormInt": number;
    "requestFormIntNullable": number | null;
    "requestFormDouble": number;
    "requestFormDoubleNullable": number | null;
    "requestFormBoolean": boolean;
    "requestFormBooleanNullable": boolean | null;
    "requestFormStringList": string[];
    "requestFormStringListNullable": string[] | null;
}


// (Post 요청 테스트 (application-json, 객체 파라미터 포함))
export async function postService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsync(
    requestHeader: PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncRequestHeaderType,
    requestQuery: PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncRequestQueryType,
    requestBody: PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncRequestBody
) {
    // !!!요청 경로 작성!!!
    let serverUrl: string
    if (isDebugMode) {
        // 개발 환경
        serverUrl = "/service1/tk/v1/request-test/post-request-application-json-with-object-param";
    } else {
        // 배포 환경
        serverUrl = "/service1/tk/v1/request-test/post-request-application-json-with-object-param";
    }

    let networkResponseOk: NetworkResponseOk<PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseHeader, PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseBody> | null = null;
    let networkError: unknown | null = null;

    try {
        const response =
            await mainServerRequestObj.post<PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseBody>(
                serverUrl,
                requestBody,
                {
                    headers: requestHeader,
                    params: requestQuery,
                    // 쿼리 파라미터에서 array 를 직렬화
                    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
                }
            );

        networkResponseOk = new NetworkResponseOk<PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseHeader, PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseBody>(
            response.status,
            // !!!응답 헤더 매핑!!!
            {
                "content-type": response.headers["content-type"]
            },
            response.data
        );
    } catch (error) {
        if (axios.isAxiosError(error) && error.response !== undefined) {
            networkResponseOk = new NetworkResponseOk<PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseHeader, PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseBody>(
                error.response.status,
                // !!!응답 헤더 매핑!!!
                {
                    "content-type": error.response.headers["content-type"]
                },
                error.response.data
            );
        } else {
            networkError = error;
        }
    }

    return new NetworkResponse<PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseHeader, PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseBody>(
        networkResponseOk,
        networkError
    );
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncRequestHeaderType = {
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncRequestQueryType = {
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncRequestBody = {
    "objectVo": PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncRequestBodyObjectVo;
    "objectVoList": PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncRequestBodyObjectVo[];
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncRequestBodyObjectVo = {
    "requestBodyString": string;
    "requestBodyStringList": string[];
    "subObjectVo": PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncRequestBodyObjectVoSubObjectVo;
    "subObjectVoList": PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncRequestBodyObjectVoSubObjectVo[];
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncRequestBodyObjectVoSubObjectVo = {
    "requestBodyString": string;
    "requestBodyStringList": string[];
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseHeader = {
    "content-type": string;
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseBody = {
    "objectVo": PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseBodyObjectVo;
    "objectVoList": PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseBodyObjectVo[];
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseBodyObjectVo = {
    "requestBodyString": string;
    "requestBodyStringList": string[];
    "subObjectVo": PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseBodyObjectVoSubObjectVo;
    "subObjectVoList": PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseBodyObjectVoSubObjectVo[];
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonWithObjectParamAsyncResponseBodyObjectVoSubObjectVo = {
    "requestBodyString": string;
    "requestBodyStringList": string[];
}


// (Post 요청 테스트 (입출력값 없음))
export async function postService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsync(
    requestHeader: PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncRequestHeaderType,
    requestQuery: PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncRequestQueryType,
    requestBody: PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncRequestBody
) {
    // !!!요청 경로 작성!!!
    let serverUrl: string
    if (isDebugMode) {
        // 개발 환경
        serverUrl = "/service1/tk/v1/request-test/post-request-application-json-with-no-param";
    } else {
        // 배포 환경
        serverUrl = "/service1/tk/v1/request-test/post-request-application-json-with-no-param";
    }

    let networkResponseOk: NetworkResponseOk<PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncResponseHeader, PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncResponseBody> | null = null;
    let networkError: unknown | null = null;

    try {
        const response =
            await mainServerRequestObj.post<PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncResponseBody>(
                serverUrl,
                requestBody,
                {
                    headers: requestHeader,
                    params: requestQuery,
                    // 쿼리 파라미터에서 array 를 직렬화
                    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
                }
            );

        networkResponseOk = new NetworkResponseOk<PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncResponseHeader, PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncResponseBody>(
            response.status,
            // !!!응답 헤더 매핑!!!
            {
                "content-type": response.headers["content-type"]
            },
            response.data
        );
    } catch (error) {
        if (axios.isAxiosError(error) && error.response !== undefined) {
            networkResponseOk = new NetworkResponseOk<PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncResponseHeader, PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncResponseBody>(
                error.response.status,
                // !!!응답 헤더 매핑!!!
                {
                    "content-type": error.response.headers["content-type"]
                },
                error.response.data
            );
        } else {
            networkError = error;
        }
    }

    return new NetworkResponse<PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncResponseHeader, PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncResponseBody>(
        networkResponseOk,
        networkError
    );
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncRequestHeaderType = {
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncRequestQueryType = {
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncRequestBody = {}

export type PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncResponseHeader = {
    "content-type": string;
}

export type PostService1TkV1RequestTestPostRequestApplicationJsonWithNoParamAsyncResponseBody = {}