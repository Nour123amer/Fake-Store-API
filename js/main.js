let dataContainer = document.querySelector('.dataContainer');
let searchInput = document.querySelector('.searchInput');
let searchBtn = document.querySelector('.searchBtn');
let updateBtn = document.querySelector('.updateBtn');

let cartData =[];
let content ="";

getProducts();

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

let jewelData=[];
async function getJewelery() {
    let response = await fetch('https://fakestoreapi.com/products/category/jewelery');
    let data = await response.json();
    console.log(data);
    jewelData = data;
    console.log(jewelData);
    displayJelewery();
}
 

function searchJewelry(){
  content="";
let term = searchInput.value.toLowerCase();
for(let i=0; i< jewelData.length ;i++){
  if(jewelData[i].title.toLowerCase().includes(term)){
      content +=`
      <div class="col-md-4">
        <div class="card" style="width: 18rem;">
            <img src=${jewelData[i].image} class="card-img-top imgHeight" alt=${jewelData[i].title}>
            <div class="card-body">
              <h5 class="card-title">${jewelData[i].title}</h5>
              <p class="card-text">${jewelData[i].description}</p>
              <p class="card-text">${jewelData[i].category}</p>
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
    // console.log(userData);
    displayUserData( );
}

function searchUsers(){
  content="";
let term = searchInput.value.toLowerCase();
for(let i=0; i<userData.length ;i++){
  if(userData[i].name.firstname.toLowerCase().includes(term)){
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
}
dataContainer.innerHTML = content;
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
      let words = productData[i].description.split(" ");
     let result =(words.length>25)?
        words.slice(0,25).join(" ") + '...': productData[i].description;
      
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





function displayJelewery( ){
    content="";
    for(let i=0 ;i<jewelData.length;i++){
      let words = jewelData[i].description.split(" ");
      let result =(words.length>25)?
         words.slice(0,25).join(" ") + '...': jewelData[i].description;
        content +=`
              <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                    <img src=${jewelData[i].image} class="card-img-top imgHeight" alt=${jewelData[i].title}>
                    <div class="card-body">
                      <h5 class="card-title">${jewelData[i].title}</h5>
                      <p class="card-text">${result}</p>
                      <p class="card-text">${jewelData[i].category}</p>
                      <button  class="btn btn-danger updateBtn">Update</button>
                      <button onclick="removeProduct(${jewelData[i].id})" class="btn btn-primary">Delete</button>
                     
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
  description: 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine',
  image: 'https://www.brilliantearth.com/_next/image/?url=https%3A%2F%2Fimage.brilliantearth.com%2Fcdn-cgi%2Fimage%2Fwidth%3D735%2Cheight%3D556%2Cquality%3D100%2Cformat%3Dauto%2Fhttps%3A%2F%2Fcdn.builder.io%2Fapi%2Fv1%2Fimage%2Fassets%252F9f2a69003c86470ea05deb9ecb9887be%252F9b7f2ccdd4a64cc88605c4eb8b9507fb&w=1920&q=75&dpl=15a157e81c84e8df74b37299ef740788efce5738',
  category: 'jewelry'
};

async function removeProduct(id) {
  let response = await fetch(`https://fakestoreapi.com/products/${id}`,{
    method:"DELETE"
  });
  let data = await response.json();
  console.log(data);
  let index = productData.findIndex((product) => product.id === id);
  productData.splice(index,1);
  console.log(data);
  displayData();

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
  let index = productData.findIndex((product) => product.id === id);
  data2 = data;
  productData.splice(index,1);
  productData.push(updatedData);
  productData[index]=data2;
  displayData();
  console.log(data2);

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

searchBtn.addEventListener('click',()=>{
  console.log(searchInput.value);
  searchProduct();
  searchJewelry();
  searchUsers();
  searchInput.value="";
  })


// getProducts();
// addProduct();


// async function addProductToCart(){
//   let response = await fetch('https://fakestoreapi.com/carts',{
//     method:'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body:JSON.stringify({
//       userId:5,
//       date:'2020-02-03',
//       products:[{productId:5,quantity:1},{productId:1,quantity:5}]
//     })
//   });
//  let data = response.json();
//  cartData.push(data);
//  console.log(cartData);
 

// }
// addProductToCart();

// function displayCartData(){
//   content='';
//   for(let i=0;i<cartData.length;i++){
//   content +=`
//    <div class="product">
//             <img src=${productData[i].image} alt="">
//             <div class="text">
//                 <p class="title">${productData[i].title}</p>
//                 <p class="price">${productData[i].price}</p>
//                 <div class="remove d-flex">
//                     <i class="fa-solid fa-trash-can"></i>
//                     <span>Remove</span>
//                 </div>
//             </div>
//         </div>
//   `
//   }
//   console.log(content);
  
// }
