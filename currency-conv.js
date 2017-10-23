const axios = require('axios')

const getExchangeRate = (from,to) => {
  return axios.get(`http://api.fixer.io/latest?base=${from}`).then((response) => {
    return response.data.rates[to]
  })
}

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
        return response.data.map((country) => {
            return country.name 
        })
    })
}

const convertCurrency = (from,to,amount) => {
  let countries;
  return getCountries(to).then((tmpCountries) => {
      countries = tmpCountries
      return getExchangeRate(from,to)
  }).then((rate) => {
      const exchangedAmount = amount * rate
      return `${amount} ${from} is worth ${exchangedAmount} ${to}. Can be used in the following countries: ${countries.join(', ')}`
  })
}

convertCurrency('AUD','ZAR',10).then((result) => console.log(result))

getCountries('ZAR').then((countries) => {
    console.log(countries)}
)

getExchangeRate('AUD','ZAR').then((rate) => {
    console.log(rate)}
)

