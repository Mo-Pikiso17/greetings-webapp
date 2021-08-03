module.exports = function greeting(exitingNames) {

    let letters = /^[A-Za-z]+$/;
    let oldNames = [] || exitingNames;

    function pushNames (names){
        let str = names.toLowerCase();                        
        let name = str.charAt(0).toUpperCase() + str.slice(1);

        if (!oldNames.includes(name)) {
            oldNames.push(name);
    
        }
    }

    function getNames(){
        return oldNames;
    }

    function getCount(){
        return oldNames.length;
    }

    function greets(radioBtn, names) {

        // let str = names.toLowerCase();                     
        // let name = str.charAt(0).toUpperCase() + str.slice(1);

       
        if (radioBtn === "English") {
        return "Hello, " + names;
        }

        if (radioBtn === "IsiXhosa") {
        return "Molo, " + names;
        }

        if (radioBtn === "Swahili") {
            
            return "Jambo, " + names;
        }
       
    }

    function conditions(radioBtn, names){  

        // var str = names.toLowerCase(); 
        // var name = str.charAt(0).toUpperCase() + str.slice(1);


        if(!radioBtn && names === ""){
            return "Enter name and select a language!";
        }
    
        if (radioBtn && names === "") {
            return "Please enter a name!";
                
        }
    
        if (!radioBtn && names !== "") {
            return "Please select a language!"; 
        }

        if(!letters.test(names)){

            return "Please enter a valid name. E.g Ndalo";

        }
    }

    return {
        greets,
        pushNames,
        getNames,
        conditions,
        getCount,
    }
}
