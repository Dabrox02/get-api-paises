let d = document;

document.addEventListener("DOMContentLoaded", async () => {
    let res = await ((await fetch("https://restcountries.com/v3.1/all")).json());
    let contenedorPaises = document.querySelector("#countries-response");


    res.map((e) => {

        contenedorPaises.insertAdjacentHTML("beforeend", /*html*/ `
    <div class="country" data-name-country=${e.name.common}>
        <div class="country-flag">
            <img src=${e.flags.png}>
        </div>
        <p class="country-name">${e.name.common}</p>
    </div>
        `);
    })


})

