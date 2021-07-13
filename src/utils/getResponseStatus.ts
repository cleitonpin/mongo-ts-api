import { IStatus } from "../interfaces";

export const RESPONSE_STATUS: IStatus = {
    NOT_FOUND: 404,
    SUCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
}