// -> src/utils/classNamesJoin
export function classNameJoin (...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }