export const convertDict = (dictList: any[], value: string) => {
  let res = ''
  dictList.forEach((item: { value: any; label: any }) => {
    if (value == item.value) {
      res = item.label
    }
  })
  return res
}