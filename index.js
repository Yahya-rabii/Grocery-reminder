const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** event listeners **********

// submit form
form.addEventListener("submit", addItem);
// clear list
clearBtn.addEventListener("click", clearItems);
// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

// ****** functions **********

// add item
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();

    if (value !== "" && !editFlag) {
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");
        element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
        // add event listeners to both buttons;
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);

        // append child
        list.appendChild(element);
        // display alert
        displayAlert("item added to the list", "success");
        // show container
        container.classList.add("show-container");
        // set local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();
    } else if (value !== "" && editFlag) {
        editElement.innerHTML = value;
        displayAlert("value changed", "success");

        // edit  local storage
        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert("please enter value", "danger");
    }
}
// display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    // remove alert
    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

// clear items
function clearItems() {
    const items = document.querySelectorAll(".grocery-item");
    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
    localStorage.removeItem("list");
}

// delete item

function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;

    list.removeChild(element);

    if (list.children.length === 0) {
        container.classList.remove("show-container");
    }
    displayAlert("item removed", "danger");

    setBackToDefault();
    // remove from local storage
    removeFromLocalStorage(id);
}
// edit item
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    //
    submitBtn.textContent = "edit";
}
// set backt to defaults
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}

// ****** local storage **********

// add to local storage
function addToLocalStorage(id, value) {
    const grocery = {
        id,
        value
    };
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem("list") ?
        JSON.parse(localStorage.getItem("list")) : [];
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
    });

    localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
    let items = getLocalStorage();

    items = items.map(function (item) {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}

// SETUP LOCALSTORAGE.REMOVEITEM('LIST');

// ****** setup items **********

function setupItems() {
    let items = getLocalStorage();

    if (items.length > 0) {
        items.forEach(function (item) {
            createListItem(item.id, item.value);
        });
        container.classList.add("show-container");
    }
}

function createListItem(id, value) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
    // add event listeners to both buttons;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    // append child
    list.appendChild(element);
}






var timer;

var compareDate = new Date();
compareDate.setDate(compareDate.getDate() + 1);

timer = setInterval(function () {
    timeBetweenDates(compareDate);
}, 1000);

function timeBetweenDates(toDate) {
    var dateEntered = toDate;
    var now = new Date();

    if (localStorage.length <= 0) {


        localStorage[0] = dateEntered.getTime();


    } else {

        dateEntered = localStorage[0]
        var difference = dateEntered - now.getTime();


        if (difference <= 0) {

            // Timer done
            clearInterval(timer);

        } else {

            var seconds = Math.floor(difference / 1000);
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            var days = Math.floor(hours / 24);

            hours %= 24;
            minutes %= 60;
            seconds %= 60;

            console.log(days + "/" + hours + "/" + minutes + "/" + seconds)

            if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {


                const items = document.querySelectorAll(".grocery-item");
                if (items.length > 0) {
                    items.forEach(function (item) {
                        list.removeChild(item);
                    });
                }
                container.classList.remove("show-container");
                displayAlert("empty list", "danger");
                setBackToDefault();
                localStorage.removeItem("list");
                alert("time up")
                localStorage.clear();

            } else {

                document.getElementById("days").innerHTML = days;
                document.getElementById("hours").innerHTML = hours;
                document.getElementById("minutes").innerHTML = minutes;
                document.getElementById("seconds").innerHTML = seconds;
            }


        }
    }
}