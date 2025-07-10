function ampmTo24hr(fulltime) {
  const time = Number(fulltime.split(":")[0]);
  if (fulltime.split(" ")[1] == "PM" && time != 12) {
    return time + 12;
  } else { return time; }
}

function dayOffset(day) {
  switch (day.toLowerCase()) {
    case "monday":
      return 0;
    case "tuesday":
      return 12;
    case "wednesday":
      return 24;
    case "thursday":
      return 36;
    case "friday":
      return 48;
    default:
      return -1;
  }
}

function extractTimetable() {
  let flag = 1;
  // Possible XSS attacks
  // Get the input HTML string
  const htmlString = document.getElementById('htmlInput').value;
  const name = document.getElementById('nameInput').value;
  // Create a temporary DOM element to parse the HTML string
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  // Select the table rows from the parsed HTML
  const rows = tempDiv.querySelectorAll('table tbody tr');
  // Initialize an array to hold the extracted data
  const timetable = [];
  // Loop through the rows and extract time and day
  rows.forEach((row, index) => {
    // Skip the header row and the separator rows
    if (index > 0 && row.cells.length === 10) {
      const day = row.cells[1].innerText.trim();
      const startTime = row.cells[6].innerText.trim();
      const endTime = row.cells[7].innerText.trim();
      if (dayOffset(day) != -1) {                           // Day is a workday (no support for staurday yet)
        timetable.push({ startTime, endTime, day });
      }
    }
  });
  let bintimetable = '0'.repeat(60).split('');
  // timetable.shift();
  //Looping through timetable and adding the times to the binary timetable
  for (i of timetable) {
    let count;
    startTime24hr = ampmTo24hr(i.startTime);
    endTime24hr = ampmTo24hr(i.endTime);
    dayOffsetValue = dayOffset(i.day);
    if ((ampmTo24hr(i.endTime) - ampmTo24hr(i.startTime)) == 0) {
      count = 1;
    } else { count = (ampmTo24hr(i.endTime) - ampmTo24hr(i.startTime)); }
    for (j = 0; j < count; j++) {
      // console.log(j+dayOffset(i.day)+ampmTo24hr(i.startTime));
      bintimetable[j + dayOffset(i.day) + ampmTo24hr(i.startTime) - 6] = '1';
    }
  }
  // console.log(bintimetable.join(''));
  const hexString = BigInt('0b' + bintimetable.join('')).toString(16).toUpperCase().padStart(15, '0');
  //hexstring is the output
  document.getElementById("hexcode").style.opacity = 1;
  document.getElementById("hexcode").innerHTML = hexString;
  if (hexString.length < 5) {
    document.getElementById("copyButton").disabled = true
    document.getElementById("hexcode").innerHTML = "Invalid htmlString, Err 3";
  } else {
    document.getElementById("copyButton").disabled = false
    document.getElementById("hexcode").innerHTML = name + '#' + hexString;
  };
};
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('extractButton').addEventListener('click', extractTimetable);
});
