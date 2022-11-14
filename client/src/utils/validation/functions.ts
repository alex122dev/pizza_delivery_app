export const checkIfFileAreCorrectType = (file: File): boolean => {
    const supportedTypes = [
        'image/jpg',
        'image/jpeg',
        'image/gif',
        'image/png',
    ];

    if (file && supportedTypes.includes(file.type)) {
        return true;
    }

    return false;
};
