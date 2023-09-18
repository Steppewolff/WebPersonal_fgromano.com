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
    var arrtab = Array.prototype.slice.call(tab); //Turns HTMLcollections type in array type, [].slice.call(tab) is also valid
    console.log('arrtab: ', arrtab)

    arrtab.forEach(element => {
        element.addEventListener('click', function(){
            let show= document.getElementsByClassName('show');
            let arrshow= Array.prototype.slice.call(show);
            arrshow.forEach(show_tab => {
                document.getElementById(show_tab.id).classList.remove('show');
            })
           
            document.getElementById(element.id).classList.add('show');
            document.getElementById(element.getAttribute('aria-controls')).classList.add('active');
            document.getElementById(element.getAttribute('aria-controls')).classList.add('in');
        })
    });
}