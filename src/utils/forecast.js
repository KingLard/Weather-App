var request = require('postman-request')



var forecast = (latitude, longitude, callback) => {
  
    // const url = 'http://api.weatherstack.com/current?access_key=c258aa0b9c1bad264b2c03d9cdb36dd6&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon) + '&units=f'
    const url = 'http://api.weatherstack.com/current?access_key=c258aa0b9c1bad264b2c03d9cdb36dd6&query=' + latitude + ',' + longitude + '&units=f'

    request({url: url, json: true}, (err, { body }) => {
       if (err) {
           callback('unable to connect to location services')
       } else if (body.err) {
            callback('unable to find the location', undefined)
       } else {
           callback(undefined, {
               temperature: body.current.temperature,
               weather: body.current.weather_descriptions[0]
           })
       }
      
    })
}
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

module.exports = forecast