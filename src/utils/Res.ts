
type errorType = {
    ValidationErrorItem: object,
    path: string,
    message: string
}

export default class Res {
    constructor() { }
    async handleError(error) {
        return error.errors?.map((err: errorType) => error[err.path] = err.message);
    }

}