'use strict';
// const imported = require("./inventory.js");
// const objects = Object(imported.inventory);

//Innan importen fungerade som det skulle körde jag såhär
var objects = {
Sallad: {price: 10, foundation: true, vegan: true}, 
  Pasta: {price: 10, foundation: true, gluten: true},
  'Salad + Pasta': {price: 10, foundation: true, gluten: true},
  'Salad + Matvete': {price: 10, foundation: true, gluten: true},
  'Salad + Glasnudlar': {price: 10, foundation: true, gluten: true},
  'Salad + Quinoa': {price: 10, foundation: true, gluten: true},

  'KycklingfilÃ©': {price: 10, protein: true},
  'RÃ¶kt kalkonfilÃ©': {price: 10, protein: true},
  'Norsk fjordlax': {price: 30, protein: true},
  'Handskalade rÃ¤kor frÃ¥n SmÃ¶gen': {price: 40, protein: true},
  'Pulled beef frÃ¥n Sverige': {price: 15, protein: true},
  'Marinerad bÃ¶nmix': {price: 10, protein: true},

  Avocado: {price: 10, extra: true},
  'BÃ¶ngroddar': {price: 5, extra: true},
  'CashewnÃ¶tter': {price: 5, extra: true},
  'ChÃ¨vreost': {price: 15, extra: true},
  Fetaost: {price: 5, extra: true},
  'FÃ¤rsk koriander': {price: 10, extra: true},
  Gurka: {price: 5, extra: true},
  'Inlagd lÃ¶k': {price: 5, extra: true},
  Jalapeno: {price: 5, extra: true},
  'Krossade jordnÃ¶tter': {price: 5, extra: true},
  Krutonger: {price: 5, extra: true},
  Lime: {price: 5, extra: true},
  Majs: {price: 5, extra: true},
  Oliver: {price: 5, extra: true},
  Paprika: {price: 5, extra: true},
  Parmesan: {price: 5, extra: true},
  'Rivna morÃ¶tter': {price: 5, extra: true},
  'Rostade sesamfrÃ¶n': {price: 5, extra: true},
  Ruccola: {price: 5, extra: true},
  'RÃ¶dlÃ¶k': {price: 5, extra: true},
  'SojabÃ¶nor': {price: 5, extra: true},
  'Soltorkad tomat': {price: 5, extra: true},
  Tomat: {price: 5, extra: true},
  'ValnÃ¶tter': {price: 5, extra: true},
  'Ã„gg': {price: 5, extra: true},

  Ceasardressing: {price: 5, dressing: true},
  Dillmayo: {price: 5, dressing: true},
  Honungsdijon: {price: 5, dressing: true},
  Kimchimayo: {price: 5, dressing: true},
  Pesto: {price: 5, dressing: true},
  Rhodeisland: {price: 5, dressing: true},
  'Rostad aioli': {price: 5, dressing: true},
  'SoyavinÃ¤grett': {price: 5, dressing: true},
  'Ã–rtvinÃ¤grett': {price: 5, dressing: true}
} 

/* function findFoundations() {
    var txt = "";
    txt += "Foundations: ";
    var temp = object.find(obj => {
        return obj.foundation === true;
    })              
    for(var i = 0; i < temp.length; i++) {
        txt += temp[i] + ", "
    }           
    return txt;                 
}  */

//nedanstående metoder hade kunnat refaktoriseras
function findFoundations() {
    var txt = "";
    txt += "Foundations: "
    var newArray = Object.keys(objects).filter(key => objects[key].foundation);
    newArray.forEach(itemWithFoundation => txt += (itemWithFoundation + ", "));
    return txt;
}


function findProtein() {
    var txt = "";
    txt += "Protein: "
    var newArray = Object.keys(objects).filter(key => objects[key].protein);
    newArray.forEach(itemWithProtein => txt += (itemWithProtein + ", "));
    return txt;
}

function findExtras() {
    var txt = "";
    txt += "Extra: "
    var newArray = Object.keys(objects).filter(key => objects[key].extra);
    newArray.forEach(itemWithExtra => txt += (itemWithExtra + ", "));
    return txt;
}

function findDressing() {
    var txt = "";
    txt += "Dressing: "
    var newArray = Object.keys(objects).filter(key => objects[key].dressing);
    newArray.forEach(itemWithDressing => txt += (itemWithDressing + ", "));
    return txt;
}

function findAll() {
    var txt = "";
    txt += findFoundations() + "\n" + findProtein() + "\n" + findExtras() + "\n" + findDressing();
    return txt;
}



//Salad och GourmetSalad hade kunnat refaktoriseras, ha en generell "add(propertyType, typeName)" och motsvarande för remove
//hade varit snyggare
class Salad {
    constructor(foundation, protein, extras, dressing) {
        var foundation;
        var protein;
        var extras;
        var dressing;
    }
    addFoundation(foundationType){
        //this.foundation = foundationType;
        if(objects.hasOwnProperty(foundationType)) {
            this.foundation = foundationType;
        } else {
            console.log("No such element in inventory.");
        }
    }
    removeFoundation() {
        this.foundation = undefined;
    }
    addProtein(proteinType) {
        if(objects.hasOwnProperty(proteinType)) {
            this.protein = proteinType;
        } else {
            console.log("No such element in inventory.");
        }
    }
    removeProtein(input) {
        this.protein = undefined;
    }
    addExtras(extraType) {
        if(objects.hasOwnProperty(extraType)) {
            this.extras = extraType;
        } else {
            console.log("No such element in inventory.");
        }
    }
    removeExtras() {
        this.extras = undefined;
    }
    addDressing(dressingType) {
        if(objects.hasOwnProperty(dressingType)) {
            this.dressing = dressingType;
        } else {
            console.log("No such element in inventory.");
        }
    }
    removeDressing() {
        this.dressing = undefined;
    }
    /* findPriceForItem(item) {
        var txt = "";
        txt += objects[item].price;
        return txt;
    } */
    getPrice() { //kontrollerar så property "x" finns och inte är borttagen
        var totalPrice = 0;     
        if(this.foundation){ 
            totalPrice += parseFloat(findPriceForItem(this.foundation));
        }
        if(this.protein){
            totalPrice += parseFloat(findPriceForItem(this.protein));
        }
        if(this.extras){
            totalPrice += parseFloat(findPriceForItem(this.extras));
        }
        if(this.dressing){
            totalPrice += parseFloat(findPriceForItem(this.dressing));
        }
        return totalPrice;
    } 
}

class ExtraGreenSalad extends Salad {  
    getPrice() {
        var totalPrice = 0;
        if(this.foundation){
            totalPrice += parseFloat(findPriceForItem(this.foundation) * 1.3);
        }
        if(this.protein){
            totalPrice += parseFloat(findPriceForItem(this.protein) * 0.5);
        }
        if(this.extras){
            totalPrice += parseFloat(findPriceForItem(this.extras) * 0.5);
        }
        if(this.dressing){
            totalPrice += parseFloat(findPriceForItem(this.dressing) * 0.5);
        }
        return totalPrice;
    }

    //Osäker på hur jag skulle tolka uppgiften, kanske nedanstående som söks
    /* 
     getPriceAlternative() {
        var totalPrice = 0;
        if(this.foundation){
            totalPrice += parseFloat(findPriceForItem(this.foundation));
        }
        if(this.protein){
            totalPrice += parseFloat(findPriceForItem(this.protein));
        }
        if(this.extras){
            totalPrice += parseFloat(findPriceForItem(this.extras) * 0.5);
        }
        if(this.dressing){
            totalPrice += parseFloat(findPriceForItem(this.dressing));
        }
    } */
}

class GourmetSalad {
    constructor(foundation, protein, extras, dressing) {
        var foundation;
        var protein;
        var extras;
        var dressing;
        var foundationSize;
        var proteinSize;
        var extrasSize;
        var dressingSize;
    }

    addFoundation(foundationType, size){
        if(objects.hasOwnProperty(foundationType)) {
            this.foundation = foundationType;
            this.foundationSize = size;
        } else {
            console.log("No such element in inventory.");
        }
    }

    removeFoundation() {
        this.foundation = undefined;
    }

    addProtein(proteinType, size) {
        if(objects.hasOwnProperty(proteinType)) {
            this.protein = proteinType;
            this.proteinSize = size;
        } else {
            console.log("No such element in inventory.");
        }
    }

    removeProtein(input) {
        this.protein = undefined;
    }

    addExtras(extraType, size) {
        if(objects.hasOwnProperty(extraType)) {
            this.extras = extraType;
            this.extrasSize = size;
        } else {
            console.log("No such element in inventory.");
        }
    }

    removeExtras() {
        this.extras = undefined;
    }

    addDressing(dressingType, size) {
        if(objects.hasOwnProperty(dressingType)) {
            this.dressing = dressingType;
            this.dressingSize = size;
        } else {
            console.log("No such element in inventory.");
        }
    }

    removeDressing() {
        this.dressing = undefined;
    }

    /* findPriceForItem(item) {
        var txt = "";
        txt += objects[item].price;
        return txt;
    } */

    
    getPrice() {
        if(this.foundationSize == 1.3 && this.extrasSize == 0.5) {
            var totalPrice = 0;
            if(this.foundation){
                totalPrice += parseFloat(findPriceForItem(this.foundation) * 1.3);
            }
            if(this.protein){
                totalPrice += parseFloat(findPriceForItem(this.protein) * 0.5);
            }
            if(this.extras){
                totalPrice += parseFloat(findPriceForItem(this.extras) * 0.5);
            }
            if(this.dressing){
                totalPrice += parseFloat(findPriceForItem(this.dressing) * 0.5);
            }

            /* if(this.foundation){
                totalPrice += parseFloat(findPriceForItem(this.foundation));
            }
            if(this.protein){
                totalPrice += parseFloat(findPriceForItem(this.protein));
            }
            if(this.extras){
                totalPrice += parseFloat(findPriceForItem(this.extras) * 0.5);
            }
            if(this.dressing){
                totalPrice += parseFloat(findPriceForItem(this.dressing));
            } */         
        } else {
            var totalPrice = 0;
            if(this.foundation){
                totalPrice += parseFloat(findPriceForItem(this.foundation) * this.foundationSize);
            }
            if(this.protein){
                totalPrice += parseFloat(findPriceForItem(this.protein) * this.proteinSize);
            }
            if(this.extras){
                totalPrice += parseFloat(findPriceForItem(this.extras) * this.extrasSize);
            }
            if(this.dressing){
                totalPrice += parseFloat(findPriceForItem(this.dressing) * this.dressingSize);
            }
           
        }
        return totalPrice;
    } 
}

//fungerar endast om utanför klassen, förstår ej varför
function findPriceForItem(item) {
	var txt = "";
    txt += objects[item].price;
    return txt;
} 





//----------------DEKLARATIONER OCH UTSKRIFTER---------------

var ingredients = findAll();
console.log("ALLA INGREDIENTER UPPRADADE")
console.log(ingredients);


console.log("\n"+ "\n" + "MYCESARSALAD, VISAR OBJEKTET SAMT PRIS")
let myCesarSalad = new Salad("myCesarSalad");
myCesarSalad.addFoundation('Sallad');
myCesarSalad.addProtein('KycklingfilÃ©')
myCesarSalad.addExtras('Fetaost');
myCesarSalad.addDressing('Ceasardressing');
console.log(myCesarSalad.getPrice());

console.log(myCesarSalad);
myCesarSalad.addFoundation('Pasta');    //Förutsatte att ett salladsobjekt bara kan ha en av varje property,
                                        //låter därmed en sån här "uppdatering" köras. Hade kunnat felhanteras.

console.log("\n"+ "\n" + "CESARSALAD UPDATERAD MED PASTA SOM FOUNDATION")
console.log(myCesarSalad);


console.log("\n"+ "\n" + "CESARSALAD DÄR DRESSING TAGITS BORT")
myCesarSalad.removeDressing();       
console.log(myCesarSalad);
console.log(myCesarSalad.getPrice()); 


console.log("\n"+ "\n" + "LÄGGER TILL ITEM SOM INTE FINNS")
myCesarSalad.addExtras('Diamant');


console.log("\n"+ "\n" + "EXTRAGREEN CESARSALAD")
let myGreenCesarSalad = new ExtraGreenSalad("myGreenCesarSalad");
myGreenCesarSalad.addFoundation('Sallad');
myGreenCesarSalad.addProtein('KycklingfilÃ©');
myGreenCesarSalad.addExtras('Fetaost');
myGreenCesarSalad.addDressing('Ceasardressing');
console.log(myGreenCesarSalad.getPrice());


console.log("\n"+ "\n" + "CESARGOURMETSALLAD MED SIZE 1,5 PÅ ALLT")
let myGourmetCesarSalad = new GourmetSalad("myGourmetCesarSalad");
myGourmetCesarSalad.addFoundation('Sallad', 1.5);
myGourmetCesarSalad.addProtein('KycklingfilÃ©', 1.5);
myGourmetCesarSalad.addExtras('Fetaost', 1.5);
myGourmetCesarSalad.addDressing('Ceasardressing', 1.5);
console.log(myGourmetCesarSalad.getPrice());

console.log("\n"+ "\n" + "CESARGOURMETSALLAD, EXTRAGREEN-RABATT")
let myGreenGourmetCesarSalad = new GourmetSalad("myGreenGourmetCesarSalad");
myGreenGourmetCesarSalad.addFoundation('Sallad', 1.3);
myGreenGourmetCesarSalad.addProtein('KycklingfilÃ©', 1.5);
myGreenGourmetCesarSalad.addExtras('Fetaost', 0.5);
myGreenGourmetCesarSalad.addDressing('Ceasardressing', 1.5);
console.log(myGreenGourmetCesarSalad.getPrice());