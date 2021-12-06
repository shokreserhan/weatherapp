const renderer = new Renderer()
const tempManager = new TempManager()

const handleSearch = async function() {
    const cityName = $("#search-input").val()
    await tempManager.getCityData(cityName)
    renderer.renderData(tempManager.cityData)
}

const refreshWeather = async function() {
    // await tempManager.updateData()   //****EXTENTION not working */
    renderer.renderData(tempManager.cityData)
}


$("#search-icon").on("click", handleSearch)

$("#refresh").on("click", refreshWeather) //not working Extention

$(".cities-container").on("click", ".save", async function() {
    const cityName = $(this).closest("div").data("name")
    await tempManager.saveCity(cityName)
    renderer.renderData(tempManager.cityData)
})

$(".cities-container").on("click", ".remove", async function() {
    const cityName = $(this).closest("div").data().name
    await tempManager.removeCity(cityName)
    renderer.renderData(tempManager.cityData)
})

$(document).ready(async function() {
    await tempManager.getDataFromDB()
    refreshWeather()
})