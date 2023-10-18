
console.log('Entrando... Aguarde')

const { MessageMedia } = require("whatsapp-web.js")
const client = require("./src/clientStart.js")
// const { List , Client , LocalAuth , MessageMedia , Buttons, Reaction } = require("whatsapp-web.js");
const chalk = require("chalk");

const prefix = '?'
const { 
    GetGroupsArray, 
    GetReactionsObj, 
    GetAnswerObj ,
    CheckGroupID,
    CheckIgnoreReacts,
    CheckAction
} = require("./src/json_functions.js");

const {
    TIMessage,
    AutomMessageADS,
    WelcomeMsg,
    AutoMessageURL
} = require("./src/automessage_functions.js");


client.on("ready", async () => {
    
    
    //========= send messages... ====================
    // return   // comment to send ADS
    
    const group_array = GetGroupsArray()
    const action = CheckAction()
    // valid_day = false
    // if(CheckDay("today.json")){valid_day = true}
    // if(CheckDay("today_bot.json")){valid_day = true}

    // if(!valid_day){ return }
    for(i = 0; i < group_array.length; i++){
        try{

            if(action.includes("propagandati")){
                await client.sendMessage(group_array[i], TIMessage())
                // await client.sendMessage(group_array[i], `${i}`)
                // await client.sendMessage(my_group, `${i}: ${group_array[i]}`)

            }else if(action.includes("propagandavih")){
                urls = [img1, img2, img3, img4]
                
                for(j = 0; j < urls.length; j++){

                    // sending messages...
                    media = await MessageMedia.fromUrl(urls[j], {unsafeMime:true})
                    await client.sendMessage(group_array[i],
                        media,
                    )

                }
                

                // message
                client.sendMessage(group_array[i], VihMessage())

            }else{
                var media_url = AutoMessageURL()
                
                media = await MessageMedia.fromUrl(media_url, {unsafeMime:true})

                client.sendMessage(group_array[i],
                    media,
                    {
                        caption: AutomMessageADS()
                    }
                )  
            }
            
            
            console.log(`
            Enviando mensagem para  ${chalk.red(i)}:
            ${chalk.yellow(group_array[i])}`
            )
        }catch(err){
            console.log("Erro mensagem. " + err)
        }
    }
})

// ============  Joining group ===================
client.on("group_join", async (group_update) => {
    if(CheckIgnoreReacts(group_update.chatId) || !(group_update.chatId == my_group)){return}   // ignore list

    try{
        // const user = await group_update.getContact()
        let chat = await group_update.getChat()

        const joinedUser = await client.getContactById(group_update.id.participant);
        let mentions = []
        mentions.push(joinedUser)
        var media = ''

        console.log(`CHAt: `)
        console.log(chat)
        console.log(chalk.yellow(`group_update:\n`))
        console.log(group_update)
        console.log(Object.keys(group_update))
        console.log(group_update.chatId)

        console.log(`\n\nFROM: ${group_update.from}`)
        console.log(joinedUser)
        // return
        try{
            //mensagem com foto
            var url = await joinedUser.getProfilePicUrl()
            
            media = await  MessageMedia.fromUrl(url)
            chat.sendMessage(media, {mentions, caption: `Olá, @${joinedUser.id.user}!${WelcomeMsg()}`})    //mensagem com foto tratada 
        }catch(err){
            // mensagem sem foto
            console.log("mensagem sem foto... erro: " + err)
            chat.sendMessage(`Olá, @${joinedUser.id.user}!${WelcomeMsg()}`, {mentions})   // mensagem sem foto
            // console.log(`Usuário ${joinedUser.number} sem foto`)
            // group_update.reply("SEUGGUNDO TRY" + err)
            
            // console.log(joinedUser.id.user)
        }
    }catch(err){

        console.log(chalk.yellow("MEnsagem sem marcação... ") + err)
        //mensagem sem marcação nem foto
        
        const joinedUser = await client.getContactById(group_update.id.participant);
        await group_update.reply(`Olá, ${WelcomeMsg()}`)
        console.log("erro ao tentar enviar mensagem a usuario." + err)
        // console.log(`${joinedUser.number} entrou no grupo. Adicionado por ${user.pushname}`)
        // group_update.reply("Primeiro TRY" + err)
    }
})

client.on("group_leave", async (group_update) => {
    const user = await group_update.getContact()
    const quit = await client.getContactById(group_update.recipientIds[0])

    console.log(`
        ${chalk.redBright(`${quit.pushname}`)} 
        removido por ${chalk.yellow(`${user.pushname}`)}.
    `)
    // console.log(group_update)
})

client.on("message", async (msg) => {
    let msgLower = msg.body.toLowerCase().trim()
    let from = msg.from
    user = await msg.getContact()
    const my_group = "120363133137637660@g.us"

    
    // ==== message to my group =====
    if(!(CheckGroupID(from))){
        console.log(chalk.yellow(msg.from))
        console.log(msg.body)
        console.log('\n')
        client.sendMessage(my_group, `${msg.from}\n${msg.body}`)
    }

    if(msg.body == prefix + 'ping'){
        msg.reply('pong')
        console.log(`ping... ${chalk.yellow(`${user.pushname}`)}`)    
    }
})

// ======== Automation ads =============
client.on("message", async (msg) => {
    return
    const users = ["555481615041@c.us", "558498211934@c.us", "5512988030168@c.us"]
    let msgLower = msg.body.toLowerCase().trim()
    try{

        let from = msg.from
        console.log(from)
        console.log("Testando automatio nADS")
        if(!users.includes(from)){return}

        valid_day = false
        if(CheckDay("today.json")){valid_day = true}
        if(CheckDay("today_bot.json")){valid_day = true}
        
        valid_message = false
        if(msgLower.includes("propagandati")){valid_message += true}
        if(msgLower.includes("propagandabot")){(valid_message += true)}

        if(!valid_day || !valid_message){ return }

    }catch(err){
        console.log(chalk.red(err))
    }
    group_array = GetGroupsArray()

    //========= send messages... ====================
    // return   // comment to send ADS

    for(i = 0; i < group_array.length; i++){
        try{

            if(msgLower.includes("propagandati")){
                client.sendMessage(group_array[i], TIMessage())
            }else{
                var media_url = AutoMessageURL()
                
                media = await MessageMedia.fromUrl(media_url, {unsafeMime:true})

                client.sendMessage(group_array[i],
                    media,
                    {
                        caption: AutomMessageADS()
                    }
                )  
            }
            
            
            console.log(`
            Enviando mensagem para  ${chalk.red(i)}:
            ${chalk.yellow(group_array[i])}
            `)
        }catch(err){
            console.log("Erro mensagem. " + err)
        }
    }
})

// ============ REACTION ================
client.on("message", async(msg) => {
    let msgLower = msg.body.toLowerCase().trim()
    let msg_array = msgLower.split(" ")
    let from = msg.from


    if(CheckIgnoreReacts(from)){return}   // ignore list
    react_obj = GetReactionsObj()
    react_array = Object.keys(react_obj)
    
    for(i = 0; i < react_array.length; i++){
        if(msgLower.includes(react_array[i])){
            msg.react(
                react_obj[react_array[i]]).catch(err => console.log(`reac err: ${chalk(err)}`))
        }
    }
})

// ============= Answer in json ================
client.on("message", async (msg) => {
    let from = msg.from
    if(CheckIgnoreReacts(from)){return}   // ignore list
    let msgLower = msg.body.toLowerCase().trim()

    answer_obj = GetAnswerObj()
    if(Object.keys(answer_obj).includes(msgLower)){
        msg.reply(answer_obj[msgLower])
    }
})