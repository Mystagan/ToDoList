
const express = require("express")
const bodyParser = require("body-parser")

const app = express()

let items = ["1", "2", "3"]

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs")

app.get("/", function (req, res) {
    let today = new Date()
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("fr-FR", options)

    res.render("list", { day: day, items: items })
})

app.post("/", function (req, res) {
    let newItem = req.body.newItem
    items.push(newItem)
    res.redirect("/")
})

app.listen(1959, function () {
    console.log("Server listening to port 1959")
})