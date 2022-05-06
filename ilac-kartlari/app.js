
class IlacBilgileri {
    constructor() {
        this.baseURL = 'ilaclar.json';
        this.axiosNesne = axios.create({
            baseURL: this.baseURL,
        })
    }
    async ilacBilgisiGetir() {
        try {
            const ilacResponse = await this.axiosNesne.get()
            const ilacIsimleri = ilacResponse.data;


            new Vue({
                el: "#app",
                data: {
                    ilaclar: ilacResponse.data,
                    search: '',
                    uyarıKutusuGoster: true,
                    sonDangerBox: false,
                    dangerBox: '',
                    ilacKarti: false,
                    ilacIndexNum : '',
                    ilacIndexList: ''
                },
                computed: {
                    ilacAdinaGore() {
                        return ilacIsimleri.filter(post => {
                            return post.IlacAdi.toLowerCase().includes(this.search.toLowerCase()) || post.EtkenMadde.toLowerCase().includes(this.search.toLowerCase()) || post.Siniflandirma.toLowerCase().includes(this.search.toLowerCase()) || post.Endikasyonlari.toLowerCase().includes(this.search.toLowerCase())
                        })
                    },
                },
                methods: {
                    tikla() {
                        if (this.search.length > 2) {
                            this.uyarıKutusuGoster = false;
                        } else if(this.search.length <= 2){
                            this.uyarıKutusuGoster = true;
                        }

                        console.log(ilacIsimleri);
                    },
                    kontrol(){
                        if (this.ilacAdinaGore.length === 0 && !this.uyarıKutusuGoster) {
                            this.dangerBox = true;
                        }else{
                            this.dangerBox = false;
                        }

                    },
                    ilacKartiGoster(event){
                        this.ilacKarti = true;
                        this.ilacIndexNum = event.target.parentElement.children[0].innerText;
                        console.log(event.target.parentElement.children[0].innerText);
                        this.ilacIndexList = this.ilacAdinaGore[this.ilacIndexNum] 
                    },
                    ilacKartiKapat(){
                        this.ilacKarti = false;
                    }
                }
            })



        } catch (hata) {
            console.log(hata);
        }

    }
}

let Ilaclar = new IlacBilgileri;

Ilaclar.ilacBilgisiGetir();
