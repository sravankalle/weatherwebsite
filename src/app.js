const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const port = process.env.PORT || 3000


const viewsPath = path.join(__dirname,'./templates/views')
const partialsPath = path.join(__dirname,'./templates/partials')
app.use(express.static(path.join(__dirname,'../public')))

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Sravan'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        name: 'Sravan'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Sravan'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address not provided or could not be found.'
        })
    }    

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
    
    
    
})
app.get('/help/*',(req,res) => {
    res.render('help-error',{
        title: '404',
        error:'Help page not found',
        name:'Sravan'
    })
})
app.get('*',(req,res) =>{
    res.render('error',{
        title:'404',
        name: 'Sravan',
        error:'Page not found.'
    })
})

app.listen(port,() => {
    console.log('Server is up on port ' + port)
})