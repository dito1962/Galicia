// ------------------------------------------------------------------
// Get elements 
// ------------------------------------------------------------------

const list = document.getElementsByClassName("slider")[0];
const items = list.getElementsByTagName("img");
const nbSlide = items.length;

const precedent = document.querySelector(".prev");
const suivant = document.querySelector('.next');
const description = document.querySelector('.description');
const date = document.querySelector('.date');
const make = document.querySelector('.make');
const model = document.querySelector('.model');
const exif1 = document.querySelector('.exif1');
const exif2 = document.querySelector('.exif2');

var count = 0;

debugger;
window.onload=getExif;


// ------------------------------------------------------------------
//  Next
// ------------------------------------------------------------------
function nextSlide(){
    items[count].classList.remove('active');

    if(count < nbSlide - 1){
        count++;
    } else {
        count = 0;
    }
    items[count].classList.add('active')
    getExif();
}
suivant.addEventListener('click', nextSlide)

// ------------------------------------------------------------------
//  Prev
// ------------------------------------------------------------------
function prevSlide(){
    items[count].classList.remove('active');

    if(count > 0){
        count--;
    } else {
        count = nbSlide - 1;
    }
    items[count].classList.add('active')   
    getExif();  
}
precedent.addEventListener('click', prevSlide)

// ------------------------------------------------------------------
//  Keyboard
// ------------------------------------------------------------------
function keyPress(e){
    console.log(e);
    
    if(e.keyCode === 37){
        prevSlide();
    } else if(e.keyCode === 39){
        nextSlide();
    }
}
document.addEventListener('keydown', keyPress)

// ------------------------------------------------------------------
// EXIF info
// ------------------------------------------------------------------
function getExif() {
    
    let img=items[count];    

    EXIF.getData(img, function() {            
        
        let v_description = EXIF.getTag(this, "ImageDescription");            
        let v_date = EXIF.getTag(this, "DateTime");            
        let year=v_date.substring(0, 4); let month=v_date.substring(5, 7); 
        let day=v_date.substring(8, 10); 
        let result = new Date(year, month - 1, day).toLocaleDateString('en-GB');
        v_date=result;             
        let v_prov =  EXIF.getTag(this, "Make");   
        let v_make = v_prov.charAt(0).toUpperCase() + v_prov.slice(1) ;
        if (v_make == "NIKON") {
            v_make = "Nikon";   
        }      
        let v_model = EXIF.getTag(this, "Model");   
        
        switch (v_model) {
            case "E5600":
                v_model = "Coolpix 5600";
                break;  
            case "Canon PowerShot S95":
                v_model = "PowerShot S95";  
                break;
            case "GT-I9505":
                v_model = "Galaxy S4";  
                break;
            case "SM-G920F":
                v_model = "Galaxy S6";
                break;
            case "SM-N975F":
                v_model = "Galaxy Note 10+";           
                break;
        }                
        description.innerText = v_description;  
        exif1.innerText = v_make + " " + v_model;                  
        exif2.innerText = v_date;  
    });
}



// ------------------------------------------------------------------
// Get all EXIF info ?
// ------------------------------------------------------------------

// window.onload = getExif;

// function getExif() {
//     var img = document.getElementById("image");
//     EXIF.getData(img, function() {
//         var allMetaData = EXIF.pretty(this);
//         var allMetaDataSpan = document.getElementById("metadata");
//         allMetaDataSpan.innerHTML = JSON.stringify(allMetaData,null, "\t");
//     });
// }