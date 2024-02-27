let d = document;

const numberFormat = new Intl.NumberFormat("es-CO");

d.addEventListener("DOMContentLoaded", async () => {
    let res = await ((await fetch("https://restcountries.com/v3.1/all")).json());
    let contenedorPaises = d.querySelector("#countries-response");

    res.map((e) => {
        contenedorPaises.insertAdjacentHTML("beforeend", /*html*/ `
    <div class="country" data-name-country=${e.name.common}  data-bs-toggle="modal" data-bs-target="#modalCountry">
        <div class="country-flag">
            <img src=${e.flags.png}>
        </div>
        <p class="country-name">${e.name.common}</p>
    </div>
        `);
    })
})


d.addEventListener("click", async (e)=>{
    if(e.target.matches(".country") || e.target.closest(".country")){
        let countryName = e.target.closest(".country").dataset.nameCountry;
        let country = await ((await fetch(`https://restcountries.com/v3.1/name/${countryName}`)).json());
        let dataCountry = country[0];
        let currencies = Object.entries(dataCountry.currencies)[0];

        d.querySelector("#countryNameLabel").innerHTML = `${dataCountry.name.common} ${dataCountry.flag}`;

        d.querySelector("#countryModalBody").innerHTML = /*html*/`
        <div class="data-country">
            <div class="country-flag">
                <img src=${dataCountry.flags.png}>
            </div>
            <div class="location-country">
                <span><b>Latitud:</b></span> <span>${dataCountry.latlng[0]}</span>
                <span><b>Longitud:</b></span> <span>${dataCountry.latlng[1]}</span>
            </div>
            <div>
                <span><b>Area:</b></span> <span>${numberFormat.format(dataCountry.area)}</span>
            </div>
            <div>
                <span><b>Poblacion:</b></span> <span>${numberFormat.format(dataCountry.population)}</span>
            </div>
            <div>
                <span><b>Moneda:</b></span> <span>${currencies[0]}</span>
                <span><b>Simbolo:</b></span> <span>${currencies[1].symbol}</span>
            </div>
            <div class="visit-country">
                <a href=${dataCountry.maps.googleMaps} target="blank" type="button" class="btn btn-primary rounded-0">Visitalo Aqui</a>
            </div>
        </div>
        `;
    }

    if(e.target.matches("#searcher-country")){
        let input = d.querySelector("#searched-country");
        let countryName = input.value;
        if(countryName !== ""){
            countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);
            let country = await ((await fetch(`https://restcountries.com/v3.1/name/${countryName}`)).json());
            let contenedorPaises = d.querySelector("#countries-response");
            contenedorPaises.innerHTML = "";
            country.map((e) => {
                contenedorPaises.insertAdjacentHTML("beforeend", /*html*/ `
            <div class="country" data-name-country=${e.name.common}  data-bs-toggle="modal" data-bs-target="#modalCountry">
                <div class="country-flag">
                    <img src=${e.flags.png}>
                </div>
                <p class="country-name">${e.name.common}</p>
            </div>
                `);
            })
        } else {
            location.reload();
        }
    }
})