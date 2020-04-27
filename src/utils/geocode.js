const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZnJhY3RhbGZpc3QiLCJhIjoiY2s5MnExMTR2MDNsNTNrbXZhd21wemNvdCJ9.4Ky3-cZBv-VYNCzjfw1FMA'

    request({url, json: true},(error,{body}) => {
        if(error){
            callback('Unable to connect to Location Sevices')
        } else if(body.features.length === 0){
            console.log("Unable to find location. Try another search.")
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            })
        }

        
        
    })
}

module.exports = geocode