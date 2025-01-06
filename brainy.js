
function ampmTo24hr(fulltime) {
    const time = Number(fulltime.split(":")[0]);
    if (fulltime[6] == "P" && time != 12) {
        return time + 12;
    } else {return time;}
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
    }
}
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
    document.getElementById('output').textContent = JSON.stringify(timetable, null, 2);
    let bintimetable = '0'.repeat(60).split('');
    timetable.shift();
    //Looping through timetable and adding the times to the binary timetable
    for (i of timetable){
        let count;
        startTime24hr = ampmTo24hr(i.startTime);
        endTime24hr = ampmTo24hr(i.endTime);
        dayOffsetValue = dayOffset(i.day);
        //console.log(`startTime24hr: ${startTime24hr}, endTime24hr: ${endTime24hr}, dayOffsetValue: ${dayOffsetValue}`);
        if ((ampmTo24hr(i.endTime)-ampmTo24hr(i.startTime))==0){
            count=1;} else {count=(ampmTo24hr(i.endTime)-ampmTo24hr(i.startTime));}
            for (j=0;j<count;j++){
                //console.log(j+dayOffset(i.day)+ampmTo24hr(i.startTime));
                bintimetable[j+dayOffset(i.day)+ampmTo24hr(i.startTime)-6] = '1';
            }
        }
    //document.getElementById('test').textContent = bintimetable;
    const hexString = BigInt('0b' + bintimetable.join('')).toString(16);
    console.log(bintimetable);
    document.getElementById('test').textContent = bintimetable.join('');
    document.getElementById('test1').textContent = hexString.toUpperCase();
    }


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button').addEventListener('click', extractTimetable);
});