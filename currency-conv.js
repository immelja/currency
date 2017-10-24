const axios = require('axios')

const getExchangeRate = async (from,to) => {
  const response = await axios.get(`http://api.fixer.io/latest?base=${from}`)
  return response.data.rates[to]
}

const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
        return response.data.map(country => {return country.name })   
    } catch(e) {
        throw new Error(`Unable to get countries for currency ${currencyCode}`)
    }
    
}

const convertCurrency = (from,to,amount) => {
  let countries;
  return getCountries(to).then((tmpCountries) => {
      countries = tmpCountries
      return getExchangeRate(from,to)
  }).then((rate) => {
      const exchangedAmount = amount * rate
    //   console.log('lwl')
      return `${amount} ${from} is worth ${exchangedAmount} ${to}. Can be used in the following countries: ${countries.join(', ')}`
  })
}

const convertCurrencyAlt = async (from,to,amount) => {
    const countries = await getCountries(to)
    const rate = await getExchangeRate(from,to)
    const exchangedAmount = amount * rate
    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`    
}

convertCurrencyAlt('AUD','ZAR',10)
    .then((result) => console.log(result))
    .catch(e => console.log(e))

// getCountries('ZAR').then((countries) => {
//     console.log(countries)}
// )

// getExchangeRate('AUD','ZAR').then((rate) => {
//     console.log(rate)}
// )

