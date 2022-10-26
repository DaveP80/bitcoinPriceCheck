const axios = require('axios')
const cheerio = require('cheerio');
const express = require('express')
const cors = require('cors')


async function getPrice() {

    try {

        const url = 'https://blockchain.info/ticker'

        const { data } = await axios({
            method: "GET",
            url: url,
        })
        
        const circularReference = data;
        circularReference.myself = circularReference;

        const getCircularReplacer = () => {
            const seen = new WeakSet();
            return (key, value) => {
                if (typeof value === "object" && value !== null) {
                    if (seen.has(value)) {
                        return;
                    }
                    seen.add(value);
                }
                return value;
            };
        };

        const stringified = JSON.stringify(circularReference, getCircularReplacer());


        const re = new RegExp(/("USD":{"15m":[^\,]+)/g);
        const datastring = stringified.match(re);
        let newString = datastring.toString()

        newString = newString.replace(/({)/g,'');

        newString2 = 'The Current Price of Bitcoin ' + newString

        String.prototype.InsertAt=function(CharToInsert,Position){
            return this.slice(0,Position) + CharToInsert + this.slice(Position)
       }

        newString3 = newString2.InsertAt(' $', 41)

        console.log(newString3);

    }
    catch (error) {
        console.error(error);
    }
}

getPrice()

