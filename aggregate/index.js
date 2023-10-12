/** IMPORT NODE JS LIBRARY */
const xlsx = require("xlsx");
const writejson = require("writejson");



/** GENERATE JSON */
const workbook = xlsx.readFile("./data.xlsx");
const data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

const orgUnits = ["gJF6YrXKBWc","cn6teczxZRw","vvYpow29rvb","VqwZfRiQ0T0","oZLUXxxNNZf","gr5kgUy7gIx","XF87NOJt2ae","q2lVxucI0Ru","LSs6W646sKx","v8eXAbhzdWe"];

let dataValues = [];

for ( row = 0; row < data.length; row++ ) {
    for ( orgUnit = 0; orgUnit < orgUnits.length; orgUnit ++ ) {
        dataValues.push({
            dataElement: "ma2Affg7oFN",
            categoryOptionCombo: "HllvX50cXC0",
            attributeOptionCombo: "HllvX50cXC0",
            orgUnit: orgUnits[orgUnit],
            period: row[period],
            value: row[orgUnits[orgUnit]]
        });
    }
}

writejson("./aggregateData.json", {
    dataValues: dataValues
});