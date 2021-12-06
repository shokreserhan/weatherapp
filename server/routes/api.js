import express from "express"
const router = express.Router()
import urllib from "urllib"
import City from "../../model/City.js"

const WEATHER_API_KEY = `1a28d95fe533f29498519142fd19a212`
const WEATHER_API = "http://api.openweathermap.org/data/2.5/weather?units=metric"

router.get("/city/:cityName", function(req, res) {
    const WEATHER_API_URL = `${WEATHER_API}&q=${req.params.cityName}&APPID=${WEATHER_API_KEY}`
    urllib.request(WEATHER_API_URL, function(err, data, resault) {
        if (err)
            throw err;

        const jsonData = JSON.parse(data.toString())
        const weatherData = {
            name: jsonData.name,
            temperature: Math.round(jsonData.main.temp),
            condition: jsonData.weather[0].description,
            conditionPic: jsonData.weather[0].icon
        }
        res.send(weatherData)
    })
})

router.get("/cities", async function(req, res) {
    City.find({}, function(err, cities) {
        res.send(cities)
    })
})

router.post("/city", function(req, res) {
    const city = req.body
    new City({
        name: city.name,
        temperature: city.temperature,
        condition: city.condition,
        conditionPic: city.conditionPic
    }).save()
    res.end()
})

router.delete("/city/:cityName", function(req, res) {
    const cityName = req.params.cityName
    City.findOneAndRemove({ name: cityName }, function(err, resault) {
        if (!resault) {
            res.status(404).send(`${cityName} was not found`)
        } else {
            res.status(204).send(`${cityName} deleted successfully`)
        }
    })
})


//******************* Extention not working *******************

// router.put("/UpdateData", async function(req, res) {
//     let cities = await City.find({})
//     let updatedCities = ["empty"]
//         // await City.remove({}).exec()

//     for (let city of cities) {
//         const WEATHER_API_URL = `${WEATHER_API}&q=${city.name}&APPID=${WEATHER_API_KEY}`

//         // await is not working !!
//         await urllib.request(WEATHER_API_URL, function(err, data, resault) {
//             if (err)
//                 throw err;

//             const jsonData = JSON.parse(data.toString())

//             updatedCities.push({
//                 name: jsonData.name,
//                 temperature: Math.round(jsonData.main.temp),
//                 condition: jsonData.weather[0].description,
//                 conditionPic: jsonData.weather[0].icon
//             })

//         })
//     }
//     res.send(updatedCities)
// })

export default router