var productName=document.getElementById("ProductName");
var productPrice=document.getElementById("ProductPrice");
var productCategory=document.getElementById("ProductCategory");
var productSale=document.getElementById("ProductSale");
var ProductDescription=document.getElementById("ProductDescription");
var submit=document.getElementById("Submit");
var deleteButton=document.getElementsByClassName("deleteButton")
var searchInput=document.getElementById("search");
var Clear=document.getElementById("Clear");
var edit=document.querySelector("#Update")
var submit=document.querySelector("#Submit")
var productList=[];
var currentIndex=-1
if(localStorage.getItem("ProductList")!=null){
        productList=JSON.parse(localStorage.getItem("ProductList"))
        Display()
    
}
submit.addEventListener("click",addProduct)
function addProduct(){
    var product={
        name:productName.value,
        price:productPrice.value,
        productCategory:productCategory.value,
        productSale:productSale.checked,
        ProductDescription:ProductDescription.value
    }
    productList.push(product);
    localStorage.setItem("ProductList",JSON.stringify(productList))
    Display()
    clear()
}
function Display(){
    temp=" ";
    for(let i=0;i<productList.length;i++){
        temp+=`<tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].productCategory}</td>
        <td>${productList[i].productSale}</td>
        <td>${productList[i].ProductDescription}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="deleteButton btn btn-danger">Delete</button></td>
       </tr>`
    }
    document.getElementById("tBody").innerHTML=temp;
}
// for(let i=0;i<productList.length;i++){
//     deleteButton[i].addEventListener("click",function(){
//         console.log(i);
//         deleteProduct(i);
//     })
// }
function deleteProduct(i){
productList.splice(i,1);
localStorage.setItem("ProductList",JSON.stringify(productList))
Display()
}
function search(){
    temp=" ";
    for(let i=0;i<productList.length;i++){
        if(productList[i].name.toLowerCase().includes(searchInput.value)||productList[i].productCategory.toLowerCase().includes(searchInput.value)){
            temp+=`<tr>
            <td>${i}</td>
            <td>${productList[i].name.toLowerCase().replace(searchInput.value,'<span class="bg-info">'+searchInput.value+'</span>')}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].productCategory.toLowerCase().replace(searchInput.value,'<span class="bg-info">'+searchInput.value+'</span>')}</td>
            <td>${productList[i].productSale}</td>
            <td><button class="btn btn-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="deleteButton btn btn-danger">Delete</button></td>
           </tr>`
        }
        
    }
    document.getElementById("tBody").innerHTML=temp;
}
Clear.addEventListener("click",clear)
function clear(){
    submit.classList.remove("d-none")
    edit.classList.add("d-none")
    productName.value="";
    productPrice.value="";
    ProductDescription.value=""
    productCategory.value="Category";
    productSale.checked=false;

}
function addEdit(){
    productList[currentIndex].name=productName.value;
    productList[currentIndex].price=productPrice.value;
    productList[currentIndex].productCategory=productCategory.value;
    productList[currentIndex].productSale=productSale.checked;
    productList[currentIndex].ProductDescription=ProductDescription.value;
    localStorage.setItem("ProductList",JSON.stringify(productList))
    Display()
    submit.classList.remove("d-none")
    edit.classList.add("d-none")
    clear()
}
function updateProduct(i){
    edit.classList.remove("d-none")
    submit.classList.add("d-none")
    currentIndex=i;
productName.value=productList[i].name;
productPrice.value=productList[i].price;
productCategory.value=productList[i].productCategory;
productSale.checked=productList[i].productSale;
ProductDescription.value=productList[i].ProductDescription;
}