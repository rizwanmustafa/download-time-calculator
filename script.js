const completedDownloadInputElement = document.querySelector("#completed-input");
const totalDownloadInputElement = document.querySelector("#total-input");
const internetSpeedInputElement = document.querySelector("#internet-speed-input");
const remainingTimeElement = document.querySelector("#remaining-time");


let remainingTime = "Your remaining time is: N/A | Download will finish on: N/A";

completedDownloadInputElement.addEventListener("input", main);
totalDownloadInputElement.addEventListener("input", main);
internetSpeedInputElement.addEventListener("input", main);
document.querySelector("#calculate-button").addEventListener("click", main);


let remainingHours = 0;
let remainingMinutes = 0;
let remainingSeconds = 0;

let date = null;
let dateText = "";


function updateRemainingTime(){
		const completedDownload = Number(completedDownloadInputElement.value);
		const totalDownload = Number(totalDownloadInputElement.value);
		const internetSpeed = Number(internetSpeedInputElement.value);

		const remainingDownloadMbs = (totalDownload - completedDownload) * 1000;

		const totalTimeRemaining = remainingDownloadMbs / internetSpeed;

		remainingHours = Math.floor(totalTimeRemaining / 3600);
		remainingMinutes  = Math.floor((totalTimeRemaining - remainingHours * 3600) / 60);
		remainingSeconds  = Math.floor(totalTimeRemaining - remainingHours * 3600 - remainingMinutes  * 60);
}

function updateDate() {
	const now = new Date();
	now.setHours(now.getHours() + remainingHours);
	now.setMinutes(now.getMinutes() + remainingMinutes);
	now.setSeconds(now.getSeconds() + remainingSeconds);

	date = now;
}

function updateDateText() {
  if (date === null)  { dateText = ""; return; }

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;

  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  dateText = dd + '/' + mm + '/' + yyyy + " " + hours + ':' + minutes + ':' + seconds + ' ' + ampm;
}

function updateText() {
	const duration =  `${remainingHours} hours, ${remainingMinutes} minutes and ${remainingSeconds} seconds`
	remainingTime = `Your remaining time is: ${duration} | Download will finish on: ${dateText}`;
}

function updateDOM() {
	remainingTimeElement.textContent = remainingTime;
}

function validateValues() {
		let completedDownload = completedDownloadInputElement.value;
		let totalDownload = totalDownloadInputElement.value;
		let internetSpeed = internetSpeedInputElement.value;

		if (!isNumeric(completedDownload) || !isNumeric(totalDownload) || !isNumeric(internetSpeed)) return false;

		// Convert values to integers for future comparisons
		completedDownload = Number(completedDownloadInputElement.value);
		totalDownload = Number(totalDownloadInputElement.value);
		internetSpeed = Number(internetSpeedInputElement.value);

		if (totalDownload === 0 || internetSpeed === 0 || completedDownload > totalDownload) return false;

		return true;
}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function main() {
	if (!validateValues()) remainingTime = "Your remaining time is: N/A | Download will finish on: N/A";
	else { 
		updateRemainingTime();
		updateDate();
		updateDateText();
		updateText();
	}
	updateDOM();
}

main();