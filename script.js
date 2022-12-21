const inputText = document.querySelector("#username");
const selectedRole = document.querySelector("#role");
const myButton = document.querySelector(".btn-list");
const list = document.querySelector(".list-container ul");

let users = [];
const storedUsers = JSON.parse(localStorage.getItem("usersList"));

if (Array.isArray(storedUsers)) {
  users = storedUsers;
} else {
  console.log("The list is empty");
}

//Add users function using the event listener
myButton.addEventListener("click", (e) => {
  if (inputText.value != "") {
    e.preventDefault();

    //List item that contains the avatar image, details and the option to deleteSymbol the user
    const listItem = document.createElement("li");
    listItem.innerHTML =
      "<div class='image-details'>" +
      "<img src='./images/avatar.png' alt='avatar' class='image-format'></img>" +
      "<div class='details'>" +
      "<div>" +
      inputText.value +
      "</div>" +
      "<div>" +
      selectedRole.value +
      "</div>" +
      "</div> </div><span>&#10005</span>";

    list.appendChild(listItem);
    users.push(listItem.innerHTML);
  }
  //TO CHECK
  const deleteSymbol = document.querySelectorAll("span");
  for (let i = 0; i < deleteSymbol.length; i++) {
    deleteSymbol[i].addEventListener("click", () => {
      users.pop(deleteSymbol[i].parentElement.innerHTML);
      deleteSymbol[i].parentElement.style.display = "none";
    });
  }
  inputText.value = "";
  saveUser();
});

//Filter list function
function filterList() {
  const searchInput = document.querySelector("#search");
  const filter = searchInput.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-container ul li");

  listItems.forEach((item) => {
    let text = item.textContent;
    if (text.toLowerCase().includes(filter)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

//Save user function using the local storage
function saveUser() {
  localStorage.setItem("usersList", JSON.stringify(users));
}

//Render function that updates the users list
function render() {
  document.getElementById("dataList").innerHTML = "";

  for (var i = 0; i < users.length; i++) {
    const listItem = document.createElement("li");
    listItem.innerHTML = users[i];

    const deleteSymbol = document.querySelectorAll("span");
    for (let i = 0; i < deleteSymbol.length; i++) {
      deleteSymbol[i].addEventListener("click", () => {
        deleteSymbol[i].parentElement.style.display = "none";

        for (; i < users.length; i++) {
          users[i] = users[i + 1];
        }
        users.length--;
        saveUser();
        console.log(users);
      });
    }
    const dataList = document.getElementById("dataList");
    dataList.appendChild(listItem);
  }
}
render();

//Clear storage
// localStorage.clear();
