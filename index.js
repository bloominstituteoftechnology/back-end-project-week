const server = require('express')()
const PORT = process.env.PORT || 8888

server.get('/',(req,res) => {
    res.json({status:'Up and running'})
})

server.listen(PORT, () => console.log(`Listenining on ${PORT}`))