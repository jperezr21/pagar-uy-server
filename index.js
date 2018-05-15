const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.render('pages/index'))
  .get('/ok', (req, res) => res.send('ok'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
