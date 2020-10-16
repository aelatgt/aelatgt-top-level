
const fs = require('fs');
const http = require('http');
const https = require('https');

const express = require('express');
const app = express()

app.use(express.static('public'))

app.get('/.well-known/acme-challenge/sdk7Ne4KyfDw6dLwD39qIqJ8BcFiAWTLYLeZjhE9ylc', (req,res) => {
    res.send("sdk7Ne4KyfDw6dLwD39qIqJ8BcFiAWTLYLeZjhE9ylc.VeFbm-Pcx9jG1LNNYKt1-ssk8U1QMse-QJsLzcWPGiI")
})
  
// Starting both http & https servers
const httpServer = http.createServer(app);
httpServer.listen(3000, () => console.log('HTTP Server running on port 3000'))

/////////
const privKeyFileName = '/etc/letsencrypt/live/aelatgt.net/privkey.pem'
const certFileName = '/etc/letsencrypt/live/aelatgt.net/cert.pem'
const chainFileName = '/etc/letsencrypt/live/aelatgt.net/chain.pem'

if (fs.existsSync(privKeyFileName) && fs.existsSync(certFileName) && fs.existsSync(chainFileName)) {
  const privateKey = fs.readFileSync(privKeyFileName, 'utf8');
  const certificate = fs.readFileSync(certFileName, 'utf8');
  const ca = fs.readFileSync(chainFileName, 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };

  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(3001, () => console.log('HTTPS Server running on port 3001'))
} else {
  console.log("https certs are not available, not starting https server")
}
