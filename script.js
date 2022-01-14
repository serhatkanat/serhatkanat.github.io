const vizeler = document.querySelectorAll('.vize');
const vizeNotu2Div = document.querySelector('#vize-notu-2-div');
const vizeNotu3Div = document.querySelector('#vize-notu-3-div');

const vize1 = document.querySelector('#vize-1');
const vize2 = document.querySelector('#vize-2');
const vize3 = document.querySelector('#vize-3');

const uygulamaSonucu = document.querySelectorAll('.uygulama');
const uygulamaDiv = document.querySelector('.uygulama-div');
const uygulamaVar = document.querySelector('#uygulama-var');
const uygulamaYok = document.querySelector('#uygulama-yok');
const uygulamaNotuDiv = document.querySelector('#uygulama-notu-div')
const uygulamaNotu = document.querySelector('#uygulama-notu')
const uygulamaOrani = document.querySelector('#uygulama-orani')

const gonder = document.querySelector('#gonder')
const vizeOrani = document.querySelector('#vize-orani');
const vizeYuzdeLabel = document.querySelector('#vize-yuzde-label');

const vizeNotu1 = document.querySelector('#vize-notu-1');
const vizeNotu2 = document.querySelector('#vize-notu-2');
const vizeNotu3 = document.querySelector('#vize-notu-3');
const finalNotu = document.querySelector('#final-notu');


vizeler.forEach(function (vize) {

    vize.addEventListener('change', (e) => {


        if (e.target.id == 'vize-2') {
            vizeNotu2Div.classList.remove('hidden')
            vizeNotu3Div.classList.add('hidden')
            vizeYuzdeLabel.textContent = 'Her Bir Vizeniz Yüzde Kaç Etkiliyor?'
        } else if (e.target.id == 'vize-3') {
            vizeNotu2Div.classList.remove('hidden')
            vizeNotu3Div.classList.remove('hidden')
            vizeYuzdeLabel.textContent = 'Her Bir Vizeniz Yüzde Kaç Etkiliyor?'
        } else {
            vizeNotu2Div.classList.add('hidden')
            vizeNotu3Div.classList.add('hidden')
            vizeYuzdeLabel.textContent = 'Vizeniz Yüzde Kaç Etkiliyor?'
        }

        e.preventDefault()
    })

})



uygulamaSonucu.forEach(function (uygulama) {

    uygulama.addEventListener('change', (e) => {
        if (e.target.id == 'uygulama-var') {
            uygulamaDiv.classList.remove('hidden')
            uygulamaNotuDiv.classList.remove('hidden')
        } else {
            uygulamaDiv.classList.add('hidden')
            uygulamaNotuDiv.classList.add('hidden')
        }
        e.preventDefault()
    })
})



gonder.addEventListener('click', (e) => {
    if(uygulamaNotuDiv.classList.contains('hidden')){
        uygulamaOrani.value = 10;
    }
    const oranToplami1 = parseInt(vizeOrani.value) + parseInt(uygulamaOrani.value);
    const oranToplami2 = parseInt(vizeOrani.value) * 2 + parseInt(uygulamaOrani.value);
    const oranToplami3 = parseInt(vizeOrani.value) * 3 + parseInt(uygulamaOrani.value);
    console.log(vizeOrani.value);
    console.log(uygulamaOrani.value);
    console.log(oranToplami1);

    console.log(uygulamaOrani.value)
    if (vize1.checked == true && oranToplami1 <= 100) {
        hesaplama();
    } else if (vize2.checked == true && oranToplami2 <= 100) {
        hesaplama();
    } else if(vize3.checked == true && oranToplami3 <= 100){
        hesaplama()
    }else if(vizeOrani.value == '' || uygulamaOrani == ''){
        alert("Oranı Boş Bırakamazsınız")
    }else{
        alert("Vize ve Uygulama Oranları Toplamı 100'den büyük olamaz.")
    }
    
    e.preventDefault()
})

function hesaplama() {
    if (vize1.checked == true && uygulamaVar.checked == false) {
        const vizePuani = (parseInt(vizeNotu1.value) * parseInt(vizeOrani.value)) / 100;
        const finalPuani = (parseInt(finalNotu.value) * (100 - parseInt(vizeOrani.value))) / 100;
        const sonuc = vizePuani + finalPuani;
        // console.log("merhaba 1");
        alert(sonuc + " merhaba")
    } else if (vize2.checked == true && uygulamaVar.checked == false) {
        const vizePuani1 = (parseInt(vizeNotu1.value) * parseInt(vizeOrani.value)) / 100;
        const vizePuani2 = (parseInt(vizeNotu2.value) * parseInt(vizeOrani.value)) / 100;
        const finalPuani = (parseInt(finalNotu.value) * (100 - (parseInt(vizeOrani.value) * 2))) / 100;
        const sonuc = vizePuani1 + vizePuani2 + finalPuani;
        // console.log(vizeNotu1.value);
        // console.log(vizeNotu2.value);
        // console.log(finalNotu.value);
        // console.log(vizeOrani.value);
        // console.log("merhaba 2");
        alert(sonuc)
    } else if (vize3.checked == true && uygulamaVar.checked == false) {
        const vizePuani1 = (parseInt(vizeNotu1.value) * parseInt(vizeOrani.value)) / 100;
        const vizePuani2 = (parseInt(vizeNotu2.value) * parseInt(vizeOrani.value)) / 100;
        const vizePuani3 = (parseInt(vizeNotu3.value) * parseInt(vizeOrani.value)) / 100;
        const finalPuani = (parseInt(finalNotu.value) * (100 - (parseInt(vizeOrani.value) * 3))) / 100;
        const sonuc = vizePuani1 + vizePuani2 + vizePuani3 + finalPuani;
        alert(sonuc);
    } else if (vize1.checked == true && uygulamaVar.checked == true) {
        const vizePuani = (parseInt(vizeNotu1.value) * parseInt(vizeOrani.value)) / 100;
        const uygulamaPuani = (parseInt(uygulamaNotu.value) * parseInt(uygulamaOrani.value)) / 100;
        const finalPuani = (parseInt(finalNotu.value) * (100 - parseInt(vizeOrani.value) - parseInt(uygulamaOrani.value))) / 100;
        const sonuc = vizePuani + uygulamaPuani + finalPuani;
        alert(sonuc)
        // console.log(vizePuani);
        // console.log(vizeNotu2.value);
        // console.log(finalPuani.value);
        // console.log(finalNotu.value);
        // console.log(vizeOrani.value);
        // console.log("merhaba 2");
    } else if (vize2.checked == true && uygulamaVar.checked == true) {
        const vizePuani1 = (parseInt(vizeNotu1.value) * parseInt(vizeOrani.value)) / 100;
        const vizePuani2 = (parseInt(vizeNotu2.value) * parseInt(vizeOrani.value)) / 100;
        const uygulamaPuani = (parseInt(uygulamaNotu.value) * parseInt(uygulamaOrani.value)) / 100;
        const finalPuani = (parseInt(finalNotu.value) * (100 - (parseInt(vizeOrani.value) * 2) - parseInt(uygulamaOrani.value))) / 100;
        const sonuc = vizePuani1 + vizePuani2 + uygulamaPuani + finalPuani;
        alert(sonuc)
    } else if (vize3.checked == true && uygulamaVar.checked == true) {
        const vizePuani1 = (parseInt(vizeNotu1.value) * parseInt(vizeOrani.value)) / 100;
        const vizePuani2 = (parseInt(vizeNotu2.value) * parseInt(vizeOrani.value)) / 100;
        const vizePuani3 = (parseInt(vizeNotu3.value) * parseInt(vizeOrani.value)) / 100;
        const uygulamaPuani = (parseInt(uygulamaNotu.value) * parseInt(uygulamaOrani.value)) / 100;
        const finalPuani = (parseInt(finalNotu.value) * (100 - (parseInt(vizeOrani.value) * 3) - parseInt(uygulamaOrani.value))) / 100;
        const sonuc = vizePuani1 + vizePuani2 + vizePuani3 + uygulamaPuani + finalPuani;
        alert(sonuc);
    }
}
