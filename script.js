var escolha = document.getElementsByName('escolha');
var txtv = document.getElementById('txtv');
var cpf = document.getElementById('cpf');
var txtc = document.getElementById('txtc');
var bandeiraIcon = document.getElementById('bandeiraIcon');
var tot = document.getElementById('tot');
var pagar = document.getElementById('pagar');
var parcelasSelect = document.getElementById('parcelas');
var totfinal = document.getElementById('totfinal');

function informar() {
    if (txtv.value.trim() === '') {
        document.getElementById('pixa').style.display = 'none';
        document.getElementById('cartaoDiv').style.display = 'none';
        document.getElementById('pagar').style.display = 'none';
        alert('Por favor, insira um valor para pagar');
    } else if (escolha[0].checked) {
        document.getElementById('pixa').style.display = 'block';
        document.getElementById('cartaoDiv').style.display = 'none';
        document.getElementById('pagar').style.display = 'block';
        bandeiraIcon.style.display = 'none';
        var valor = parseFloat(txtv.value);
        valor *= 0.9;
        totfinal.innerHTML = 'Valor com desconto a vista: R$ ' + valor.toFixed(2);
    } else if (escolha[1].checked === true) {
        document.getElementById('pixa').style.display = 'none';
        document.getElementById('cartaoDiv').style.display = 'block';
        document.getElementById('pagar').style.display = 'block';
    } else {
        document.getElementById('pixa').style.display = 'none';
        document.getElementById('cartaoDiv').style.display = 'none';
        document.getElementById('pagar').style.display = 'none';
        alert('Por favor, escolha uma forma de pagamento');
    }
    atualizarTot();
}

function atualizarTot() {
    var valor = parseFloat(txtv.value);
    if (!isNaN(valor)) {
        tot.innerHTML = 'Valor total: R$ ' + valor.toFixed(2);
    } else {
        tot.innerHTML = 'Valor total: R$ 0.00';
    }
}

function limparCampos() {
    txtv.value = '';
    cpf.value = '';
    txtc.value = '';
    bandeiraIcon.style.display = 'none';
    invalido.style.display = 'none';
    titular.value = '';
    codSeguranca.value = '';
    vencimento.value = '';
    
    
}

function verificarBandeira() {
    var numeroCartao = txtc.value;
    if (numeroCartao.startsWith('1234')) {
        bandeiraIcon.src = 'img/master.png'; 
        invalido.style.display = 'none'
    } else if (numeroCartao.startsWith('4321')) {
        bandeiraIcon.src = 'img/visa.png'; 
        invalido.style.display = 'none'
    } else {
        bandeiraIcon.style.display = 'none';
        invalido.style.display = 'block'
    }
    bandeiraIcon.style.display = numeroCartao.startsWith('1234') || numeroCartao.startsWith('4321') ? 'inline-block' : 'none';
    atualizarTotal();
}

function atualizarTotal() {
    var valor = parseFloat(txtv.value);
    var parcelas = parseInt(parcelasSelect.value);
    if (!isNaN(valor)) {
        if (parcelas >= 1 && parcelas <= 3) {
            totfinal.innerHTML = '';
        } else if (escolha[0].checked) {
            valor *= 0.9;
            totfinal.innerHTML = 'Valor com desconto a vista: R$ ' + valor.toFixed(2);
        } else if (parcelas === 4) {
            valor *= 1.05; 
            totfinal.innerHTML = 'Valor total com juros de 5%: R$ ' + valor.toFixed(2);
        } else if (parcelas === 5) {
            valor *= 1.10; 
            totfinal.innerHTML = 'Valor total com juros de 10%: R$ ' + valor.toFixed(2);
        } else {
            totfinal.innerHTML = 'Parcelamento inválido';
        }
    } else {
        totfinal.innerHTML = 'Valor total: R$ 0.00';
    }
}

function verificarCPF() {
    if (cpf.value.trim() === '' && escolha[0].checked) {
        alert('Insira o CPF!');
    } else {
        alert('Pagamento realizado com sucesso!');
        window.location.reload();    
    }
    
}



escolha[0].addEventListener('change', informar);
escolha[1].addEventListener('change', informar);
txtv.addEventListener('input', function() {
    atualizarTot();
    if (escolha[0].checked) {
        atualizarTotal();
    }
});
txtc.addEventListener('input', verificarBandeira);
parcelasSelect.addEventListener('change', atualizarTotal);

