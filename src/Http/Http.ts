/**
 * Simple response
 */
export interface Resp<Data> {
    data: Data;
}

/**
 * Paged req
 */
export interface PagedItemReq<Data> {
    offset: number;
    take: number;
    data: Data;
}

/**
 * Paged response
 */
export interface PagedItemResp<Data> extends Resp<Data[]>{
    offset: number;
    done: boolean;
}

