const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/.well-known/acme-challenge/sdk7Ne4KyfDw6dLwD39qIqJ8BcFiAWTLYLeZjhE9ylc', (req,res) => {
    res.send("sdk7Ne4KyfDw6dLwD39qIqJ8BcFiAWTLYLeZjhE9ylc.VeFbm-Pcx9jG1LNNYKt1-ssk8U1QMse-QJsLzcWPGiI")
})
  
app.listen(3000, () => console.log('Server running on port 3000'))

