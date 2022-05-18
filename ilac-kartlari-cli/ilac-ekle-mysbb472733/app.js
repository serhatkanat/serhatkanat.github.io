new Vue({
    el: '#app',
    http: {
        root: 'https://ilac-kartlari-default-rtdb.firebaseio.com/ilaclar/',
    },
    data: {
        ilaclar: [],
        ilaclarGuncelle: [],
        duzenlenecekIlacAdi: '',
        guncellenecekIlacId: '',
        search: '',
        ilacAdi: '',
        etkenMadde: '',
        endikasyonlari: '',
        siniflandirma: '',
        yanEtkileri: '',
        imageUrl: '',
        kontrendike: '',
        hemsireyeNotlar: '',
        birlikteKullanilmaz: '',
    },
    computed: {
        ilacAdinaGore() {
            return this.ilaclar.filter((post) => {
                return (
                    post.IlacAdi.toLowerCase().includes(this.search.toLowerCase()) ||
                    post.EtkenMadde.toLowerCase().includes(this.search.toLowerCase()) ||
                    post.Siniflandirma.toLowerCase().includes(
                        this.search.toLowerCase()
                    ) ||
                    post.Endikasyonlari.toLowerCase().includes(this.search.toLowerCase())
                );
            });
        },
    },
    methods: {
        veriEkle: function () {
            this.$http.post('.json', {
                "BirlikteKullanilmaz": this.birlikteKullanilmaz,
                "Endikasyonlari": this.endikasyonlari,
                "EtkenMadde": this.etkenMadde,
                "HemsireyeNotlar": this.hemsireyeNotlar,
                "IlacAdi": this.ilacAdi,
                "ImageUrl": this.imageUrl,
                "Kontrendike": this.kontrendike,
                "Siniflandirma": this.siniflandirma,
                "YanEtkileri": this.yanEtkileri
            }).then(response => {
                console.log(response.url);
            })
        },
        verileriGetir: function () {
            this.$http.get('.json').then((response) => {
                this.ilaclar = Object.values(response.data);
            })
        },
        tikla() {
            this.verileriGetir()
            this.ilaclariGetir();
        },
        duzenle: function (event) {
            this.duzenlenecekIlacAdi = event.target.parentElement.children[0].textContent;
            // console.log(this.ilaclarGuncelle);

            for (let i = 0; i < this.ilaclarGuncelle.length; i++) {
                const element = this.ilaclarGuncelle[i];
                // console.log(element[1].IlacAdi);

                if (element[1].IlacAdi == this.duzenlenecekIlacAdi) {
                    this.guncellenecekIlacId = element[0];

                    this.birlikteKullanilmaz = element[1].BirlikteKullanilmaz;
                    this.endikasyonlari = element[1].Endikasyonlari
                    this.etkenMadde = element[1].EtkenMadde
                    this.hemsireyeNotlar = element[1].HemsireyeNotlar
                    this.ilacAdi = element[1].IlacAdi
                    this.imageUrl = element[1].ImageUrl
                    this.kontrendike = element[1].Kontrendike
                    this.siniflandirma = element[1].Siniflandirma
                    this.yanEtkileri = element[1].YanEtkileri
                }

            }
            console.log(this.guncellenecekIlacId);

        },
        ilaclariGetir: function () {
            this.$http.get('.json').then((response) => {
                this.ilaclarGuncelle = Object.entries(response.data);
            })
        },
        veriDuzenle: function () {
            this.$http.patch(`${this.guncellenecekIlacId}.json`, {
                "BirlikteKullanilmaz": this.birlikteKullanilmaz,
                "Endikasyonlari": this.endikasyonlari,
                "EtkenMadde": this.etkenMadde,
                "HemsireyeNotlar": this.hemsireyeNotlar,
                "IlacAdi": this.ilacAdi,
                "ImageUrl": this.imageUrl,
                "Kontrendike": this.kontrendike,
                "Siniflandirma": this.siniflandirma,
                "YanEtkileri": this.yanEtkileri
            }).then(response => {
                console.log(response.status);
            })
        }
    }
})