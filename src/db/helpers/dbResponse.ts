const errorResponse = (message: string, error?: any) => {
    console.error(`Error message: ${error?.message || message}`);
    return {
        success: false,
        message,
        error: error?.message || error || "Unknown error"
    }
};

const successResponse = (data: any) => {
    return { success: true, message: data }
};

export { errorResponse, successResponse };