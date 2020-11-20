const csv=require('csvtojson')

class City {

    // SETTERS
    set Code_postal(Code_postal){
        this._Code_postal=Code_postal;
    }
    set Code_commune_INSEE(Code_commune_INSEE){
        this._Code_commune_INSEE=Code_commune_INSEE;
    }
    set Nom_commune(Nom_commune){
        this._Nom_commune=Nom_commune;
    }
    set Vent(Vent){
        this._Vent=Vent;
    }
    set Neige(Neige){
        this._Neige=Neige;
    }
    set Seisme(Seisme){
        this._Seisme=Seisme;
    }

    //GETTERS
    get Code_postal(){
        return this._Code_postal;
    }
    get Code_commune_INSEE(){
        return this._Code_commune_INSEE;
    }
    get Nom_commune(){
        return this._Nom_commune;
    }
    get Vent(){
        return this._Vent;
    }
    get Neige(){
        return this._Neige;
    }
    get Seisme(){
        return this._Seisme;
    }
    
    constructor(){
    }
}
let ct =[];// Array to store City Objects

// Invoking csv returns a promise
const converter = csv()
    .fromFile('./data.csv')
    .then((json)=>{
        let e;// Will be a City Object
        json.forEach((row)=>{
            e=new City();// New Nom_commune Object
            Object.assign(e,row);// Assign json to the new Nom_commune
            ct.push(e);// Add the Nom_commune to the Array
        });
    }).then(()=>{
        // Output the names of the Nom_commune
        ct.forEach((c)=>{
            console.log(c.Code_postal+' - '+c.Nom_commune);// Invoke the Name getter
        });
    });