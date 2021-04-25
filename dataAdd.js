var express = require('express');
var app = express();
var usermodel= require("./models").user;
var airportmodel=require("./models").airtportdata;
const { Op } = require("sequelize");
const fs = require('fs').promises;

function random() {
    let r = Math.random();
    return r;
}

let st = new Set(); // used in rank_gen fn
let i = 0; // used in addData fn

async function rank_gen() {
    let r = Math.floor(random() * 200 + 1);
    while (st.has(r)) {
        r = Math.floor(random() * 200 + 1);
    }
    st.add(r);

    return r;
}

async function convert_text(data) {
    let str = "";

    for (let i = 0; i < data.length; i++){
        str += data[i] + ', \n';
    }

    console.log(str);
    return str.slice(0, -1);
}

function service_gen() {
    let r = Math.floor(random() * 20 + 80);
    return r;
}

async function db() {
    const data = await fs.readFile('./new_data.json');
    return new Buffer.from(data);
}

async function addData(data) {
    let rank = await rank_gen();
    let service = service_gen();
    let imagevar = `ap-${(i++ % 20) + 1}.jpg`;
    let food = await convert_text(data['food']);
    let recommendations = await convert_text(data['recommendations']);
    let taxi = await convert_text(data['taxi']);
    
    
    const entries = await airportmodel.create({
        name: data['name'],
        city: data['city'],
        state: data['state'],
        cleanliness: data['cleanliness'],
        ranking: rank,
        traffic: data['traffic'],
        airlines: Number(data['Airlines-No']),
        image: "/uploads/" + imagevar,
        recommendation: recommendations,
        service: service,
        taxi: taxi,
        foodchains: food,

    });

    console.log(entries);
}

async function extractData(data) {
    // for (let i = 0; i < data.length; i++){
    //     await addData(data[i]);
    // }

    const d = data[0];
    let food = await convert_text(d['food']);
    console.log(food);

    // console.log('•', 0x2022);
}


(async function () {
    try {

        let response = await db();
        let data = await JSON.parse(response);

        await extractData(data);

        console.log('sucess');
        
    } catch (error) {
        console.log(error);
    }
})();