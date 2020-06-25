const path = require('path');
const express = require("express");
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();

const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Brett Landes'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'brett Landes'
    })
})



app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'brett Landes'
    })
})




app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    } else {
        console.log(req.query.address)

        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            } 

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
})




app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    } else {
        console.log(req.query.search),
        res.send({
            products: []
        })
    }

})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Article Not Found',
        name: 'Brett Landes'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 error',
        name: 'Brett Landes'
    })
})



app.listen(port, () => {
    console.log('server listening on port ' + port)
})