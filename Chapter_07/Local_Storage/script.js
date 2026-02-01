// script.js

const storeBtn = document.getElementById("store-button");
storeBtn.addEventListener("click", () => {
  store();
});

function store() {
    if (typeof (localStorage) == "undefined") {
        alert("Browser does not recognize HTML local storage.");
    }
    else {
        try {
            olddate = new Date();
            localStorage.setItem("lastdate", olddate);
            alert("Stored: " + olddate);
        }
        catch (e) {
            alert("Error with use of local storage: " + e);
        }
    }
    return false;
}

const fetchBtn = document.getElementById("fetch-button");
fetchBtn.addEventListener("click", () => {
  fetch();
});

function fetch() {
    if (typeof (localStorage) == "undefined") {
        alert("Browser does not recognize HTML local storage.");
    }
    else {
        alert("Stored " + localStorage.getItem('lastdate'));
    }
    return false;
}

const removeBtn = document.getElementById("remove-button");
removeBtn.addEventListener("click", () => {
  remove();
});

function remove() {
    if (typeof (localStorage) == "undefined") {
        alert("Browser does not recognize HTML local storage.");
    }
    else {
        localStorage.removeItem('lastdate');
        alert("Removed date stored.");
    }
    return false;
}
