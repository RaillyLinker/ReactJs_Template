import { mainServerRequestObj } from "../network_repositories";
import { NetworkResponse, NetworkResponseOk } from "../../../global_classes/gc_template_classes";
import { isDebugMode } from "../../../global_data/gd_const_config";
import qs from 'qs';


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
                "conten-type": response.headers["content-type"]
            },
            response.data
        );
    } catch (error) {
        networkError = error;
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
    "conten-type": string;
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
        networkError = error;
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