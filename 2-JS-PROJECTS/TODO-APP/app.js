const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

let isEditing = false; // Flag to track if we're editing an item
let currentEditItem = null; // Keep track of the item being edited

function addTask() {
  if (inputBox.value == "") {
    alert("The box is empty");
  } else {
    if (!isEditing) {
      // Only add a task if we're not editing
      let Li = document.createElement("li");
      Li.innerHTML = inputBox.value;
      listContainer.appendChild(Li);

      // Adding cross icon to remove
      let createSpan = document.createElement("span");
      createSpan.id = "span1";
      createSpan.innerHTML = "remove";
      Li.appendChild(createSpan);

      let createSpan2 = document.createElement("span");
      createSpan2.id = "span2";
      createSpan2.innerHTML = "Edit";
      Li.appendChild(createSpan2);
      increment();
    } else {
      // If editing, update the current item
      currentEditItem.firstChild.textContent = inputBox.value;
      isEditing = false; // Reset edit mode
    }

    inputBox.value = "";
    saveData();
  }
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName == "LI") {
    // if present in li class chekcked remove if absent add
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN" && e.target.id == "span1") {
    // parent element is new li wahi remove krdo
    e.target.parentElement.remove();
    saveData();
  } else if (e.target.tagName === "SPAN" && e.target.id == "span2") {
    // Set the edit mode

    //
    inputBox.value = e.target.parentElement.firstChild.textContent.trim();
    isEditing = true;
    currentEditItem = e.target.parentElement;

    // Track the item being edited
    // console.log(currentEditItem);  //li
    // console.log(e.target)   // edit
    // console.log(e.target.parentElement) //li
    // console.log(e.target.parentElement.firstChild) // inputBox.value
    // console.log(e.target.parentElement.lastChild)  // edit

    //         refer this if confused about parent and child

    //         <ul id="list-container">
    //   <li>
    //     <span>Task 1</span>
    //     <span id="span1">remove</span>
    //     <span id="span2">Edit</span>
    //   </li>
    //   <!-- More <li> elements -->
    // </ul>
  }
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showData();
