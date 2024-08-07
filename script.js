const terreno = [[1,2,1,1,1,1],[1,0,0,0,0,1],[1,1,1,1,0,1],
                 [1,0,0,0,0,1],[1,0,1,1,1,1],[1,0,0,0,0,1],
                 [1,0,0,3,0,1],[1,0,0,0,0,1],[1,1,1,1,1,1]];
let posX, posY = 0
let beforeX = posX;
let beforeY = posY;
const personagem = document.getElementById('personagem');
const tela = document.getElementById("tela");

function povoar (){
    let html = "";
    terreno.forEach(linha => {
        html+="<div class='linha'> ";
        linha.forEach(celula => {
            switch (celula) {
                case 1:
                    html+="<div class='celula bloqueio'></div>";
                    break;
                case 2:
                    html+="<div class='celula final'></div>";
                    break;
                case 3:
                    html+="<div class='celula' id='inicio'></div>";
                    break;
                default:
                    html+="<div class='celula'></div>";
            }
        });
        html+="</div>"
    });
    return html
}

function posInicial(){
    const inicio = document.getElementById("inicio").getBoundingClientRect();
    posX = inicio.left;
    posY = inicio.top;
    personagem.style.left = `${posX}px`;
    personagem.style.top = `${posY}px`;
}

function checkColisao(detectar) {
    const personagemRect = personagem.getBoundingClientRect();
    const colisao = document.querySelectorAll(detectar);
    resposta = false;
    colisao.forEach(elemento => {
        const rect = elemento.getBoundingClientRect();
        if (
            personagemRect.left < rect.right &&
            personagemRect.right > rect.left &&
            personagemRect.top < rect.bottom &&
            personagemRect.bottom > rect.top
        ) {
            resposta = true;
        }
    });
    return resposta;
}

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            posY -= 10;
            break;
        case 'ArrowDown':
            posY += 10;
            break;
        case 'ArrowLeft':
            posX -= 10;
            break;
        case 'ArrowRight':
            posX += 10;
            break;
    }
    personagem.style.left = `${posX}px`;
    personagem.style.top = `${posY}px`;
    if(checkColisao(".bloqueio")){
        posX = beforeX;
        posY = beforeY;
        personagem.style.left = `${posX}px`;
        personagem.style.top = `${posY}px`;
        console.log(beforeX + " - " + posX + "/" + beforeY + " - " + posY )
    }else{
        beforeX = posX;
        beforeY = posY;    
    }
    /*if(checkColisao(".bloqueio")){
        posInicial();    
    }*/
    
});


tela.innerHTML = povoar();

posInicial();




