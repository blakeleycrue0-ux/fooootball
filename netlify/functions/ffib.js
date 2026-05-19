exports.handler = async function () {

const url = "https://www.ffib.es/Fed/NPcd/NFG_VisCompeticiones_Grupo?cod_primaria=1000113&codequipo=22591201&codgrupo=22792105";

try {

const response = await fetch(url);
const html = await response.text();

const matches = [];

/* Match extraction */
const regex = /(\d{2}\/\d{2}\/\d{4}).*?([A-Za-zÀ-ÿ\s]+)\s+(\d+)\s*-\s*(\d+)\s+([A-Za-zÀ-ÿ\s]+)/gms;

let match;

while ((match = regex.exec(html)) !== null) {

matches.push({
date: match[1],
home: match[2].trim(),
homeScore: match[3],
awayScore: match[4],
away: match[5].trim()
});

}

return {
statusCode: 200,
headers: {
"Content-Type": "application/json",
"Access-Control-Allow-Origin": "*"
},
body: JSON.stringify(matches)
};

} catch (err) {

return {
statusCode: 500,
body: JSON.stringify({
error: err.message
})
};

}

};
