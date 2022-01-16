const slayt1 = document.querySelector('#slayt1')
const slayt2 = document.querySelector('#slayt2')
const slayt3 = document.querySelector('#slayt3')
const sliders = document.querySelector('.sliders')

const btn1 = document.querySelector('#btn1')
const btn2 = document.querySelector('#btn2')
const btn3 = document.querySelector('#btn3')

const btns = document.querySelectorAll('.slayt-butonu')
const arrows = document.querySelectorAll('.arrow')
let count = 1;


document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
        count--;
    }
    else if (e.keyCode == '39') {
        count++;
    }
    gecisler()

}

arrows.forEach(arrow => {

    arrow.addEventListener('click', function (e) {
        const styles = e.currentTarget.classList
        if (styles.contains('a-left')) {
            count--;
            console.log(count);
        } else if (styles.contains('a-right')) {
            count++;
            console.log(count);
        }
        gecisler()
    })

})

btns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        const styles = e.currentTarget.classList;
        if (styles.contains('btn-1')) {
            slayt1.classList.remove('gizli-slayt');
            slayt2.classList.add('gizli-slayt')
            slayt3.classList.add('gizli-slayt')
            count = 1;
            btn1.classList.add('btn-border')
            btn2.classList.remove('btn-border')
            btn3.classList.remove('btn-border')
        } else if (styles.contains('btn-2')) {
            slayt2.classList.remove('gizli-slayt');
            slayt1.classList.add('gizli-slayt')
            slayt3.classList.add('gizli-slayt')
            count = 2;
            btn2.classList.add('btn-border')
            btn1.classList.remove('btn-border')
            btn3.classList.remove('btn-border')
        } else if (styles.contains('btn-3')) {
            slayt3.classList.remove('gizli-slayt');
            slayt2.classList.add('gizli-slayt')
            slayt1.classList.add('gizli-slayt')
            count = 3;
            btn3.classList.add('btn-border')
            btn2.classList.remove('btn-border')
            btn1.classList.remove('btn-border')
        }

    })
});

function gecisler() {
    if (count == 1) {
        slayt1.classList.remove('gizli-slayt');
        slayt2.classList.add('gizli-slayt')
        slayt3.classList.add('gizli-slayt')

        btn1.classList.add('btn-border')
        btn2.classList.remove('btn-border')
        btn3.classList.remove('btn-border')
    } else if (count == 2) {
        slayt2.classList.remove('gizli-slayt');
        slayt1.classList.add('gizli-slayt')
        slayt3.classList.add('gizli-slayt')
        
        btn2.classList.add('btn-border')
        btn1.classList.remove('btn-border')
        btn3.classList.remove('btn-border')
    } else if (count == 3){
        slayt3.classList.remove('gizli-slayt');
        slayt2.classList.add('gizli-slayt')
        slayt1.classList.add('gizli-slayt')
        
        btn3.classList.add('btn-border')
        btn2.classList.remove('btn-border')
        btn1.classList.remove('btn-border')
    } else if(count == 0){
        count = 1;
        console.log(count);
    }else if(count == 4){
        count = 3;
    }
}