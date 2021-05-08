const client = require('rippled-ws-client')
const { connection } = require('websocket')
new client('wss://fh.xrpl.ws').then(connection => {

    connection.on('ledger', (ledgerInfo) => {
        //console.log('EVENT=ledger: ledgerInfo:', ledgerInfo)
    })

    connection.on('transaction', (Transaction) => {
        console.log('tx: ', Transaction)
    })

    connection.send({
        command: 'subscribe',
        streams: ['transactions']
    }).then((r) => {
        console.log('subscribe Response', r)
    }).catch((e) => {
        console.log('subscribe Catch', e)
    })

    setTimeout(() => {
        clearTimeout(getStateInterval)
        connection.close().then((CloseState) => {
            // console.log('<< Closed socket after 120 seconds >>', CloseState)
            console.log('<< Closed socket after 120 seconds >>')
        }).catch(CloseError => {
            console.log('<< Closed socket ERROR after 120 seconds >>', CloseError)
        })
    }, 120 * 1000)

}).catch((r) => {
    // E.g.: when WebSocket URI is faulty
    console.log('Couldn\'t connect', r)
})