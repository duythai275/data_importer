/** IMPORT NODE JS LIBRARY */
const xlsx = require("xlsx");
const writejson = require("writejson");



/** GENERATE UID */
const sample = (d, fn = Math.random) => {
    if (d.length === 0) {
        return;
    }
    return d[Math.round(fn() * (d.length - 1))];
};

const generateUID = (limit = 11) => {
    const allowedLetters = [
      "abcdefghijklmnopqrstuvwxyz",
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    ].join("");
    const allowedChars = ["0123456789", allowedLetters].join("");
    const arr = [sample(allowedLetters)]; // sample 1 to make sure it starts with a letter
    for (let i = 0; i < limit - 1; i++) {
      arr.push(sample(allowedChars));
    }
    return arr.join("");
};



/** GENERATE JSON */
const mapping = require("./mapping.json");
const workbook = xlsx.readFile("./data.xlsx");
const data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

writejson("./trackerData.json", data.map( row => {
    const trackedEntityInstance = generateUID();
    const enrollment = generateUID();
    const event_WlWJt4lVSWw = generateUID();

    return {
        orgUnit: row[mapping["orgUnit"]],
        trackedEntityInstance: trackedEntityInstance,
        trackedEntityType: row[mapping["trackedEntityType"]],
        attributes: Object.keys(mapping.attributes).filter( attribute => {
            row[mapping.attributes[attribute]]
        })
        .map( attribute => ({
            attribute: attribute,
            value: row[mapping.attributes[attribute]]
        })),
        enrollments: [
            {
                program: row[mapping["program"]],
                orgUnit: row[mapping["orgUnit"]],
                enrollment: enrollment,
                enrollmentDate: row[mapping["enrollementDate"]],
                incidentDate: row[mapping["incidentDate"]],
                events: [
                    ...row[mapping.event_WlWJt4lVSWw.eventDate] ? [{
                        event: event_WlWJt4lVSWw,
                        program: row[mapping["program"]],
                        programStage: "",
                        orgUnit: row[mapping["orgUnit"]],
                        status: "ACTIVE",
                        eventDate: "",
                        dataValues: Object.keys(mapping.event_WlWJt4lVSWw.dataValues).filter( dataElement => {
                            row[mapping.event_WlWJt4lVSWw.dataValues[dataElement]]
                        })
                        .map( attribute => ({
                            attribute: attribute,
                            value: row[mapping.event_WlWJt4lVSWw.dataValues[dataElement]]
                        }))
                    }] : []
                ]
            }
        ]
    }
}));