let texts = ['Welcome to the Page...!', 'Kasun Chathuranga Pathirana', "I'm Full Stack Software Enginner"];

let spanElm = document.querySelector('h1 > span');
// spanElm.innerText = text[0];

let a = 0;
let b = 0;
let c = 0;
let reverse = false;

setInterval(()=>{
    b++;
    let text = texts[a];
    if(b % 2 == 0 && !reverse){
        c++
        spanElm.innerText = text.substring(0,c);
        if(c >= (text.length + 5)) {
            reverse = true;
        }

    }
    if(reverse){
        c--;
        spanElm.innerText = text.substring(0,c);
        if(c <= 0){
            reverse = false;
            a++;
            if(a === texts.length) a = 0;
        }

    }

}, 100);