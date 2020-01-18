export const state = () => ({
  listCurrentData: []
})

export const mutations = {
  setListCurrentData(state, param) {
    state.listCurrentData = param
  }
}

export const actions = {
  getInitialData() {
    const url = process.env.BASE_URL + 'latest?base=USD&symbols=IDR,EUR,GBP,SGD'
    return this.$axios.$get(url)
  },
  getSpecificCurrency({ commit }, value) {
    const url = process.env.BASE_URL + `latest?base=USD&symbols=${value}`
    return this.$axios.$get(url)
  },
  removeFromList(value) {},
  addToList() {}
}
