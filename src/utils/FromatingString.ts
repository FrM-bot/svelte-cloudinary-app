export const FormatString = (str: string) => {
    const regExpLetterMayus = /[A-Z]/
    const lettersMayus = str.split('').filter((letter) => regExpLetterMayus.test(letter))
    const newStr = str.split(regExpLetterMayus).slice(1)
    const firstWord = str.split(regExpLetterMayus).slice(0, 1)
    const wordsMayus: string[] = []
    lettersMayus.forEach((letter, index) => {
        wordsMayus.push(`${letter}${newStr[index]}`)
    })
    return [firstWord, ...wordsMayus].join(' ').toUpperCase()
}