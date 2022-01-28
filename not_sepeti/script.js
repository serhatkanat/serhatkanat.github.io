const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');
document.addEventListener('DOMContentLoaded', localStorageOku)

yeniGorevEkleBtn.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click', gorevSilTamam)

function gorevSilTamam(e) {
    const tıklanmaOlayi = e.target;

    if (tıklanmaOlayi.classList.contains('gorev-btn-tamamlandı')) {
        tıklanmaOlayi.parentElement.classList.toggle('gorev-tamamlandı')
    }

    if (confirm('Emin misiniz?')) {
        
    }
    if (tıklanmaOlayi.classList.contains('gorev-btn-sil')) {
        tıklanmaOlayi.parentElement.classList.toggle('kaybol')
        const silinecekEleman = tıklanmaOlayi.parentElement.children[0].innerText;
       
        localStorageSil(silinecekEleman);

        tıklanmaOlayi.parentElement.addEventListener('transitionend', function () {
        tıklanmaOlayi.parentElement.remove();
        })}}
    


function gorevEkle(e) {
    e.preventDefault();
if (yeniGorev.value.length > 0) {
    gorevItemOlustur(yeniGorev.value);
    // localstorage kaydetme işlemleri
    localStorageKaydet(yeniGorev.value);
    yeniGorev.value = '';
    
}else{
    alert("Boş Bırakamazsınız!")
}
    
}

function gorevItemOlustur(gorev) {
    //div oluşumu
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item');

    //li oluşumu
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.textContent = gorev;
    gorevDiv.appendChild(gorevLi);

    //div yapısını ul  listesine eklememiz lazım
    gorevListesi.appendChild(gorevDiv);

    // Tamamlandı Butonu
    const gorevTamamBtn = document.createElement('button');
    gorevTamamBtn.classList.add('gorev-btn');
    gorevTamamBtn.classList.add('gorev-btn-tamamlandı');
    gorevTamamBtn.innerHTML = ' <i class="fa fa-check-square" aria-hidden="true"></i>'
    gorevDiv.appendChild(gorevTamamBtn);
    
    // Sil Butonu
    const gorevSilBtn = document.createElement('button');
    gorevSilBtn.classList.add('gorev-btn');
    gorevSilBtn.classList.add('gorev-btn-sil');
    gorevSilBtn.innerHTML = ' <i class="fa fa-trash" aria-hidden="true"></i>'
    gorevDiv.appendChild(gorevSilBtn);

    
}

function localStorageKaydet(yeniGorev) {
    let gorevler;
    if (localStorage.getItem('gorevler') === null) {
        gorevler = [];
    }else{
        gorevler = JSON.parse(localStorage.getItem('gorevler'))
    }
    gorevler.push(yeniGorev)
    localStorage.setItem('gorevler', JSON.stringify(gorevler))
}

function localStorageOku() {
    let gorevler;
    if (localStorage.getItem('gorevler') === null) {
        gorevler = [];
    }else{
        gorevler = JSON.parse(localStorage.getItem('gorevler'))
    }

    gorevler.forEach(function (gorev) {
        gorevItemOlustur(gorev)
    });
    
}

function localStorageSil(gorev) {
    let gorevler;
    if (localStorage.getItem('gorevler') === null) {
        gorevler = [];
    }else{
        gorevler = JSON.parse(localStorage.getItem('gorevler'))
    }

    // splice item silme
    const silinecekElemanİndex = gorevler.indexOf(gorev);
    console.log(silinecekElemanİndex)
    gorevler.splice(silinecekElemanİndex,1);
    localStorage.setItem('gorevler', JSON.stringify(gorevler));

}