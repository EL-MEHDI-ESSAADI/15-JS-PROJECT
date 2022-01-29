const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// ################################# PEREFECT #############################################""
// To calc countDown i use utc time
// the futur time , the user see it in his zone time
// ################################# PEREFECT #############################################""
const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");
// months are ZERO index based;

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
// set futur date in utc
// const futureDate = new Date(2021, 11, 16, 11, 30, 0);
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);
// set futur date in user local zone 
const futureLocalDate = new Date(tempYear, tempMonth, tempDay + 10, 11 - (futureDate.getTimezoneOffset()/60 )  , 30, 0);

// edit giveaway content
giveaway.textContent = `giveaway ends on 
${weekdays[futureLocalDate.getDay()]}, 
${futureLocalDate.getDate()} 
${months[futureLocalDate.getMonth()]} 
${futureLocalDate.getFullYear()}, 
${futureLocalDate.getHours()}:${futureLocalDate.getMinutes()} `;

// countDown
let handel = setInterval(getRemaindingTime, 1000);
//set initial values
getRemaindingTime();

function getRemaindingTime() {
  const today = new Date(new Date().toUTCString().slice(0, 25));
  const t = futureDate - today;
  // check if time is not over
  if (t <= 0) {
    deadline.innerHTML = `<h4 class="expired"> Time is over</h4>`;
    clearInterval(handel);
    return;
  }
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1d = 24hr
  // values in miliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  // calculate all values
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let mints = Math.floor((t % oneHour) / oneMinute);
  let sec = Math.floor((t % oneMinute) / 1000);

  // set values array
  const values = [days, hours, mints, sec];
  values.forEach((value, index) => {
    value < 10
      ? (items[index].textContent = "0" + value)
      : (items[index].textContent = value);
  });
}
