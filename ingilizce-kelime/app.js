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
        kelimeler: localStorage.getItem('BenimKelimelerim') == null ? [] : JSON.parse(localStorage.getItem('BenimKelimelerim')),
    },
    methods: {
        gonder: async function getUser() {
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
        kelimeEkle: function () {
            const kelime = {
                turkceKelime: this.trKelime,
                inglizceKelime: this.enKelime,
                inglizceCumle: this.enCumle,
                turkceCumle: this.trCumle,
                imageUrl: this.resimUrl
            }
            this.kelimeler.push(kelime)

            localStorage.setItem('BenimKelimelerim', JSON.stringify(this.kelimeler))
            this.trKelime = ''
            this.enKelime = ''
            this.enCumle = ''
            this.trCumle = ''

        },
        kelimeleriYedekle: function () {
            const number = parseInt(Math.random() * 100000);
            var wb = XLSX.utils.table_to_book(document.getElementById("TableToExport"));
            XLSX.writeFile(wb, `${this.kelimeler.length} tane kelime-${number}.xlsx`);

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
            }else{
                alert("Bir şey eklemediniz.")
            }



        },
        kontrol: function () {
            if (localStorage.getItem('api key') == null) {} else {
                this.apiKey = localStorage.getItem('api key')
            }
        },
        api: function () {
            this.apiKey = prompt("Api Key:")
            localStorage.setItem('api key', this.apiKey)
        }
    },
})