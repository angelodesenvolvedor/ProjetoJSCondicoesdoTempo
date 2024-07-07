"use strict";
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector('#tempo-info');

if (form && input && sectionTempoInfo) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const localizacao = input.value;

        if (localizacao.length < 3) {
            alert("O local precisa ter, pelo menos, 3 letras.");
            return;
        }

        try {
            console.log(`Pesquisando clima para: ${localizacao}`);
            const resposta = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=f47df2bcb1f945e46c82f250185a7325&lang=pt_br&units=metric`);

            if (!resposta.ok) {
                throw new Error(`Erro na resposta da API: ${resposta.statusText}`);
            }

            const dados = await resposta.json();
            console.log('Dados recebidos da API:', dados);

            if (!dados || !dados.main || !dados.weather) {
                throw new Error('Dados da API estão incompletos.');
            }

            const infos = {
                temperatura: Math.round(dados.main.temp),
                local: dados.name,
                icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
            };

            sectionTempoInfo.innerHTML = `
                <div class="tempo-dados">
                    <h2>${infos.local}</h2>
                    <span>${infos.temperatura}ºC</span>
                </div>
                <img src="${infos.icone}" alt="Ícone do clima">
            `;
        } catch (err) {
            console.error("Deu um erro na obtenção dos dados da API", err);
            alert("Não foi possível obter os dados do clima. Tente novamente mais tarde.");
        }
    });

    input.addEventListener('input', () => {
        if (input.value === '') {
            sectionTempoInfo.innerHTML = '';
        }
    });
}
