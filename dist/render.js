class Renderer {
    constructor() {
        this.citiesEl = $('.cities-container')
        this.handlebarsSource = $("#city-template").html()
        this.template = Handlebars.compile(this.handlebarsSource)
    }

    renderData(citiesData) {
        this.citiesEl.empty()
        const newHTML = this.template({ city: citiesData })
        this.citiesEl.append(newHTML)    
    }
}