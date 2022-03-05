const buttons = document.querySelectorAll('.button');
const page1 = document.querySelector('#page1');
const page2 = document.querySelector('#page2');
const page3 = document.querySelector('#page3');
const page4 = document.querySelector('#page4');

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const button4 = document.querySelector('#button4');



buttons.forEach(function (button) {

    button.addEventListener('click', (e) => {

        const tiklanilanEleman = button.textContent;

        button.style.backgroundColor = "#026ba3"


        if (tiklanilanEleman == 1) {
            page1.classList.remove('hidden');
            page2.classList.add('hidden');
            page3.classList.add('hidden');
            page4.classList.add('hidden');

            page1.children[0].classList.add('acilma-animasyonu');
            page2.children[0].classList.remove('acilma-animasyonu');
            page3.children[0].classList.remove('acilma-animasyonu');
            page4.children[0].classList.remove('acilma-animasyonu');

            button1.style.backgroundColor = "#026ba3"
            button2.style.backgroundColor = "#00a8ff"
            button3.style.backgroundColor = "#00a8ff"
            button4.style.backgroundColor = "#00a8ff"

        } else if (tiklanilanEleman == 2) {
            page1.classList.add('hidden');
            page2.classList.remove('hidden');
            page3.classList.add('hidden');
            page4.classList.add('hidden');

            page1.children[0].classList.remove('acilma-animasyonu');
            page2.children[0].classList.add('acilma-animasyonu');
            page3.children[0].classList.remove('acilma-animasyonu');
            page4.children[0].classList.remove('acilma-animasyonu');

            button1.style.backgroundColor = "#00a8ff"
            button2.style.backgroundColor = "#026ba3"
            button3.style.backgroundColor = "#00a8ff"
            button4.style.backgroundColor = "#00a8ff"

        } else if (tiklanilanEleman == 3) {
            page1.classList.add('hidden');
            page2.classList.add('hidden');
            page3.classList.remove('hidden');
            page4.classList.add('hidden');

            page1.children[0].classList.remove('acilma-animasyonu');
            page2.children[0].classList.remove('acilma-animasyonu');
            page3.children[0].classList.add('acilma-animasyonu');
            page4.children[0].classList.remove('acilma-animasyonu');

            button1.style.backgroundColor = "#00a8ff"
            button2.style.backgroundColor = "#00a8ff"
            button3.style.backgroundColor = "#026ba3"
            button4.style.backgroundColor = "#00a8ff"

        } else {
            page1.classList.add('hidden');
            page2.classList.add('hidden');
            page3.classList.add('hidden');
            page4.classList.remove('hidden');

            page1.children[0].classList.remove('acilma-animasyonu');
            page2.children[0].classList.remove('acilma-animasyonu');
            page3.children[0].classList.remove('acilma-animasyonu');
            page4.children[0].classList.add('acilma-animasyonu');


            button1.style.backgroundColor = "#00a8ff"
            button2.style.backgroundColor = "#00a8ff"
            button3.style.backgroundColor = "#00a8ff"
            button4.style.backgroundColor = "#026ba3"
        }

        e.preventDefault()
    })

})