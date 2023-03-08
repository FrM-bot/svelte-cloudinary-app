export const FormatString = (str: string) => {
    const regexpLetterMayus = /[A-Z]/
    const lettersMayus = str.split('').filter((letter) => regexpLetterMayus.test(letter))
    const newStr = str.split(regexpLetterMayus).slice(1)
    const firstWord = str.split(regexpLetterMayus).slice(0, 1)
    const wordsMayus: string[] = []
    lettersMayus.forEach((letter, index) => {
        wordsMayus.push(`${letter}${newStr[index]}`)
    })
    return [firstWord, ...wordsMayus].join(' ').toUpperCase()
}

export function TextFormating({ text, searchValue = '_', replaceValue = ' ' }: { text: string, searchValue?: string | RegExp, replaceValue?: string }) {
    return text.replaceAll(searchValue, replaceValue)
}