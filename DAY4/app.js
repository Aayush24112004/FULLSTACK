const express = require("express")
const app = express()
app.use(express.json())

const users = []    

app.get("/", (req, res) => {
    res.send("Welcome to the User API")
})

app.post("/users", (req, res) => {
    console.log(req.body) 
    const user = req.body
    users.push(user)
    res.status(201).send("User added")
})

app.get("/users", (req, res) => {
    res.send(users)
})

app.delete("/users/:id", (req, res) => {
    delete users[req.params.id]
    res.send("User deleted")
})

app.patch("/users/:id", (req, res) => {
    users[req.params.id].description = req.body.description
    res.send("User updated")
})


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})