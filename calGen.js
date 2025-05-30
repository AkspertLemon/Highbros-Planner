function addNameHex() {
  const nameHexInput = document.getElementById('nameHexInput');
  const nameHexList = document.getElementById('nameHexList');
  const inputValue = nameHexInput.value;

  if (inputValue.includes('#')) {
    const name = inputValue.split('#')[0];
    const hexcode = inputValue.split('#')[1];
    const listItem = document.createElement('li');
    listItem.textContent = name;
    listItem.setAttribute('data-hexcode', hexcode);

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
      // If bin is longer than 60, take only the last 60 bits
      if (bin.length > 60) {
        bin = bin.slice(-60);
      }
      for (let j = 0; j < 60; j++) {
        if (bin[j] === '1') {
          calendar[j].push(name);
        }
      }
    }
  }
  console.log("Calendar generated");
  console.log(calendar);
  // Format calendar as 5 rows and 12 columns with day headers and time column headers
  const dayHeaders = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeHeaders = [
    "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"
  ];
  let html = "<table style='width:100%;height:90vh;text-align:center;border-collapse:collapse;' border='1'><tr><th></th>";
  for (let col = 0; col < 12; col++) {
    html += `<th style='background:#eee;'>${timeHeaders[col]}</th>`;
  }
  html += "</tr>";
  for (let row = 0; row < 5; row++) {
    html += `<tr><th style='background:#eee;'>${dayHeaders[row]}</th>`;
    for (let col = 0; col < 12; col++) {
      const idx = row * 12 + col;
      const cellData = calendar[idx].join("/");
      // You can change the cell background colors here:
      // Green for empty cells, red for filled cells
      if (cellData) {
        html += `<td style='background:#fcc'>${cellData}</td>`; // Red for filled
      } else {
        html += `<td style='background:#cfc'>Free</td>`; // Green for empty
      }
    }
    html += "</tr>";
  }
  html += "</table>";
  document.getElementById("calendarData").innerHTML = html;
  // calendar array is now filled as specified
}
