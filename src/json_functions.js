
const fs = require("fs")
const path = require("path")
const { json } = require("stream/consumers")

const GetGroupsArray = () => {
    const groupsFilePATH = path.resolve(__dirname, "./json/groups.json")
    dados = JSON.parse(fs.readFileSync(groupsFilePATH))
    
    return dados
}

const GetReactionsObj = () => {
    const reactPath = path.resolve(__dirname, "./json/react.json")
    dados = JSON.parse(fs.readFileSync(reactPath))
    return dados[0]
}

module.exports = {GetGroupsArray, GetReactionsObj}