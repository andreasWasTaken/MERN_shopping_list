const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')


const app = express()

// middleware
app.use(bodyParser.json())

// Connect MongoDB
const db = require('./config/keys').mongoURI
mongoose.connect(db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
 })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

// Use Routes
const items = require('./routes/api/items')
app.use('/api/items', items)

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// Connect Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))