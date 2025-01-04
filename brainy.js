function extractTimetable(parame) {
    // Select the table rows
    const rows = parame;

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
    });}
let inputData;
function handleFormSubmit(event) {
    event.preventDefault();
    inputData = document.getElementById('textInput').value;
    console.log('Input Data:', extractTimetable(inputData));
    document.getElementById('user-table').innerHTML=inputData
}