// Modules
const express = require('express')
const chalk = require('chalk')
const csv = require('csvtojson')
const cors = require('cors')
const path = require('path')

// Constants
const app = express()
app.use(express.static(path.join(__dirname, '/public')))
app.use(cors())
const PORT = 8000
const csvFilePath = path.join(__dirname, '/public/data.csv')
const APIversion = '/api/v1'

app.get('/', (req, res) => {
  res.send('🌍 Sismo API Work !')
})

// -----------------------------------------------------------------
// ---------------------------- GET ALL ----------------------------
// ------------------------ GET /api/v1/city------------------------
// -----------------------------------------------------------------
app.get(`${APIversion}+/city`, (req, res) => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      res.send(jsonObj)
    })
  console.log(chalk.bgBlue.black('Get All data'))
})

// -----------------------------------------------------------------
// --------------------------- GET BY CP ---------------------------
// -------------------- GET /api/v1/city/cp/:id --------------------
// -----------------------------------------------------------------
app.get(`${APIversion}/city/cp/:id`, (req, res) => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const id = req.params.id
      const match = []
      for (let i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].codePostal === id) {
          match.push(jsonObj[i])
        }
      }
      match.length === 0 ? res.send(['Aucune valeur correspondante à votre recherche']) : res.send(match)
      console.log(match.length === 0 ? chalk.bgYellow.black(`No Code_postal Match for ${id}`) : chalk.bgBlue.black(`Get by Code_postal : ${id}`))
    })
})

// -----------------------------------------------------------------
// ------------------------- GET BY INSEE --------------------------
// ------------------- GET /api/v1/city/insee/:id ------------------
// -----------------------------------------------------------------
app.get(`${APIversion}/city/insee/:id`, (req, res) => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const id = req.params.id
      const match = []
      for (let i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].insee === id) {
          match.push(jsonObj[i])
        }
      }
      match.length === 0 ? res.send(['Aucune valeur correspondante à votre recherche']) : res.send(match)
      console.log(match.length === 0 ? chalk.bgYellow.black(`No Code_commune_INSEE Match for ${id}`) : chalk.bgBlue.black(`Get by Code_commune_INSEE : ${id}`))
    })
})

// -----------------------------------------------------------------
// ------------------------- GET BY NAME ---------------------------
// ------------------- GET /api/v1/city/name/:id -------------------
// -----------------------------------------------------------------
app.get(`${APIversion}/city/name/:id`, (req, res) => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const id = req.params.id
      const match = []
      for (let i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].nomCommune === id) {
          match.push(jsonObj[i])
        }
      }
      match.length === 0 ? res.send(['Aucune valeur correspondante à votre recherche']) : res.send(match)
      console.log(match.length === 0 ? chalk.bgYellow.black(`No Nom_commune Match for ${id}`) : chalk.bgBlue.black(`Get by Nom_commune : ${id}`))
    })
})

// -----------------------------------------------------------------
// --------------------------- GET BY VENT -------------------------
// ----------------- GET /api/v1/city/wind/:id ---------------------
// -----------------------------------------------------------------
app.get(`${APIversion}/city/wind/:id`, (req, res) => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const id = req.params.id
      const match = []
      for (let i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].vent === id) {
          match.push(jsonObj[i])
        }
      }
      match.length === 0 ? res.send(['Aucune valeur correspondante à votre recherche']) : res.send(match)
      console.log(match.length === 0 ? chalk.bgYellow.black(`No Vent Match for ${id}`) : chalk.bgBlue.black(`Get by Vent : ${id}`))
    })
})

// -----------------------------------------------------------------
// -------------------------- GET BY SNOW --------------------------
// ------------------- GET /api/v1/city/snow/:id -------------------
// -----------------------------------------------------------------
app.get(`${APIversion}/city/snow/:id`, (req, res) => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const id = req.params.id
      const match = []
      for (let i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].neige === id) {
          match.push(jsonObj[i])
        }
      }
      match.length === 0 ? res.send(['Aucune valeur correspondante à votre recherche']) : res.send(match)
      console.log(match.length === 0 ? chalk.bgYellow.black(`No Neige Match for ${id}`) : chalk.bgBlue.black(`Get by Neige : ${id}`))
    })
})

// -----------------------------------------------------------------
// ------------------------- GET BY SEISM --------------------------
// ------------------ GET /api/v1/city/seism/:id -------------------
// -----------------------------------------------------------------
app.get(`${APIversion}/city/seism/:id`, (req, res) => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const id = req.params.id
      const match = []
      for (let i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].seisme === id) {
          match.push(jsonObj[i])
        }
      }
      match.length === 0 ? res.send(['Aucune valeur correspondante à votre recherche']) : res.send(match)
      console.log(match.length === 0 ? chalk.bgYellow.black(`No Seisme Match for ${id}`) : chalk.bgBlue.black(`Get by Seisme : ${id}`))
    })
})

// -----------------------------------------------------------------
// ------------------------- GET BY DEPT ---------------------------
// --------------- GET /api/v1/city/department/:id ----------------
// -----------------------------------------------------------------
app.get(`${APIversion}/city/department/:id`, (req, res) => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const id = req.params.id
      const match = []
      for (let i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].departement === id) {
          match.push(jsonObj[i])
        }
      }
      match.length === 0 ? res.send(['Aucune valeur correspondante à votre recherche']) : res.send(match)
      console.log(match.length === 0 ? chalk.bgYellow.black(`No Departement Match for ${id}`) : chalk.bgBlue.black(`Get by Departement : ${id}`))
    })
})

// -----------------------------------------------------------------
// ------------------------- GET BY REGION -------------------------
// ------------------ GET /api/v1/city/state/:id ------------------
// -----------------------------------------------------------------
app.get(`${APIversion}/city/state/:id`, (req, res) => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const id = req.params.id
      const match = []
      for (let i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].region === id) {
          match.push(jsonObj[i])
        }
      }
      match.length === 0 ? res.send(['Aucune valeur correspondante à votre recherche']) : res.send(match)
      console.log(match.length === 0 ? chalk.bgYellow.black(`No Region Match for ${id}`) : chalk.bgBlue.black(`Get by Region : ${id}`))
    })
})

// Server listening on port 3000
app.listen(PORT, () => console.log(chalk.bgGreen.black('Server listening on port ' + PORT)))
