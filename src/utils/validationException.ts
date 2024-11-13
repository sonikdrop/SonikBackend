 class ValidationException {
    status: number;
    message: string;
    errors: any;

    constructor(errors: any) {
        this.status = 400;
        this.message = "Invalid request";
        this.errors = errors;
    }
}


export default ValidationException;