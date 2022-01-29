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

const yapilacak1 = document.querySelector('#yapilacak1');
const yapilacak2 = document.querySelector('#yapilacak2');
const yapilacak3 = document.querySelector('#yapilacak3');
const yapilacak4 = document.querySelector('#yapilacak4');
const yapilacak5 = document.querySelector('#yapilacak5');
const yapilacak6 = document.querySelector('#yapilacak6');
const yapilacak7 = document.querySelector('#yapilacak7');
const yapilacak8 = document.querySelector('#yapilacak8');
const yapilacak9 = document.querySelector('#yapilacak9');
const yapilacak10 = document.querySelector('#yapilacak10');




let yapilacaklar = [];


tarihSecBtn.addEventListener('click', (e) => {

    // console.log(JSON.parse(localStorage.getItem(tarihSec.value)).tarih);
    
        if (tarihSec.value == '') {
            alert("Lütfen Bir Tarih Seçin")
        }else{
        if (tarihSec.value == JSON.parse(localStorage.getItem(tarihSec.value)).tarih) {


            gorevDiv.forEach(function (gorev) {



                console.log(JSON.parse(localStorage.getItem(tarihSec.value)).tarih);

                yapilacakMadde(gorev, JSON.parse(localStorage.getItem(tarihSec.value)))

            })
        

        }

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
            if (confirm('Bu görev yapıldı mı? (Bu seçimi daha sonra geri alamazsınız!)')) {
                yapilacaklar.push({
                    tarih: tarihSec.value,
                    madde1: "Yapıldı",
                    madde2: yapilacak2.textContent,
                    madde3: yapilacak3.textContent,
                    madde4: yapilacak4.textContent,
                    madde5: yapilacak5.textContent,
                    madde6: yapilacak6.textContent,
                    madde7: yapilacak7.textContent,
                    madde8: yapilacak8.textContent,
                    madde9: yapilacak9.textContent,
                    madde10: yapilacak10.textContent,
                })
                localStorage.setItem(tarihSec.value, JSON.stringify(yapilacaklar[yapilacaklar.length - 1]));
                button.children[0].style.backgroundColor = "#DC143C";
            };
            tarihSecBtn.click();
        } else if (button.id == "gorev-2") {
            if (confirm('Bu görev yapıldı mı? (Bu seçimi daha sonra geri alamazsınız!)')) {
                yapilacaklar.push({
                    tarih: tarihSec.value,
                    madde1: yapilacak1.textContent,
                    madde2: "Yapıldı",
                    madde3: yapilacak3.textContent,
                    madde4: yapilacak4.textContent,
                    madde5: yapilacak5.textContent,
                    madde6: yapilacak6.textContent,
                    madde7: yapilacak7.textContent,
                    madde8: yapilacak8.textContent,
                    madde9: yapilacak9.textContent,
                    madde10: yapilacak10.textContent,
                })
                localStorage.setItem(tarihSec.value, JSON.stringify(yapilacaklar[yapilacaklar.length - 1]));
                button.children[0].style.backgroundColor = "#DC143C";
            };
            tarihSecBtn.click();
        } else if (button.id == "gorev-3") {
            if (confirm('Bu görev yapıldı mı? (Bu seçimi daha sonra geri alamazsınız!)')) {
                yapilacaklar.push({
                    tarih: tarihSec.value,
                    madde1: yapilacak1.textContent,
                    madde2: yapilacak2.textContent,
                    madde3: "Yapıldı",
                    madde4: yapilacak4.textContent,
                    madde5: yapilacak5.textContent,
                    madde6: yapilacak6.textContent,
                    madde7: yapilacak7.textContent,
                    madde8: yapilacak8.textContent,
                    madde9: yapilacak9.textContent,
                    madde10: yapilacak10.textContent,
                })
                localStorage.setItem(tarihSec.value, JSON.stringify(yapilacaklar[yapilacaklar.length - 1]));
                button.children[0].style.backgroundColor = "#DC143C";
            };
            tarihSecBtn.click();
        } else if (button.id == "gorev-4") {
            if (confirm('Bu görev yapıldı mı? (Bu seçimi daha sonra geri alamazsınız!)')) {
                yapilacaklar.push({
                    tarih: tarihSec.value,
                    madde1: yapilacak1.textContent,
                    madde2: yapilacak2.textContent,
                    madde3: yapilacak3.textContent,
                    madde4: "Yapıldı",
                    madde5: yapilacak5.textContent,
                    madde6: yapilacak6.textContent,
                    madde7: yapilacak7.textContent,
                    madde8: yapilacak8.textContent,
                    madde9: yapilacak9.textContent,
                    madde10: yapilacak10.textContent,
                })
                localStorage.setItem(tarihSec.value, JSON.stringify(yapilacaklar[yapilacaklar.length - 1]));
                button.children[0].style.backgroundColor = "#DC143C";
            };
            tarihSecBtn.click();
        } else if (button.id == "gorev-5") {
            if (confirm('Bu görev yapıldı mı? (Bu seçimi daha sonra geri alamazsınız!)')) {
                yapilacaklar.push({
                    tarih: tarihSec.value,
                    madde1: yapilacak1.textContent,
                    madde2: yapilacak2.textContent,
                    madde3: yapilacak3.textContent,
                    madde4: yapilacak4.textContent,
                    madde5: "Yapıldı",
                    madde6: yapilacak6.textContent,
                    madde7: yapilacak7.textContent,
                    madde8: yapilacak8.textContent,
                    madde9: yapilacak9.textContent,
                    madde10: yapilacak10.textContent,
                })
                localStorage.setItem(tarihSec.value, JSON.stringify(yapilacaklar[yapilacaklar.length - 1]));
                button.children[0].style.backgroundColor = "#DC143C";
            };
            tarihSecBtn.click();
        } else if (button.id == "gorev-6") {
            if (confirm('Bu görev yapıldı mı? (Bu seçimi daha sonra geri alamazsınız!)')) {
                yapilacaklar.push({
                    tarih: tarihSec.value,
                    madde1: yapilacak1.textContent,
                    madde2: yapilacak2.textContent,
                    madde3: yapilacak3.textContent,
                    madde4: yapilacak4.textContent,
                    madde5: yapilacak5.textContent,
                    madde6: "Yapıldı",
                    madde7: yapilacak7.textContent,
                    madde8: yapilacak8.textContent,
                    madde9: yapilacak9.textContent,
                    madde10: yapilacak10.textContent,
                })
                localStorage.setItem(tarihSec.value, JSON.stringify(yapilacaklar[yapilacaklar.length - 1]));
                button.children[0].style.backgroundColor = "#DC143C";
            };
            tarihSecBtn.click();
        } else if (button.id == "gorev-7") {
            if (confirm('Bu görev yapıldı mı? (Bu seçimi daha sonra geri alamazsınız!)')) {
                yapilacaklar.push({
                    tarih: tarihSec.value,
                    madde1: yapilacak1.textContent,
                    madde2: yapilacak2.textContent,
                    madde3: yapilacak3.textContent,
                    madde4: yapilacak4.textContent,
                    madde5: yapilacak5.textContent,
                    madde6: yapilacak6.textContent,
                    madde7: "Yapıldı",
                    madde8: yapilacak8.textContent,
                    madde9: yapilacak9.textContent,
                    madde10: yapilacak10.textContent,
                })
                localStorage.setItem(tarihSec.value, JSON.stringify(yapilacaklar[yapilacaklar.length - 1]));
                button.children[0].style.backgroundColor = "#DC143C";
            };
            tarihSecBtn.click();
        } else if (button.id == "gorev-8") {
            if (confirm('Bu görev yapıldı mı? (Bu seçimi daha sonra geri alamazsınız!)')) {
                yapilacaklar.push({
                    tarih: tarihSec.value,
                    madde1: yapilacak1.textContent,
                    madde2: yapilacak2.textContent,
                    madde3: yapilacak3.textContent,
                    madde4: yapilacak4.textContent,
                    madde5: yapilacak5.textContent,
                    madde6: yapilacak6.textContent,
                    madde7: yapilacak7.textContent,
                    madde8: "Yapıldı",
                    madde9: yapilacak9.textContent,
                    madde10: yapilacak10.textContent,
                })
                localStorage.setItem(tarihSec.value, JSON.stringify(yapilacaklar[yapilacaklar.length - 1]));
                button.children[0].style.backgroundColor = "#DC143C";
            };
            tarihSecBtn.click();
        } else if (button.id == "gorev-9") {
            if (confirm('Bu görev yapıldı mı? (Bu seçimi daha sonra geri alamazsınız!)')) {
                yapilacaklar.push({
                    tarih: tarihSec.value,
                    madde1: yapilacak1.textContent,
                    madde2: yapilacak2.textContent,
                    madde3: yapilacak3.textContent,
                    madde4: yapilacak4.textContent,
                    madde5: yapilacak5.textContent,
                    madde6: yapilacak6.textContent,
                    madde7: yapilacak7.textContent,
                    madde8: yapilacak8.textContent,
                    madde9: "Yapıldı",
                    madde10: yapilacak10.textContent,
                })
                localStorage.setItem(tarihSec.value, JSON.stringify(yapilacaklar[yapilacaklar.length - 1]));
                button.children[0].style.backgroundColor = "#DC143C";
            };
            tarihSecBtn.click();
        } else if (button.id == "gorev-10") {
            if (confirm('Bu görev yapıldı mı? (Bu seçimi daha sonra geri alamazsınız!)')) {
                yapilacaklar.push({
                    tarih: tarihSec.value,
                    madde1: yapilacak1.textContent,
                    madde2: yapilacak2.textContent,
                    madde3: yapilacak3.textContent,
                    madde4: yapilacak4.textContent,
                    madde5: yapilacak5.textContent,
                    madde6: yapilacak6.textContent,
                    madde7: yapilacak7.textContent,
                    madde8: yapilacak8.textContent,
                    madde9: yapilacak9.textContent,
                    madde10: "Yapıldı",
                })
                localStorage.setItem(tarihSec.value, JSON.stringify(yapilacaklar[yapilacaklar.length - 1]));
                button.children[0].style.backgroundColor = "#DC143C";
            };
            tarihSecBtn.click();
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