const tarihSec = document.querySelector('#tarih-sec');
const tarihSecBtn = document.querySelector('#tarih-sec-btn');

const gorevDiv = document.querySelectorAll('.gorev-div');

const tarihDuzenle = document.querySelector('#tarih-duzenle');
const tarihDuzenleBtn = document.querySelector('#tarih-duzenle-btn');

const kacinciMadde = document.querySelector('#kacinci-madde');


const yapilacakMetin1 = document.querySelector('#yapilacak-metin1');
const yapilacakMetin2 = document.querySelector('#yapilacak-metin2');
const yapilacakMetin3 = document.querySelector('#yapilacak-metin3');
const yapilacakMetin4 = document.querySelector('#yapilacak-metin4');
const yapilacakMetin5 = document.querySelector('#yapilacak-metin5');
const yapilacakMetin6 = document.querySelector('#yapilacak-metin6');
const yapilacakMetin7 = document.querySelector('#yapilacak-metin7');
const yapilacakMetin8 = document.querySelector('#yapilacak-metin8');
const yapilacakMetin9 = document.querySelector('#yapilacak-metin9');
const yapilacakMetin10 = document.querySelector('#yapilacak-metin10');

let yapilacaklar = [];


tarihSecBtn.addEventListener('click', (e) => {

    // console.log(JSON.parse(localStorage.getItem(tarihSec.value)).tarih);

    if (tarihSec.value == JSON.parse(localStorage.getItem(tarihSec.value)).tarih) {


        gorevDiv.forEach(function (gorev) {

            console.log(JSON.parse(localStorage.getItem(tarihSec.value)).tarih);

            yapilacakMadde(gorev, JSON.parse(localStorage.getItem(tarihSec.value)))

        })
    }


    e.preventDefault();
})



function yapilacakMadde(gorev, yapilacak) {

    switch (gorev.id) {
        case "gorev-1":
            gorev.children[2].textContent = yapilacak.madde1;
            break;
        case "gorev-2":
            gorev.children[2].textContent = yapilacak.madde2;
            break;
        case "gorev-3":
            gorev.children[2].textContent = yapilacak.madde3;
            break;
        case "gorev-4":
            gorev.children[2].textContent = yapilacak.madde4;
            break;
        case "gorev-5":
            gorev.children[2].textContent = yapilacak.madde5;
            break;
        case "gorev-6":
            gorev.children[2].textContent = yapilacak.madde6;
            break;
        case "gorev-7":
            gorev.children[2].textContent = yapilacak.madde7;
            break;
        case "gorev-8":
            gorev.children[2].textContent = yapilacak.madde8;
            break;
        case "gorev-9":
            gorev.children[2].textContent = yapilacak.madde9;
            break;
        case "gorev-10":
            gorev.children[2].textContent = yapilacak.madde10;
            break;
        default:
            break;
    }
}


// Butona tıkladıktan sonra yapılacak görevi listeye ekler
tarihDuzenleBtn.addEventListener('click', (e) => {

    // const yazilacakMetinDeger = yapilacakMetin.value;
    //const kacinciMaddeDeger = kacinciMadde.value;
    const duzenlenecekTarih = tarihDuzenle.value;
    //console.log(kacinciMaddeDeger);
    //console.log(yazilacakMetinDeger);

    // console.log(yapilacakMetin8.value);

    yapilacaklar.push({
        tarih: duzenlenecekTarih,
        madde1: yapilacakMetin1.value,
        madde2: yapilacakMetin2.value,
        madde3: yapilacakMetin3.value,
        madde4: yapilacakMetin4.value,
        madde5: yapilacakMetin5.value,
        madde6: yapilacakMetin6.value,
        madde7: yapilacakMetin7.value,
        madde8: yapilacakMetin8.value,
        madde9: yapilacakMetin9.value,
        madde10: yapilacakMetin10.value,
    })

    localStorage.setItem(duzenlenecekTarih, JSON.stringify(yapilacaklar[yapilacaklar.length - 1]));

    e.preventDefault()
})


// Tarih seçildiğinde yapılacakların textlerde gösterilmesi
tarihDuzenle.addEventListener('change', (e) => {


    if (JSON.parse(localStorage.getItem(tarihDuzenle.value)) == null) {
        yapilacakMetin1.value = " ";
        yapilacakMetin2.value = " ";
        yapilacakMetin3.value = " ";
        yapilacakMetin4.value = " ";
        yapilacakMetin5.value = " ";
        yapilacakMetin6.value = " ";
        yapilacakMetin7.value = " ";
        yapilacakMetin8.value = " ";
        yapilacakMetin9.value = " ";
        yapilacakMetin10.value = " ";
    } else {
        yapilacakMetin1.value = JSON.parse(localStorage.getItem(tarihDuzenle.value)).madde1;
        yapilacakMetin2.value = JSON.parse(localStorage.getItem(tarihDuzenle.value)).madde2;
        yapilacakMetin3.value = JSON.parse(localStorage.getItem(tarihDuzenle.value)).madde3;
        yapilacakMetin4.value = JSON.parse(localStorage.getItem(tarihDuzenle.value)).madde4;
        yapilacakMetin5.value = JSON.parse(localStorage.getItem(tarihDuzenle.value)).madde5;
        yapilacakMetin6.value = JSON.parse(localStorage.getItem(tarihDuzenle.value)).madde6;
        yapilacakMetin7.value = JSON.parse(localStorage.getItem(tarihDuzenle.value)).madde7;
        yapilacakMetin8.value = JSON.parse(localStorage.getItem(tarihDuzenle.value)).madde8;
        yapilacakMetin9.value = JSON.parse(localStorage.getItem(tarihDuzenle.value)).madde9;
        yapilacakMetin10.value = JSON.parse(localStorage.getItem(tarihDuzenle.value)).madde10;
    }


    e.preventDefault();
})


gorevDiv.forEach(function (button) {

    button.children[0].addEventListener('click', (e) => {

        if (button.id == "gorev-1") {
            
        } else if (button.id == "gorev-2") {
            console.log(JSON.parse(localStorage.getItem(tarihSec.value)).madde2);
        } else if (button.id == "gorev-3") {
            console.log(button.children[2].textContent);
        } else if (button.id == "gorev-4") {
            console.log(button.children[2].textContent);
        } else if (button.id == "gorev-5") {
            console.log(button.children[2].textContent);
        } else if (button.id == "gorev-6") {
            console.log(button.children[2].textContent);
        } else if (button.id == "gorev-7") {
            console.log(button.children[2].textContent);
        } else if (button.id == "gorev-8") {
            console.log(button.children[2].textContent);
        } else if (button.id == "gorev-9") {
            console.log(button.children[2].textContent);
        } else if (button.id == "gorev-10") {
            console.log(button.children[2].textContent);
        }

        e.preventDefault()
    })
})

















// tarihlerdeki yapılacak listesini ekranda göstermek için gereken kodlar
// yapilacaklar.forEach(function (yapilacak) {

//     tarihSecBtn.addEventListener('click', (e) => {


//         if (tarihSec.value == yapilacak.tarih) {

//             gorevDiv.forEach(function (gorev) {

//                 yapilacakMadde(gorev,yapilacak)

//             })

//         }

//         e.preventDefault();
//     })
// })