const items = document.querySelectorAll('img');
const nbSlide = items.length;

const precedent = document.querySelector('.prev');
const suivant = document.querySelector('.next');

let count = 0;


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


