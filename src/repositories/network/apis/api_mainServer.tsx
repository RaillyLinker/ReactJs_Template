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
            new GetService1TkV1RequestTestGetRequestAsyncResponseHeader(
                response.headers["content-type"]
            ),
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

type GetService1TkV1RequestTestGetRequestAsyncRequestHeaderType = {
}

type GetService1TkV1RequestTestGetRequestAsyncRequestQueryType = {
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

class GetService1TkV1RequestTestGetRequestAsyncResponseHeader {
    constructor(contentType: string) {
        this.contentType = contentType;
    }

    contentType: string;
}

interface GetService1TkV1RequestTestGetRequestAsyncResponseBody {
    queryParamString: string;
    queryParamStringNullable: string | null;
    queryParamInt: number;
    queryParamIntNullable: number | null;
    queryParamDouble: number;
    queryParamDoubleNullable: number | null;
    queryParamBoolean: boolean;
    queryParamBooleanNullable: boolean | null;
    queryParamStringList: string[];
    queryParamStringListNullable: string[] | null;
}