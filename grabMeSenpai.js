#! /usr/bin/env node
process.removeAllListeners('warning')

import { Client } from "twitter-api-sdk"
import fetch from 'node-fetch'
import fs from 'fs'
import conf from './conf.json' assert {type: "json"}


async function main() {
    console.log("Waifu Grabber, using Twitter Official SDK\nby @encrypt0r.hc")
    console.log("========================================================================")

    let tags = "#ElainArt"
    console.log("Cari tags Waifu :: " + tags)
    const client = new Client(conf.bearer.token)

    const response = await client.tweets.tweetsRecentSearch({
        "query": "#ElainArt has:media -is:retweet",
        "max_results": 20
    });
    for(let idx in response.data){
        gets(response.data[idx].id)
    }
}

async function gets(id){
    let baseUrl = "https://cdn.syndication.twimg.com/tweet?id="
    let url = baseUrl + id
    let response = await fetch(url)
    const data = await response.json()

    for(let idx in data.photos){
        fetch(data.photos[idx].url).then(res => {
            res.body.pipe(fs.createWriteStream(`./images/${id}.jpg`))
            console.log(`Waifumu Terdownload!!`)
        }, err => {
            console.log(err)
        })
    }
}

main()