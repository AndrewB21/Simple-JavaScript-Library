const library = document.querySelector('.library'); 
const newBtn = document.querySelector('.newBtn');
const addForm = document.querySelector('.form');
const closeBtn = document.querySelector('#close');
const submitBtn = document.querySelector('#submit');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const hasRead = document.querySelector('#has-read');


//Create an array to store our books in
let booksArray = [];

if(localStorage.books){
    booksArray = JSON.parse(localStorage.getItem("books"));
}

//Create a Book object for all of our books
function Book(title, author, pages, read, id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
    this.info = () => `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

//Allow users to add new books through a form
const toggleForm = () => {
    addForm.classList.toggle('hidden');
}

const submitForm = (e) => {
    if(title.value == "" || author.value == "" || pages.value == ""){
        return;
    }
    e.preventDefault()
    newBook = new Book(title.value, author.value, pages.value, hasRead.checked, booksArray.length);
    booksArray.push(newBook);
    render(booksArray);
    addForm.reset();
    toggleForm();
    localStorage.setItem("books", JSON.stringify(booksArray));
}

const deleteBook = (id) => {
    booksArray = booksArray.filter(item => item.id != id);
    booksArray.forEach(function (value, i) {
        value.id = i;
    })
    render(booksArray);
    localStorage.setItem("books", JSON.stringify(booksArray));
}

newBtn.addEventListener('click', toggleForm);
closeBtn.addEventListener('click', toggleForm);
submitBtn.addEventListener('click', submitForm);

//Render our booklist to the screen
const render = (arr) => {
    while(library.firstChild){
        library.removeChild(library.firstChild);
    }
    for (let i = 0; i < arr.length; i++){
        let card = document.querySelector('.template').content.firstElementChild.cloneNode(true);
        card.id = i;
        card.children[0].innerText = arr[i].title;
        card.children[1].innerText = arr[i].author;
        card.children[2].innerText = arr[i].pages + ' pages';
        card.children[4].defaultChecked = arr[i].read;
        card.children[4].addEventListener('click', () => {
            if(card.children[4].checked){
                arr[i].read = true;
            }else{
                arr[i].read = false;
            }
            console.log(arr[i].read);
        })
        card.children[5].addEventListener('click', () =>{
            deleteBook(i);
        })
        library.appendChild(card);
    }
}

render(booksArray);