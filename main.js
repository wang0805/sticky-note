window.onload = function() {
  //generate all required elements
  var but1 = document.createElement("button");
  but1.setAttribute("id", "create");
  but1.innerHTML = "Add Note";
  document.getElementById("buttons").appendChild(but1);
  var but2 = document.createElement("button");
  but2.setAttribute("id", "save");
  but2.innerHTML = "Save";
  document.getElementById("buttons").appendChild(but2);
  var create = document.getElementById("create");
  create.addEventListener("click", newNote);
  var saves = document.getElementById("save");
  saves.addEventListener("click", save);
  var onSubmit = document.getElementById("onSubmit");
  onSubmit.addEventListener("submit", search);
  display("notes");
};

function newNote() {
  var newDiv = document.createElement("div");
  newDiv.className = "noteArea";

  let noteFormat = `
<a href="#" class="deleteNote">x</a>
<textarea rows="1" class="title" placeholder="Title"></textarea>
<textarea rows="6" class="content" placeholder="Enter notes here"></textarea>
`;
  newDiv.innerHTML = noteFormat;
  document.getElementById("board").appendChild(newDiv);
  let del = document.getElementsByClassName("deleteNote");
  for (let i = 0; i < del.length; i++) {
    del[i].addEventListener("click", deleteNote);
  }
}

function deleteNote(e) {
  console.log(this, "deletenote");
  let childrenNode = this;
  childrenNode.parentNode.className += " deleteEffect";
  let board = document.getElementById("board");
  setTimeout(() => {
    board.removeChild(childrenNode.parentNode);
  }, 600);
}
//save notes to browser to load on refresh using display
function save() {
  let arrayNotes = document.getElementsByClassName("noteArea");
  let titles = document.getElementsByClassName("title");
  let contents = document.getElementsByClassName("content");
  let newArray = [];
  for (let i = 0; i < arrayNotes.length; i++) {
    let obj = {};
    obj["title"] = titles[i].value;
    obj["content"] = contents[i].value;
    newArray.push(obj);
  }
  localStorage.setItem("notes", JSON.stringify(newArray));
}

function display(attr) {
  var jsonstr = localStorage.getItem(attr);
  var array = JSON.parse(jsonstr);
  for (let i = 0; i < array.length; i++) {
    var newEle = document.createElement("div");
    newEle.className = "noteArea";
    newEle.innerHTML = `
    <a href="#" class="deleteNote">x</a>
    <textarea rows="1" class="title" placeholder="Title">${
      array[i].title
    }</textarea>
    <textarea rows="6" class="content" placeholder="Enter notes here">${
      array[i].content
    }</textarea>
    `;
    document.getElementById("board").appendChild(newEle);
  }
  let del = document.getElementsByClassName("deleteNote");
  for (let i = 0; i < del.length; i++) {
    del[i].addEventListener("click", deleteNote);
  }
}

function search(e) {
  e.preventDefault();
  var jsonstr = localStorage.getItem("notes");
  var array = JSON.parse(jsonstr);
  let value = document.getElementById("search").value;

  let matches = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].title.includes(value.toLowerCase())) {
      let obj = {};
      obj["title"] = array[i].title;
      obj["content"] = array[i].content;
      matches.push(obj);
    }
  }
  matches.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    } else {
      return 1;
    }
  });
  //fast (cheat?) way to get the store the search result
  localStorage.setItem("filter", JSON.stringify(matches));
  let board = document.getElementById("board");
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
  display("filter");
}

// function autocomplete(input, array) {
// next time...
// }
