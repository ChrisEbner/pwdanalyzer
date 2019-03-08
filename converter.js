const fs = require('fs');
const path = require('path');

let stringArr = [];
let userObject = {
    users: []
}

// Read a file from path that is provided as argument to this program.
if (process.argv[2] === undefined || process.argv[2] === '') {
    console.log(`
    Copyright (c) 2019 Christian Ebner
    Converter.js 1.0.
    Converter takes a user:password list and converts it to javascript usable json files in the data/ directory.

    Usage: node converter.js [PathToFile]
    `)
    process.exit()
}

const FileToRead = process.argv[2]

fs.readFile(FileToRead, {}, (err, contents) => {
   if (err) {
       console.log(err)
       process.exit()
   }

   let strings = contents.toString().split('\n');
   let chunkSize = 50000;
   let chunk = [];

   strings.map((item, id) => {
     let userArr = item.split(':')
     let singleUser = Object.assign({}, { email: userArr[0], password: userArr[1]})

     chunk.push(singleUser)

     if (chunk.length >= chunkSize) {
        userObject.users.push(chunk)
        chunk = []
     }
   })

   callback()
})

function callback() {
    userObject.users.forEach((chunk, index) => {
        fs.writeFileSync(`./data/users-${index}.json`, JSON.stringify(chunk))
    })
}

