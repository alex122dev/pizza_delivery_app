export const phoneNumberMask = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void): void => {
    const input = e.target
    const inputValue = e.target.value
    const selectionStart = e.target.selectionStart

    if (selectionStart !== null && inputValue.length > 5 && selectionStart < 6) {
        setTimeout(() => input.setSelectionRange(selectionStart + 1, selectionStart + 1), 0)
        return
    }

    let formatPhoneNumber = '+38 (0'
    let inputNumbersValue;

    if (inputValue.length === 1) {
        inputNumbersValue = inputValue.replace(/\D/g, "")
    } else {
        inputNumbersValue = inputValue.substring(6).replace(/\D/g, "")
    }
    if (!inputNumbersValue) {
        inputNumbersValue = ""
    }
    if (inputNumbersValue.length > 0) {
        formatPhoneNumber += inputNumbersValue.substring(0, 2)
    }
    if (inputNumbersValue.length > 2) {
        formatPhoneNumber += ') ' + inputNumbersValue.substring(2, 5)
    }
    if (inputNumbersValue.length > 5) {
        formatPhoneNumber += '-' + inputNumbersValue.substring(5, 7)
    }
    if (inputNumbersValue.length > 7) {
        formatPhoneNumber += '-' + inputNumbersValue.substring(7, 9)
    }

    setFieldValue('phone', `${formatPhoneNumber}`)

    if (selectionStart !== inputValue.length) {
        setTimeout(() => input.setSelectionRange(selectionStart, selectionStart), 0)
    }
}
