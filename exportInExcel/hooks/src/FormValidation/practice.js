const arr= [[1,2],[3,4],[5,6],[7,8]];

const sum= arr.reduce((total,current)=>total.concat(current)).reduce((t,e)=>t+e)
console.log(sum)

const arr3=[12,3,43,3,3,3];
console.log(Math.max(...arr3))