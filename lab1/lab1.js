'use strict'
const imported = require('./inventory.js')

//Hjälpfunktion för att seperera ingrediens typer
Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key]=obj[key], res), {} )

let foundations = Object.filter(imported.inventory, item => item.foundation)
let proteins = Object.filter(imported.inventory, item => item.protein)
let extras = Object.filter(imported.inventory, item => item.extra)
let dressings = Object.filter(imported.inventory, item => item.dressing)

let menu = {Foundations: Object.keys(foundations), Proteins: Object.keys(foundations), Extras: Object.keys(extras), Dressings: Object.keys(dressings)}

//Vissar valen för olika kategorier (osäker på format)
function displayOptions() {
    //console.log('Foundations: ' + Object.keys(foundations))
    //console.log('Proteins: ' + Object.keys(foundations))
    //console.log('Extras: ' + Object.keys(extras))
    //console.log('Dressing: ' + Object.keys(dressings))
    console.log(menu)
}

function Salad(foundation, protein, extra, dressing) {
    this.foundation = []
    this.protein = []
    this.extra = []
    this.dressing = []

    foundation.forEach(foundation => this.foundation.push(Object.assign({name:foundation}, imported.inventory[foundation])))
    protein.forEach(protein => this.protein.push(Object.assign({name:protein}, imported.inventory[protein])))
    extra.forEach(extra => this.extra.push(Object.assign({name:extra}, imported.inventory[extra])));
    dressing.forEach(dressing => this.dressing.push(Object.assign({name:dressing}, imported.inventory[dressing])))

    this.add = function(item){
        if(foundations[item]){
            this.foundation.push(Object.assign({name:item}, item))
        }
        if(proteins[item]){
            this.protein.push(Object.assign({name:item}, item))
        }
        if(extra[item]){
            this.extra.push(Object.assign({name:item}, item))
        }
        if(dressing[item]){
            this.dressing.push(Object.assign({name:item}, item))
        }
    }

    this.remove = function(item){
        if(foundations[item]){
            this.foundation = this.foundation.filter(temp =>  temp.name !== item)
        }
        if(proteins[item]){
            this.protein = this.protein.filter(temp =>  temp.name !== item)
        }
        if(extras[item]){
            this.extra = this.extra.filter(temp =>  temp.name !== item)
        }
        if(dressings[item]){
            this.dressing = this.dressing.filter(temp =>  temp.name !== item)
        }
    }
}

Salad.prototype.price = function(){
    return this.foundation.reduce((currentTotal, ingredient) => currentTotal + ingredient.price, 0)+
    this.protein.reduce((currentTotal, ingredient) => currentTotal + ingredient.price, 0)+
    this.extra.reduce((currentTotal, ingredient) => currentTotal + ingredient.price, 0)+
    this.dressing.reduce((currentTotal, ingredient) => currentTotal + ingredient.price, 0)
}

function ExtraGreenSalad(foundation, protein, extra, dressing){
    Salad.call(this, foundation, protein, extra, dressing)
}

ExtraGreenSalad.prototype = Object.create(Salad.prototype)
Object.defineProperty(ExtraGreenSalad.prototype, 'constructor', {
    value: ExtraGreenSalad,
    enumberable: false,
    writable: true
})

ExtraGreenSalad.prototype.price = function(){
    return this.foundation.reduce((currentTotal, ingredient) => currentTotal + ingredient.price, 0)*1.3+
        this.protein.reduce((currentTotal, ingredient) => currentTotal + ingredient.price, 0)*0.5+
        this.extra.reduce((currentTotal, ingredient) => currentTotal + ingredient.price, 0)*0.5+
        this.dressing.reduce((currentTotal, ingredient) => currentTotal + ingredient.price, 0)*0.5
}

function GourmetSalad(foundation, foundationSize, protein, proteinSize, extra, extraSize, dressing, dressingSize){
    this.foundation = []
    this.protein = []
    this.extra = []
    this.dressing = []

    foundation.forEach(foundationElement => this.foundation.push(Object.assign({name:foundationElement, size: foundationSize[foundation.indexOf(foundationElement)]}, imported.inventory[foundationElement])))
    protein.forEach(proteinElement => this.protein.push(Object.assign({name:proteinElement, size: proteinSize[protein.indexOf(proteinElement)]}, imported.inventory[proteinElement])))
    extra.forEach(extraElement => this.extra.push(Object.assign({name:extraElement, size:extraSize[extra.indexOf(extraElement)]}, imported.inventory[extraElement])));
    dressing.forEach(dressingElement => this.dressing.push(Object.assign({name:dressingElement, size:dressingSize[dressing.indexOf(dressingElement)]}, imported.inventory[dressingElement])))

    this.add = function(item, size){
        if(foundations[item]){
            this.foundation.push(Object.assign({name:item, size:size}, item))
        }
        if(proteins[item]){
            this.protein.push(Object.assign({name:item, size:size}, item))
        }
        if(extra[item]){
            this.extra.push(Object.assign({name:item, size:size}, item))
        }
        if(dressing[item]){
            this.dressing.push(Object.assign({name:item, size:size}, item))
        }
    }

    this.remove = function(item){
        if(foundations[item]){
            this.foundation = this.foundation.filter(temp =>  temp.name !== item)
        }
        if(proteins[item]){
            this.protein = this.protein.filter(temp =>  temp.name !== item)
        }
        if(extras[item]){
            this.extra = this.extra.filter(temp =>  temp.name !== item)
        }
        if(dressings[item]){
            this.dressing = this.dressing.filter(temp =>  temp.name !== item)
        }
    }
    this.price = function(){
    return this.foundation.reduce((currentTotal, ingredient) => currentTotal + ingredient.price * ingredient.size, 0)+
        this.protein.reduce((currentTotal, ingredient) => currentTotal + ingredient.price * ingredient.size, 0)+
        this.extra.reduce((currentTotal, ingredient) => currentTotal + ingredient.price * ingredient.size, 0)+
        this.dressing.reduce((currentTotal, ingredient) => currentTotal + ingredient.price * ingredient.size, 0)
    }
}
let myCesarSalad = new Salad(['Sallad'], ['Kycklingfilé'], ['Krutonger', 'Parmesan', 'Ägg'], ['Ceasardressing'])
let mySalad = new ExtraGreenSalad(['Sallad'], ['Kycklingfilé'], ['Krutonger', 'Parmesan', 'Ägg'], ['Ceasardressing'])
let myGourmetSalad = new GourmetSalad(['Sallad'], [2], ['Kycklingfilé'], [2.5], ['Krutonger', 'Parmesan', 'Ägg'], [0.3, 0.8, 1.3], ['Ceasardressing'], [1.0])

// console.log('CesarSalad price: ' + myCesarSalad.price())
// console.log('Extra Green Salad price: ' + mySalad.price())
// console.log('Gourmet price: ' + myGourmetSalad.price())
displayOptions()
