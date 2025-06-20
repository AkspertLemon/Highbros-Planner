//Calendar generate button
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('generateButton').addEventListener('click',()=>{
    CalendarGenerate();
    colorCodeCalendarCells();
  })
})

//Hex List add button
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('addButton').addEventListener('click', () => {
    addNameHex();
  });
});

//Adds name into the hex list
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

    const toggleButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    toggleEye(toggleButton,true) //Calls the function auto sets it to open eye
    deleteButton.innerHTML = '<ion-icon title="Delete" name="trash"></ion-icon>';
    deleteButton.classList.add("col-auto")
    toggleButton.classList.add("col-auto","delBut")
    deleteButton.onclick = () => {
      nameHexList.removeChild(listItem);
    };

    toggleButton.onclick = () => {
      if (listItem.style.textDecoration === 'line-through') {
        listItem.style.color = "black"
        listItem.style.backgroundColor = '';
        listItem.style.textDecoration = '';
        listItem.disabled = false;
        toggleEye(toggleButton,true)
      } else {
        listItem.style.color = 'white'
        listItem.style.backgroundColor = '#00281b';
        listItem.style.textDecoration = 'line-through';
        listItem.disabled = true;
        toggleEye(toggleButton,false)
      }
    };

    listItem.appendChild(toggleButton);
    listItem.appendChild(deleteButton);
    nameHexList.appendChild(listItem);

    nameHexInput.value = '';
  } else {
    // alert('Invalid input format. Please use the format: name#hexcode');
    console.log("Invalid hexcode");
  }
}


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
  // console.log("Calendar generated");
  // console.log(calendar);
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
//Used to toggle the eye button in the list, had to write the on button on 3 lines
//How i feel after writing a function that improves effeciency qof by 1%
function toggleEye(button,state = true) {
    if (state) {
      button.innerHTML = '<ion-icon title="Showing" name="eye"></ion-icon>';
    }
    else {
      button.innerHTML = '<ion-icon title="Hidden" name="eye-off"></ion-icon>';
    }
}
//Used to colour the table, entirely chat gpt generated, dont know how it works
function colorCodeCalendarCells() {
  const calendarTable = document.querySelector("#calendar table");
  if (!calendarTable) return;

  const cells = calendarTable.querySelectorAll("td");

  cells.forEach(cell => {
    const names = cell.innerText.trim().split(/\s*,\s*/).filter(n => n !== "");
    const count = names.length;

    // Remove any existing classes first
    cell.classList.remove("cell-empty", "cell-low", "cell-medium", "cell-full");

    // Apply class based on count
    if (count === 0) {
      cell.classList.add("cell-empty");
    } else if (count === 1) {
      cell.classList.add("cell-low");
    } else if (count === 2) {
      cell.classList.add("cell-medium");
    } else {
      cell.classList.add("cell-full");
    }
  });
}
