const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejs = require("ejs");

const Food = require("./models/food")

mongoose.connect("mongodb://localhost:27017/AnimalFood", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("-----------Mongo connection open!-----------")
    })
    .catch((err) => {
        console.log("-----------Mongo connection ERROR!-----------")
        console.log(err)
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

const types = ["dog", "cat", "bird", "rodent"];

app.get('/products', async (req, res) => {
    const { type } = req.query;
    if (type) {
        const allFood = await Food.find({ type })
        res.render("index", { allFood, type })
    } else {
        const allFood = await Food.find({})
        console.log(allFood);
        res.render("index", { allFood, type: "All" });
    }
})

app.get("/products/new", (req, res) => {
    res.render("new", { types })
})

app.post("/products", async (req, res) => {
    const newFood = new Food(req.body);
    await newFood.save();
    res.redirect(`/products/${newFood._id}`)
})

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const food = await Food.findById(id);
    res.render(`show`, { food })
})

app.get("/products/:id/edit", async (req, res) => {
    const { id } = req.params;
    const food = await Food.findById(id);
    res.render(`edit`, { food, types });
})

app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const food = await Food.findByIdAndUpdate(id, req.body, {runValidators: true, new: true });
    res.redirect(`/products/${food._id}`);
})

app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const deleteFood = await Food.findByIdAndDelete(id);
    res.redirect("/products");
})


app.listen(3000, () => {
    console.log("App is running on port :3000!")
})