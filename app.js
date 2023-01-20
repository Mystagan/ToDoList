
const express = require("express")
const bodyParser = require("body-parser")

const app = express()

let items = ["Buy Food", "Cook Food", "Eat Food"]
let workItems = []

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

    res.render("list", { listTitle: day, items: items })
})

app.post("/", function (req, res) {
    let newItem = req.body.newItem
    
    if (req.body.list === "Work") {
        workItems.push(newItem)
        res.redirect("/work")
    } else {
        items.push(newItem)
        res.redirect("/")
    }
})

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", items: workItems })
})

app.listen(1959, function () {
    console.log("Server listening to port 1959")
})