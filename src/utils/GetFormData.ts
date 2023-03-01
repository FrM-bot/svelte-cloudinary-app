export const getDataToFrom = (form: EventTarget & HTMLFormElement) => {
    return Object.fromEntries(new FormData(form))
}
