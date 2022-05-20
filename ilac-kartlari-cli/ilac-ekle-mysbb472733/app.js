new Vue({
    el: '#app',
    http: {
        root: 'https://ilac-kartlari-default-rtdb.firebaseio.com/ilaclar/',
    },
    data: {
        ilacEkleSection: true,
        ilacDuzenleSection: false,
        duzenleColumns: false,
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
        editilacAdi: '',
        editetkenMadde: '',
        editendikasyonlari: '',
        editsiniflandirma: '',
        edityanEtkileri: '',
        editimageUrl: '',
        editkontrendike: '',
        edithemsireyeNotlar: '',
        editbirlikteKullanilmaz: '',
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
        ilacEkleFonk: function () {
          this.ilacEkleSection = true;
          this.ilacDuzenleSection = false;
        },
        ilacDuzenleFonk: function () {
            this.ilacEkleSection = false;
            this.ilacDuzenleSection = true;
          },
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
            this.duzenleColumns = false
        },
        duzenle: function (event) {
            this.duzenlenecekIlacAdi = event.target.parentElement.children[0].textContent;
            // console.log(this.ilaclarGuncelle);

            for (let i = 0; i < this.ilaclarGuncelle.length; i++) {
                const element = this.ilaclarGuncelle[i];
                // console.log(element[1].IlacAdi);

                if (element[1].IlacAdi == this.duzenlenecekIlacAdi) {
                    this.guncellenecekIlacId = element[0];

                    this.editbirlikteKullanilmaz = element[1].BirlikteKullanilmaz;
                    this.editendikasyonlari = element[1].Endikasyonlari
                    this.editetkenMadde = element[1].EtkenMadde
                    this.edithemsireyeNotlar = element[1].HemsireyeNotlar
                    this.editilacAdi = element[1].IlacAdi
                    this.editimageUrl = element[1].ImageUrl
                    this.editkontrendike = element[1].Kontrendike
                    this.editsiniflandirma = element[1].Siniflandirma
                    this.edityanEtkileri = element[1].YanEtkileri
                }

            }
            this.duzenleColumns = true;

        },
        ilaclariGetir: function () {
            this.$http.get('.json').then((response) => {
                this.ilaclarGuncelle = Object.entries(response.data);
            })
        },
        veriDuzenle: function () {
            this.$http.patch(`${this.guncellenecekIlacId}.json`, {
                "BirlikteKullanilmaz": this.editbirlikteKullanilmaz,
                "Endikasyonlari": this.editendikasyonlari,
                "EtkenMadde": this.editetkenMadde,
                "HemsireyeNotlar": this.edithemsireyeNotlar,
                "IlacAdi": this.editilacAdi,
                "ImageUrl": this.editimageUrl,
                "Kontrendike": this.editkontrendike,
                "Siniflandirma": this.editsiniflandirma,
                "YanEtkileri": this.edityanEtkileri
            }).then(response => {
                console.log(response.status);
            })
        }
    }
})