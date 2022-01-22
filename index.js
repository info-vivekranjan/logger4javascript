let fs = require("fs");

let Logger = (exports.Logger = {});

const d = new Date();

let filename = `logs/${d.getFullYear()}_${d.getMonth() + 1}_${d.getDate()}.log`;
fs.mkdirSync('./logs', { recursive: true });
//Days

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let date = new Date();
let dayName = days[date.getDay()];

//Time

function formatAMPM(date) {
  // console.log(date);
  let strTime = "";
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  strTime = hours + ":" + minutes + " " + ampm;
  // console.log(strTime);
  return strTime;
}

Logger.info = function (msg) {
  let messageLog = `${dayName} ${d.getFullYear()}-${
    d.getMonth() + 1
  }-${d.getDate()} - ${formatAMPM(new Date())}`;

  fs.exists(filename, (exists) => {
    if (exists) {
      let message = messageLog + " : "+ "[info] " + msg + "\n";
      let infoStream = fs.createWriteStream(filename, { flags: "a" });
      infoStream.write(message);
    } else {
      let message = messageLog + " : " + "[info] " + msg + "\n";
      let infoStream = fs.createWriteStream(filename);
      infoStream.write(message);
    }
  });
};

Logger.error = function(msg) {
  let messageLog = `${dayName} ${d.getFullYear()}-${
    d.getMonth() + 1
  }-${d.getDate()} - ${formatAMPM(new Date())}`;

  fs.exists(filename, (exists) => {
    if (exists) {
      let message = messageLog + " : " +"[error] "+ msg + "\n";
      let infoStream = fs.createWriteStream(filename, { flags: "a" });
      infoStream.write(message);
    } else {
      let message = messageLog + " : " + "[error] " + msg + "\n";
      let infoStream = fs.createWriteStream(filename);
      infoStream.write(message);
    }
  });
};
module.exports = Logger