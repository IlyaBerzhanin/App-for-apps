const express = require('express')
const PORT =  3003
const path = require('path');
const app = express()

app.use(express.urlencoded({extended: true}))
app.use('/', express.static(path.join(__dirname, '../dist')))

// const data = {
//     rub: 10,
//     dollar: 30
// }

async function init() {
    try {
        

    app.listen(PORT, () => {
        console.log('This server has been started...');

        setInterval(() => {
           // console.log(data);
        }, 5000)
    })
    }
    catch(e) {
        console.log(e);
    }
}

init()