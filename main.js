const title = document.getElementById('title')
const price = document.getElementById('price')
const taxes = document.getElementById('taxes')
const ads = document.getElementById('ads')
const discount = document.getElementById('discount')
const total = document.getElementById('Total')
const count = document.getElementById('count')
const category = document.getElementById('category')
const createBtn = document.getElementById('createBtn')
const search = document.getElementById('search')
const titleBtn = document.getElementById('titleBtn')
const categoryBtn = document.getElementById('categoryBtn')
const deleteAll = document.getElementById('deleteAll')

let mood = 'create'
let phontomVAR

// GetTotal
function getTotal(){
    const finalTotal = Number( price.value )+ Number(taxes.value) + Number(ads.value) - Number(discount.value)
    return total.innerHTML = finalTotal
}
price.addEventListener('input', getTotal)
taxes.addEventListener('input', getTotal)
ads.addEventListener('input', getTotal)
discount.addEventListener('input', getTotal)

// Create product 



let allProducts;
if(localStorage.product != null ){
    allProducts = JSON.parse(localStorage.product)
}else{
    allProducts =[] 
} 

createBtn.onclick = function object(){
    const newProduct = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase()
    }
    // count
    if(title.value != ''&& price.value != '' && category.value != ''){
        if(mood === 'create'){
            if(newProduct.count > 1){
                for ( i = 0; i < newProduct.count; i++) {
                    allProducts.push(newProduct)
                } 
            }else{
                allProducts.push(newProduct)
            }
        }else{
        allProducts[phontomVAR] = newProduct
        mood = 'create' 
        createBtn.innerHTML = 'create'
        count.style.display = 'block'
        }
    }
    
    // save in localstorage
    localStorage.setItem('product', JSON.stringify(allProducts))
    clearInputs()
    showProducts()
}

// clear inputs
function clearInputs(){
    title.value =''
    price.value =''
    taxes.value =''
    ads.value =''
    discount.value =''
    total.innerHTML =''
    count.value =''
    category.value =''
}
// read

function showProducts(){
let table =''
for(let i = 0 ; i < allProducts.length ; i++){
    table += `
    <tr>
        <td>${i+1}</td>
        <td>${allProducts[i].title}</td>
        <td>${allProducts[i].price}</td>
        <td>${allProducts[i].taxes}</td>
        <td>${allProducts[i].ads}</td>
        <td>${allProducts[i].discount}</td>
        <td>${allProducts[i].total }</td>
        <td>${allProducts[i].category}</td>
        <td><button onclick ="updateItem(${i})">update</button></td>
        <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
    </tr>   `
}
document.getElementById('tbody').innerHTML = table
}

showProducts()

// delete one item
function deleteItem(i){
    allProducts.splice(i,1)
    localStorage.product = JSON.stringify(allProducts)
    showProducts()
}

// Delete all items
function clearAll(){
    localStorage.clear()
    allProducts.splice(0)
    showProducts()
}

// update
function updateItem(i){
    title.value = allProducts[i].title 
    price.value = allProducts[i].price
    taxes.value = allProducts[i].taxes 
    ads.value = allProducts[i].ads 
    discount.value = allProducts[i].discount
    getTotal()
    count.style.display = 'none'
    category.value = allProducts[i].category 
    createBtn.innerHTML= 'update'
    mood = 'update'
    phontomVAR = i
    scroll('smooth')

}

// search
let searchMood = 'title'
function getSearchMood(id){
    if(id == 'titleBtn'){
         searchMood = 'Title'

    }else{
        searchMood = 'Category'
    }
    search.focus()
    search.placeholder = 'Search By' + ' '+ searchMood
    search.style.display = 'block'
}
function searchArea(value)
{
    let table = ''
    if (searchMood == 'Title'){

        for(let i = 0; i < allProducts.length ; i++){
            if(allProducts[i].title.includes(value.toLowerCase())){
                table +=
                `
                <tr>
                    <td>${i+1}</td>
                    <td>${allProducts[i].title}</td>
                    <td>${allProducts[i].price}</td>
                    <td>${allProducts[i].taxes}</td>
                    <td>${allProducts[i].ads}</td>
                    <td>${allProducts[i].discount}</td>
                    <td>${allProducts[i].total }</td>
                    <td>${allProducts[i].category}</td>
                    <td><button onclick ="updateItem(${i})">update</button></td>
                    <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
                </tr>
                `
            }
            
        }



    }else{
        for(let i = 0; i < allProducts.length ; i++){
            if(allProducts[i].category.includes(value)){
                table +=
                `
                <tr>
                    <td>${i+1}</td>
                    <td>${allProducts[i].title}</td>
                    <td>${allProducts[i].price}</td>
                    <td>${allProducts[i].taxes}</td>
                    <td>${allProducts[i].ads}</td>
                    <td>${allProducts[i].discount}</td>
                    <td>${allProducts[i].total }</td>
                    <td>${allProducts[i].category}</td>
                    <td><button onclick ="updateItem(${i})">update</button></td>
                    <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
                </tr>
                `
            }
            
        }

    }
    document.getElementById('tbody').innerHTML = table
    search.value = ''
    showProducts()
}









// clean data
