const pagina = document.querySelector("#inicial");
const pagboto = document.querySelector("#botoes");

let primeiroval = 0;
let segundoval = 0;
let resultados = 0;
let pontos = 0;
let nivel = "";
let tabuada = "";
let errado1 = 0;
let errado2 = 0;
let msg_alerta = ""
const operacoes = []


function iniciar(){
    nivel = document.getElementById("nivel").value;
    
    if (pontos >= 3 && pontos <= 20 && nivel == "Iniciante"){
        let mudandonivel = document.getElementById("nivel").value = "Intermediario";
        let mudandonivtext = document.getElementById("nivel").option = "Intermédiario";
        iniciandosom();
        chamalaert("Intermédiario");
    }else if (pontos > 20 && nivel != "Avançado"){
        let mudandonivel = document.getElementById("nivel").value = "Avançado";
        let mudandonivtext = document.getElementById("nivel").option =  "Avançado";
        iniciandosom();
        chamalaert("Avançado");
    }
    nivel = document.getElementById("nivel").value;
    tabuada = document.getElementById("tabuada").value;
    if (tabuada=="Aleatório"){
        primeiroval = Math.floor(Math.random() * 11);
    }else{
        primeiroval = parseFloat(document.getElementById("tabuada").value);
    }
    if(nivel=="Iniciante"){
        segundoval = 0;
        operacoes.length = 0;
        operacoes.push("+","-","*","/");
    }else if (nivel=="Intermediario"){
        segundoval = Math.floor(Math.random() * 100);
        operacoes.length = 0;
        operacoes.push("+","-","X","/");
    }else if (nivel=="Avançado"){
        segundoval = Math.floor(Math.random() * 100);
        operacoes.length = 0; //REMOVE TODA A LISTA 
        operacoes.push("^","√","∛","/"); //ADICIONA A LISTA
    }
    
    var sorteio = Math.floor(Math.random() * (operacoes.length));
    let operacao = operacoes[sorteio];
    
    
    resultados = calculando(primeiroval,operacao,segundoval);
    let min = 1;
    let max = 10;
    let errando = Math.floor(Math.random() * (max - min + 1)) + min;
    
    if(resultados == 'Não Existe divisão por 0'){
        errado1 = 'Não Existe divisão por ' + errando;
        errado2 = errando.toFixed(2);
    }else{
        errado1 = (resultados + errando).toFixed(2);
        errado2 = (resultados - errando).toFixed(2);
        resultados = resultados.toFixed(2);
    }

    const ordens = [errado1,resultados,errado2]
    for (let i = 0; i < ordens.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [ordens[i], ordens[j]] = [ordens[j], ordens[i]];
    }
    primeiroval = (primeiroval.toFixed(2)).replace('.', ',');
    segundoval = (segundoval.toFixed(2)).replace('.', ',');
    let orden0Formatado = (ordens[0]).replace('.', ',');
    let orden1Formatado = (ordens[1]).replace('.', ',');
    let orden2Formatado = (ordens[2]).replace('.', ',');
    
    pagina.innerHTML = `<h4 id="valincial">${primeiroval}</h4>` + `<h4>${operacao}</h4>` + `<h4>${segundoval}</h4>` + `<h4> = ? </h4>` ;
    pagboto.innerHTML = `<button onclick="acertos(this.value)" value=${ordens[1]}>${orden1Formatado}</button>` +
     `<button onclick="acertos(this.value)" value=${ordens[0]}>${orden0Formatado}</button>` +
      `<button onclick="acertos(this.value)" value=${ordens[2]}>${orden2Formatado}</button>`;
    

}

function calculando(valor1,tpopera,valor2){
    if (tpopera=="+"){
        return (valor1 + valor2);
    }else if (tpopera=="-"){
        return (valor1 - valor2);
    }else if (tpopera=="X"){
        return (valor1 * valor2);
    }else if (tpopera=="/"){
        if(valor2==0){
            return 'Não Existe divisão por 0'
        }else{
            return (valor1 / valor2);
        }
    }else if (tpopera=="^"){
        return Math.pow(valor1, valor2);
    }else if (tpopera=="√"){
        primeiroval = 2;       
        return Math.sqrt(valor2);
    }else if (tpopera=="∛"){
        primeiroval = 3;
        return Math.cbrt(valor2);
    }

    
}




function acertos(enviado){
    if (enviado==resultados){
        pontos ++;
        enviado = enviado.replace('.', ',');
        document.getElementById("pontando").innerText=pontos + " Pontos";
        pagboto.innerHTML = `<img src="image/fogos.gif" />`;
        pagina.innerHTML += `<h4>Você Acertou = ${enviado} </h4>`;
        
        
        let espera = setTimeout(function() {
            iniciar();
            }, 3000)
        //alert("Você Acertou");
        //reiniciando();
    }else{
        pontos --;
        resultados = resultados.replace('.', ',');
        document.getElementById("pontando").innerText=pontos + " Pontos";
        pagboto.innerHTML = `<img src="image/errou.gif" />`;
        pagina.innerHTML += `<h4>Você errou seria = ${resultados} </h4>`;
        console.log("resultados: " + resultados)
        console.log("enviado: " + enviado)
        let espera = setTimeout(function() {
            iniciar();
            }, 3000)
    } 
}
iniciar()
function reiniciando(){
    window.location.reload();
  };

  function iniciandosom(){
    var audio2 = new Audio('image/fim.mp3')
    audio2.muted = false;
    audio2.play();
    
    var espera = setTimeout(function() {
        audio2.remove();
        }, 2000)
  };
  function chamalaert(subiunivel){
    swal(`Parabéns! Nova fase: ${subiunivel}`);
  };
  