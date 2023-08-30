document.addEventListener("DOMContentLoaded",()=>{
    getMenu();
});


//get the data
function main(){
 fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
 .then(response=>response.json())
 .then(data=>takeOrder(data))
//  .then(order=>{
//         return order;
//  })
 .then(()=>{
   return orderPrep();
 })
 .then((status)=>{
     if(status.order_status===true){
        return payOrder();
     }
     else{
        throw new Error("Problem in taking the order");
    }
 })
 .then((status)=>{
    if(status.paid===true){
        thankYou();
    }
    else{
        throw new Error("payment is declined");
    }
 }).catch((error)=>console.log(error));
 
}

function getMenu(){
const food_flex = document.getElementById("food_flex");
fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
.then(response => response.json())
.then((data)=>{
    data.forEach(item =>{
         let foodItem = document.createElement("div");
         foodItem.innerHTML = 

         `<img src = "${item.imgSrc}" alt = "${item.name}">
         <h5>${item.name}</h5>
         <h6>${item.price} $</h6>`;

         foodItem.className = "food";
         foodItem.addEventListener("click",main);
         console.log(foodItem);
         food_flex.appendChild(foodItem);

       
    })
})
}

function takeOrder(data){
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
        const order = getRandomFood(data);
        resolve(order);
    }, 3000);
  })
}


function getRandomFood(data){
  const order = [];
  for(let i = 0; i<3; i++){
    let ri = Math.floor(Math.random()* data.length);
    order.push(data[ri]);
  }
  return order;
}



function  orderPrep(data){
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve({order_status:true,paid:false});
    }, 1500);
  })
}



function payOrder(){
   return new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve({order_status:true,paid:true});
    }, 1000);
  })
}


function thankYou(){
 alert("thank you for eating with us")
}







