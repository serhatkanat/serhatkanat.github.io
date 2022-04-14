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
                },
                computed: {
                    ilacAdinaGore() {
                        return ilacIsimleri.filter(post => {
                            return post.IlacAdi.toLowerCase().includes(this.search.toLowerCase()) || post.EtkenMadde.toLowerCase().includes(this.search.toLowerCase()) || post.Siniflandirma.toLowerCase().includes(this.search.toLowerCase()) || post.Endikasyonlari   .toLowerCase().includes(this.search.toLowerCase())
                        })
                    },
            },
            methods: {
                deneme(){
                    console.log(this.ilacAdinaGore());
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