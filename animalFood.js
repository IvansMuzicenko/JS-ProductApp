const mongoose = require("mongoose");
const Food = require("./models/food")

mongoose.connect("mongodb://localhost:27017/AnimalFood", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("-----------Mongo connection open!------------")
    })
    .catch((err) => {
        console.log("-----------Mongo connection ERROR!-----------")
        console.log(err)
    })



const animalFood = [
    {
        name: "Dry pork feed",
        price: 5,
        type: "dog"
    },
    {
        name: "Canned chicken",
        price: 2.50,
        type: "cat"
    },
    {
        name: "Wheat seeds",
        price: 3,
        type: "bird"
    }
];

Food.insertMany(animalFood)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    });