const fs = require("fs");
const http = require("http");
const https = require("https");
const socketIO = require("socket.io");
const express = require("express");
const cors = require('cors');
const fetch = require('node-fetch');

//load the config files which contains our hub_ids and their urls
const configUrl = 'https://colinfizgig.github.io/Custom-Hubs-Components/top-level-main-server/config.json';

let settings = { method: "Get" };
//temp variable for config
let config = {};
// promise to load config
const configPromise = fetch(configUrl, settings)
    .then(res => res.json())
    .then((json) => {
		config = json;
		return(json);
    });

const app = express();
app.use(cors());

app.use(express.static("public"));

app.get(
  "/.well-known/acme-challenge/sdk7Ne4KyfDw6dLwD39qIqJ8BcFiAWTLYLeZjhE9ylc",
  (req, res) => {
    res.send(
      "sdk7Ne4KyfDw6dLwD39qIqJ8BcFiAWTLYLeZjhE9ylc.VeFbm-Pcx9jG1LNNYKt1-ssk8U1QMse-QJsLzcWPGiI"
    );
  }
);

//route for custom client to check hub_id
//hub_id is passed as a query param from the script in hub.js
// the url to hit his route should be something like...
// https://<domain for this server>/injectScripts?hubid=<hub_id>

app.get(
	"/injectScripts",
	async (req, res) => {
			let result = {}
			try{ result.success = true;}
			catch(e){ result.success = false;}
			finally{
				var myHub = req.query.hubid;
				var myUrls = "";
				for (var hubObj of config.hubsarray){
					if(hubObj.hub_id == myHub){
						myUrls = hubObj.urls;
						res.send(myUrls);
						break;
					}
				}
				if(myUrls == ""){
					res.send("noUrls");
				}
			}
	});

/////////
const privKeyFileName = "/etc/letsencrypt/live/aelatgt.net/privkey.pem";
const certFileName = "/etc/letsencrypt/live/aelatgt.net/cert.pem";
const chainFileName = "/etc/letsencrypt/live/aelatgt.net/chain.pem";

// this will either be an http or https server
var httpServer;

if (
  fs.existsSync(privKeyFileName) &&
  fs.existsSync(certFileName) &&
  fs.existsSync(chainFileName)
) {
  const privateKey = fs.readFileSync(privKeyFileName, "utf8");
  const certificate = fs.readFileSync(certFileName, "utf8");
  const ca = fs.readFileSync(chainFileName, "utf8");

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  httpServer = https.createServer(credentials, app);
  httpServer.listen(3001, () =>
    console.log("HTTPS Server running on port 3001")
  );
} else {
  console.log("https certs are not available, not starting https server");
  httpServer = http.createServer(app);

  httpServer.listen(3000, () => 
    console.log("HTTP Server running on port 3000")
  );
}

// Starting for either the http or https servers
const io = socketIO.listen(httpServer);

io.sockets.on("connection", (socket) => {
  console.log("a user connected");
});
