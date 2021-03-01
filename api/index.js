// Modules
const express = require('express')
const chalk = require('chalk')
const cors = require('cors')
const csv = require('csvtojson')
const path = require('path')
const axios = require('axios')

// Constants
const app = express()
app.use(express.static(path.join(__dirname, '/public')))
app.use(cors())
const PORT = 8000
const csvFilePath = path.join(__dirname, '/public/data.csv')
const APIversion = '/api/v1'

const dataGouv = (insee) => {

  return axios.get(`https://geo.api.gouv.fr/communes?code=${insee}&fields=code,nom,codeDepartement,departement,codeRegion,region,centre,surface,population,codesPostaux`)
  .then((dataGouv) => {

    if (dataGouv.data[0] !== undefined) {
      const obj = {
        "insee": dataGouv.data[0].code,
        "population": "-",
        "surface": "-",
        "latitude": "-",
        "longitude": "-",
      }
  
      if (dataGouv.data.length !== 0) {
        dataGouv.data[0].population !== undefined ? obj.population = dataGouv.data[0].population.toString() : obj.population = '-'
        dataGouv.data[0].surface !== undefined ? obj.surface = dataGouv.data[0].surface.toString() : obj.surface = '-'
        // dataGouv.data[0].contour !== undefined ? obj.border = dataGouv.data[0].contour : obj.border = '-'
        if (dataGouv.data[0].centre !== undefined) {
          obj.longitude = dataGouv.data[0].centre.coordinates[0].toString()
          obj.latitude = dataGouv.data[0].centre.coordinates[1].toString()
        }
      } else {
        obj.population = '-'
        obj.surface = '-'
      }
      return obj
    } else {
      return null
    }
  })
}

app.get('/', (req, res) => {
  res.send('🌍 Sismo API Work !')
})

// -----------------------------------------------------------------
// --------------------------- GET BY CP ---------------------------
// -------------------- GET /api/v1/city/cp/:id --------------------
// -----------------------------------------------------------------
app.get(`${APIversion}/city/cp/:id`, (req, res) => {

  const dataCsv = csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const id = req.params.id
      const match = []
      for (let i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].codePostal === id) {
          match.push(jsonObj[i])
        }
      }
      return match
    })

    dataCsv.then(async (match) => {
      if (match.length === 0) {
        res.send(['Aucune valeur correspondante à votre recherche'])
        console.log(chalk.bgYellow.black(`No Code_postal Match for ${id}`))
      } else {
        const data = []
        for (let i = 0; i < match.length; i++) {
          const city = match[i];
          const insee = match[i].insee
          await dataGouv(insee).then(e => {
            if (e !== null) {
              if (insee === e.insee) {
                match[i].population = e.population
                match[i].surface = e.surface
                if (e.latitude !== "-" && e.insee !== "13055" && e.insee !== "75056" && e.insee !== "69123") {
                  match[i].latitude = e.latitude
                  match[i].longitude = e.longitude
                }
              }
            }            
            data.push(match[i])
            if (i === (match.length)-1) {
              const id = req.params.id
              
              res.send(data)
              console.log(chalk.bgBlue.black(`Get by Code_postal : ${id}`))
            }
          })
        }
      }
    })
})

// -----------------------------------------------------------------
// ------------------------- GET BY INSEE --------------------------
// ------------------- GET /api/v1/city/insee/:id ------------------
// -----------------------------------------------------------------
app.get(`${APIversion}/city/insee/:id`, (req, res) => {
  
  const dataCsv = csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const id = req.params.id
      const match = []
      for (let i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].insee === id) {
          match.push(jsonObj[i])
        }
      }
      return match
    })
    
    dataCsv.then(async (match) => {
      if (match.length === 0) {
        res.send(['Aucune valeur correspondante à votre recherche'])
        console.log(chalk.bgYellow.black(`No Code_commune_INSEE Match for ${id}`))
      } else {
        const data = []
        for (let i = 0; i < match.length; i++) {
          const city = match[i];
          const insee = match[i].insee
          await dataGouv(insee).then(e => {
            if (insee === e.insee) {
              match[i].population = e.population
              match[i].surface = e.surface
              if (e.latitude !== "-" && e.insee !== "13055" && e.insee !== "75056" && e.insee !== "69123") {
                match[i].latitude = e.latitude
                match[i].longitude = e.longitude
              }
            }
            data.push(match[i])
            if (i === (match.length)-1) {
              const id = req.params.id
              res.send(data)
              console.log(chalk.bgBlue.black(`Get by Code_commune_INSEE : ${id}`))
            }
          })
        }
      }
    })
})

// -----------------------------------------------------------------
// ------------------------- GET BY NAME ---------------------------
// ------------------- GET /api/v1/city/name/:id -------------------
// -----------------------------------------------------------------
app.get(`${APIversion}/city/name/:id`, (req, res) => {

  const dataCsv = csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const id = req.params.id
      const match = []
      for (let i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].nomCommune === id) {
          match.push(jsonObj[i])
        }
      }
      return match
    })    

    dataCsv.then(async (match) => {
      if (match.length === 0) {
        res.send(['Aucune valeur correspondante à votre recherche'])
        console.log(chalk.bgYellow.black(`No Nom_commune Match for ${id}`))
      } else {
        const data = []
        for (let i = 0; i < match.length; i++) {
          const city = match[i];
          const insee = match[i].insee
          await dataGouv(insee).then(e => {
            if (insee === e.insee) {
              match[i].population = e.population
              match[i].surface = e.surface
              if (e.latitude !== "-" && e.insee !== "13055" && e.insee !== "75056" && e.insee !== "69123") {
                match[i].latitude = e.latitude
                match[i].longitude = e.longitude
              }
            }
            data.push(match[i])
            if (i === (match.length)-1) {
              const id = req.params.id
              res.send(data)
              console.log(chalk.bgBlue.black(`Get by Nom_commune : ${id}`))
            }
          })
          .catch((err, e) => {
            switch (err.message) {
              case "Cannot read property 'insee' of null":
                res.send(match)
                console.log(chalk.bgYellow.black(`Get by Nom_commune : ${id}`))
                break;

              case "Request failed with status code 504":
                res.send("Limite du nombre de résultats atteint. Merci de préciser votre recherche.")
                console.log(chalk.bgYellow.black(`Get by Nom_commune : ${id}`))
                break;
            
              default:
                res.send(err.message)
                console.log(chalk.bgYellow.black(`Get by Nom_commune : ${id}`))
                break;
            }
            const id = req.params.id
            console.log(chalk.bgYellow.black(`Get by Nom_commune : ${id}`))
          })
        }
      }
    })
})

// Server listening on port 3000
app.listen(PORT, () => console.log(chalk.bgGreen.black('Server listening on port ' + PORT)))
