export const forIt = async (timeout: number = 0) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
};
