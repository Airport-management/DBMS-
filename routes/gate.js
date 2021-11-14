const express = require('express');
const route = express.Router();
const airportmodel = require("../models").airtportdata;
const { Op } = require("sequelize");

route.get('/', (req, res) => {
    res.json({hello :'hello'});
})

route.post('/', express.json(), async (req, res) => {
    try {
        let cityList = await airportmodel.findAll({
            where:{
                city:{
                  [Op.eq]:req.body.city
                }
            }
        });
    
        res.json({ city: cityList });
        
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
      }
})

module.exports = route;