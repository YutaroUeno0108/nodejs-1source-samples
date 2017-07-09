'use strict'

const path = require('path')
const fs = require('fs')
const promise = require('bluebird')
const csvSync = require('csv-parse/lib/sync')

function readCsv () {
    const csvPath = path.join(__dirname, 'test', 'mst.csv')
    const data = fs.readFileSync(csvPath, 'utf-8')
    return parseCsv(data)
}

function parseCsv (csvstring) {
    const csvobj = csvSync(csvstring)
    return promise.resolve(csvobj)
}

readCsv()
.then((data) => {
    const resArray = []
    return promise.map(data, (str) => {
        const obj = {}
        obj.orgcd = str[0]
        obj.cocd = str[1]
        obj.orgname = str[2]
        obj.date = str[3]
        resArray.push(obj)
    })
    .then(() => resArray)
})
.then((data) => {
    console.log(data)
})
.then(() =>
    process.exit(0)
)

