const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')

const app = express()
const port = process.env.PORT || 5000
const distPath = path.resolve(__dirname, 'dist')

app.use(serveStatic(distPath))
app.listen(port)

console.log('server started ' + port)
