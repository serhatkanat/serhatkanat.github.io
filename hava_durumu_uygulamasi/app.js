const yerBilgisi = document.querySelector('#yer-bilgisi');
const gonderBtn = document.querySelector('#gonder-btn');
const havaBilgisi = document.querySelector('#hava-bilgisi');
const header = document.querySelector('#header');


gonderBtn.addEventListener('click', (e) => {
    q = yerBilgisi.value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${q}&lang=tr&appid=`)
        .then((response) => response.json())
        .then((json) => havadurumu(json))
        .catch((err) => console.log(err));
    e.preventDefault()
})





function havadurumu(json) {
    console.log(json);
    let yerAdi = json.name;
    let havaNasıl = json.weather[0].description;
    let nem = json.main.humidity;
    let kelvin = json.main.temp;
    let tamDerece = kelvin - 273.15
    let derece = parseInt(kelvin - 273.15);
    let duzDerece = `${derece}.5`
    let sonDerece;

    if (duzDerece >= tamDerece) {
        sonDerece = derece
    } else {
        sonDerece = derece + 1
    }

    console.log("derece:" + derece);
    console.log("düz derece:" + duzDerece);
    console.log("tam derece:" + tamDerece);

    havaBilgisi.innerHTML = `<article class="message is-success">
    <div class="message-header">
      <p>${yerAdi} İçin Güncel Hava Durumu</p>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
            <p><strong>Hava: </strong>${havaNasıl}<br><strong>Sıcaklık: </strong>${sonDerece}°C <br><strong>Nem: </strong>%${nem}</p>
     </div>
  </article>`


    if (json.weather[0].main == 'Rain') {
        document.querySelector('body').style.backgroundImage = 'url(https://i.pinimg.com/originals/b2/67/dd/b267dd39419644086c2b3923198f97ae.gif)'
        headerStyle()
    } else if (json.weather[0].main == 'Snow') {
        document.querySelector('body').style.backgroundImage = 'url(https://i.gifer.com/MxpL.gif)'
        headerStyle()
    } else if(json.weather[0].main == 'Clouds'){
        document.querySelector('body').style.backgroundImage = 'url(https://2.bp.blogspot.com/-AkuoumbDUUg/Tw413GFsnbI/AAAAAAAAJTE/3iU6XJNjQIs/s1600/DSC_7721a.jpg)'
        headerStyle()
    }else if(json.weather[0].main == 'Clear'){
        document.querySelector('body').style.backgroundImage = 'url(https://sia.az/storage/2017/06/08/isti_hava.jpg)'
        headerStyle()
    }else if(json.weather[0].main == 'Mist'){
        document.querySelector('body').style.backgroundImage = 'url(https://www.fotopedi.org/wp-content/uploads/2016/10/sisli-havada-fotograf-cekmek-05.jpg)'
        headerStyle()
    }

}

function headerStyle() {
    header.style.textShadow = '2px 2px 6px rgba(150, 150, 150, 1)'
    header.style.backgroundColor = 'rgba(62, 142, 208,0.2)'
}
