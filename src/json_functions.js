
const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const { GetMonth } = require("./data_template")


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

const CheckIgnoreReacts = (group_id) => {
    const groupsFilePATH = path.resolve(__dirname, "./json/groups.json")
    dados = JSON.parse(fs.readFileSync(groupsFilePATH))

    if(dados.includes(group_id)){
        return true
    }

    return false
}

const CheckDay = (file) => {
    console.log(chalk.greenBright("Checkadno o dia..."))
    const today = new Date()

    dados_today = today.toString().split(" ")

    day = dados_today[2]
    month = GetMonth(dados_today[1])
    year = dados_today[3]
    today_formated = `["${day}/${month}/${year}"]`
    
    var filepath = `./json/${file}`
    var dayPath = path.resolve(__dirname, filepath)
    
    dados_day = JSON.parse(fs.readFileSync(dayPath))
    day_string = dados_day.toString()
    day_array = day_string.split("/")  // dd mm yy
    j_day = day_array[0]
    j_month = GetMonth(day_array[1])
    j_year = day_array[2]

    // j_: json date
    if(j_year < year){valid = true}
    else if(j_month < month){valid = true}
    else if(j_day < day){valid = true}
    else(valid = false)
    
    if(valid){
        fs.writeFileSync(dayPath, today_formated)
        console.log(chalk.yellow("Novo dia"))
    }else{
        console.log(chalk.redBright("Não foi necessário enviar as mensagns"))
    }
    
    return valid
}

const CheckAction = () => {
    const data = JSON.parse(fs.readFileSync("./src/json/open_action.json"))
    data_string = data.toString()
    return data_string
}

console.log(CheckAction())

module.exports = { 
    GetGroupsArray, 
    GetReactionsObj,
    GetAnswerObj,
    CheckGroupID,
    CheckDay,
    CheckIgnoreReacts,
    CheckAction
}