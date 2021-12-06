import Mongoose from "mongoose"
const Schema = Mongoose.Schema

const citySchema = new Schema({
    name: String,
    temperature: Number,
    condition: String,
    conditionPic: String
})

const City = Mongoose.model("city", citySchema)

export default City