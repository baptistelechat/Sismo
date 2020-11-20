// Modules
const express = require('express')
const chalk = require('chalk')
const csv = require('csvtojson')

// Constants
const app = express()
const PORT = 3000
const csvFilePath = './data-light.csv'
const APIversion = '/api/v1'

// ? GET /api/v1/city
app.get(`${APIversion}+/city`, (req, res) => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      res.send(jsonObj)
    })

  console.log(chalk.bgBlue.black('Get All data'))
})

app.listen(PORT, () => console.log(chalk.bgGreen.black('Server listening on port ' + PORT)))
