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
        kaydetIndexNo: ''
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

                    gorevler.push(yeniGorev)
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

        duzenleKaydet: function () {
            console.log(this.kaydetIndexNo - 1);
            console.log(this.yeniGorevAdi);
            console.log(this.duzenlenenGorev);

            this.gorevlerArray[this.kaydetIndexNo - 1].gorevAdi = this.yeniGorevAdi;
            this.gorevlerArray[this.kaydetIndexNo - 1].yapildiMi = false;
            gorevler = this.gorevlerArray;
            localStorage.setItem(this.gorevlerArray[this.kaydetIndexNo - 1].tarih, JSON.stringify(gorevler))

            let modaliKapat = this.modalKapat;
            setTimeout(modaliKapat,1500)
        },
        modalKapat: function () {
            this.modalDurumu = false;
            this.yeniGorevAdi = '';
        }
    }
})