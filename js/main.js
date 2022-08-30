var title = document.getElementById("title");
var price = document.getElementById('price');
var taxes = document.getElementById('taxes');
var ads = document.getElementById('ads');
var discount = document.getElementById('discount');
var total = document.getElementById('total');
var count = document.getElementById('count')
var category = document.getElementById('category')
var createBtn= document.getElementById('submit')
var tmp;
var mood ="create";

//get total (price + taxes + ads - discount = total )

function getTotal(){
    if(price.value != ''){
        var reset = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = reset;
        total.style.background='#040'
    }else{
        total.innerHTML=""
        total.style.background='#a00d02'
    }
}

// =====================================
// create product as opject 
var dataPro;

if(localStorage.getItem("crudProduct") == null){
    dataPro=[];
    
}else{
    // retrieve data from localstorage
    dataPro =JSON.parse(localStorage.getItem("crudProduct"));
    showDate()

}

createBtn.onclick=function(){
     var newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
        
     }

     if(title.value != "" 
     && price.value !="" 
     && category.value !="" 
     && newPro.count<100){
        if(mood ==='create'){
            if(newPro.count>1){
                for(i=0;i<newPro.count;i++){
                    dataPro.push(newPro);
                }
            }else{
        
                dataPro.push(newPro);
            }
    
        }else{
            dataPro[tmp]= newPro; 
            mood= 'create';
            createBtn.innerHTML='Create';
            count.style.display = 'block';
        }
        clearDataFormInputs()
     }
     
        


     // save data in localstorage
     setInLocalStorege()
     showDate()
     
}

//  count 




// ======================================

// clear data form inputs 
function clearDataFormInputs(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value = "";
}

// display data in table (Read) 
function showDate(){
    getTotal()
    var table = '';
    for(i=0;i<dataPro.length;i++){
        table +=
        `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price} </td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button  onclick="updataData(${i})">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete"> delete </button></td>
        </tr>
        
        ` 
    }

    document.getElementById("tbody").innerHTML=table;

    //delete all    
   
        var btnDelete = document.getElementById('deleteAll');
        if(dataPro.length>0){
            btnDelete.innerHTML=`<button class="" onclick="deleteAllData()" id="deleteAll"> Delete All ( ${dataPro.length} )</button>`
        
        }else{
            btnDelete.innerHTML="";
        }
        
    
}
showDate()


function deleteAllData(){
    localStorage.clear()
    dataPro.splice(0)
    showDate()
    
}

// delete 
function deleteData(index){
    dataPro.splice(index,1)
    showDate()
    setInLocalStorege()
    
}

// setItem in  localStorage
setInLocalStorege = function(){
    localStorage.setItem("crudProduct", JSON.stringify(dataPro));
}


//update 
updataData= function(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display='none';
    category.value = dataPro[i].category;
    createBtn.innerHTML='Update'
    mood='update';
    tmp = i ;
    scroll({
        top:0,
        behavior:'smooth'
    })
    
}
// search
var searchMood='title';
function getSearchMood(id){
    var search =document.getElementById('search')
    if(id == "SearchTitle"){
        searchMood ="title"
        
    }else{
        searchMood = "category"
        
    }
    search.placeholder = "search by "+ searchMood;
    search.focus()

    search.value="";
    showDate()
}

function searchData(value){
    var table="";
    for(i=0;i<dataPro.length;i++){
        if(searchMood == 'title'){
                if(dataPro[i].title.includes(value.toLowerCase())){
                    table +=
                    `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price} </td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button  onclick="updataData(${i})">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete"> delete </button></td>
                    </tr>
                    
                    ` 
    
                }
            
        }else{
    
                if(dataPro[i].category.includes(value.toLowerCase())){
                    table +=
                    `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price} </td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button  onclick="updataData(${i})">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete"> delete </button></td>
                    </tr>
                    
                    ` 
       
    
        
    
                }
           
        }
        document.getElementById("tbody").innerHTML=table;

    }
}

// clean data
 
// ============================================

