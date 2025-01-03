let inputData;
function handleFormSubmit(event) {
    event.preventDefault();
    inputData = document.getElementById('textInput').value;
    console.log('Input Data:', inputData);
    document.getElementById('user-table').innerHTML=inputData}