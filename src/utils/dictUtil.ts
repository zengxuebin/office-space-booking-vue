export const convertDict = (dictList: [], value: string) => {
  let res = ''
  dictList.forEach((item: { value: any; label: any }) => {
    if (value === item.value) {
      res = item.label;
    }
  })
  return res
}