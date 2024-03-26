console.log("Server file is running");

const add = function(a,b){
    return a+b;
}
const add2 = (a,b)=>{
    return a+b;
}

function greet(){
    console.log("Hello Sourav welcome again 23/03/2024");
}

function status(){
    console.log("Hello Sourav, operation is successfully completed");
}

// callback function --> jab tum ek kaam kr rahe ho tab woh kaam khatam hone k baad dusra kaam konsa kare woh callback hee
const multiplication = function(a,b,status){
    var result = a*b;
    console.log('result : ' + result);  // main function work completed
    status();                           // callback function called
}

// multiplication(2,7,status);
// let sum = add(5,4);
// let sum2 = add2(15,4);
// console.log(sum);
// console.log(sum2);

