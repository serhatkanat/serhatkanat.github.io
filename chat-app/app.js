new Vue({
    el: '#app',
    http: {
        root: 'https://chat-f975d-default-rtdb.firebaseio.com/mesajlar/',
    },
    data: {
        mesaj: '',
        kutuRengi: '',
        isim: '',
        mesajlar: [],
    },
    methods: {
        veriEkle: function () {
            this.$http.post('.json', {
                "mesaj": this.mesaj,
                "isim": this.isim,
                "kutuRengi": this.kutununRenginiBelirleme(),
            }).then(response => {
                console.log(response)
                this.verileriGetir()
            })
            this.mesaj = '';
        },
        verileriGetir: function () {
            this.$http.get('.json').then((response) => {
                if (response.data == null) {
                    this.mesajlar = [];
                } else {
                    this.mesajlar = Object.values(response.data);
                }
            })
        },
        mesajlarSil: function () {
            let mesajlarSilBtn = document.querySelector('#mesajlarSilBtn');
            mesajlarSilBtn.classList.add('is-loading');
            this.$http.delete('.json').then((response) => {
                console.log(response);
                this.mesajlar = [];
            mesajlarSilBtn.classList.remove('is-loading');
            })
        },
        kutununRenginiBelirleme: function () {
            switch (this.kutuRengi) {
                case 'Kırmızı':
                    return 'is-danger'
                    break;
                case 'Siyah':
                    return 'is-dark'
                    break;
                case 'Mavi-Yeşil':
                    return 'is-primary'
                    break;
                case 'Mor':
                    return 'is-link '
                    break;
                case 'Mavi':
                    return 'is-info'
                    break;
                case 'Yeşil':
                    return 'is-success'
                    break;
                case 'Sarı':
                    return 'is-warning'
                    break;
                default:
                    break;
            }

        }
    },
    watch: {
        mesajlar: function (value) {
            value
        }
    }
})