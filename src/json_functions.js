
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

const GetAnswerObj = () => {
    const answerPatch = path.resolve(__dirname, "./json/answer.json")
    dados = JSON.parse(fs.readFileSync(answerPatch))

    return dados[0]
}

const CheckGroupID = (group_id) => {
    const groupsFilePATH = path.resolve(__dirname, "./json/groups.json")
    const except_groupsFilePATH = path.resolve(__dirname, "./json/except_groups.json")

    dados = JSON.parse(fs.readFileSync(groupsFilePATH))
    dados_exept = JSON.parse(fs.readFileSync(except_groupsFilePATH))

    if(dados.includes(group_id) || dados_exept.includes(group_id)){
        return true
    }
    return false
}


module.exports = { 
    GetGroupsArray, 
    GetReactionsObj,
    GetAnswerObj,
    CheckGroupID
}