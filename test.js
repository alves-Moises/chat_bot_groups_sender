const express = require('express')
const app = express()
const port = 3000


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get("/user", function(req, res) {
    res.send("teste")
    console.log()
    return "teste"
})

app.get("/groups", function(req, res) {
    
})

app.get("/init", function(){

})




app.listen(port, () => {
    console.log(`Exemplo app node rodando no endereço http://localhost:${port}`)
});