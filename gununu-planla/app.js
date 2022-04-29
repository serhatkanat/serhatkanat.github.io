new Vue({
    el: "#app",
    data: {
        kacTaneEklesin: '',
        sayiKacTaneEklesin: 0,
        secilenTarih: '',
        gorevleriGetirenTarih: '',
        gorevlerArray: '',
        cizgiDurumu: false,
        isInfo: true,
        duzenlenenGorev: '',
        modalDurumu: false,
        yeniGorevAdi: '',
        kaydetIndexNo: '',
        favoriGorevlerArray: localStorage.getItem('favoriGorevler') == null ? [] : JSON.parse(localStorage.getItem('favoriGorevler')),
        favoriModalDurumu: false
    },
    methods: {
        inputEkle: function () {
            this.sayiKacTaneEklesin = this.sayiKacTaneEklesin + parseInt(this.kacTaneEklesin);
        },
        inputlariSil: function () {
            this.sayiKacTaneEklesin = 0;
        },
        gorevleriKaydet: function () {

            if (this.secilenTarih == '') {
                alert("Görevleri Kaydetmek İçin Lütfen Bir Tarih Seçin")
            } else {
                let gorevInput = document.querySelectorAll('.gorev');
                let gorevler;
                if (localStorage.getItem(this.secilenTarih) == null) {
                    gorevler = [];
                } else {
                    gorevler = JSON.parse(localStorage.getItem(this.secilenTarih))
                }

                for (let i = 0; i < this.sayiKacTaneEklesin; i++) {

                    let yeniGorev = {
                        tarih: this.secilenTarih,
                        gorevAdi: gorevInput[i].value,
                        yapildiMi: false
                    }

                    if (gorevInput[i].value == '') {
                        //eğer input boşsa kaydetme olmayacak
                    } else {
                        gorevler.push(yeniGorev)
                    }

                }

                localStorage.setItem(this.secilenTarih, JSON.stringify(gorevler))
            }

        },
        gorevleriGetir: function () {
            let gorevlerArray = JSON.parse(localStorage.getItem(this.gorevleriGetirenTarih));
            this.gorevlerArray = gorevlerArray;
        },
        gorevYapildi: function (event) {
            let indexNo = event.target.parentElement.children[0].innerText;
            this.gorevlerArray[indexNo - 1].yapildiMi = true;
            gorevler = this.gorevlerArray;
            localStorage.setItem(this.gorevlerArray[indexNo - 1].tarih, JSON.stringify(gorevler))
        },
        gorevDuzenle: function (event) {
            this.modalDurumu = true;
            let indexNo = event.target.parentElement.children[0].innerText;
            this.kaydetIndexNo = indexNo
            this.duzenlenenGorev = this.gorevlerArray[indexNo - 1]
        },
        gorevSil: function (event) {
            let indexNo = event.target.parentElement.children[0].innerText;
            this.gorevlerArray.splice(indexNo - 1, 1)
            gorevler = this.gorevlerArray;
            localStorage.setItem(this.gorevlerArray[indexNo - 1].tarih, JSON.stringify(gorevler))
        },
        duzenleKaydet: function () {
            console.log(this.kaydetIndexNo - 1);
            console.log(this.yeniGorevAdi);
            console.log(this.duzenlenenGorev);

            this.gorevlerArray[this.kaydetIndexNo - 1].gorevAdi = this.yeniGorevAdi;
            this.gorevlerArray[this.kaydetIndexNo - 1].yapildiMi = false;
            gorevler = this.gorevlerArray;
            localStorage.setItem(this.gorevlerArray[this.kaydetIndexNo - 1].tarih, JSON.stringify(gorevler))

            let modaliKapat = this.modalKapat;
            setTimeout(modaliKapat, 1000)
        },
        modalKapat: function () {
            this.favoriModalDurumu = false;
            this.modalDurumu = false;
            this.yeniGorevAdi = '';
        },
        favorilereKaydet: function (event) {

            if (localStorage.getItem('favoriGorevler') == null) {
                gorevler = [];
            } else {
                gorevler = JSON.parse(localStorage.getItem('favoriGorevler'));
            }

            if (event.target.parentElement.children[1].value.length == 0) {
                //boş kutuyu favorilere eklemez
            } else {
                gorevler.push(event.target.parentElement.children[1].value)
            }


            localStorage.setItem('favoriGorevler', JSON.stringify(gorevler))
        },
        favoriModalOpen: function () {
            this.favoriModalDurumu = true;
        }
    }
})
