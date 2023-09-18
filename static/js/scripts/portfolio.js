//Load education and experience records when /portfolio page is loaded
window.addEventListener("load", initial);
window.addEventListener("load", listen);

function initial(){
    let tab = document.getElementById('nav-inv-tab');
    tab.classList.add('show');

    let pane = document.getElementById('nav-inv');
    pane.classList.add('active');
    pane.classList.add('in');
}

function listen(){
    let tab = document.getElementsByClassName('nav-item');
    var arrtab = Array.prototype.slice.call(tab) //Turns HTMLcollections type in array type, [].slice.call(tab) is also valid

    arrtab.forEach(element => {
        element.addEventListener('click', function(){
            if (document.getElementById('nav-inv-tab').classList.contains('show')){
                document.getElementById('nav-inv-tab').classList.remove('show');
            }
        })
    });
}