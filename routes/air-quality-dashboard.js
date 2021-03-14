/**
 * Route: /air-quality-dashboard
 * Method: GET
 *
 * Forwards the air quality research group's tableau dashboard as a raw PNG
 * with CORS enabled, for use in Hubs.
 */

const axios = require('axios')
const cors = require('cors')

// See https://github.com/wjsutton/tableau_public_api for how this was formed
const dashboardImageURL =
  'https://public.tableau.com/static/images/GT/GTAirQualityDashboard/Dashboard2/1.png'

module.exports = function (app) {
  app.get('/air-quality-dashboard', cors(), async function (req, res) {
    const dashboard = await axios.get(dashboardImageURL, {
      responseType: 'arraybuffer',
    })
    res.set('Content-Type', 'image/png')
    res.send(dashboard.data)
  })
}
