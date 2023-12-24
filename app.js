// variables
let noteList = document.querySelector('.note-list')

// eventlisters
eventlisteners()
function eventlisteners(){
  // form submission
  document.querySelector('#form').addEventListener('submit',newNote)
  // remove note
  document.querySelector('.note-list').addEventListener('click',removeNote)

  // get data from localStorage on loaded
  document.addEventListener('DOMContentLoaded',localStorageOnLoad)
}


// functions
// Adding new note the list
function newNote(e) {
  e.preventDefault()
  // access to the value
  let note = document.querySelector('#note').value
  // create remove element
  const removeBtn = document.createElement('a')
  removeBtn.textContent = "X"
  removeBtn.classList = "remove-btn"
  // create li tag
  const li = document.createElement('li')
  

  // access note value null
  if (note === "") {
    return;
  }
  
  // adding note value to li
  li.appendChild(document.createTextNode(note))



  // adding remove Btn to li
  li.appendChild(removeBtn)

  // adding li to note-list
  noteList.appendChild(li)
  // load rest value
  this.reset()
  // add note to localstorage
  addNoteToLocalStorage(note)

 
}
// remove Note from list
function removeNote(e){
  if (e.target.classList.contains('remove-btn')){
    e.target.parentElement.remove()
  }
  // console.log();
  // also remote the note from the Local storage
  removeNoteLocalStorage(e.target.parentElement.textContent)
}



// adding note to localstorage

function addNoteToLocalStorage(note){
  // get the notes from localStorage
  const notes = getNoteFromLocalStorage()
  // add new note to the notes array
  notes.push(note)
  //  add new notes Array to localStorage
  localStorage.setItem('notes',JSON.stringify(notes))
}
// get notes from localStorage
function getNoteFromLocalStorage() {
  let notes;
  // get previous notes from localStorage
  let getFromLS = localStorage.getItem('notes')
  if (getFromLS === null) {
    // if not exist create empty array
    notes = []
  }
  else {
    // if exist convert to the array
    notes = JSON.parse(getFromLS)
  }
  return notes
}
// get data from local storage
function localStorageOnLoad() {
  const notes = getNoteFromLocalStorage();
  // print each item of array
  notes.forEach(note => {
    // create remove element
    const removeBtn = document.createElement('a')
    removeBtn.textContent = "X"
    removeBtn.classList = "remove-btn"
    // create li tag
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(note))

    // adding remove Btn to li
    li.appendChild(removeBtn)
    // adding li to note-list
    noteList.appendChild(li)
  });
}

// remove Note local Storage
function removeNoteLocalStorage(noteContent) {
  // delete X from the content
  const noteDelete = noteContent.substring(0,noteContent.length - 1)

  // get notes from localstorage
  const notesFromLS = getNoteFromLocalStorage()
  notesFromLS.forEach((note,index) => {
    if (note === noteDelete){
      notesFromLS.splice(index,1)
    }
  });
  // set new array localstorage
  localStorage.setItem('notes',JSON.stringify(notesFromLS))
}
