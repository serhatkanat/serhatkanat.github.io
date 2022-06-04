new Vue({
    el: '#app',
    data: {
        resimUrl: '',
        input: '',
        apiKey: '',
    },
    methods: {
        gonder: async function getUser() {
            try {
                const response = await axios.get('https://api.unsplash.com/photos/random', {
                    params: {
                        client_id: this.apiKey,
                        query: this.input,
                        lang: 'en',
                        count: 1,
                    }
                });
                console.log(response.data[0].urls.regular);
                this.resimUrl = response.data[0].urls.regular;
            } catch (error) {
                console.error(error);
            }
        },
        kontrol: function () {
            
            if (localStorage.getItem('api key') == null) {
                this.apiKey = prompt("Api Key:")
                localStorage.setItem('api key',this.apiKey)
            }else{
                this.apiKey = localStorage.getItem('api key')
            }

        }
    },
})