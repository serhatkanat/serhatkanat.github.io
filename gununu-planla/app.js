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
        favoriModalDurumu: false,
        kopyalananGorev: localStorage.getItem('kopyalanan görev'),
        inputHatasiDurumu: false,
        gorevlerKaydetDurumu: false,
        gorevlerKaydedilmediDurumu: false,
        vueOayGorevler: '',
        compNumber: 0,
    },
    methods: {
        inputEkle: function () {
            if (parseInt(this.kacTaneEklesin) <= 0 || parseInt(this.kacTaneEklesin) >= 26 || this.kacTaneEklesin == '') {
                this.inputHatasiDurumu = true;
                this.uyarilariZamanlaKapat()
            } else {
                this.sayiKacTaneEklesin = this.sayiKacTaneEklesin + parseInt(this.kacTaneEklesin);
                this.gorevlerKaydetDurumu = false;
                this.gorevlerKaydedilmediDurumu = false;
            }
        },
        inputlariSil: function () {
            this.sayiKacTaneEklesin = 0;
            this.gorevlerKaydetDurumu = false;
            this.gorevlerKaydedilmediDurumu = false;
        },
        gorevleriKaydet: function () {
            this.compNumber++
            if (this.secilenTarih == '') {
                alert("Görevleri Kaydetmek İçin Lütfen Bir Tarih Seçin")
            } else {
                let gorevInput = document.querySelectorAll('.gorev');
                let gorevler;
                let count = 0;
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
                        this.gorevlerKaydedilmediDurumu = false;
                        this.gorevlerKaydetDurumu = true;
                        count++
                    }

                }

                if (count == 0) {
                    this.gorevlerKaydetDurumu = false;
                    this.gorevlerKaydedilmediDurumu = true;
                }

                localStorage.setItem(this.secilenTarih, JSON.stringify(gorevler))
            }

        },
        gorevleriGetir: function () {
            if (localStorage.getItem(this.gorevleriGetirenTarih) != null) {
                let gorevlerArray = JSON.parse(localStorage.getItem(this.gorevleriGetirenTarih));
                this.gorevlerArray = gorevlerArray;
            }


        },
        gorevYapildi: function (event) {
            let indexNo = event.target.parentElement.children[0].innerText;
            this.gorevlerArray[indexNo - 1].yapildiMi = true;
            gorevler = this.gorevlerArray;
            localStorage.setItem(this.gorevlerArray[indexNo - 1].tarih, JSON.stringify(gorevler));
            this.compNumber++
        },
        gorevDuzenle: function (event) {
            this.modalDurumu = true;
            let indexNo = event.target.parentElement.children[0].innerText;
            this.kaydetIndexNo = indexNo
            this.duzenlenenGorev = this.gorevlerArray[indexNo - 1]
            this.compNumber++
        },
        gorevSil: function (event) {
            let indexNo = event.target.parentElement.children[0].innerText;
            gorevler = this.gorevlerArray;
            let gorevlerTarih = gorevler[0].tarih;
            gorevler.splice(indexNo - 1, 1)
            localStorage.setItem(gorevlerTarih, JSON.stringify(gorevler))
            this.compNumber++
        },
        duzenleKaydet: function () {
            this.gorevlerArray[this.kaydetIndexNo - 1].gorevAdi = this.yeniGorevAdi;
            this.gorevlerArray[this.kaydetIndexNo - 1].yapildiMi = false;
            gorevler = this.gorevlerArray;
            localStorage.setItem(this.gorevlerArray[this.kaydetIndexNo - 1].tarih, JSON.stringify(gorevler))
            let modaliKapat = this.modalKapat;
            setTimeout(modaliKapat, 1000)
            this.compNumber++
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
        gorevlerdekiFavorileriKaydet: function (event) {

            if (localStorage.getItem('favoriGorevler') == null) {
                gorevler = [];
            } else {
                gorevler = JSON.parse(localStorage.getItem('favoriGorevler'));
            }

            if (false) {
                //boş kutuyu favorilere eklemez
            } else {
                gorevler.push(event.target.parentElement.parentElement.parentElement.children[1].innerText)
            }


            localStorage.setItem('favoriGorevler', JSON.stringify(gorevler))
        },
        favoriModalOpen: function () {
            this.favoriModalDurumu = true;
            this.favoriGorevlerArray = localStorage.getItem('favoriGorevler') == null ? [] : JSON.parse(localStorage.getItem('favoriGorevler'))
        },
        favoriKopyala: function (event) {
            navigator.clipboard.writeText(event.target.parentElement.parentElement.children[0].children[1].innerText);
            this.kopyalananGorev = event.target.parentElement.parentElement.children[0].children[1].innerText;
            localStorage.setItem('kopyalanan görev', this.kopyalananGorev)
        },
        favoriYapistir: function (event) {
            event.target.parentElement.children[1].value = this.kopyalananGorev;
        },
        favoriSil: function (event) {
            let favoriSilIndexNo = event.target.parentElement.parentElement.children[1].innerText;
            let favoriSilinenArray;
            this.favoriGorevlerArray.splice(favoriSilIndexNo, 1);
            favoriSilinenArray = this.favoriGorevlerArray;
            localStorage.setItem('favoriGorevler', JSON.stringify(favoriSilinenArray))
        },
        uyariKapat: function (event) {

            if (event.target.parentElement.classList.contains('inputHatasiDanger')) {
                this.inputHatasiDurumu = false;
            } else if (event.target.parentElement.classList.contains('gorevlerKaydetSucces')) {
                this.gorevlerKaydetDurumu = false;
            } else if (event.target.parentElement.classList.contains('gorevlerKaydedilmediWarning')) {
                this.gorevlerKaydedilmediDurumu = false;
            }
        },
        uyarilariZamanlaKapat: function () {
            setTimeout(() => {
                this.inputHatasiDurumu = false;
            }, 3500)
        },
        ayBelirle: function (ayNo) {
            switch (ayNo) {
                case 1:
                    return 'Ocak'
                    break;
                case 2:
                    return 'Şubat'
                    break;
                case 3:
                    return 'Mart'
                    break;
                case 4:
                    return 'Nisan'
                    break;
                case 5:
                    return 'Mayıs'
                    break;
                case 6:
                    return 'Haziran'
                    break;
                case 7:
                    return 'Temmuz'
                    break;
                case 8:
                    return 'Ağustos'
                    break;
                case 9:
                    return 'Eylül'
                    break;
                case 10:
                    return 'Ekim'
                    break;

                case 11:
                    return 'Kasım'
                    break;
                case 12:
                    return 'Aralık'
                    break;

                default:
                    break;
            }
        },
        buAyBelirle: function () {
            let d = new Date();
            let oAy = d.getMonth() + 1;
            return this.ayBelirle(oAy)
        },
        ikiAyOnceBelirle: function () {
            let d = new Date();
            let oAy = d.getMonth() + 1;
            return this.ayBelirle(oAy - 2)
        },
        birAyOnceBelirle: function () {
            let d = new Date();
            let oAy = d.getMonth() + 1;
            return this.ayBelirle(oAy - 1)
        },
        ikiAySonraBelirle: function () {
            let d = new Date();
            let oAy = d.getMonth() + 1;
            return this.ayBelirle(oAy + 2)
        },
        birAySonraBelirle: function () {
            let d = new Date();
            let oAy = d.getMonth() + 1;
            return this.ayBelirle(oAy + 1)
        },
        genelBakisDivi(event) {
            let genelBakisAylari = document.querySelectorAll('.genel-bakis-aylar');

            genelBakisAylari.forEach(ay => {
                let ayDivId = document.querySelector(`#${ay.id}-div`);

                if (event.target.id == ay.id) {
                    ayDivId.style.display = 'block'
                    ay.classList.add('is-active');
                    ay.classList.add('bold-weight');
                } else {
                    ayDivId.style.display = 'none'
                    ay.classList.remove('is-active');
                    ay.classList.remove('bold-weight');
                }
            })


        },
        
    },
    computed: {
        oAyaAitGorevleriGetir: function () {
            this.compNumber
            let d = new Date();
            let oSene = d.getFullYear();
            let oAyNo = d.toISOString().split('-')[1];
            let oAyaAitGorevlerListesi = [];

            for (let i = 0; i <= 31; i++) {
                let kayıtliTarih;
                if (i < 10) {
                    kayıtliTarih = localStorage.getItem(`${oSene}-${oAyNo}-0${i}`)
                    if (localStorage.getItem(`${oSene}-${oAyNo}-0${i}`) != null) {
                        for (let j = 0; j < JSON.parse(kayıtliTarih).length; j++) {
                            oAyaAitGorevlerListesi.push(JSON.parse(kayıtliTarih)[j])
                        }
                    }
                } else {
                    kayıtliTarih = localStorage.getItem(`${oSene}-${oAyNo}-${i}`)
                    if (localStorage.getItem(`${oSene}-${oAyNo}-${i}`) != null) {
                        for (let j = 0; j < JSON.parse(kayıtliTarih).length; j++) {
                            oAyaAitGorevlerListesi.push(JSON.parse(kayıtliTarih)[j])
                        }
                    }
                }

            }

            this.vueOayGorevler = oAyaAitGorevlerListesi;
        }
    }
})