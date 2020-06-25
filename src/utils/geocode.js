var request = require('postman-request')


// var url2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/Dallas.json?access_token=pk.eyJ1IjoiYnJldHRsYW5kZXMiLCJhIjoiY2tiNGp1bmx1MHUxdjMybzlvbmZydGVwMyJ9.y6oyBzNun5_EsZES1h2Qrg&limit=1"

// request({ url: url2, json: true }, (err, res) => {
//     if (err) {
//         console.log("unable to connect to weather service")
//     } else if (res.body.err) {
//         console.log("unable to find location")
//     } else {
//         var latitude = res.body.features[0].center[0];
//         var longitude = res.body.features[0].center[1]; 
//         console.log("latitude: " + latitude + " longitude: " + longitude);
//     }
  
    
// })


var geocode = (address, callback) => {
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYnJldHRsYW5kZXMiLCJhIjoiY2tiNGp1bmx1MHUxdjMybzlvbmZydGVwMyJ9.y6oyBzNun5_EsZES1h2Qrg&limit=1"

    request({url, json: true}, (err, { body }) => {
        if (err) {
            callback('unable to connect to location services')
        } else if (body.features.length === 0) {
            callback('unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}






module.exports = geocode