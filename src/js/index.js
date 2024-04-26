// *Defenitions
const loadBtn = document.querySelector('.load-data-btn');
const tableBody =document.querySelector('.table-body');
const formContainer = document.querySelector('.form-container');
const listContainer = document.querySelector('.list-container');
const priceBtn = document.querySelector(".price-container");
const dateBtn = document.querySelector(".date-container");
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const reLoadBtn = document.querySelector('.reload-data-btn');

let allTransactionsData = [];


// * add Events
loadBtn.addEventListener("click",  () => {
    formContainer.classList.remove("hidden");
    listContainer.classList.remove("hidden");
    loadBtn.classList.add("hidden");
    getData();
});
priceBtn.addEventListener("click", sortByPrice);
dateBtn.addEventListener("click", sortByDate);
searchForm.addEventListener("submit", searchData);
reLoadBtn.addEventListener("click", getData)


// *functions
function getData(){
    axios.get("http://localhost:3000/transactions")
    .then((res) => {
        allTransactionsData = res.data;
        displayData(allTransactionsData);
    })
    .catch(err => console.log(err))
}

function displayData(data){
    let result = "";
    searchInput.value="";
    data.forEach((data) => {
        result += `
        <tr class="table-body__row">
        <td class="table-body__data">${data.id}</td>
        <td class="table-body__data" style="color:${data.type==="افزایش اعتبار"? "#ACD373" : "#FF5252"}" >${data.type}</td>
        <td class="table-body__data">${data.price}</td>
        <td class="table-body__data">${data.refId}</td>
        <td class="table-body__data">${new Date(data.date).toLocaleDateString("fa-Ir")}   ساعت    ${new Date(data.date).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })}</td>
        </tr>
        `
    
    })
 
    tableBody.innerHTML = result;
}

function sortByPrice(){
    const priceBtnClasses = [...priceBtn.classList];
    if (priceBtnClasses.find((item) => item === "selected")){
        priceBtn.classList.remove("selected");
        axios.get("http://localhost:3000/transactions?_sort=price&_order=asc")
        .then((res) => {
        allTransactionsData = res.data;
        displayData(allTransactionsData);
         })
        .catch(err => console.log(err))
        }
    else {
        priceBtn.classList.add("selected");
        axios.get("http://localhost:3000/transactions?_sort=price&_order=desc")
        .then((res) => {
        allTransactionsData = res.data;
        displayData(allTransactionsData);
         })
        .catch(err => console.log(err))
        
    }
} 

function sortByDate(){
    const dateBtnClasses = [...dateBtn.classList];
    if (dateBtnClasses.find((item) => item === "selected")){
        dateBtn.classList.remove("selected");
        axios.get("http://localhost:3000/transactions?_sort=date&_order=asc")
        .then((res) => {
        allTransactionsData = res.data;
        displayData(allTransactionsData);
         })
        .catch(err => console.log(err))
        }
    else {
        dateBtn.classList.add("selected");
        axios.get("http://localhost:3000/transactions?_sort=date&_order=desc")
        .then((res) => {
        allTransactionsData = res.data;
        displayData(allTransactionsData);
         })
        .catch(err => console.log(err))
        
    }
} 

function searchData(event){
    event.preventDefault();
    axios.get(`http://localhost:3000/transactions?refId_like=${searchInput.value}`)
    .then((res) => {
        allTransactionsData = res.data;
        displayData(allTransactionsData);
    })
    .catch(err => console.log(err))
    searchInput.value = "";
    
}

