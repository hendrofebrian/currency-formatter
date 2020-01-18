export const currencyFormatter = (input) => {
  return input.toFixed(1).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
}
