<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card class="mx-auto card" width="344">
        <v-card-text>
          <div class="text--primary italic">
            USD - United States Dollars
          </div>
          <p class="display-1 text--primary inline-content">
            USD
          </p>
          <p class="display-1 text--primary result-total inline-content">
            10.00000
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex v-for="i in listCurrentDataState" :key="i[0]" xs12 sm8 md6>
      <Card
        :resultTotal="callCurrencyFormatter(i[1] * 10)"
        :conversionResult="callCurrencyFormatter(i[1])"
        :remove="remove"
        :title="i[0]"
        :description="i[0]"
        class="card"
      />
    </v-flex>
    <div v-if="isAdding">
      <v-text-field
        v-model="inputValue"
        :loading="isLoading"
        :disabled="isLoading"
        @click:append-outer="add(inputValue)"
        label="Add More Currencies"
        append-outer-icon="mdi-send"
        class="text-field-add"
      ></v-text-field>
      <div v-if="errorMessage">
        <p class="error-text">{{ errorMessage }}</p>
      </div>
    </div>
    <v-flex v-else justify-center>
      <v-btn @click="toggleAddMode" class="add-more mx-auto"
        >(+) Add more currencies</v-btn
      >
    </v-flex>
  </v-layout>
</template>
<style>
.add-more {
  margin-top: 20px 0px 20px 0px;
}
.inline-content {
  display: inline-block;
}
.result-total {
  padding-left: 80px;
}
.italic {
  font-style: italic;
}
.text-field-add {
  width: 344px;
  margin-top: 20px 0px 20px 0px;
}
.card {
  margin-bottom: 20px;
}
.error-text {
  font-size: 12px;
  color: red;
  margin: -15px 0px 10px 10px;
  text-align: left;
}
</style>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Card from '~/components/Card.vue'
import { currencyFormatter } from '~/utils'

export default {
  components: {
    Card
  },
  data() {
    return {
      isAdding: false,
      inputValue: '',
      isLoading: false,
      errorMessage: ''
    }
  },
  computed: {
    ...mapState({
      listCurrentData: (state) => state.currency.listCurrentData
    }),
    listCurrentDataState: {
      get() {
        return this.listCurrentData
      },
      set(value) {
        this.setListCurrentData(value)
      }
    }
  },
  mounted() {
    this.getInitialData()
  },
  methods: {
    ...mapMutations({
      setListCurrentData: 'currency/setListCurrentData'
    }),
    ...mapActions({
      getSpecificCurrency: 'currency/getSpecificCurrency'
    }),
    remove(value) {
      this.listCurrentDataState = this.listCurrentDataState.filter(
        (e) => e[0] !== value
      )
    },
    isCurrencyExist(value) {
      for (const i of this.listCurrentDataState) {
        if (i[0] === value) {
          return true
        }
      }
      return false
    },
    async add(value) {
      if (this.isCurrencyExist(value)) {
        this.errorMessage = `${value} is already exist.`
        return
      }
      try {
        this.isLoading = true
        const result = await this.getSpecificCurrency(value)
        if (result && result.rates) {
          const currentState = JSON.parse(
            JSON.stringify(this.listCurrentDataState)
          )
          currentState.push(Object.entries(result.rates)[0])
          this.listCurrentDataState = currentState
        }
        this.isLoading = false
        this.toggleAddMode()
      } catch (e) {
        this.errorMessage = 'Input tidak valid.'
        this.isLoading = false
      }
    },
    callCurrencyFormatter(value) {
      return currencyFormatter(value)
    },
    async getInitialData() {
      try {
        const result = await this.$store.dispatch('currency/getInitialData')
        if (result && result.rates) {
          this.listCurrentDataState = Object.entries(result.rates)
        }
      } catch (e) {
        console.log(e)
      }
    },
    toggleAddMode() {
      this.isAdding = !this.isAdding
    }
  }
}
</script>
