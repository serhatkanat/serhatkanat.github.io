new Vue({
    el: '#app',
    data: {
        resimUrl: '',
        input: '',
        apiKey: '',
        kelimeKutusu: false,
        trKelime: '',
        enKelime: '',
        enCumle: '',
        trCumle: '',
        tur: '',
        not: '',
        duzenleTrKelime: '',
        duzenleEnKelime: '',
        duzenleEnCumle: '',
        duzenleTrCumle: '',
        duzenleTur: '',
        duzenleNot: '',
        duzenleResimUrl: '',
        yenilenenKelimeUrl: '',
        vueIndexNo: '',
        kelimeDuzenleModalDurumu: false,
        tabloKelimelerModal: false,
        kelimeYedekleKutusu: false,
        scrolled: false,
        sayfaninEnUstuneGitmeBtn: false,
        sayfaninEnAltinaGitmeBtn: false,
        kelimeler: localStorage.getItem('BenimKelimelerim') == null ? [] : JSON.parse(localStorage.getItem('BenimKelimelerim')),
    },
    methods: {
        gonder: async function () {
            try {
                const response = await axios.get('https://api.unsplash.com/photos/random', {
                    params: {
                        client_id: this.apiKey,
                        query: this.enKelime,
                        lang: 'en',
                        count: 1,
                    }
                });
                console.log(response.data[0].urls.regular);
                this.resimUrl = response.data[0].urls.regular;
                await this.kelimeEkle();
            } catch (error) {
                console.error(error);
            }
        },
        resimYenileFun: async function (event) {
            try {
                const response = await axios.get('https://api.unsplash.com/photos/random', {
                    params: {
                        client_id: this.apiKey,
                        query: event.target.parentElement.parentElement.children[2].children[0].innerText,
                        lang: 'en',
                        count: 1,
                    }
                });
                this.yenilenenKelimeUrl = response.data[0].urls.regular;
                console.log(event.target.parentElement.parentElement.children[2].children[0].innerText);
                await this.resimYenile(event.target.parentElement.parentElement.children[0].innerText)
            } catch (error) {
                console.error(error);
            }
        },
        kelimeEkle: function () {
            const kelime = {
                turkceKelime: this.trKelime,
                inglizceKelime: this.enKelime,
                inglizceCumle: this.enCumle,
                turkceCumle: this.trCumle,
                imageUrl: this.resimUrl,
                tur: this.tur,
                not: this.not
            }
            this.kelimeler.push(kelime)

            localStorage.setItem('BenimKelimelerim', JSON.stringify(this.kelimeler))
            this.trKelime = ''
            this.enKelime = ''
            this.enCumle = ''
            this.trCumle = ''
            this.tur = ''
            this.not = ''

        },
        kelimeleriYedekle: function () {
            this.kelimeYedekleKutusu = !this.kelimeYedekleKutusu
        },
        kelimeleriYukle: function () {
            let yuklenilenKelimeler = prompt("Daha Önce İndirdiğiniz Kelimeleri Yapıştırın");

            if (yuklenilenKelimeler != '') {
                if (yuklenilenKelimeler != null) {
                    let jsonYukKel = JSON.parse(yuklenilenKelimeler);
                    let tamamDevam = confirm(`${jsonYukKel.length} tane kelime yüklenecek. Bu kelimeleri yüklemek istediğinizden emin misiniz? (Şu anda kayıtlı olan kelimeleriniz silenecek!)`)
                    if (tamamDevam) {
                        localStorage.setItem('BenimKelimelerim', JSON.stringify(jsonYukKel));
                    }
                } else {

                }
            } else {
                alert("Bir şey eklemediniz.")
            }
            this.kelimeler = JSON.parse(localStorage.getItem('BenimKelimelerim'));
        },
        resimYenile: function (index) {
            let kelimelerArray = JSON.parse(localStorage.getItem('BenimKelimelerim'))
            const reKelime = {
                turkceKelime: kelimelerArray[index].turkceKelime,
                inglizceKelime: kelimelerArray[index].inglizceKelime,
                inglizceCumle: kelimelerArray[index].inglizceCumle,
                turkceCumle: kelimelerArray[index].turkceCumle,
                imageUrl: this.yenilenenKelimeUrl,
                tur: kelimelerArray[index].tur,
                not: kelimelerArray[index].not
            }
            kelimelerArray.splice(index, 1, reKelime)
            localStorage.setItem('BenimKelimelerim', JSON.stringify(kelimelerArray))
            this.kelimeler = kelimelerArray
        },
        kelimeDuzenleModalOpen: function (event) {
            let indexNo = event.target.parentElement.parentElement.children[0].innerText;
            this.vueIndexNo = indexNo;
            this.kelimeDuzenleModalDurumu = true
            this.duzenleTrKelime = this.kelimeler[indexNo].turkceKelime
            this.duzenleEnKelime = this.kelimeler[indexNo].inglizceKelime
            this.duzenleEnCumle = this.kelimeler[indexNo].inglizceCumle
            this.duzenleTrCumle = this.kelimeler[indexNo].turkceCumle
            this.duzenleTur = this.kelimeler[indexNo].tur
            this.duzenleNot = this.kelimeler[indexNo].not
            this.duzenleResimUrl = this.kelimeler[indexNo].imageUrl
        },
        kelimeDuzenle: function () {
            const kelime = {
                turkceKelime: this.duzenleTrKelime,
                inglizceKelime: this.duzenleEnKelime,
                inglizceCumle: this.duzenleEnCumle,
                turkceCumle: this.duzenleTrCumle,
                imageUrl: this.duzenleResimUrl,
                tur: this.duzenleTur,
                not: this.duzenleNot
            }
            this.kelimeler.splice(this.vueIndexNo, 1, kelime)
            localStorage.setItem('BenimKelimelerim', JSON.stringify(this.kelimeler))
            this.kelimeDuzenleModalDurumu = false
        },
        kelimeSil: function (event) {
            let indexNo = event.target.parentElement.parentElement.children[0].innerText;
            this.kelimeler.splice(indexNo, 1)
            localStorage.setItem('BenimKelimelerim', JSON.stringify(this.kelimeler))
        },
        modalKapat: function () {
            this.kelimeDuzenleModalDurumu = false
            this.tabloKelimelerModal = false
        },
        kontrol: function () {
            if (localStorage.getItem('api key') == null) {} else {
                this.apiKey = localStorage.getItem('api key')
            }
        },
        tabloOlustur: function () {
            this.tabloKelimelerModal = true;
        },
        api: function () {
            this.apiKey = prompt("Api Key:", localStorage.getItem('api key'))
            if (this.apiKey == null) {
                this.apiKey = localStorage.getItem('api key');
            }
            localStorage.setItem('api key', this.apiKey)
        },
        handleScroll() {
            this.scrolled = window.scrollY > 0;
            if (window.scrollY < 150) {
                this.sayfaninEnUstuneGitmeBtn = false;
                this.sayfaninEnAltinaGitmeBtn = false;
            }else if(window.scrollY < 700){
                this.sayfaninEnUstuneGitmeBtn = false;
                this.sayfaninEnAltinaGitmeBtn = true;
            }else{
                this.sayfaninEnUstuneGitmeBtn = true;
                this.sayfaninEnAltinaGitmeBtn = true;
            }
        }
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    }
})