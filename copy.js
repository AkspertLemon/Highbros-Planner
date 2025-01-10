function copyHexCode() {
    const hexcodeElement = document.getElementById('hexcode');
    const hexcodeText = hexcodeElement.innerHTML;

    navigator.clipboard.writeText(hexcodeText).then(() => {
        console.log('Hex code copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy hex code: ', err);
    });
    document.getElementById("copyButton").innerHTML = "Copied!";
    setTimeout(() => {
        document.getElementById("copyButton").innerHTML = "Copy";
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('extractButton').addEventListener('click', extractTimetable);
    document.getElementById('copyButton').addEventListener('click', copyHexCode);
});