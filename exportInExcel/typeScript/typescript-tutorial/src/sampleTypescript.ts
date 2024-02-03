// let greeting: string = "Hello world";
// greeting.toLowerCase();

// // number

// let userId: number = 22333;


// // boolean

// let isLoggedIn: boolean = false;

// // any

// let hero: unknown;  // we can use unknown brather than any
// // let hero 
// function getHero() {
//     return "hello"
// }

// hero = getHero();  // assign "any" if there is nothing 

// // function



// function add(num: number) {
//     return num + 1;
// }

// console.log(add(2))


// function upper(num: string) {
//     return num.toUpperCase();
// }

// console.log(upper("abc"))

// // default value in fucntion

// const signInUser = (name: string, email: string, isPaid: boolean = false) => {

// }

// signInUser("s", "s@s.com")  //ispaid is default




// // return in function


// // it will strictly return a number 
// function addNum(num1: number, num2: number): number {
//     return num1 + num2
// }
// addNum(2, 3);
// // in arrow function

// const getHello = (s: string): string => {
//     return ""
// }


// // fucntion will not return anything

// const consoleError = (errorMessage: string): void => {
//     console.log(errorMessage)
// }

// const throwError = (error: string): never => {
//     throw new Error("")
// }
// // never type represents values which are never observed In a return type, this means that the function throws an exception or terminate execution of the program


// // objects

// // function returns a object

// function createUser(): { name: string, email: string } {
//     return {
//         name: "samdesh",
//         email: "s@sgmail.com"
//     }
// }



// function create({ name: string, isPaid: boolean }) {
//     // console.log()
// }

// // create({name:"hitesh",isPaid:true,email:"email"}) // this is creating problem becuase we hvae dcalred only two name and ispaid in create fucntion arguemnts but we are passing email too

// // how can i do it

// let newUser = {
//     name: "sandehs",
//     isPaid: true,
//     email: "s@s.com"
// }
// create(newUser) // in this way it would not give me error



// // type


// type User = {
//     name: string,
//     email: string,
//     isActive: boolean
// }



// function user(user: User): User {
//     return { name: "", email: "", isActive: true }
// }

// user({ name: "", email: "", isActive: true });


// // 

// type User2 = {
//     readonly _id: string // no one can chnage it 
//     name: string,
//     email: string,
//     isActive: boolean,
//     creditCard?: number  // creditcard is optional we dont have to pass it necessarily
// }




// const myUser: User = {
//     _id: "1234",
//     name: "snadesh",
//     email: "s@s.com",
//     isActive: true
// }

// myUser.name = "singhal";
// // myUser._id="ds" // this will give error because _id is optional

// // more than one type



// type cardNumber = {
//     cardnumber: string
// }

// type cardDate = {
//     cardDate: string
// }

// type cardDetails = cardDate & cardNumber & {
//     cvv: number
// }

// // arrays

// const superHeroes: string[] = [];
// // const heroPower :number[] =[];
// // another method
// const heroPower: Array<number> = [];



// superHeroes.push("spiderman")


// // array for objects

// type User = {
//     name: string,
//     isActive: boolean
// }

// const allUsers: User[] = [];




// // union

// type user = {
//     name: string,
//     id: number
// }

// type Admin = {
//     username: string,
//     id: number
// }

// let sandesh: user | Admin = {
//     name: "sandesh",
//     id: 223
// }

// sandesh = {
//     username: "singhal",
//     id: 233
// }

// // let name:string|number="sandesh";





// function getDbid(id: number | string) {
//     if (typeof id === "string") {  // not completely string or not completely number thats why we ahve to check type

//         id.toLowerCase()
//     }
// }

// getDbid(3);
// getDbid("3")

// const data: number[] = [1, 2, 3, 4]
// const data1: string[] | number[] = [1, 2, 3, 4] // ["1","2","3"]  either string array or number arrya not mix of both
// const data3: (string | number)[] = [1, "2", 3];  // mix of both in array



// // if the variable can expect only 3 values

// let seatAllotment:"aisle"|"window"|"middle";

// seatAllotment="aisle"  // okay
// // seatAllotment="crew" // not allowed only 3 values

// // tuple

// // array with elements are in order with data typr

// let rgb:[number,number,number]=[255,234,222];
// // now 0 1 2 index should nbe number not anything should in order ot type declaration


// type User1=[number,string];

// const newUser1:User1=[112,"sandesh"]

// newUser[1]="singhal";

// // newUser.push(true) // this would work in tuple 



// enums


// enum  SeatChoices{
//     AISLE,
//     MIDDLE,
//     WINDOW,
//     FOURTH
// }

// const seat= SeatChoices.AISLE;





// interfaces






// interface user {
//     readonly dbId: number,
//     id: number,
//     email: string,
//     googleId?: string,
//     // startTrail():string // function
//     startTrail: () => string // function
// }

// const sandesh: user = {
//     dbId: 1212,
//     email: "sandesh",
//     id: 2,
//     startTrail: () => {
//         return "sandesh"
//     }
// }


// // i want to add somehting in user

// interface user{
//   githubLogin:string
// }
// // but type cannot be changes after it declared



// // inheritance in interfaces

// interface Admin extends user{
//     role:string
// }

// // in type we use & 





// // classes in typescript

// class User{
//     // private _courseCount=1;
//     protected _courseCount=1;   // inherited class can use this
//     email:string
//     name:string
//     city:string=""
//     constructor(email:string,name:string){
//       this.email=email;
//       this.name=name;
//     }

//     get getEmail():string{
//         return this.email
//     }
//     set courseCountSet(courseNum:number){
//         if(courseNum<=1){
//             throw new Error("this is less than 1")
//         }
//         this._courseCount=courseNum
//     }

//     private deleteToken(){
//         console.log("token")
//     }
// }

// class Subuser extends User{
//        changeCourseCount(){
//         this._courseCount=3;
//        }
// }

// const obj = new User("sandesh","s@s.com")



// interface TakePhoto{
//     cameraMode:string,
//     filter:string,
//     burst:number
// }

// interface Story{
//     createStory():void
// }

// class Instagram implements TakePhoto{
//      constructor(
//           public cameraMode:string,
//           public filter:string,
//           public burst:number
//      ){}
// }


//abstract class
// we cannot make pbject of abstract class


// class TakePhoto{

// }




// generics

// const score: Array<number> = [];
// const name: Array<string> = [];


// function identityOne(val: boolean | number): boolean | number {
//     return val;
// }

// /// it means like take input of any type and return of any type
// // take input as string and return number as output

// function identityTwo(val: any): any {
//     return val;
// }

// // in this type is locked
// // function identityThree<3>(val: 3): 3

// function identityThree<Type>(val: Type): Type {
//     return val;
// }

// identityThree(3)

// // shortcut 
// function identityFour<T>(val:T):T{
//     return val;
// }


// // custom interface

// interface Bottle{
//     brand:string,
//     type:number
// }

// identityFour<Bottle>({})


// // generic in array


// function getSearchProducts<T>(products:T[]): T{
//    return products[2]
// }



// // arrow func

// const getMoreSearch=<T>(products:T[]):T=>{
//        return products[4]   
// }


// // in react
// // use comma
// const getMoreSearch=<T,>(products:T[]):T=>{
//        return products[4]   
// }


// function another<T,U extends number>(valone:T,valtwo:U):object{
//     return {
//         valone,
//         valtwo
//     }
// }

// another(3,4.5)



// // narrrowing


interface Admin{
    name:string,
    email:string,
    isAdmin:boolean
}

interface user{
    name:string,
    email:string
}

function isAdmin(account:user|Admin){
   if("isAdmin" in account){
    return isAdmin
   }
}


// instance of


function logValue(x:Date|string){
   if(x instanceof Date){
     console.log(x.toUTCString())
   }
}

export { }