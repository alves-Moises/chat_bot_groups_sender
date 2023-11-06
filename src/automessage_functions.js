const { addDays } = require("date-fns")

const TIMessage = () => {
    return `
        *Alves informática*

        🖥️💻 Manutenção de computadores e notebooks
        formatação
        atualização de drives
        instalação de softwares
        recuperação de arquivos
        troca de pasta térmica
        limpeza
        manutençaõ de fonte
        manutenção preventiva
        configuração de impressora

        🕹️💽 Manutenção de video games
    - Instalação do OPL para rodar jogos de PS2 via pen drive
    - Troca de pasta térmica e limpeza interna
    - Reparo de circuitos eletrônicos
    - Instalação e atualização do Recalbox para jogar clássicos retrô
    - Montagem e configuração de Raspberry Pi
    
    📱📱 Manutenção de celulares
    - Troca de tela e aplicação de película
    - Reparo de botões, alto-falantes e microfones
    - Limpeza de conector de carga e entrada de fone
    - Desbloqueio e restauração de sistema
    
        limpeza


        📱📱manutenção em celulares
        troca de tela
        aplicação de película
        e outros serviços

        chamar via chat ou wp
        wa.me/5522999668509
        aceitamos pix 📲
    `
    // return `*Grupo Voltado pra compra e venda*

    //     Divulguem a vontade mas evitem flood
        
    //     ❌Proibido IPTV
    //     ❌Proibidio divulgação de blitz/lei seca
    //     ❌Proibido qualquer coisa que inflinja a lei
    //     ❌Não chamar no pv sem permissão
        
    //     Link do grupo:
    //     https://chat.whatsapp.com/EGHUn7LcGvrAPTapYCDXxM
    //     `
}

const AutomMessageADS = () => {
    return `
        _*Chegou a solução mais fácil e rápida para o envio de mensagens em massa!*_
        Agora você economiza tempo, pois não precisará gastá-lo enviando cada mensagem. 

        A automação do envio de mensagens, permite que você faça isso tudo de maneira *automática*, 
        economizando tempo e possibilitando maior *eficiência e agilidade*. 

        *Não perca mais tempo!*
        Aproveite essa novidade e comece a desfrutar de todas as vantagens da automação de envio de mensagens em massa.

        Temos também outros tipso de automações como autoatendimento onde voCê pode atender vários clientes ao mesmo tempo sem fazer eles esperarem.

        Você com certeza já perdeu cliente por demora no atendimento né?
        *Com a nossa solução isso não acontece mais!*
    `
}

const WelcomeMsg = () => {
    const text = `
        bem-vindo ao grupo
        Me chame de alves
        Bot em construcao mas se quiser explorar suas funcionalidades, fique a vontade ;)
        automações para whatsapp é comigo mesmo!
    `

    return text
}

const AutoMessageURL =() => {
    return "https://images.unsplash.com/photo-1642724978500-c13b821afe04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
    //return "https://encurtador.com.br/jGKR6"
}

const VihMessage = () => {
    return `
    🎉 SUPER PROMOÇÃO, Space Fit ! 
    🎁 Descontos imperdíveis, conjuntos a partir de 99,99 😍
    💥 PEÇAS  LIMITADAS, CORRA!  
    E o melhor? Para facilitar sua compra, estou à disposição no WhatsApp 
    https://encurtador.com.br/lswBX para tirar todas as dúvidas . 
    Vamos às compras! 🛒📲
    `
}
module.exports = {
    TIMessage,
    AutomMessageADS,
    WelcomeMsg,
    AutoMessageURL,
    VihMessage
}