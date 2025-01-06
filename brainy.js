
function ampmTo24hr(fulltime) {
    const time = Number(fulltime.split(":")[0]);
    if (fulltime[6] == "P" && time != 12) {
        return time + 12;
    } else {return time;}}
function extractTimetable() {
    //Possible XSS attacks
    // Get the input HTML string
    const htmlString = document.getElementById('htmlInput').value;
    
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
        if (index > 0 && row.cells.length === 8) {
            const startTime = row.cells[3].innerText.trim();
            const endTime = row.cells[4].innerText.trim();
            const day = row.cells[7].innerText.trim();

            timetable.push({ startTime, endTime, day });
        }
    });
    let bintimetable = '';
    bintimetable = '10'.repeat(30);
    console.log(bintimetable);
    timetable.shift();
    document.getElementById('output').textContent = JSON.stringify(timetable, null, 2);
    let timdif = [];
    for (i of timetable){
        if ((ampmTo24hr(i.endTime)-ampmTo24hr(i.startTime))==0){
            timdif.push(1);
        } else {timdif.push(ampmTo24hr(i.endTime)-ampmTo24hr(i.startTime));}
        }
    document.getElementById('test').textContent = timdif;
    const hexString = BigInt('0b' + bintimetable).toString(16);
    document.getElementById('test1').textContent = hexString.toUpperCase();
    }


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button').addEventListener('click', extractTimetable);
});