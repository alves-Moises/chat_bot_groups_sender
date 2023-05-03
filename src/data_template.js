const GetMonth = (month) => {
    const meses = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    const index = meses.indexOf(month.toLowerCase()) + 1
    
    const n_month = index < 10 ? `0${index}` : `${index}`
    
    return n_month
}

module.exports = { GetMonth }