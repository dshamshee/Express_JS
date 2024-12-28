arr = [1,2,3,4];

// foreach  loop
arr.forEach(element => {
   console.log(element+" Hello");
});


// map  function
let mapedArray = arr.map(function(element){
    return element + 2;
})
console.log(mapedArray)


// fileter function
let filteredArray = arr.filter(function(element){
    if(element > 2){
        return true;
    }else{
        return false;
    }
})
console.log(filteredArray)


// find function (It returns first Occurence of an element)
let findedArray = arr.find(function(element){
    if(element === 2){
        return element;
    }
})
console.log(findedArray)


// Indexof function (Returs the index of the first occurence of an element)
let index = arr.indexOf(2);
console.log(index);



let obj = {
    name: "Danish",
    age: 23
}

console.dir(obj)