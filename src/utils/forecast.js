const request = require('request')

const forecast = (lat,long,callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(lat) + '&lon='+ encodeURIComponent(long) +'&appid=fc53ea49718578f97d0e6b1858337ebd'

    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to location services',undefined)
        }else if(body.cod === '404'){
            callback('Unable to find location. Please try again.',undefined)
        }else{
            callback(undefined,body.weather[0].description + '. It is currently ' + Math.round(body.main.temp - 274.15) + ' degrees and Humidity is ' + body.main.humidity + '%' )
        }
    })



}



module.exports = forecast