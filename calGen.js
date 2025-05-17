function addNameHex() {
const nameHexInput = document.getElementById('nameHexInput');
const nameHexList = document.getElementById('nameHexList');
const inputValue = nameHexInput.value;

if (inputValue.includes('#')) {
    const name = inputValue.split('#')[0];
    // we can extract the hexcode right here
    const listItem = document.createElement('li');
    listItem.textContent = name;

    const deleteButton = document.createElement('button');
    const toggleButton = document.createElement('button');
    deleteButton.innerHTML = "Del";
    toggleButton.innerHTML = "Hide";

    deleteButton.onclick = () => {
        nameHexList.removeChild(listItem);
    };

    toggleButton.onclick = () => {
        if (listItem.style.textDecoration === 'line-through') {
            listItem.style.backgroundColor = '';
            listItem.style.textDecoration = '';
            listItem.disabled = false;
            toggleButton.innerHTML = "Hide";
        } else {
            listItem.style.backgroundColor = '#00281b';
            listItem.style.textDecoration = 'line-through';
            listItem.disabled = true;
            toggleButton.innerHTML = "Show";
        }
    };

    listItem.appendChild(deleteButton);
    listItem.appendChild(toggleButton);
    nameHexList.appendChild(listItem);

    nameHexInput.value = '';
} else {
    alert('Invalid input format. Please use the format: name#hexcode');
}}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addButton').addEventListener('click', addNameHex);
});