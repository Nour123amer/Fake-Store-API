let dataContainer = document.querySelector('.dataContainer');
let searchInput = document.querySelector('.searchInput');
let searchBtn = document.querySelector('.searchBtn');
let updateBtn = document.querySelector('.updateBtn');


let content ="";

searchBtn.addEventListener('click',()=>{
console.log(searchInput.value);
searchProduct();
})




let productData =[];

async function getProducts() {
    let response = await fetch('https://fakestoreapi.com/products');
    let data = await response.json();
    console.log(data);
    productData = data;
    console.log(productData);
    displayData();

}

function searchProduct(){
    content="";
  let term = searchInput.value.toLowerCase();
  for(let i=0; i<productData.length ;i++){
    if(productData[i].title.toLowerCase().includes(term)){
        content +=`
        <div class="col-md-4">
          <div class="card" style="width: 18rem;">
              <img src=${productData[i].image} class="card-img-top imgHeight" alt=${productData[i].title}>
              <div class="card-body">
                <h5 class="card-title">${productData[i].title}</h5>
                <p class="card-text">${productData[i].description}</p>
                <p class="card-text">${productData[i].category}</p>
              </div>
            </div>
      </div>
      `
    }
  }
  dataContainer.innerHTML = content;
}

let userData=[];
async function getUsers() {
    let response = await fetch('https://fakestoreapi.com/users');
    let data = await response.json();
    console.log(data);
    userData = data;
    console.log(userData);
    displayUserData( );
}

async function addProduct() {
    let response = await fetch('https://fakestoreapi.com/products',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        })
    })
    let newProduct = await response.json();
    productData.push(newProduct);
    displayData()
}



function displayData( ){
    content="";
    for(let i=0 ;i<productData.length;i++){
     let result =(productData[i].description.length>25)?
        productData[i].description.slice(0,25) + '...': productData[i].description;
      
        content +=`
              <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                    <img src=${productData[i].image} class="card-img-top imgHeight" alt=${productData[i].title}>
                    <div class="card-body">
                      <h5 class="card-title">${productData[i].title}</h5>
                      <p class="card-text paragraph">${result}</p>
                      <p class="card-text">${productData[i].category}</p>
                      <button onclick="updateProduct(${productData[i].id})" class="btn btn-danger updateBtn">Update</button>
                      <button onclick="removeProduct(${productData[i].id})" class="btn btn-primary">Delete</button>
                    </div>
                  </div>
            </div>
        `
    }
    dataContainer.innerHTML = content;

}



let jewelData=[];
async function getJewelery() {
    let response = await fetch('https://fakestoreapi.com/products/category/jewelery');
    let data = await response.json();
    console.log(data);
    jewelData = data;
    console.log(jewelData);
    displayJelewery();
}

function displayJelewery( ){
    content="";
    for(let i=0 ;i<jewelData.length;i++){
        content +=`
              <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                    <img src=${jewelData[i].image} class="card-img-top imgHeight" alt=${jewelData[i].title}>
                    <div class="card-body">
                      <h5 class="card-title">${jewelData[i].title}</h5>
                      <p class="card-text">${jewelData[i].description}</p>
                      <p class="card-text">${jewelData[i].category}</p>
                      <button  class="btn btn-danger updateBtn">Update</button>
                    </div>
                  </div>
            </div>
        `
    }
    dataContainer.innerHTML = content;

}

let data2 =[];

let updatedData= {
  title: 'update product',
  price: 13.5,
  description: 'lorem ipsum set',
  image: 'https://i.pravatar.cc',
  category: 'electronic'
};

async function removeProduct(id) {
  let response = await fetch(`https://fakestoreapi.com/products/${id}`,{
    method:"DELETE"
  });
  let data = await response.json();
  console.log(data);
  
  productData.splice(data,1);
  console.log(data);
  displayData()
  

}

async function updateProduct(id){
  let response =await fetch(`https://fakestoreapi.com/products/${id}`,{
    method:'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(
     updatedData
    )
  });
  let data = await response.json();
  data2 = data;
  productData.splice(data2,1);
  console.log(data2);
  addProduct();
  

}



function displayUserData( ){
    let content ="";
    for(let i=0 ;i<userData.length;i++){
        content +=`
              <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                      <h4 class="card-title">${userData[i].name.firstname} ${userData[i].name.lastname} </h4>
                      <h5 class="card-title">${userData[i].email}</h5>
                      <p class="card-text">${userData[i].username}</p>
                      <p class="card-text">${userData[i].password}</p>
                      <p class="card-text">${userData[i].phone}</p>
                    </div>
                  </div>
            </div>
        `
    }
    dataContainer.innerHTML = content;
}


getProducts();
addProduct();




