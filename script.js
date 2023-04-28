var allfakecompanynames = ["Burns Industries", "Dunder Mifflin, Inc.", "E Corp", "Hooli", "Los Pollos Hermanos", "Stark Industries", "Wayne Enterprises, Inc.", "Axe Capital", "Delos Inc", "Iron Bank of Braavos", "Rearden Steel", "Aperture Science", "Aviato", "Monsters, Inc.", "Rainholm Industries", "Umbrella Corp", "Bailey Building and Loan Association", "Bayside High School", "Black Mesa", "Blue Cat Hotel", "Cyberdyne Systems Corp.", "Duke & Duke", "Entertainment 720", "Genco Pura Olive Oil Company", "Globex", "Gregarious Simulation Systems", "Hooper's Store", "InGen", "Fang and Bone", "Macmillan Toys", "MomCorp", "NERV", "Oceanic Airlines", "Omni Consumer Products", "Oscorp", "Paper Street Soap Company", "Parker Industries", "Pearson Specter Litt", "Pide Piper", "PolyCon", "Prestige Worldwide", "Rekall", "Relaxicab", "Rent a Swag", "Sirius Cybernetics Corp.", "Springfield Nuclear Power Plant", "Sterling Cooper", "Stratton Oakmont", "TelAmeriCorp", "The Bluth Company", "The Estelle Leonard Talent Agency", "The Very Big Corporation of America", "Tyrell Corp.", "Veridian Dynamics", "Yubaba", "Weyland Yutani", "Rand Enterprises", "Openlane", "Yearin", "Goodsilron", "Condax", "Opentech", "Golddex", "year-job", "Isdom", "Gogozoom", "Y-corporation", "Nam-zim", "Donquadtech", "Warephase", "Donware", "Faxquote", "Sunnamplex", "Lexiqvolax", "Sumace", "Treequote", "Iselectrics", "Zencorporation", "Plusstrip", "dambase", "Toughzap", "Codehow", "Zotware", "Statholdings", "Conecom", "Zathunicon", "Labdrill", "Ron-tech", "Green-Plus", "Groovestreet", "Zoomit", "Bioplex", "Zumgoity", "Scotfind", "Dalttechnology", "Kinnamplus", "Konex", "Stanredtax", "Cancity", "Finhigh", "Kan-code", "Blackzim", "Dontechi", "Fasehatice", "Hatfan", "Streethex", "Inity", "Konmatfix", "Bioholding", "Hottechi", "Ganjaflex", "Betatech", "Domzoom", "Ontomedia", "Newex", "Betasoloin", "Mathtouch", "Rantouch", "Silis", "Plussunin", "Plexzap", "Finjob", "Scottech", "Funholding", "Sonron", "Singletechno", "Rangreen", "J-Texon", "Rundofase", "Doncon", "Acme Corporation", "Globex Corporation", "Soylent Corp", "Initech", "Bluth Company", "Umbrella Corporation", "Hooli", "Vehement Capital Partners", "Massive Dynamic", "Wonka Industries", "Stark Industries", "Gekko & Co", "Wayne Enterprises", "Bubba Gump", "Cyberdyne Systems", "Genco Pura Olive Oil Company", "The New York Inquirer", "Duff Beer", "Olivia Pope & Associates", "Sterling Cooper", "Ollivander's Wand Shop", "Cheers", "Krusty Krab", "Good Burger"];
var stocknames = [];
var prevstockvalues = [];
var stockvalues = [];

var money = 100;
var inbank = 0;
var currentpage = "home";

function cm(amount) {
    money += amount;
    document.getElementById("money").innerText = money;
}
function cb(amount) {
    inbank += amount;
    document.getElementById("currentbankbalance").innerText = inbank;
}

function checkmoney(amount) { return (money >= amount) }
function checkbankbalance(amount) { return (inbank >= amount) }

function deposit(amount) { if (checkmoney(amount)) { cm(0 - amount); cb(amount); } }
function withdraw(amount) { if (checkbankbalance(amount)) { cm(amount); cb(0 - amount); } }

function switchpage(pagename) {
    // de huidige pagina word in het navigatiemenu de class gegeven van "active"
    document.getElementById("nav" + currentpage).setAttribute("class", "");
    document.getElementById("nav" + pagename).setAttribute("class", "active");
    // de correcte pagina word laten zien en de vorige pagina laten we verdwijnen
    document.getElementById(currentpage).style.display = "none";
    document.getElementById(pagename).style.display = "initial";
    currentpage = pagename;
}

function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function bankmodalbuttonpress(buttonname) {
    /* buttonname is welke knop in de bank modal voor het kiezen tussen storten en opnemen werd geklikt. */
    document.getElementById("bankmodalbuttons").style.display = "none"; // knoppen worden niet meer te zien
    document.getElementById(buttonname).style.display = "block"; // de gespecificeerde buttonname div word laten zien
}

/*
    als op een van de knoppen voor het storten of opnemen word geklikt, word de functie deposit() of withdraw() geactiveerd en de bank modal gesloten.
*/
document.getElementById("bankmodaldepositbutton").addEventListener("click", function () {
    deposit(parseFloat(document.getElementById("bankmodaldepositinput").value));
    closebankmodal();
});
document.getElementById("bankmodalwithdrawbutton").addEventListener("click", function () {
    withdraw(parseFloat(document.getElementById("bankmodalwithdrawinput").value));
    closebankmodal();
});
document.getElementById("bankmodalwithdrawallbutton").addEventListener("click", function () {
    withdraw(parseFloat(inbank));
    closebankmodal();
});
document.getElementById("bankmodaldepositallbutton").addEventListener("click", function () {
    deposit(parseFloat(money));
    closebankmodal();
});


// Get the modal
var modal = document.getElementById("modal");

// Get the <span> element that closes the modal
var closebutton = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
document.getElementById("bankmodalopenbtn").onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closebutton.onclick = function () {
    closebankmodal();
}

function closebankmodal() {
    // alle dingen in de bank modal verdwijnt.
    modal.style.display = "none";
    document.getElementById("withdraw").style.display = "none";
    document.getElementById("deposit").style.display = "none";
    document.getElementById("bankmodalbuttons").style.display = "block";
    document.getElementById("bankmodaldepositinput").value = "";
    document.getElementById("bankmodalwithdrawinput").value = "";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        closebankmodal();
    }
}

// elke seconde: word %0.1 van wat je heb gestort in de bank word toegevoegd aan je banksaldo
function secondupdate() {
    if (inbank > 0) {
        cb(Math.round(inbank / 1000));
    }
}
setInterval(secondupdate, 1000);
function fivesecondupdate() {
    stocknames.forEach(x => {
        stockvalues[stocknames.indexOf(x)] *= (getRandomInt(-100, 100) / 100)
        stockvalues[stocknames.indexOf(x)] = Math.round(stockvalues[stocknames.indexOf(x)]);
    });
    updatestocks();
}
setInterval(fivesecondupdate, 5000);


// alle dingen voor devtools
function devtoolsupdatemoney() {
    money = parseFloat(document.getElementById("devtoolsmoney").value);
    document.getElementById("money").innerText = money;
    document.getElementById("devtoolsmoney").value = "";
}
function devtoolsupdateinbank() {
    inbank = parseFloat(document.getElementById("devtoolsinbank").value);
    document.getElementById("currentbankbalance").innerText = inbank;
    document.getElementById("devtoolsinbank").value = "";
}

function log(value) {
    console.log(value);
    document.getElementById("logs").innerHTML += (value + "<br>");
}

function loadstockdata(stockname) {
    // let stocktitle = document.getElementById("stockdataname");
    // let stockdataworth = document.getElementById("stockdataworth");
    // let stockdatapricechange = document.getElementById("stockdatapricechange");

    log("loadstockdata()");
    document.getElementById("stockdataname").innerText = stockname;
    document.getElementById("stockdataworth").innerText = stockvalues[stocknames.indexOf(stockname)];
    document.getElementById("stockdatapricechange").innerText = prevstockvalues[stocknames.indexOf(stockname)];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

// Stocks
function newstocks() {
    stocknames = [];
    stockvalues = [];
    document.getElementById("stocknames").innerHTML = "";
    while (stocknames.length < 10) {
        let newstock = random_item(allfakecompanynames);
        if (! stocknames.includes(newstock)) {
            stocknames.push(newstock);
            stockvalues.push(getRandomInt(1, 250));
        }
    }
    updatestocks();
}

function updatestocks() {
    document.getElementById("stocknames").innerHTML = "";
    stocknames.forEach(x => {
        document.getElementById("stocknames").innerHTML += ("<a style='cursor: pointer;' onclick='loadstockdata(x);'>" + x + " - " + stockvalues[x] + "</a>" + "<br>");
    });
}

// de loop voor winst in de bank word begonnen
newstocks();
// secondupdate();
// fivesecondupdate();
log(stocknames);
log(stockvalues);