"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector('#tempo-info');
if (form && input && sectionTempoInfo) {
    form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const localizacao = input.value;
        if (localizacao.length < 3) {
            alert("O local precisa ter, pelo menos, 3 letras.");
            return;
        }
        try {
            const resposta = yield fetch(`http://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=f47df2bcb1f945e46c82f250185a7325&lang=pt_br&units=metric`);
            const dados = yield resposta.json();
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
        }
        catch (err) {
            console.log("Deu um erro na obtenção dos dados da API", err);
        }
    }));
    input.addEventListener('input', () => {
        if (input.value === '') {
            sectionTempoInfo.innerHTML = '';
        }
    });
}
