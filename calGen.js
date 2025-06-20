function addNameHex() {
  const nameHexInput = document.getElementById('nameHexInput');
  const nameHexList = document.getElementById('nameHexList');
  const inputValue = nameHexInput.value;

  if (inputValue.includes('#')) {
    const name = inputValue.split('#')[0];
    const hexcode = inputValue.split('#')[1];
    const listItem = document.createElement('li');
    listItem.classList.add("row")
    listItem.textContent =name;
    listItem.setAttribute('data-hexcode', hexcode);

    const deleteButton = document.createElement('button');
    const toggleButton = document.createElement('button');
    deleteButton.innerHTML = "Del";
    toggleButton.innerHTML = "Hide";
    deleteButton.classList.add("col-auto","delBut")
    toggleButton.classList.add("col-auto")
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
        listItem.style.color = 'white'
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
  }
}
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('addButton').addEventListener('click', () => {
    addNameHex();
    CalendarGenerate();
  });
});

// CalendarGenerate: Generates a calendar array from visible (toggled on) list items
function CalendarGenerate() {
  const nameHexList = document.getElementById('nameHexList');
  const items = nameHexList.getElementsByTagName('li');
  const calendar = new Array(60).fill(null).map(() => []);

  for (let i = 0; i < items.length; i++) {
    const listItem = items[i];
    // Only process if not toggled off (not line-through)
    if (listItem.style.textDecoration !== 'line-through') {
      let name = listItem.childNodes[0].textContent.trim();
      let hexcode = listItem.getAttribute('data-hexcode');
      if (!hexcode) {
        continue;
      }
      let bin = parseInt(hexcode, 16).toString(2).padStart(60, '0');
      for (let j = 0; j < 60; j++) {
        if (bin[j] === '1') {
          calendar[j].push(name);
        }
      }
    }
  }
  console.log("Calendar generated");
  console.log(calendar);
  // Format calendar as 5 rows and 12 columns with headers
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const hours = [
    "6am", "7am", "8am", "9am", "10am", "11am",
    "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"
  ];
  let html = "<table class='table table-responsive' id='calendarTable'><thead><tr><th></th>";
  for (let col = 0; col < 12; col++) {
    html += `<th>${hours[col]}</th>`;
  }
  html += "</tr></thead><tbody>";
  for (let row = 0; row < 5; row++) {
    html += `<tr><th>${weekdays[row]}</th>`;
    for (let col = 0; col < 12; col++) {
      const idx = row * 12 + col;
      html += `<td>${calendar[idx].join("/")}</td>`;
    }
    html += "</tr>";
  }
  html += "</tbody></table>";
  document.getElementById("calendarData").innerHTML = html;
  // calendar array is now filled as specified
}
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('generateButton').addEventListener('click',()=>{
    CalendarGenerate();
  })
})