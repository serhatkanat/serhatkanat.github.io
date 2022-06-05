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
        kontrol: function () {
            if (localStorage.getItem('api key') == null) {
            } else {
                this.apiKey = localStorage.getItem('api key')
            }
        },
        api: function () {
            this.apiKey = prompt("Api Key:")
            localStorage.setItem('api key', this.apiKey)
        }
    },
})