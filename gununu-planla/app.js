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
        vueGecenayGorevler: '',
        vueSonrakiayGorevler: '',
        vueikiayOnceGorevler: '',
        vueikiaySonraGorevler: '',
        compNumber: 0,
        istatistiklerModalDurumu: false,
        istatistikTarihi: '',
        vueYapilanGorevSayisi: '',
        vueYapilmayanGorevSayisi: '',
        basariOrani: '',
        birOncekiGunGorevlerArray: '',
        vuebogYapilanGorevSayisi: '',
        vuebogYapilmayanGorevSayisi: '',
        bogbasariOrani: '',
        basariDegisimi: '',
        pozOrNeg: '',
        istKayitligorevDurumu: true,
        basariDegisimiRenkDurumu: false,
        gorevlerAktarmaDurumu: false,
        benzerGorevlerDurumu: false,
        eksikGorevlerAktarmaDurumu: false,
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
            this.gorevleriGetirenTarih = this.secilenTarih;
            this.gorevleriGetir();
        },
        gorevleriGetir: function () {
            if (localStorage.getItem(this.gorevleriGetirenTarih) != null) {
                let gorevlerArray = JSON.parse(localStorage.getItem(this.gorevleriGetirenTarih));
                this.gorevlerArray = gorevlerArray;
            } else {
                this.gorevlerArray = [];
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
            this.istatistiklerModalDurumu = false;
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
            if (oAy - 1 == 0) {
                oAy = 13
            }
            return this.ayBelirle(oAy - 2)
        },
        birAyOnceBelirle: function () {
            let d = new Date();
            let oAy = d.getMonth() + 1;
            if (oAy - 1 == 0) {
                oAy = 13
            }
            return this.ayBelirle(oAy - 1)
        },
        ikiAySonraBelirle: function () {
            let d = new Date();
            let oAy = d.getMonth() + 1;
            if (oAy + 2 == 14) {
                oAy = 0
            }
            return this.ayBelirle(oAy + 2)
        },
        birAySonraBelirle: function () {
            let d = new Date();
            let oAy = d.getMonth() + 1;
            if (oAy + 1 == 13) {
                oAy = 0
            }
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
        istatistiklerModalAc: function () {
            if (this.gorevleriGetirenTarih == '') {
                this.istatistikTarihi = 'Lütfen bir tarih seçin!'
            } else {
                this.istatistikTarihi = this.gorevleriGetirenTarih
            }
            this.istatistiklerModalDurumu = true;

            if (localStorage.getItem(this.gorevleriGetirenTarih) != null) {
                let gorevlerArray = JSON.parse(localStorage.getItem(this.gorevleriGetirenTarih));
                this.gorevlerArray = gorevlerArray;
                this.istKayitligorevDurumu = false;
            } else {
                this.gorevlerArray = []
                this.istKayitligorevDurumu = true;
            }

            this.basariOraniHesaplama(this.gorevlerArray)

            // bir önceki güne ait başarı oranı hesaplama
            const event = new Date(this.gorevleriGetirenTarih);
            event.setUTCDate(event.getUTCDate() - 1)
            let birOncekiGunTarihi = event.toISOString().split('T')[0];
            this.vuebirOncekiGunTarihi = birOncekiGunTarihi;
            if (localStorage.getItem(birOncekiGunTarihi) != null) {
                let gorevlerArray = JSON.parse(localStorage.getItem(birOncekiGunTarihi));
                this.birOncekiGunGorevlerArray = gorevlerArray;
            }

            this.basariOraniHesaplama(this.birOncekiGunGorevlerArray)
        },
        basariOraniHesaplama: function (secilenGun) {
            let yapilanGorevSayisi = 0;
            let yapilmayanGorevSayisi = 0;
            if (secilenGun != '') {
                secilenGun.forEach(gorev => {
                    if (gorev.yapildiMi == true) {
                        yapilanGorevSayisi++
                    } else {
                        yapilmayanGorevSayisi++
                    }
                })

                if (secilenGun == this.gorevlerArray) {
                    this.vueYapilanGorevSayisi = yapilanGorevSayisi;
                    this.vueYapilmayanGorevSayisi = yapilmayanGorevSayisi;
                    this.basariOrani = parseInt((this.vueYapilanGorevSayisi * 100) / secilenGun.length);
                } else {
                    this.vuebogYapilanGorevSayisi = yapilanGorevSayisi;
                    this.vuebogYapilmayanGorevSayisi = yapilmayanGorevSayisi;
                    this.bogbasariOrani = parseInt((this.vuebogYapilanGorevSayisi * 100) / secilenGun.length);
                    this.basariDegisimi = Math.abs(this.basariOrani - this.bogbasariOrani);
                    if ((this.basariOrani - this.bogbasariOrani) < 0) {
                        this.pozOrNeg = '-'
                        this.basariDegisimiRenkDurumu = true;
                    } else {
                        this.pozOrNeg = ''
                        this.basariDegisimiRenkDurumu = false;
                    }
                }
            }

            if (localStorage.getItem(this.vuebirOncekiGunTarihi) == null) {
                this.basariDegisimi = 0;
            }

        },
        haftaninGununuBelirleme: function (tarih) {
            let d = new Date(tarih)
            switch (d.getDay()) {
                case 0:
                    return 'Pazar'
                    break;
                case 1:
                    return 'Pazartesi'
                    break;
                case 2:
                    return 'Salı'
                    break;
                case 3:
                    return 'Çarşamba'
                    break;
                case 4:
                    return 'Perşembe'
                    break;
                case 5:
                    return 'Cuma'
                    break;
                case 6:
                    return 'Cumartesi'
                    break;

                default:
                    break;
            }
        },
        gorevleriAktar: function () {
            let yapilmayanGorevler = [];
            const event = new Date(this.gorevleriGetirenTarih);
            event.setUTCDate(event.getUTCDate() + 1)
            let birSonrakiGunTarihi = event.toISOString().split('T')[0];

            this.gorevlerArray.forEach(gorev => {
                if (gorev.yapildiMi == false) {
                    let yeniGorev = {
                        tarih: birSonrakiGunTarihi,
                        gorevAdi: gorev.gorevAdi,
                        yapildiMi: false
                    }
                    yapilmayanGorevler.push(yeniGorev)
                }
            })
            let count = 0;
            let count2 = yapilmayanGorevler.length;
            JSON.parse(localStorage.getItem(birSonrakiGunTarihi)).forEach(gorev => {

                for (let index = 0; index < yapilmayanGorevler.length; index++) {
                    if (yapilmayanGorevler[index].gorevAdi == gorev.gorevAdi) {
                        count++
                        yapilmayanGorevler.splice(index, 1)
                    }

                }
            })

            function gorevleriAktarmaFun(durum) {
                if (localStorage.getItem(birSonrakiGunTarihi) == null) {
                    localStorage.setItem(birSonrakiGunTarihi, JSON.stringify([]))
                }

                let birSonrakiGunGorevleriaArray = JSON.parse(localStorage.getItem(birSonrakiGunTarihi));
                yapilmayanGorevler.forEach(gorev => {
                    birSonrakiGunGorevleriaArray.push(gorev);
                })

                localStorage.setItem(birSonrakiGunTarihi, JSON.stringify(birSonrakiGunGorevleriaArray))
                this.benzerGorevlerDurumu = false;
                durum;
                this.compNumber++
            }

            // Aktarma İşlemleri
            if (count2 == yapilmayanGorevler.length) {
                gorevleriAktarmaFun(this.gorevlerAktarmaDurumu = true)
            } else if (count != count2) {
                gorevleriAktarmaFun(this.eksikGorevlerAktarmaDurumu = true)
            } else {
                this.gorevlerAktarmaDurumu = false;
                this.eksikGorevlerAktarmaDurumu = false;
                this.benzerGorevlerDurumu = true;
            }

        }

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
        },
        gecenAyaAitGorevleriGetir: function () {
            this.compNumber
            let d = new Date();
            let oSene = d.getFullYear();
            let oAyNo = parseInt(d.toISOString().split('-')[1]) - 1;
            let gecenAyaAitGorevlerListesi = [];

            if (oAyNo == 0) {
                oAyNo = 12
                oSene = oSene - 1
            }

            if (oAyNo < 10) {
                oAyNo = "0" + oAyNo
            }

            for (let i = 0; i <= 31; i++) {
                let kayıtliTarih;
                if (i < 10) {
                    kayıtliTarih = localStorage.getItem(`${oSene}-${oAyNo}-0${i}`)
                    if (localStorage.getItem(`${oSene}-${oAyNo}-0${i}`) != null) {
                        for (let j = 0; j < JSON.parse(kayıtliTarih).length; j++) {
                            gecenAyaAitGorevlerListesi.push(JSON.parse(kayıtliTarih)[j])
                        }
                    }
                } else {
                    kayıtliTarih = localStorage.getItem(`${oSene}-${oAyNo}-${i}`)
                    if (localStorage.getItem(`${oSene}-${oAyNo}-${i}`) != null) {
                        for (let j = 0; j < JSON.parse(kayıtliTarih).length; j++) {
                            gecenAyaAitGorevlerListesi.push(JSON.parse(kayıtliTarih)[j])
                        }
                    }
                }

            }

            this.vueGecenayGorevler = gecenAyaAitGorevlerListesi;

        },
        sonrakiAyaAitGorevleriGetir: function () {
            this.compNumber
            let d = new Date();
            let oSene = d.getFullYear();
            let oAyNo = parseInt(d.toISOString().split('-')[1]) + 1;
            let sonrakiAyaAitGorevlerListesi = [];

            if (oAyNo == 13) {
                oAyNo = 1
                oSene = oSene + 1
            }

            if (oAyNo < 10) {
                oAyNo = "0" + oAyNo
            }

            for (let i = 0; i <= 31; i++) {
                let kayıtliTarih;
                if (i < 10) {
                    kayıtliTarih = localStorage.getItem(`${oSene}-${oAyNo}-0${i}`)
                    if (localStorage.getItem(`${oSene}-${oAyNo}-0${i}`) != null) {
                        for (let j = 0; j < JSON.parse(kayıtliTarih).length; j++) {
                            sonrakiAyaAitGorevlerListesi.push(JSON.parse(kayıtliTarih)[j])
                        }
                    }
                } else {
                    kayıtliTarih = localStorage.getItem(`${oSene}-${oAyNo}-${i}`)
                    if (localStorage.getItem(`${oSene}-${oAyNo}-${i}`) != null) {
                        for (let j = 0; j < JSON.parse(kayıtliTarih).length; j++) {
                            sonrakiAyaAitGorevlerListesi.push(JSON.parse(kayıtliTarih)[j])
                        }
                    }
                }

            }

            this.vueSonrakiayGorevler = sonrakiAyaAitGorevlerListesi;

        },
        birSonrakiAyaAitGorevleriGetir: function () {
            this.compNumber
            let d = new Date();
            let oSene = d.getFullYear();
            let oAyNo = parseInt(d.toISOString().split('-')[1]) + 2;
            let birSonrakiAyaAitGorevlerListesi = [];

            if (oAyNo == 14) {
                oAyNo = 2
                oSene = oSene + 1
            }

            if (oAyNo < 10) {
                oAyNo = "0" + oAyNo
            }

            for (let i = 0; i <= 31; i++) {
                let kayıtliTarih;
                if (i < 10) {
                    kayıtliTarih = localStorage.getItem(`${oSene}-${oAyNo}-0${i}`)
                    if (localStorage.getItem(`${oSene}-${oAyNo}-0${i}`) != null) {
                        for (let j = 0; j < JSON.parse(kayıtliTarih).length; j++) {
                            birSonrakiAyaAitGorevlerListesi.push(JSON.parse(kayıtliTarih)[j])
                        }
                    }
                } else {
                    kayıtliTarih = localStorage.getItem(`${oSene}-${oAyNo}-${i}`)
                    if (localStorage.getItem(`${oSene}-${oAyNo}-${i}`) != null) {
                        for (let j = 0; j < JSON.parse(kayıtliTarih).length; j++) {
                            birSonrakiAyaAitGorevlerListesi.push(JSON.parse(kayıtliTarih)[j])
                        }
                    }
                }

            }

            this.vueikiaySonraGorevler = birSonrakiAyaAitGorevlerListesi;
        },
        birOncekiAyaAitGorevleriGetir: function () {
            this.compNumber
            let d = new Date();
            let oSene = d.getFullYear();
            let oAyNo = parseInt(d.toISOString().split('-')[1]) - 2;
            let birOncekiAyaAitGorevlerListesi = [];

            if (oAyNo == -1) {
                oAyNo = 11
                oSene = oSene - 1
            }

            if (oAyNo < 10) {
                oAyNo = "0" + oAyNo
            }

            for (let i = 0; i <= 31; i++) {
                let kayıtliTarih;
                if (i < 10) {
                    kayıtliTarih = localStorage.getItem(`${oSene}-${oAyNo}-0${i}`)
                    if (localStorage.getItem(`${oSene}-${oAyNo}-0${i}`) != null) {
                        for (let j = 0; j < JSON.parse(kayıtliTarih).length; j++) {
                            birOncekiAyaAitGorevlerListesi.push(JSON.parse(kayıtliTarih)[j])
                        }
                    }
                } else {
                    kayıtliTarih = localStorage.getItem(`${oSene}-${oAyNo}-${i}`)
                    if (localStorage.getItem(`${oSene}-${oAyNo}-${i}`) != null) {
                        for (let j = 0; j < JSON.parse(kayıtliTarih).length; j++) {
                            birOncekiAyaAitGorevlerListesi.push(JSON.parse(kayıtliTarih)[j])
                        }
                    }
                }

            }

            this.vueikiayOnceGorevler = birOncekiAyaAitGorevlerListesi;

        }
    },
    watch: {
        gorevleriGetirenTarih: function () {
            this.gorevleriGetir();
            this.gorevlerAktarmaDurumu = false;
            this.eksikGorevlerAktarmaDurumu = false;
            this.benzerGorevlerDurumu = false;
        }
    }
})