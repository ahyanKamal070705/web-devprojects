

//  ITS BETTER TO WRITE INLINE JS BECAUSE BOHT ELEMENT FETHC KRNA PARH JAYEGA AND MANY FUNCTION WILL USE
const display = document.getElementById('display');

const eight = document.getElementById('8');

function addInDisplay(){
    display.value +=eight.value;
}

function removeOne(){
   let str = display.value;
   
    display.value =str.slice(0,str.length-1); 
}