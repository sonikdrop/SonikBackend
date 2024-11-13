const errorResponse = (message: string, error?: { message: any; }) => {
    console.error(`Error message: ${error?.message || message}`);
    return {
        success: false,
        message,
        error
    }
};

const successResponse = (data: any) => {
    return { success: true, message: data }
};

export { errorResponse, successResponse };