import Express from 'express'
import * as ws from 'ws'

const app = Express()


const wss = new ws.WebSocketServer({port: 7979})

wss.on('connection', function connection(ws) {
    const clientes = wss.clients;

    (ws as any).id = Math.floor(Math.random() * 1000000)

    const dadosIniciais = {
        type:'sistema',
        seuId: (ws as any).id
    }
    ws.send(JSON.stringify(dadosIniciais))

    ws.on('message', function message(data) {
        const mensagemParaEnviar = {
            type: 'mensagem',
            idRemetente: (ws as any).id,
            conteudo: data.toString()
        }

        wss.clients.forEach((client) => {
            if(client.readyState === 1){
                client.send(JSON.stringify(mensagemParaEnviar))
            }
        })
    
    })

})