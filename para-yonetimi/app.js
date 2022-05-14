new Vue({
    el: "#app",
    data: {
        harcamalarDurum: true,
        varliklarDurum: false,
        borclarDurum: false,
        aciklama: '',
        tutar: '',
        tarih: '',
        neredenHarcandi: '',
        nakit: localStorage.getItem('nakit') == null ? '0' : JSON.parse(localStorage.getItem('nakit')),
        ziraat: localStorage.getItem('ziraat') == null ? '0' : JSON.parse(localStorage.getItem('ziraat')),
        enPara: localStorage.getItem('enPara') == null ? '0' : JSON.parse(localStorage.getItem('enPara')),
        papara: localStorage.getItem('papara') == null ? '0' : JSON.parse(localStorage.getItem('papara')),
        isBankasi: localStorage.getItem('isBankasi') == null ? '0' : JSON.parse(localStorage.getItem('isBankasi')),
        diger: localStorage.getItem('diger') == null ? '0' : JSON.parse(localStorage.getItem('diger')),
        eklenenTutar: '',
        nereyeEklendi: '',
        secilenTarih: [],
        v_gunlukToplamTutar: '',
        v_ToplamVarlik: '',
        v_ToplamBorc: '',
        harclikBoxDurumu: true,
        ziraatBoxDurumu: false,
        isBoxDurumu: false,
        digerBoxDurumu: false,
        harclikBorcTutari: '',
        ziraatBorcTutari: '',
        isBorcTutari: '',
        digerBorcTutari: '',
        harclikNotKutusu: localStorage.getItem('Harçlık Not Kutusu') == null ? '' : localStorage.getItem('Harçlık Not Kutusu'),
        ziraatNotKutusu: localStorage.getItem('Zirrat Not Kutusu') == null ? '' : localStorage.getItem('Zirrat Not Kutusu'),
        isNotKutusu: localStorage.getItem('İş Bankası Not Kutusu') == null ? '' : localStorage.getItem('İş Bankası Not Kutusu'),
        digerNotKutusu: localStorage.getItem('Diğer Borç Not Kutusu') == null ? '' : localStorage.getItem('Diğer Borç Not Kutusu'),
        harclikKaydetBtn: false,
        ziraatKaydetBtn: false,
        isKaydetBtn: false,
        digerKaydetBtn: false,
        harclikBorcTutari: localStorage.getItem('harclikBorcTutari') == null ? 0 : localStorage.getItem('harclikBorcTutari'),
        ziraatBorcTutari: localStorage.getItem('ziraatBorcTutari') == null ? 0 : localStorage.getItem('ziraatBorcTutari'),
        isBorcTutari: localStorage.getItem('isBorcTutari') == null ? 0 : localStorage.getItem('isBorcTutari'),
        digerBorcTutari: localStorage.getItem('digerBorcTutari') == null ? 0 : localStorage.getItem('digerBorcTutari'),
    },
    methods: {
        harcamalarFonk: function () {
            this.harcamalarDurum = true;
            this.varliklarDurum = false;
            this.borclarDurum = false;
        },
        varliklarFonk: function () {
            this.harcamalarDurum = false;
            this.varliklarDurum = true;
            this.borclarDurum = false;
        },
        borclarFonk: function () {
            this.harcamalarDurum = false;
            this.varliklarDurum = false;
            this.borclarDurum = true;
        },
        gunlukTutarHesaplama: function () {
            let gunlukToplamTutar = 0;

            for (let i = 0; i < this.secilenTarih.length; i++) {
                gunlukToplamTutar = gunlukToplamTutar + parseFloat(this.secilenTarih[i].tutar)
            }

            this.v_gunlukToplamTutar = gunlukToplamTutar;

        },
        harcamaEkle: function () {
            let harcamalar;
            if (localStorage.getItem(this.tarih) == null) {
                harcamalar = [];
            } else {
                harcamalar = JSON.parse(localStorage.getItem(this.tarih));
            }

            let yeniHarcama = {
                aciklama: this.aciklama,
                tutar: this.tutar,
                neredenHarcandi: this.neredenHarcandi,
                tarih: this.tarih
            }

            harcamalar.push(yeniHarcama);

            localStorage.setItem(this.tarih, JSON.stringify(harcamalar))
            this.tarihDegisti();

            //Hesap fonksiyonları
            switch (this.neredenHarcandi) {
                case "Nakit":
                    this.nakitHarcamasi(this.tutar)
                    break;
                case "Ziraat Bankası":
                    this.ziraatHarcamasi(this.tutar)
                    break;
                case "Enpara":
                    this.enParaHarcamasi(this.tutar)
                    break;
                case "Papara":
                    this.paparaHarcamasi(this.tutar)
                    break;
                case "İş Bankası":
                    this.isBankasiHarcamasi(this.tutar)
                    break;
                case "Diğer":
                    this.digerHarcamasi(this.tutar)
                    break;
                case "Harçlık Avans":
                    this.harclikAvansHarcanmasi(this.tutar)
                    break;
                case "Maximum":
                    this.maximumHarcanmasi(this.tutar)
                    break;
                case "Genç Kart":
                    this.gencKartHarcanmasi(this.tutar)
                    break;
                case "Diğer Borç":
                    this.digerBorcHarcanmasi(this.tutar)
                    break;
                default:
                    console.log("hiç biri");
                    break;
            }

        },
        harcamaSil: function (event) {
            let tiklanilanHarcamaIndexNo = event.target.parentElement.children[0].innerText;
            let harcamalar;
            harcamalar = JSON.parse(localStorage.getItem(this.tarih));
            harcamalar.splice(tiklanilanHarcamaIndexNo, 1);
            localStorage.setItem(this.tarih, JSON.stringify(harcamalar))
            this.tarihDegisti();
        },
        tarihDegisti: function () {
            this.secilenTarih = JSON.parse(localStorage.getItem(this.tarih))
            this.gunlukTutarHesaplama();
        },
        asilTarihDegisti: function () {
            this.tarihDegisti();
        },
        paraEkle: function (eklenenTutar) {
            eklenenTutar = this.eklenenTutar;
            switch (this.nereyeEklendi) {
                case "Nakit":
                    yeniTutar = parseFloat(this.nakit) + parseFloat(eklenenTutar);
                    localStorage.setItem('nakit', JSON.stringify(yeniTutar))
                    this.nakit = yeniTutar
                    break;
                case "Ziraat Bankası":
                    yeniTutar = parseFloat(this.ziraat) + parseFloat(eklenenTutar);
                    localStorage.setItem('ziraat', JSON.stringify(yeniTutar))
                    this.ziraat = yeniTutar
                    break;
                case "Enpara":
                    yeniTutar = parseFloat(this.enPara) + parseFloat(eklenenTutar);
                    localStorage.setItem('enPara', JSON.stringify(yeniTutar))
                    this.enPara = yeniTutar
                    break;
                case "Papara":
                    yeniTutar = parseFloat(this.papara) + parseFloat(eklenenTutar);
                    localStorage.setItem('papara', JSON.stringify(yeniTutar))
                    this.papara = yeniTutar
                    break;
                case "İş Bankası":
                    yeniTutar = parseFloat(this.isBankasi) + parseFloat(eklenenTutar);
                    localStorage.setItem('isBankasi', JSON.stringify(yeniTutar))
                    this.isBankasi = yeniTutar
                    break;
                case "Diğer":
                    yeniTutar = parseFloat(this.diger) + parseFloat(eklenenTutar);
                    localStorage.setItem('diger', JSON.stringify(yeniTutar))
                    this.diger = yeniTutar
                    break;
                default:
                    console.log("hiç biri");
                    break;
            }
        },
        nakitHarcamasi: function (tutar) {
            let nakit;
            if (localStorage.getItem('nakit') == null) {
                nakit = 0;
            } else {
                nakit = JSON.parse(localStorage.getItem('nakit'));
            }

            let yeniTutar = parseFloat(nakit) - parseFloat(tutar);
            localStorage.setItem('nakit', JSON.stringify(yeniTutar))
            this.nakit = yeniTutar
        },
        ziraatHarcamasi: function (tutar) {
            let ziraat;
            if (localStorage.getItem('ziraat') == null) {
                ziraat = 0;
            } else {
                ziraat = JSON.parse(localStorage.getItem('ziraat'));
            }

            let yeniTutar = parseFloat(ziraat) - parseFloat(tutar);
            localStorage.setItem('ziraat', JSON.stringify(yeniTutar))
            this.ziraat = yeniTutar
        },
        enParaHarcamasi: function (tutar) {
            let enPara;
            if (localStorage.getItem('enPara') == null) {
                enPara = 0;
            } else {
                enPara = JSON.parse(localStorage.getItem('enPara'));
            }

            let yeniTutar = parseFloat(enPara) - parseFloat(tutar);
            localStorage.setItem('enPara', JSON.stringify(yeniTutar))
            this.enPara = yeniTutar
        },
        paparaHarcamasi: function (tutar) {
            let papara;
            if (localStorage.getItem('papara') == null) {
                papara = 0;
            } else {
                papara = JSON.parse(localStorage.getItem('papara'));
            }

            let yeniTutar = parseFloat(papara) - parseFloat(tutar);
            localStorage.setItem('papara', JSON.stringify(yeniTutar))
            this.papara = yeniTutar
        },
        isBankasiHarcamasi: function (tutar) {
            let isBankasi;
            if (localStorage.getItem('isBankasi') == null) {
                isBankasi = 0;
            } else {
                isBankasi = JSON.parse(localStorage.getItem('isBankasi'));
            }

            let yeniTutar = parseFloat(isBankasi) - parseFloat(tutar);
            localStorage.setItem('isBankasi', JSON.stringify(yeniTutar))
            this.isBankasi = yeniTutar
        },
        digerHarcamasi: function (tutar) {
            let diger;
            if (localStorage.getItem('diger') == null) {
                diger = 0;
            } else {
                diger = JSON.parse(localStorage.getItem('diger'));
            }

            let yeniTutar = parseFloat(diger) - parseFloat(tutar);
            localStorage.setItem('diger', JSON.stringify(yeniTutar))
            this.diger = yeniTutar
        },
        hesapTutariDuzenle: function (event) {
            let tiklanilanEleman = event.target.parentElement.parentElement.children[0].children[0].innerText;

            if (tiklanilanEleman == 'Nakit') {
                let yeniMiktar = parseFloat(prompt("Şu Anki Miktar: " + this.nakit));
                if (isNaN(yeniMiktar)) {
                    yeniMiktar = this.nakit
                }
                localStorage.setItem('nakit', JSON.stringify(yeniMiktar))
                this.nakit = yeniMiktar
            } else if (tiklanilanEleman == 'Ziraat Bankası') {
                let yeniMiktar = parseFloat(prompt("Şu Anki Miktar: " + this.ziraat));
                if (isNaN(yeniMiktar)) {
                    yeniMiktar = this.ziraat
                }
                localStorage.setItem('ziraat', JSON.stringify(yeniMiktar))
                this.ziraat = yeniMiktar
            } else if (tiklanilanEleman == 'Enpara') {
                let yeniMiktar = parseFloat(prompt("Şu Anki Miktar: " + this.enPara));
                if (isNaN(yeniMiktar)) {
                    yeniMiktar = this.enPara
                }
                localStorage.setItem('enpara', JSON.stringify(yeniMiktar))
                this.enPara = yeniMiktar
            } else if (tiklanilanEleman == 'Papara') {
                let yeniMiktar = parseFloat(prompt("Şu Anki Miktar: " + this.papara));
                if (isNaN(yeniMiktar)) {
                    yeniMiktar = this.papara
                }
                localStorage.setItem('papara', JSON.stringify(yeniMiktar))
                this.papara = yeniMiktar
            } else if (tiklanilanEleman == 'İş Bankası') {
                let yeniMiktar = parseFloat(prompt("Şu Anki Miktar: " + this.isBankasi));
                if (isNaN(yeniMiktar)) {
                    yeniMiktar = this.isBankasi
                }
                localStorage.setItem('isBankasi', JSON.stringify(yeniMiktar))
                this.isBankasi = yeniMiktar
            } else if (tiklanilanEleman == 'Diğer') {
                let yeniMiktar = parseFloat(prompt("Şu Anki Miktar: " + this.diger));
                if (isNaN(yeniMiktar)) {
                    yeniMiktar = this.diger
                }
                localStorage.setItem('diger', JSON.stringify(yeniMiktar))
                this.diger = yeniMiktar
            }
            this.toplamVarlikHesaplama

        },
        tiklanilanTabLi: function (event) {

            let tiklanilanLiler = document.querySelectorAll('.tiklanilanLiler');

            switch (event.target.id) {
                case 'harclikAvans':
                    this.harclikBoxDurumu = true;
                    this.ziraatBoxDurumu = false;
                    this.isBoxDurumu = false;
                    this.digerBoxDurumu = false;
                    break;
                case 'zirratBorc':
                    this.harclikBoxDurumu = false;
                    this.ziraatBoxDurumu = true;
                    this.isBoxDurumu = false;
                    this.digerBoxDurumu = false;
                    break;
                case 'isBorc':
                    this.harclikBoxDurumu = false;
                    this.ziraatBoxDurumu = false;
                    this.isBoxDurumu = true;
                    this.digerBoxDurumu = false;
                    break;
                case 'digerBorc':
                    this.harclikBoxDurumu = false;
                    this.ziraatBoxDurumu = false;
                    this.isBoxDurumu = false;
                    this.digerBoxDurumu = true;
                    break;

                default:
                    break;
            }

            tiklanilanLiler.forEach(tiklanilanLi => {

                if (event.target.id == tiklanilanLi.id) {
                    tiklanilanLi.parentElement.classList.add('is-active');
                } else {
                    tiklanilanLi.parentElement.classList.remove('is-active');
                }

            });

        },
        borcNotuKaydet: function (event) {

            event.target.parentElement.parentElement.children[1];

            switch (event.target.id) {
                case 'harclikNotKutusuId':
                    localStorage.setItem('Harçlık Not Kutusu', this.harclikNotKutusu)
                    this.harclikKaydetBtn = false;
                    break;
                case 'ziraatNotKutusuId':
                    localStorage.setItem('Zirrat Not Kutusu', this.ziraatNotKutusu)
                    this.ziraatKaydetBtn = false
                    break;
                case 'isNotKutusuId':
                    localStorage.setItem('İş Bankası Not Kutusu', this.isNotKutusu)
                    this.isKaydetBtn = false
                    break;
                case 'digerNotKutusuId':
                    localStorage.setItem('Diğer Borç Not Kutusu', this.digerNotKutusu)
                    this.digerKaydetBtn = false
                    break;

                default:
                    break;
            }

        },
        borcTutariDuzenle: function (event) {
            let tiklanilanEleman = event.target.parentElement.parentElement.children[0].innerText;

            switch (tiklanilanEleman) {
                case 'harclik':
                    let yeniBorc = parseFloat(prompt("Şu Anki Borç: " + this.harclikBorcTutari));
                    if (isNaN(yeniBorc)) {
                        yeniBorc = this.harclikBorcTutari
                    }
                    localStorage.setItem('harclikBorcTutari', JSON.stringify(yeniBorc))
                    this.harclikBorcTutari = yeniBorc
                    break;
                case 'ziraat':
                    let yeniBorc1 = parseFloat(prompt("Şu Anki Borç: " + this.ziraatBorcTutari));
                    if (isNaN(yeniBorc1)) {
                        yeniBorc1 = this.ziraatBorcTutari
                    }
                    localStorage.setItem('ziraatBorcTutari', JSON.stringify(yeniBorc1))
                    this.ziraatBorcTutari = yeniBorc1
                    break;
                case 'isBank':
                    let yeniBorc2 = parseFloat(prompt("Şu Anki Borç: " + this.isBorcTutari));
                    if (isNaN(yeniBorc2)) {
                        yeniBorc2 = this.isBorcTutari
                    }
                    localStorage.setItem('isBorcTutari', JSON.stringify(yeniBorc2))
                    this.isBorcTutari = yeniBorc2
                    break;
                case 'diger':
                    let yeniBorc3 = parseFloat(prompt("Şu Anki Borç: " + this.digerBorcTutari));
                    if (isNaN(yeniBorc3)) {
                        yeniBorc3 = this.digerBorcTutari
                    }
                    localStorage.setItem('digerBorcTutari', JSON.stringify(yeniBorc3))
                    this.digerBorcTutari = yeniBorc3
                    break;
                default:
                    break;
            }
        },
        harclikAvansHarcanmasi: function (tutar) {
            let harclikBorcTutari;
            if (localStorage.getItem('harclikBorcTutari') == null) {
                harclikBorcTutari = 0;
            } else {
                harclikBorcTutari = localStorage.getItem('harclikBorcTutari');
            }

            let yeniTutar = parseFloat(harclikBorcTutari) + parseFloat(tutar);
            localStorage.setItem('harclikBorcTutari', yeniTutar)
            this.harclikBorcTutari = yeniTutar
        },
        maximumHarcanmasi: function (tutar) {
            let isBorcTutari;
            if (localStorage.getItem('isBorcTutari') == null) {
                isBorcTutari = 0;
            } else {
                isBorcTutari = localStorage.getItem('isBorcTutari');
            }

            let yeniTutar = parseFloat(isBorcTutari) + parseFloat(tutar);
            localStorage.setItem('isBorcTutari', yeniTutar)
            this.isBorcTutari = yeniTutar
        },
        gencKartHarcanmasi: function (tutar) {
            let ziraatBorcTutari;
            if (localStorage.getItem('ziraatBorcTutari') == null) {
                ziraatBorcTutari = 0;
            } else {
                ziraatBorcTutari = localStorage.getItem('ziraatBorcTutari');
            }

            let yeniTutar = parseFloat(ziraatBorcTutari) + parseFloat(tutar);
            localStorage.setItem('ziraatBorcTutari', yeniTutar)
            this.ziraatBorcTutari = yeniTutar
        },
        digerBorcHarcanmasi: function (tutar) {
            let digerBorcTutari;
            if (localStorage.getItem('digerBorcTutari') == null) {
                digerBorcTutari = 0;
            } else {
                digerBorcTutari = localStorage.getItem('digerBorcTutari');
            }

            let yeniTutar = parseFloat(digerBorcTutari) + parseFloat(tutar);
            localStorage.setItem('digerBorcTutari', yeniTutar)
            this.digerBorcTutari = yeniTutar
        }
    },
    watch: {
        harclikNotKutusu: function (value) {
            let ilkValue = localStorage.getItem('Harçlık Not Kutusu');
            if (ilkValue == value) {
                this.harclikKaydetBtn = false;
            } else {
                this.harclikKaydetBtn = true;
            }
        },
        ziraatNotKutusu: function (value) {
            let ilkValue = localStorage.getItem('Zirrat Not Kutusu');
            if (ilkValue == value) {
                this.ziraatKaydetBtn = false;
            } else {
                this.ziraatKaydetBtn = true;
            }
        },
        isNotKutusu: function (value) {
            let ilkValue = localStorage.getItem('İş Bankası Not Kutusu');
            if (ilkValue == value) {
                this.isKaydetBtn = false;
            } else {
                this.isKaydetBtn = true;
            }
        },
        digerNotKutusu: function (value) {
            let ilkValue = localStorage.getItem('Diğer Borç Not Kutusu');
            if (ilkValue == value) {
                this.digerKaydetBtn = false;
            } else {
                this.digerKaydetBtn = true;
            }
        }
    },
    computed: {
        toplamVarlikHesaplama: function () {
           this.v_ToplamVarlik = this.nakit + this.ziraat + this.isBankasi + this.enPara + this.papara + this.diger
        },
        toplamBorcHesaplama: function () {
            this.v_ToplamBorc = parseFloat(this.harclikBorcTutari) + parseFloat(this.ziraatBorcTutari) + parseFloat(this.isBorcTutari) + parseFloat(this.digerBorcTutari)
         }
    }
})