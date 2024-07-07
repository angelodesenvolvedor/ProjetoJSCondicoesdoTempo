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
            console.log(`Pesquisando clima para: ${localizacao}`);
            const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=f47df2bcb1f945e46c82f250185a7325&lang=pt_br&units=metric`);
            
            if (!resposta.ok) {
                throw new Error(`Erro na resposta da API: ${resposta.statusText}`);
            }

            const dados = yield resposta.json();
            console.log('Dados recebidos da API:', dados);

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
            console.error("Deu um erro na obtenção dos dados da API", err);
            alert("Não foi possível obter os dados do clima. Tente novamente mais tarde.");
        }
    }));
    input.addEventListener('input', () => {
        if (input.value === '') {
            sectionTempoInfo.innerHTML = '';
        }
    });
}
