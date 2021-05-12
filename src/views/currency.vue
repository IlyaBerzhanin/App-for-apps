<template lang="pug">
h1 currency page
.charts-container
  .chart-item(
    v-for="currency in newCurrencies"
  ) 
    h3.item-title {{ currency.name }} - {{ currency.currencyArray[currency.currencyArray.length - 1] }} &#8364
    chart(
      :chartData="{dateValues: currency.dateArray, currencyValues: currency.currencyArray}"
    )
</template>

<script>
import chart from "@/components/large/chart";
import firebaseActions from '@/store/firebaseActions'
export default {
  components: { chart },

  data() {
    return {
     currencies: null,
     newCurrencies: []
    };
  },

  async created() {
   this.currencies = await firebaseActions.getCurrencyFromFirebase()
   console.log(this.currencies);
 
  for(let rate in this.currencies[0].rates) {
    let currencyValues = []
    let dateValues = []
    this.currencies.forEach(currency => {
      dateValues.push(currency.date)
      currencyValues.push(currency.rates[rate])
    })
    let editedCurrency = {
      name: rate,
      dateArray: dateValues,
      currencyArray: currencyValues
    }
    this.newCurrencies.push(editedCurrency)
  }
  console.log(this.newCurrencies);
  }

 
};
</script>

<style lang="scss">
.charts-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 4rem;

  & .chart-item {
    border: 2px solid greenyellow;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem;

    & .item-title {
      padding: 1rem;
    }
  }
}
</style>