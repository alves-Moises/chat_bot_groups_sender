
console.log('Entrando... Aguarde')

const { MessageMedia, Reaction, getChats } = require("whatsapp-web.js")
const client = require("./src/clientStart.js")
// const { List , Client , LocalAuth , MessageMedia , Buttons, Reaction } = require("whatsapp-web.js");
const chalk = require("chalk");

const prefix = '?'
const { GetGroupsArray, GetReactionsObj } = require("./src/json_functions.js");
const { error } = require("console");

const welcome_msg = () => {
    const text = `
        bem-vindo ao grupo
        Me chame de alves
        Bot em construcao mas se quiser ser nossa cobaia, fique a vontade ;)
        automações para whatsapp me chame pv
    `

    return text
}

// ============  Joining group ===================
client.on("group_join", async (group_update) => {
    try{
        // const user = await group_update.getContact()
        const joinedUser = await client.getContactById(group_update.id.participant);
        let mentions = []
        mentions.push(joinedUser)
        var media = ''

        
        // console.log(joinedUser)
        let chat = await group_update.getChat()
        try{
            //mensagem com foto
            var url = await joinedUser.getProfilePicUrl()
            
            media = await  MessageMedia.fromUrl(url)
            chat.sendMessage(media, {mentions, caption: `Olá, @${joinedUser.id.user}!${welcome_msg()}`})    //mensagem com foto tratada 
        }catch(err){
            // mensagem sem foto
            console.log("mensagem sem foto... erro: " + err)
            chat.sendMessage(`Olá, @${joinedUser.id.user}!${welcome_msg()}`, {mentions})   // mensagem sem foto
            // console.log(`Usuário ${joinedUser.number} sem foto`)
            // group_update.reply("SEUGGUNDO TRY" + err)
            
            // console.log(joinedUser.id.user)
        }
    }catch(err){

        console.log(chalk.yellow("MEnsagem sem marcação... ") + err)
        //mensagem sem marcação nem foto
        
        const joinedUser = await client.getContactById(group_update.id.participant);
        await group_update.reply(`Olá, ${welcome_msg()}`)
        console.log("erro ao tentar enviar mensagem a usuario." + err)
        // console.log(`${joinedUser.number} entrou no grupo. Adicionado por ${user.pushname}`)
        // group_update.reply("Primeiro TRY" + err)
    }
})

client.on("group_leave", async (group_update, msg) => {
    const user = await group_update.getContact()
    const quit = await client.getContactById(group_update.recipientIds[0])

    console.log(`${chalk.redBright(`${quit.pushname}`)} removido por ${chalk.yellow(`${user.pushname}`)}.`)
    console.log(group_update)

    

})

client.on("message", async (msg) => {

    
    
    // chats.forEach(groupCollapsed => {
    //     console.log(group)
    //     console.log('\n')
    // });

    // console.log(groups)




    let msgLower = msg.body.toLowerCase().trim()
    let from = msg.from
    let send_message = client.sendMessage
    

    console.log(msg.body)
    console.log(msg.from)
    try{
        client.sendMessage("120363133137637660@g.us", `${msg.from}\n${msg.body}`)
    }catch{
        client.sendMessage("120363133137637660@g.us", `${msg.from}\nMensagem vazia...`)
    }

    // Reaction

    // .msg.react()
    
    
    // client.sendMessage("120363085795043818@g.us", "testando isso aqui...")



    
    user = await msg.getContact()
    if(msg.body == prefix + 'ping'){
        msg.reply('pong')
        console.log(`ping... ${chalk.yellow(`${user.pushname}`)}`)    
    }

    if(msgLower == "gay acima"){
        client.sendMessage(from, "gay abaixo")
    }

    if(msgLower.includes("alves")){
        msg.reply("oie")
    }
})


// ======== Automation ads =============
client.on("message", async (msg) => {
    
    
    let msgLower = msg.body.toLowerCase().trim()
    let from = msg.from
    if(msgLower != "alves"){ return }
    group_array = GetGroupsArray()

    for(i = 0; i < group_array.length; i++){
        // client.sendMessage(group_array[i], "Boa noite")
        console.log(`Enviando mensagem para  ${group_array[i]}`)
    }
})

// ============ REACTION ================
client.on("message", async(msg) => {
    let msgLower = msg.body.toLowerCase().trim()
    let msg_array = msgLower.split(" ")

    react_obj = GetReactionsObj()
    react_array = Object.keys(react_obj)
    
    for(i = 0; i < msg_array.length; i++){
        if(react_array.includes(msg_array[i])){
            msg.react(react_obj[msg_array[i]]).catch(error => console.error(error))
        }
    }
})