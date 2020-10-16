const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/.well-known/acme-challenge/uubkcfjSd8v_ATBFo-ADSrbc68LVZYMQ2ZvU-9Asf2c', (req,res) => {
    res.send("uubkcfjSd8v_ATBFo-ADSrbc68LVZYMQ2ZvU-9Asf2c.VeFbm-Pcx9jG1LNNYKt1-ssk8U1QMse-QJsLzcWPGiI")
})
  
app.listen(3000, () => console.log('Server running on port 3000'))

