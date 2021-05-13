<template lang="pug">
h1.title currency report
h2.update-title last update: 
  span.update-description  {{ lastUpdate }} 
.charts-container
  .chart-item(
    v-for="currency in newCurrencies"
  ) 
    h3.item-title {{ currency.name }} - {{ currency.currencyArray[currency.currencyArray.length - 1] }} &#8364
    chart(
      :chartData="{dateValues: currency.dateArray, currencyValues: currency.currencyArray}"
      class="chart"
    )
</template>

<script>
import chart from "@/components/large/chart";
import firebaseActions from '@/store/firebaseActions'
import dateFilter from '@/filters/date.filter'

export default {
  components: { chart },

  data() {
    return {
     currencies: null,
     newCurrencies: [],
     lastUpdate: null
    };
  },

  async created() {
   this.currencies = await firebaseActions.getCurrencyFromFirebase()
   this.lastUpdate = dateFilter(this.currencies[0].fullDate, 'datetime')


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
  },

 
};
</script>

<style lang="scss">

.title{
  text-transform: capitalize;
  color: burlywood;
  padding: 4rem;
}

.update-title {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 2rem;
  padding-left: 8rem;
  margin: 0;

  & .update-description {
    background-color: #fffe0059;
    border-radius: 0.8rem;
    padding: 1rem;
  }
}

.charts-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 4rem;

  & .chart-item {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem;

    & .item-title {
      padding: 1rem;
    }

    & .chart {
      box-shadow: 37px 40px 17px 0px rgba(61, 148, 172, 0.2);
    }
  }
}
</style>