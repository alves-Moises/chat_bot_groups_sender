
console.log('Entrando... Aguarde')

const { MessageMedia } = require("whatsapp-web.js")
const client = require("./src/clientStart.js")
// const { List , Client , LocalAuth , MessageMedia , Buttons, Reaction } = require("whatsapp-web.js");
const chalk = require("chalk");

const { 
    GetGroupsArray, 
    GetReactionsObj, 
    GetAnswerObj ,
    CheckGroupID,
    CheckIgnoreReacts,
    CheckAction,
    CheckADSGroup
} = require("./src/json_functions.js");

const {
    TIMessage,
    AutomMessageADS,
    WelcomeMsg,
    AutoMessageURL,
    VihMessage
} = require("./src/automessage_functions.js");

const my_group = "120363133137637660@g.us"
const prefix = '?'


// initalizating routes...
const express = require('express');
const { group } = require("console");
const { resolveSoa } = require("dns");
const app = express()
const port = 3000


//=== ROUTES ===

app.get("/", (req, res) => {
    res.send("Hello word")
})


// getting groups
app.get("/groups", async (req, res) => {
    console.log(chalk.yellow("Geting groups..."))
    try{

        const chats = await client.getChats();
        const groups = chats.filter(chat => chat.isGroup);

        const groupInfo = groups.map(group =>({
            id: group.id._serialized,
            name: group.name,
            participants: group.participants.length,
            // description: group.description
        }))

        // console.log(chats)
        // console.log(groups)
        res.status(200).json({
            status: true,
            groups: groupInfo
        })
        console.log(chalk.green("Succes getting groups!"))

    }catch(error){
        console.log()
        res.status(500).json({
            status: false,
            message: `Error: ${error}`
        })
        console.log(chalk.red("Error getting groups..."))
    }
})

// just for debug and learning...
app.get('/test/:msg', function (req, res) {
    client.sendMessage(my_group, req.params.msg)
    console.log(req.params.msg)
    res.send("Mensagem enviada com suecsso.")
});

app.get('/send', async function (req, res){
    console.log(chalk.green("Enviando mensagens..."))
    res.send("Enviando mensagens...")

    const group_array = GetGroupsArray()
    const action = CheckAction()
    

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
                    await client.sendMessage(
                        group_array[i],
                        media,
                    )

                }
                

                // message
                client.sendMessage(group_array[i], VihMessage())
                // client.sendMessage(my_group, VihMessage())

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

//========= send messages... ====================

client.on("ready", async () => {
    // return   // comment to send ADS

    const group_array = GetGroupsArray()
    const action = CheckAction()
    const { urls } = require("./src/assets/urls.js")
    
    
    // initializating server...
    app.listen(port, () => {
        console.log(`Exemplo app node rodando no endereço http://localhost:${port}`)
    });
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

// ============ Leaving group ====================
client.on("group_leave", async (group_update) => {
    const user = await group_update.getContact()
    const quit = await client.getContactById(group_update.recipientIds[0])

    console.log(`
        ${chalk.redBright(`${quit.pushname}`)} 
        removido por ${chalk.yellow(`${user.pushname}`)}.
    `)
    // console.log(group_update)
})

// =========== Message to my group ============
client.on("message", async (msg) => {
    let msgLower = msg.body.toLowerCase().trim()
    let from = msg.from
    user = await msg.getContact()

    
    // ==== message to my group =====
    if(!(CheckGroupID(from))){
        console.log(chalk.yellow(msg.from))
        console.log(msg.body)
        console.log('\n')
        client.sendMessage(my_group, `${msg.from}\n${msg.body}`)
    }

    if(CheckADSGroup(from)){
        console.log(chalk.green("ADS GROUPS"))
        console.log(chalk.yellow(msg.from))
        console.log(msg.body)
        console.log('\n')
        client.sendMessage(my_group, `ADS GROUP:\n${msg.from}\n${msg.body}`)
    }

    if(msg.body == prefix + 'ping'){
        msg.reply('pong')
        console.log(`ping... ${chalk.yellow(`${user.pushname}`)}`)    
    }
})


// ============ REACTION ================
client.on("message", async(msg) => {
    let msgLower = msg.body.toLowerCase().trim()
    let msg_array = msgLower.split(" ")
    let from = msg.from
    let chat = msg.getChat()

    if(CheckIgnoreReacts(from) || !(from == my_group)){ return }   // ignore list
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
    if(CheckIgnoreReacts(from) || !(from == my_group)){ return }   // ignore list
    let msgLower = msg.body.toLowerCase().trim()

    answer_obj = GetAnswerObj()
    if(Object.keys(answer_obj).includes(msgLower)){
        msg.reply(answer_obj[msgLower])
    }
})