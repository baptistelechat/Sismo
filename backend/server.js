// Modules
const express = require('express')
const chalk = require('chalk')
const csv = require('csvtojson')

// Constants
const app = express()
const PORT = 3000
const csvFilePath = './data.csv'
const APIversion = '/api/v1'

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
        if (jsonObj[i].Code_postal === id) {
          match.push(jsonObj[i])
        }
      }
      res.send(match)
    })
  console.log(chalk.bgBlue.black('Get by Code_postal'))
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
        if (jsonObj[i].Code_commune_INSEE === id) {
          match.push(jsonObj[i])
        }
      }
      res.send(match)
    })
  console.log(chalk.bgBlue.black('Get by Code_commune_INSEE'))
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
        if (jsonObj[i].Nom_commune === id) {
          match.push(jsonObj[i])
        }
      }
      res.send(match)
    })
  console.log(chalk.bgBlue.black('Get by Name'))
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
        if (jsonObj[i].Vent === id) {
          match.push(jsonObj[i])
        }
      }
      res.send(match)
    })
  console.log(chalk.bgBlue.black('Get by Vent'))
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
        if (jsonObj[i].Neige === id) {
          match.push(jsonObj[i])
        }
      }
      res.send(match)
    })
  console.log(chalk.bgBlue.black('Get by Neige'))
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
        if (jsonObj[i].Seisme === id) {
          match.push(jsonObj[i])
        }
      }
      res.send(match)
    })
  console.log(chalk.bgBlue.black('Get by Seisme'))
})

// Server listening on port 3000
app.listen(PORT, () => console.log(chalk.bgGreen.black('Server listening on port ' + PORT)))
