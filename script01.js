!function (e) {
    var t = 0, n = function e(n, s) {
        var i = this, r = this, o = !1; if (Array.isArray(n)) return !!n.length && n.map((function (t) {
            return new e(t, s)
        })); var a = {
            init: function () { this.options = Object.assign({ duration: 600, ariaEnabled: !0, collapse: !0, showMultiple: !1, onlyChildNodes: !0, openOnInit: [], elementClass: "ac", triggerClass: "ac-trigger", panelClass: "ac-panel", activeClass: "is-active", beforeOpen: function () { }, onOpen: function () { }, beforeClose: function () { }, onClose: function () { } }, s); var e = "string" == typeof n; this.container = e ? document.querySelector(n) : n, this.createDefinitions(), r.attachEvents() }, createDefinitions: function () { var e = this, n = this.options, s = n.elementClass, i = n.openOnInit, r = n.onlyChildNodes ? this.container.childNodes : this.container.querySelectorAll(u(s)); this.elements = Array.from(r).filter((function (e) { return e.classList && e.classList.contains(s) })), this.firstElement = this.elements[0], this.lastElement = this.elements[this.elements.length - 1], this.elements.filter((function (e) { return !e.classList.contains("js-enabled") })).forEach((function (n) { n.classList.add("js-enabled"), e.generateIDs(n), e.setARIA(n), e.setTransition(n); var s = e.elements.indexOf(n); t++, i.includes(s) ? e.showElement(n, !1) : e.closeElement(n, !1) })) }, setTransition: function (e) { var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = this.options, s = n.duration, i = n.panelClass, r = e.querySelector(u(i)), o = l("transitionDuration"); r.style[o] = t ? null : "".concat(s, "ms") }, generateIDs: function (e) { var n = this.options, s = n.triggerClass, i = n.panelClass, r = e.querySelector(u(s)), o = e.querySelector(u(i)); e.setAttribute("id", e.id || "ac-".concat(t)), r.setAttribute("id", r.id || "ac-trigger-".concat(t)), o.setAttribute("id", o.id || "ac-panel-".concat(t)) }, removeIDs: function (e) { var t = this.options, n = t.triggerClass, s = t.panelClass, i = e.querySelector(u(n)), r = e.querySelector(u(s)); e.id.startsWith("ac-") && e.removeAttribute("id"), i.id.startsWith("ac-") && i.removeAttribute("id"), r.id.startsWith("ac-") && r.removeAttribute("id") }, setARIA: function (e) { var t = this.options, n = t.ariaEnabled, s = t.triggerClass, i = t.panelClass; if (n) { var r = e.querySelector(u(s)), o = e.querySelector(u(i)); r.setAttribute("role", "button"), r.setAttribute("aria-controls", o.id), r.setAttribute("aria-disabled", !1), r.setAttribute("aria-expanded", !1), o.setAttribute("role", "region"), o.setAttribute("aria-labelledby", r.id) } }, updateARIA: function (e, t) { var n = t.ariaExpanded, s = t.ariaDisabled, i = this.options, r = i.ariaEnabled, o = i.triggerClass; if (r) { var a = e.querySelector(u(o)); a.setAttribute("aria-expanded", n), a.setAttribute("aria-disabled", s) } }, removeARIA: function (e) { var t = this.options, n = t.ariaEnabled, s = t.triggerClass, i = t.panelClass; if (n) { var r = e.querySelector(u(s)), o = e.querySelector(u(i)); r.removeAttribute("role"), r.removeAttribute("aria-controls"), r.removeAttribute("aria-disabled"), r.removeAttribute("aria-expanded"), o.removeAttribute("role"), o.removeAttribute("aria-labelledby") } }, focus: function (e, t) { e.preventDefault(); var n = this.options.triggerClass; t.querySelector(u(n)).focus() }, focusFirstElement: function (e) { this.focus(e, this.firstElement), this.currFocusedIdx = 0 }, focusLastElement: function (e) { this.focus(e, this.lastElement), this.currFocusedIdx = this.elements.length - 1 }, focusNextElement: function (e) { var t = this.currFocusedIdx + 1; if (t > this.elements.length - 1) return this.focusFirstElement(e); this.focus(e, this.elements[t]), this.currFocusedIdx = t }, focusPrevElement: function (e) { var t = this.currFocusedIdx - 1; if (t < 0) return this.focusLastElement(e); this.focus(e, this.elements[t]), this.currFocusedIdx = t }, showElement: function (e) { var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = this.options, s = n.panelClass, i = n.activeClass, r = n.collapse, o = n.beforeOpen; t && o(e); var a = e.querySelector(u(s)), l = a.scrollHeight; e.classList.add(i), requestAnimationFrame((function () { requestAnimationFrame((function () { a.style.height = t ? "".concat(l, "px") : "auto" })) })), this.updateARIA(e, { ariaExpanded: !0, ariaDisabled: !r }) }, closeElement: function (e) { var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = this.options, s = n.panelClass, i = n.activeClass, r = n.beforeClose, o = e.querySelector(u(s)), a = o.scrollHeight; e.classList.remove(i), t ? (r(e), requestAnimationFrame((function () { o.style.height = "".concat(a, "px"), requestAnimationFrame((function () { o.style.height = 0 })) }))) : o.style.height = 0, this.updateARIA(e, { ariaExpanded: !1, ariaDisabled: !1 }) }, toggleElement: function (e) { var t = this.options, n = t.activeClass, s = t.collapse, i = e.classList.contains(n); if (!i || s) return i ? this.closeElement(e) : this.showElement(e) }, closeElements: function () { var e = this, t = this.options, n = t.activeClass; t.showMultiple || this.elements.forEach((function (t, s) { t.classList.contains(n) && s !== e.currFocusedIdx && e.closeElement(t) })) }, handleClick: function (e) { var t = this, n = e.currentTarget; this.elements.forEach((function (s, i) { s.contains(n) && "A" !== e.target.nodeName && (t.currFocusedIdx = i, t.closeElements(), t.focus(e, s), t.toggleElement(s)) })) }, handleKeydown: function (e) { switch (e.key) { case "ArrowUp": return this.focusPrevElement(e); case "ArrowDown": return this.focusNextElement(e); case "Home": return this.focusFirstElement(e); case "End": return this.focusLastElement(e); default: return null } }, handleFocus: function (e) { var t = e.currentTarget, n = this.elements.find((function (e) { return e.contains(t) })); this.currFocusedIdx = this.elements.indexOf(n) }, handleTransitionEnd: function (e) { if (e.stopPropagation(), "height" === e.propertyName) { var t = this.options, n = t.onOpen, s = t.onClose, i = e.currentTarget, r = parseInt(i.style.height), o = this.elements.find((function (e) { return e.contains(i) })); r > 0 ? (i.style.height = "auto", n(o)) : s(o) } }
        }; this.attachEvents = function () { if (!o) { var e = a.options, t = e.triggerClass, n = e.panelClass; a.handleClick = a.handleClick.bind(a), a.handleKeydown = a.handleKeydown.bind(a), a.handleFocus = a.handleFocus.bind(a), a.handleTransitionEnd = a.handleTransitionEnd.bind(a), a.elements.forEach((function (e) { var s = e.querySelector(u(t)), i = e.querySelector(u(n)); s.addEventListener("click", a.handleClick), s.addEventListener("keydown", a.handleKeydown), s.addEventListener("focus", a.handleFocus), i.addEventListener("webkitTransitionEnd", a.handleTransitionEnd), i.addEventListener("transitionend", a.handleTransitionEnd) })), o = !0 } }, this.detachEvents = function () { if (o) { var e = a.options, t = e.triggerClass, n = e.panelClass; a.elements.forEach((function (e) { var s = e.querySelector(u(t)), i = e.querySelector(u(n)); s.removeEventListener("click", a.handleClick), s.removeEventListener("keydown", a.handleKeydown), s.removeEventListener("focus", a.handleFocus), i.removeEventListener("webkitTransitionEnd", a.handleTransitionEnd), i.removeEventListener("transitionend", a.handleTransitionEnd) })), o = !1 } }, this.toggle = function (e) { var t = a.elements[e]; t && a.toggleElement(t) }, this.open = function (e) { var t = a.elements[e]; t && a.showElement(t) }, this.openAll = function () { var e = a.options, t = e.activeClass, n = e.onOpen; a.elements.forEach((function (e) { e.classList.contains(t) || (a.showElement(e, !1), n(e)) })) }, this.close = function (e) { var t = a.elements[e]; t && a.closeElement(t) }, this.closeAll = function () { var e = a.options, t = e.activeClass, n = e.onClose; a.elements.forEach((function (e) { e.classList.contains(t) && (a.closeElement(e, !1), n(e)) })) }, this.destroy = function () { i.detachEvents(), i.openAll(), a.elements.forEach((function (e) { a.removeIDs(e), a.removeARIA(e), a.setTransition(e, !0) })), o = !0 }, this.update = function () {
            a.createDefinitions(), i.detachEvents(), i.attachEvents()
        }; var l = function (e) { return "string" == typeof document.documentElement.style[e] ? e : (e = c(e), e = "webkit".concat(e)) }, c = function (e) {
            return e.charAt(0).toUpperCase() + e.slice(1)
        }, u = function (e) {
            return ".".concat(CSS.escape(e))
        }; a.init()
    }; "undefined" != typeof module && void 0 !== module.exports ? module.exports = n : e.Accordion = n
}(window);

function toggleMenu() {
    let navigation = document.querySelector(".navigation");
    navigation.classList.toggle("active");
}



// ------------------------ função de pesquisa





// Adicionar evento de input na barra de pesquisa
function filterList() {
    var searchText = document.getElementById('searchInput').value.toLowerCase();
    var items = document.querySelectorAll('.ac');

    items.forEach(function (item) {
        var itemText = item.querySelector('.testeTexto').textContent.toLowerCase();
        var content = item.querySelector('.conteudo');

        if (itemText.includes(searchText)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}





// FILTRANDO BANCO
function filterList() {
    var searchText = document.getElementById('searchInput').value.toLowerCase();
    var items = document.querySelectorAll('.ac1');

    items.forEach(function (item) {
        var itemText = item.querySelector('.testeTexto1').textContent.toLowerCase();
        var content = item.querySelector('.conteudo');

        if (itemText.includes(searchText)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// -----------------------------





const carouselContent = document.getElementById('carouselContent');
const carouselItems = document.querySelectorAll('.carousel-item');
const slideWidth = carouselItems[0].clientWidth;
let currentIndex = 0;

function goToSlide(index) {
    if (index < 0) {
        index = carouselItems.length - 1;
    } else if (index >= carouselItems.length) {
        index = 0;
    }

    currentIndex = index;
    const offset = -currentIndex * slideWidth;
    carouselContent.style.transform = `translateX(${offset}px)`;
}

setInterval(() => {
    goToSlide(currentIndex + 1);
}, 3000); // Change slide every 3 seconds


/*Bancos Bradesco------------ */



function obterNomePorOcorrenciaEMotivo(ocorrencia, motivo) {
    const mapaOcorrenciaMotivo = {
        "02-00": "Ocorrência Aceita - 02 - Entrada Confirmada",
        "02-01": "Código do Banco Inválido - 02 - Entrada Confirmada",
        "02-02": "Pendente de Autorização (Autorização Débito Automático) - 02 - Entrada Confirmada",
        "02-03": "Pendente de Ação do Pagador (Autorização Débito Automático - Data Vencimento) - 02 - Entrada Confirmada",
        "02-04": "04..Código do Movimento não Permitido para a Carteira - 02 - Entrada Confirmada",
        "02-15": "Características da Cobrança Incompatíveis - 02 - Entrada Confirmada",
        "02-17": "Data de Vencimento Anterior à Data de Emissão - 02 - Entrada Confirmada",
        "02-21": "Espécie do título inválido - Entrada Confirmada",
        "02-24": "Data da Emissão Inválida - 02 - Entrada Confirmada",
        "02-27": "Valor/Taxa de Juros Mora Inválido - 02 - Entrada Confirmada",
        "02-38": "Prazo para Protesto/Negativação Inválido - 02 - Entrada Confirmada",
        "02-39": "Pedido para Protesto/Negativação não Permitido para o Título - 02 - Entrada Confirmada",
        "02-43": "Prazo para Baixa e Devolução Inválido - 02 - Entrada Confirmada",
        "02-45": "Nome do Pagador Inválido - 02 - Entrada Confirmada",
        "02-46": "Tipo/Num. de Inscrição do Pagador Inválidos - 02 - Entrada Confirmada",
        "02-47": "Endereço do Pagador não Informado - 02 - Entrada Confirmada",
        "02-48": "CEP Inválido - 02 - Entrada Confirmada",
        "02-50": "CEP referente a Banco Correspondente - 02 - Entrada Confirmada",
        "02-53": "Nº de Inscrição do Pagador/Avalista Inválidos (CPF/CNPJ) - 02 - Entrada Confirmada",
        "02-54": "Beneficiário Final não informado - 02 - Entrada Confirmada",
        "02-67": "Débito Automático Agendado - 02 - Entrada Confirmada",
        "02-68": "Débito não Agendado - Erro nos Dados de Remessa - 02 - Entrada Confirmada",
        "02-69": "Débito não Agendado - Pagador não Consta no Cadastro de Autorizante - 02 - Entrada Confirmada",
        "02-70": "Débito não Agendado - Beneficiário não Autorizado pelo Pagador - 02 - Entrada Confirmada",
        "02-71": "Débito não Agendado - Beneficiário não Participa da Modalidade de Déb.Automático - 02 - Entrada Confirmada",
        "02-72": "Débito não Agendado - Código de Moeda Diferente de R$ - 02 - Entrada Confirmada",
        "02-73": "Débito não Agendado - Data de Vencimento Inválida/Vencida - 02 - Entrada Confirmada",
        "02-75": "Débito não Agendado - Tipo do Número de Inscrição do Pagador Debitado Inválido - 02 - Entrada Confirmada",
        "02-76": "Pagador Eletrônico DDA - Esse motivo somente será disponibilizado no arquivo - retorno para as empresas cadastradas nessa condição - 02 - Entrada Confirmada",
        "02-86": "Seu Número do Documento Inválido - 02 - Entrada Confirmada",
        "02-87": "Título Baixado por Coobrigação e Devolvido para Carteira - 02 - Entrada Confirmada",
        "02-89": "Email Pagador não Enviado - Título com Débito Automático - 02 - Entrada Confirmada",
        "02-90": "Email Pagador não Enviado - Título de Cobrança sem Registro - 02 - Entrada Confirmada",
        "03-00": "Ocorrência Aceita",
        "03-02": "Código do Registro Detalhe Inválido",
        "03-03": "código da Ocorrência Inválida",
        "03-04": "Código de Ocorrência não Permitida para a Carteira",
        "03-05": "Código de Ocorrência não Numérico",
        "03-07": "Agência / Conta / Dígito Inválido",
        "03-08": "Nosso Número Inválido",
        "03-09": "Nosso Número Duplicado",
        "03-10": "Carteira Inválida",
        "03-13": "Identificação da Emissão do Bloqueto Inválida",
        "03-16": "Data de Vencimento Inválida",
        "03-18": "Vencimento fora do Prazo de Operação",
        "03-20": "Valor do Título Inválido",
        "03-21": "Espécie do Título Inválida",
        "03-22": "Espécie não Permitida para a Carteira",
        "03-23": "Tipo Pagamento não Contratado",
        "03-24": "Data de Emissão Inválida",
        "03-27": "Valor / Taxa de Juros Mora Inválido",
        "03-28": "Código do Desconto Inválido",
        "03-29": "..Valor Desconto > ou = Valor Título",
        "03-32": "Valor do IOF Inválido",
        "03-34": "Valor do Abatimento Maior ou Igual ao Valor do Título",
        "03-38": "Prazo para Protesto / Negativação Inválido 46 / 55",
        "03-39": "Pedido de Protesto / Negativação não Permitida para o Título",
        "03-44": "Código da Moeda Inválido",
        "03-45": "Nome do Pagador não Informado",
        "03-46": "Tipo / Número de Inscrição do Pagador Inválidos",
        "03-47": "Endereço do Pagador não Informado",
        "03-48": "CEP Inválido",
        "03-49": "CEP sem Praça de Cobrança",
        "03-50": "CEP Irregular - Banco Correspondente",
        "03-53": "Tipo / Número de Inscrição do Beneficiário Final Inválido",
        "03-54": "Sacador / Avalista(Beneficiário Final) não Informado",
        "03-59": "Valor / Percentual da Multa Inválido",
        "03-63": "Entrada para Título já Cadastrado",
        "03-65": "Limite Excedido",
        "03-66": "Número Autorização Inexistente",
        "03-68": "Débito não Agendado - Erro nos Dados de Remessa",
        "03-69": "Débito não Agendado - Pagador não Consta no Cadastro de Autorizante",
        "03-70": "Débito não Agendado - Beneficiário não Autorizado pelo Pagador",
        "03-71": "Débito não Agendado - Beneficiário não Participa do Débito Automático",
        "03-72": "Débito não Agendado - Código de Moeda Diferente de R$",
        "03-73": "Débito não Agendado - Data de Vencimento Inválida / Cadastro Vencido",
        "03-74": "Débito não Agendado - Conforme seu Pedido, Título não Registrado",
        "03-75": "Débito não Agendado - Tipo de Número de Inscrição do Debitado Inválido",
        "03-79": "Data de Juros de Mora Inválida",
        "03-80": "Data do Desconto Inválida",
        "03-86": "Seu Número Inválido",
        "03-A3": "Benef.Final / Sacador / Pagador Devem ser Iguais",
        "03-A6": "Esp.BDP / Depósito e Aporte, não Aceita Pgto Parcial",
        "06-00": "Crédito Disponível",
        "06-15": "Crédito Indisponível",
        "06-18": "Pagamento Parcial",
        "06-42": "Rateio não efeutada, Cód. Cálculo 2 (VLR. Registro)",
        "07-A0": "Cadastro Excluído pelo Beneficiário - Conf Exc. Cadastro Pagador Débito",
        "07-A1": "Cadastro Excluído pelo Pagador- Conf Exc. Cadastro Pagador Débito",
        "08-C0": "Informações do Tipo 6 Inválidas - Rej. Ped. Exc. Cadastro de Pagador Débito",
        "08-B9": "Cadastro Pagador não Localizado - Cadastro Pagador não Localizado",
        "09-00": "Ocorrência Aceita - Baixado Automaticamente via Arquivo",
        "09-37": "Cancelamento de Rateio por Motivo de Baixa Comandada",
        "09-43": "Ocorrência não Possui Rateio",
        "09-10": "Baixa Comandada pelo Cliente - Baixado Automaticamente via Arquivo",
        "09-18": "Pagador não Aceitou o Débito - Baixado Automaticamente via Arquivo",
        "09-19": "19.Pendente de Ação do Pagador - Baixado Automaticamente via Arquivo",
        "10-00": "Ocorrência Aceita - Baixado pelo Banco",
        "10-37": "Cancelamento de Rateio por Motivo de Baixa Comandada",
        "10-43": "Ocorrência não Possui Rateio",
        "10-14": "Título Protestado - Baixado pelo Banco",
        "10-16": "Título Baixado pelo Banco por Decurso Prazo - Baixado pelo Banco",
        "10-20": "Titulo Baixado e Transferido para Desconto/ Mudança de carteira  - Baixado pelo Banco",
        "15-00": "Crédito Disponível - Liquidação em Cartório",
        "15-15": "Liquidação em Cartório - Crédito",
        "23-00": "Protesto enviado a Cartório",
        "17-00": "Crédito Disponível - Liquidação após Baixa ou Título não Registrado",
        "17-15": "Crédito Indisponível - Liquidação após Baixa ou Título não Registrado,",
        "24-00": "Ocorrência Aceita - Entrada Rejeitada por CEP Irregular - Entrada Rejeitada por CEP Irregular",
        "24-48": "CEP Inválido - Entrada Rejeitada por CEP Irregular",
        "24-49": "CEP sem Praça de Cobrança - Entrada Rejeitada por CEP Irregular",
        "27-00": "Entrada Rejeitada por CEP Irregular - Baixa Rejeitada",
        "27-02": "Código do Registro Detalhe Inválido - Baixa Rejeitada",
        "27-04": "Código de Ocorrência não Permitido para a Carteira - Baixa Rejeitada",
        "27-07": "Agência/Conta/Dígito Inválidos - Baixa Rejeitada",
        "27-08": "Nosso Número Inválido - Baixa Rejeitada",
        "27-09": "Nosso Número Duplicado - Baixa Rejeitada",
        "27-10": "Carteira Inválida - Baixa Rejeitada",
        "27-15": "Carteira/Agência/Conta/Nosso Número Inválido - Baixa Rejeitada",
        "27-16": "Data Vencimento Inválida - Baixa Rejeitada",
        "27-18": "Vencimento Fora do Prazo de Operação - Baixa Rejeitada",
        "27-20": "Valor Título Inválido - Baixa Rejeitada",
        "27-40": "Título com Ordem de Protesto Emitido - Baixa Rejeitada",
        "27-42": "Código para Baixa/Devolução Inválido - Baixa Rejeitada",
        "27-45": "Nome do Sacado não Informado ou Inválido - Baixa Rejeitada",
        "27-46": "Tipo/Número de Inscrição do Sacado Inválido - Baixa Rejeitada",
        "27-47": "Endereço do Sacado não Informado - Baixa Rejeitada",
        "27-48": "CEP Inválido - Baixa Rejeitada",
        "27-60": "Movimento para Título não Cadastrado - Baixa Rejeitada",
        "27-77": "Transferência para Desconto não Permitido para a Carteira - Baixa Rejeitada",
        "27-85": "Título com Pagamento Vinculado - Baixa Rejeitada",
        "27-86": "Seu Número Inválido - Baixa Rejeitada",
        "28-02": "28..Tarifa de Permanência Título Cadastrado (*)",
        "28-03": "03..Tarifa de Sustação/Excl Negativação (*)",
        "28-04": "04..Tarifa de Protesto/Incl Negativação (*)",
        "28-08": "08..Custas de Protesto",
        "28-12": "12..Tarifa de Registro (*)",
        "28-13": "13..Tarifa Título Pago no Bradesco (*)",
        "28-14": "14..Tarifa Título Pago Compensação (*)",
        "28-15": "15..Tarifa Título Baixado não Pago (*)",
        "28-16": "16..Tarifa Alteração de Vencimento (*)",
        "28-17": "17..Tarifa Concessão Abatimento (*)",
        "28-18": "18..Tarifa Cancelamento de Abatimento (*)",
        "28-19": "19..Tarifa Concessão Desconto (*)",
        "28-20": "20..Tarifa Cancelamento Desconto (*)",
        "28-21": "21..Tarifa Título Pago CICS (*)",
        "28-22": "22..Tarifa Título Pago Internet (*)",
        "28-23": "23..Tarifa Título Pago Term. Gerencial Serviços (*)",
        "28-24": "24..Tarifa Título Pago Pag-Contas (*)",
        "28-25": "25..Tarifa Título Pago Fone Fácil (*)",
        "28-26": "26..Tarifa Título Déb. Postagem (*)",
        "28-28": "28..Tarifa Título Pago BDN (*)",
        "28-28": "28..Tarifa Título Pago Term. Multi Função (*)",
        "28-32": "32..Tarifa Título Pago PagFor (*)",
        "28-33": "33..Tarifa Reg/Pgto - Guichê Caixa (*)",
        "28-34": "34..Tarifa Título Pago Retaguarda (*)",
        "28-35": "35..Tarifa Título Pago Subcentro (*)",
        "28-36": "36..Tarifa Título Pago Cartão de Crédito (*)",
        "28-37": "37..Tarifa Título Pago Comp Eletrônica (*)",
        "28-38": "38..Tarifa Título Baix. Pg. Cartório (*)",
        "28-39": "39..Tarifa Título Baixado Acerto Bco (*)",
        "28-40": "40..Baixa Registro em Duplicidade (*)",
        "28-41": "41..Tarifa Título Baixado Decurso Prazo (*)",
        "28-42": "42..Tarifa Título Baixado Judicialmente (*)",
        "28-43": "43..Tarifa Título Baixado via Remessa (*)",
        "28-44": "44..Tarifa Título Baixado Rastreamento (*)",
        "28-45": "45..Tarifa Título Baixado Conf. Pedido (*)",
        "28-46": "46..Tarifa Título Baixado Protestado (*)",
        "28-47": "47..Tarifa Título Baixado p/ Devolução (*)",
        "28-48": "48..Tarifa Título Baixado Franco Pagto (*)",
        "28-49": "49..Tarifa Título Baixado Sust/Ret/Cartório (*)",
        "28-50": "50..Tarifa Título Baixado Sus/Sem/Rem/Cartório (*)",
        "28-51": "51..Tarifa Título Transferido Desconto (*)",
        "28-54": "54..Tarifa Baixa por Contabilidade (*)",
        "28-55": "55..Tr. Tentativa Cons Déb Aut",
        "28-56": "56..Tr. Crédito On-Line",
        "28-57": "57..Tarifa Reg/Pagto Bradesco Expresso",
        "28-58": "58..Tarifa Emissão Papeleta",
        "28-78": "78..Tarifa Cadastro Cartela Instrução Permanente (*)",
        "28-80": "80..Tarifa Parcial Pagamento Compensação (*)",
        "28-81": "81..Tarifa Reapresentação Automática Título (*)",
        "28-82": "82..Tarifa Registro Título Déb. Automático (*)",
        "28-83": "83..Tarifa Rateio de Crédito (*)",
        "28-89": "89..Tarifa Parcial Pagamento Bradesco (*)",
        "28-96": "Tarifa Reg. Pagto Outras Mídias (*)",
        "28-97": "Tarifa Reg/Pagto - Net Empresa (*)",
        "28-98": "98..Tarifa Título Pago Vencido (*)",
        "28-99": "Tr.Tít. Baixado por Decurso Prazo (*)",
        "29-78": "Pagador Alega que Faturamento é Indevido (*)",
        "29-95": "Pagador Aceita/Reconhece Faturamento (*)",
        "30-01": "Código do Banco Inválido",
        "30-04": "Código de Ocorrência não Permitido para a Carteira",
        "30-05": "Código da Ocorrência não Numérico",
        "30-08": "Nosso Número Inválido",
        "30-15": "Característica da Cobrança Incompatível",
        "30-16": "Data de Vencimento Inválido",
        "30-17": "Data de Vencimento Anterior à Data de Emissão",
        "30-18": "Vencimento Fora do Prazo de Operação",
        "30-20": "Valor Título Inválido",
        "30-21": "Espécie Título Inválida",
        "30-22": "Espécie não Permitida para a Carteira",
        "30-23": "Tipo Pagamento não Contratado",
        "30-24": "Data de Emissão Inválida",
        "30-26": "Código de Juros de Mora Inválido (*)",
        "30-27": "Valor/Taxa de Juros de Mora Inválido",
        "30-28": "Código de Desconto Inválido",
        "30-29": "Valor do Desconto Maior/Igual ao Valor do Título",
        "30-30": "Desconto a Conceder não Confere",
        "30-31": "Concessão de Desconto já Existente ( Desconto Anterior )",
        "30-32": "Valor do IOF Inválido",
        "30-33": "Valor do Abatimento Inválido",
        "30-34": "Valor do Abatimento Maior/Igual ao Valor do Título",
        "30-36": "Concessão Abatimento",
        "30-38": "Prazo para Protesto/ Negativação Inválido",
        "30-39": "Pedido para Protesto/ Negativação não Permitido para o Título",
        "30-40": "Título com Ordem/Pedido de Protesto/Negativação Emitido",
        "30-42": "Código para Baixa/Devolução Inválido",
        "30-43": "Prazo para Baixa/Devolução Inválido",
        "30-46": "Tipo/Número de Inscrição do Pagador Inválidos",
        "30-48": "CEP Inválido",
        "30-53": "Tipo/Número de Inscrição do Pagador/Avalista Inválidos",
        "30-54": "Pagador/Avalista não Informado",
        "30-57": "Código da Multa Inválido",
        "30-58": "Data da Multa Inválida",
        "30-60": "Movimento para Título não Cadastrado",
        "30-79": "Data de Juros de Mora Inválida",
        "30-80": "Data do Desconto Inválida",
        "30-85": "Título com Pagamento Vinculado.",
        "30-88": "E-mail Pagador não Lido no Prazo 5 Dias",
        "30-91": "E-mail Pagador não Recebido",
        "30-C0": "- Informações do Tipo 6 Inválidas",
        "30-C1": "Informações do Tipo 6 Divergentes do Cadastro",
        "32-01": "Código do Banco Inválido",
        "32-02": "Código Registro Detalhe Inválido",
        "32-04": "Código de Ocorrência não Permitido para a Carteira",
        "32-05": "Código de Ocorrência não Numérico",
        "32-06": "Espécie BDP, não Aceita Pagamento Parcial",
        "32-07": "Agência/Conta/Dígito Inválidos",
        "32-08": "Nosso Número Inválido",
        "32-10": "Carteira Inválida",
        "32-15": "Características da Cobrança Incompatíveis",
        "32-16": "Data de Vencimento Inválida",
        "32-17": "Data de Vencimento Anterior à Data de Emissão",
        "32-18": "Vencimento Fora do Prazo de Operação",
        "32-20": "Valor do Título Inválido",
        "32-21": "Espécie do Título Inválida",
        "32-22": "Espécie não Permitida para a Carteira",
        "32-23": "Tipo Pagamento não Contratado",
        "32-24": "Data de Emissão Inválida",
        "32-26": "Código Juros Mora Inválido",
        "32-27": "Valor/Taxa Juros Mira Inválido",
        "32-28": "Código de Desconto Inválido",
        "32-29": "Valor do Desconto Maior/Igual ao Valor do Título",
        "32-30": "Desconto a Conceder não Confere",
        "32-31": "Concessão de Desconto - Já Existe Desconto Anterior",
        "32-33": "Valor do Abatimento Inválido",
        "32-34": "Valor do Abatimento Maior/Igual ao Valor do Título",
        "32-36": "Concessão Abatimento - Já Existe Abatimento Anterior",
        "32-38": "Prazo para Protesto/Negativação Inválido",
        "32-39": "Pedido para Protesto/Negativação não Permitido para o Título",
        "32-40": "Título com Ordem/Pedido de Protesto/Negativação Emitido",
        "32-41": "Pedido de Sustação/Excl p/ Título sem Instrução de Protesto/Negativação",
        "32-45": "Nome do Pagador não Informado",
        "32-46": "Tipo/Número de Inscrição do Pagador Inválidos",
        "32-47": "Endereço do Pagador não Informado",
        "32-48": "CEP Inválido",
        "32-50": "CEP referente a um Banco Correspondente",
        "32-52": "Unidade da Federação Inválida",
        "32-53": "Tipo de Inscrição do Pagador Avalista Inválidos",
        "32-60": "Movimento para Título não Cadastrado",
        "32-65": "Limite Excedido",
        "32-66": "Número Autorização Inexistente",
        "32-85": "Título com Pagamento Vinculado",
        "32-86": "Seu Número Inválido",
        "32-94": "Título Cessão Fiduciária - Instrução Não Liberada pela Agência",
        "32-97": "Instrução não Permitida Título Negativado",
        "32-98": "Inclusão Bloqueada face à Determinação Judicial",
        "32-99": "Telefone Beneficiário não Informado / Inconsistente",
        "33-00": "Confirmação pedido alteração outros dados",
        "34-00": "Retirado de cartório e manut. carteira",
        "35-01": "Tentativas Esgotadas, Baixado",
        "35-02": "Tentativas Esgotadas, Pendente",
        "35-03": "Cancelado pelo Pagador e Mantido Pendente, Conforme Negociação (*)",
        "35-04": "Cancelado pelo Pagador e Baixado, Conforme Negociação (*)",
        "35-81": "Tentativas de desagendamento esgotadas, baixado",
        "35-82": "Tentativas de desagendamento esgotadas, pendente",
        "37-C0": "Informações do Tipo 6 Inválidas",
        "37-C1": "Informações do Tipo 6 Divergentes do Cadastro",
        "39-C0": "C0 - Informações do Tipo 6 Inválidas",
        "39-C1": "C1 - Informações do Tipo 6 Divergentes do Cadastr",
        "03-07": "07..Título Rejeitado na Cobrança",
        "24-07": "Título Rejeitado na Cobrança",
        "06-38": "Rateio Efetuado, Beneficiário Aguardando Crédito",
        "06-39": "Rateio Efetuado, Beneficiário já Creditado",
        "06-40": "Rateio não Efetuado, Conta Débito Beneficiário Bloqueada",
        "06-41": "Rateio não Efetuado, Conta Beneficiário Encerrada, para Banco 237",
        "06-42": "Rateio não Efetuado, Código Cálculo 2 (Valor Registro) e (Valor Pago Menor)",
        "06-43": "Ocorrência não Possui Rateio.",
        "15-38": "Rateio Efetuado, Beneficiário Aguardando Crédito",
        "15-39": "Rateio Efetuado, Beneficiário já Creditado",
        "15-40": "Rateio não Efetuado, Conta Débito Beneficiário Bloqueada",
        "15-41": "Rateio não Efetuado, Conta Beneficiário Encerrada, para Banco 237",
        "15-42": "Rateio não Efetuado, Código Cálculo 2 (Valor Registro) e (Valor Pago Menor)",
        "15-43": "Ocorrência não Possui Rateio.",
        "37-43": "Cancelamento de Rateio por Motivo de Baixa Comandada",
        "37-43": "Ocorrência não Possui Rateio",
        "68-00": "Remessa para Rateio Aceita, Título Aguardando Rateio",
        "68-01": "Conta Beneficiário Inválida, para o Banco 237",
        "68-02": "Rateio Rejeitada, posição 105 diferente de R” e acompanha tipo 3",
        "68-03": "Rateio Rejeitada, posição 105 igual a R”, e não acompanhar tipo 3",
        "68-04": "Rateio Rejeitada, posição 105 diferente de R” ou branco",
        "68-05": "Empresa Inativa para Rateio",
        "68-06": "Beneficiário Inativo para Rateio",
        "68-08": "Código de Cálculo de Rateio Diferente de 1, 2 ou 3",
        "68-09": "Banco/Agência/Conta Beneficiário não Numérico",
        "68-10": "Agência/Razão/Conta Beneficiário não Numérico",
        "68-11": "Valor Rateio Informado não Numérico",
        "68-12": "Percentual de Rateio não Numérico",
        "68-13": "Tipo de Valor Informado Diferente de 1 ou 2",
        "68-14": "Banco não Participante do Rateio, Banco Diferente de 237",
        "68-15": "Informado Percentual e Valor no Mesmo Beneficiário",
        "68-16": "Dígito Agência Beneficiário não Confere, para Banco 237",
        "68-17": "Dígito Conta Beneficiário não Confere, para Banco 237",
        "68-18": "Banco Agência Conta Beneficiário igual a Zeros",
        "68-19": "Agência/Razão/Conta Beneficiário igual a Zeros",
        "68-20": "Nome de Beneficiários não Informado",
        "68-21": "Quantidade de Beneficiários Excedeu 90",
        "68-22": "Quantidade de Beneficiários Excedeu 4 (Layout Velho)",
        "68-23": "Floating beneficiário superior a 30 dias",
        "68-24": "Código Cálculo 1 (Valor Cobrado) e Benef. não Informado em Percentual",
        "68-25": "Beneficiário com Códigos de Cálculo de Rateio Diferentes",
        "68-26": "Beneficiários Informados em Percentual e Outros em Valor",
        "68-27": "Somatória dos Valores dos Beneficiários Excedeu Valor do Título",
        "68-28": "Somatória dos Percentuais dos Beneficiários Excedeu 100%",
        "68-29": "Efetuado Acerto no Rateio",
        "68-30": "Acerto no Rateio Rejeitado, Empresa não Participante",
        "68-31": "Acerto no Rateio Rejeitado, Beneficiário não Participante",
        "68-32": "Empresa Bloqueada para Rateio",
        "68-33": "Beneficiário Bloqueado para Rateio",
        "68-34": "Acerto de Rateio Rejeitado, Título não Registrado na Cobrança",
        "68-35": "Título não Cadastrado para Rateio, Efetuada a Inclusão",
        "68-43": "Ocorrência não Possui Rateio",
        "68-44": "Título já Cadastrado para Rateio",
        "68-45": "Número do Título Inválido",
        "68-46": "Conta Beneficiário Inválida",
        "68-48": "Acerto Rejeitado, Título já Rateado ou Baixado",
        "69-04": "Remessa Rat. Rejeitado, posição 105 diferente de “R” ou branco",
        "69-05": "Empresa Inativa para Rateio",
        "69-06": "Beneficiário Inativo para Rateio",
        "69-32": "Empresa Bloqueada para Rateio",
        "69-33": "Beneficiário Bloqueado para Rateio",
        "69-36": "Cancelamento de Rateio Efetuado",
        "69-43": "Ocorrência não Possui Rateio",
        "69-45": "Número do Título Inválido",
        "69-46": "Conta Beneficiário Inválida",
        "69-47": "Cancelamento de Rateio Rejeitado, Título não Registrado na Cobrança",
        "69-49": "Cancelamento Rejeitado, Título não Registrado no Rateio",
        "69-50": "Cancelamento Rejeitado, Título já Rateado",

    };

    const chave = `${ocorrencia.toUpperCase()}-${motivo.toUpperCase()}`;

    if (mapaOcorrenciaMotivo[chave]) {
        return mapaOcorrenciaMotivo[chave];
    } else {
        return ("Combinação de ocorrência e motivo inválida.");
    }
}

function consultar() {
    const ocorrencia = document.getElementById("ocorrencia").value.trim().padStart(2, '0');
    const motivo = document.getElementById("motivo").value.trim().padStart(2, '0');

    const nomePessoa = obterNomePorOcorrenciaEMotivo(ocorrencia, motivo);
    document.getElementById("resultado").innerText = "Resultado: " + nomePessoa;
}

function todos() {
    const mapaOcorrenciaMotivo = {
        "02-00": "Ocorrência Aceita - 02 - Entrada Confirmada",
        "02-01": "Código do Banco Inválido - 02 - Entrada Confirmada",
        "02-02": "Pendente de Autorização (Autorização Débito Automático) - 02 - Entrada Confirmada",
        "02-03": "Pendente de Ação do Pagador (Autorização Débito Automático - Data Vencimento) - 02 - Entrada Confirmada",
        "02-04": "04..Código do Movimento não Permitido para a Carteira - 02 - Entrada Confirmada",
        "02-15": "Características da Cobrança Incompatíveis - 02 - Entrada Confirmada",
        "02-17": "Data de Vencimento Anterior à Data de Emissão - 02 - Entrada Confirmada",
        "02-21": "Espécie do título inválido - Entrada Confirmada",
        "02-24": "Data da Emissão Inválida - 02 - Entrada Confirmada",
        "02-27": "Valor/Taxa de Juros Mora Inválido - 02 - Entrada Confirmada",
        "02-38": "Prazo para Protesto/Negativação Inválido - 02 - Entrada Confirmada",
        "02-39": "Pedido para Protesto/Negativação não Permitido para o Título - 02 - Entrada Confirmada",
        "02-43": "Prazo para Baixa e Devolução Inválido - 02 - Entrada Confirmada",
        "02-45": "Nome do Pagador Inválido - 02 - Entrada Confirmada",
        "02-46": "Tipo/Num. de Inscrição do Pagador Inválidos - 02 - Entrada Confirmada",
        "02-47": "Endereço do Pagador não Informado - 02 - Entrada Confirmada",
        "02-48": "CEP Inválido - 02 - Entrada Confirmada",
        "02-50": "CEP referente a Banco Correspondente - 02 - Entrada Confirmada",
        "02-53": "Nº de Inscrição do Pagador/Avalista Inválidos (CPF/CNPJ) - 02 - Entrada Confirmada",
        "02-54": "Beneficiário Final não informado - 02 - Entrada Confirmada",
        "02-67": "Débito Automático Agendado - 02 - Entrada Confirmada",
        "02-68": "Débito não Agendado - Erro nos Dados de Remessa - 02 - Entrada Confirmada",
        "02-69": "Débito não Agendado - Pagador não Consta no Cadastro de Autorizante - 02 - Entrada Confirmada",
        "02-70": "Débito não Agendado - Beneficiário não Autorizado pelo Pagador - 02 - Entrada Confirmada",
        "02-71": "Débito não Agendado - Beneficiário não Participa da Modalidade de Déb.Automático - 02 - Entrada Confirmada",
        "02-72": "Débito não Agendado - Código de Moeda Diferente de R$ - 02 - Entrada Confirmada",
        "02-73": "Débito não Agendado - Data de Vencimento Inválida/Vencida - 02 - Entrada Confirmada",
        "02-75": "Débito não Agendado - Tipo do Número de Inscrição do Pagador Debitado Inválido - 02 - Entrada Confirmada",
        "02-76": "Pagador Eletrônico DDA - Esse motivo somente será disponibilizado no arquivo - retorno para as empresas cadastradas nessa condição - 02 - Entrada Confirmada",
        "02-86": "Seu Número do Documento Inválido - 02 - Entrada Confirmada",
        "02-87": "Título Baixado por Coobrigação e Devolvido para Carteira - 02 - Entrada Confirmada",
        "02-89": "Email Pagador não Enviado - Título com Débito Automático - 02 - Entrada Confirmada",
        "02-90": "Email Pagador não Enviado - Título de Cobrança sem Registro - 02 - Entrada Confirmada",
        "03-00": "Ocorrência Aceita",
        "03-02": "Código do Registro Detalhe Inválido",
        "03-03": "código da Ocorrência Inválida",
        "03-04": "Código de Ocorrência não Permitida para a Carteira",
        "03-05": "Código de Ocorrência não Numérico",
        "03-07": "Agência / Conta / Dígito Inválido",
        "03-08": "Nosso Número Inválido",
        "03-09": "Nosso Número Duplicado",
        "03-10": "Carteira Inválida",
        "03-13": "Identificação da Emissão do Bloqueto Inválida",
        "03-16": "Data de Vencimento Inválida",
        "03-18": "Vencimento fora do Prazo de Operação",
        "03-20": "Valor do Título Inválido",
        "03-21": "Espécie do Título Inválida",
        "03-22": "Espécie não Permitida para a Carteira",
        "03-23": "Tipo Pagamento não Contratado",
        "03-24": "Data de Emissão Inválida",
        "03-27": "Valor / Taxa de Juros Mora Inválido",
        "03-28": "Código do Desconto Inválido",
        "03-29": "..Valor Desconto > ou = Valor Título",
        "03-32": "Valor do IOF Inválido",
        "03-34": "Valor do Abatimento Maior ou Igual ao Valor do Título",
        "03-38": "Prazo para Protesto / Negativação Inválido 46 / 55",
        "03-39": "Pedido de Protesto / Negativação não Permitida para o Título",
        "03-44": "Código da Moeda Inválido",
        "03-45": "Nome do Pagador não Informado",
        "03-46": "Tipo / Número de Inscrição do Pagador Inválidos",
        "03-47": "Endereço do Pagador não Informado",
        "03-48": "CEP Inválido",
        "03-49": "CEP sem Praça de Cobrança",
        "03-50": "CEP Irregular - Banco Correspondente",
        "03-53": "Tipo / Número de Inscrição do Beneficiário Final Inválido",
        "03-54": "Sacador / Avalista(Beneficiário Final) não Informado",
        "03-59": "Valor / Percentual da Multa Inválido",
        "03-63": "Entrada para Título já Cadastrado",
        "03-65": "Limite Excedido",
        "03-66": "Número Autorização Inexistente",
        "03-68": "Débito não Agendado - Erro nos Dados de Remessa",
        "03-69": "Débito não Agendado - Pagador não Consta no Cadastro de Autorizante",
        "03-70": "Débito não Agendado - Beneficiário não Autorizado pelo Pagador",
        "03-71": "Débito não Agendado - Beneficiário não Participa do Débito Automático",
        "03-72": "Débito não Agendado - Código de Moeda Diferente de R$",
        "03-73": "Débito não Agendado - Data de Vencimento Inválida / Cadastro Vencido",
        "03-74": "Débito não Agendado - Conforme seu Pedido, Título não Registrado",
        "03-75": "Débito não Agendado - Tipo de Número de Inscrição do Debitado Inválido",
        "03-79": "Data de Juros de Mora Inválida",
        "03-80": "Data do Desconto Inválida",
        "03-86": "Seu Número Inválido",
        "03-A3": "Benef.Final / Sacador / Pagador Devem ser Iguais",
        "03-A6": "Esp.BDP / Depósito e Aporte, não Aceita Pgto Parcial",
        "06-00": "Crédito Disponível",
        "06-15": "Crédito Indisponível",
        "06-18": "Pagamento Parcial",
        "06-42": "Rateio não efeutada, Cód. Cálculo 2 (VLR. Registro)",
        "07-A0": "Cadastro Excluído pelo Beneficiário - Conf Exc. Cadastro Pagador Débito",
        "07-A1": "Cadastro Excluído pelo Pagador- Conf Exc. Cadastro Pagador Débito",
        "08-C0": "Informações do Tipo 6 Inválidas - Rej. Ped. Exc. Cadastro de Pagador Débito",
        "08-B9": "Cadastro Pagador não Localizado - Cadastro Pagador não Localizado",
        "09-00": "Ocorrência Aceita - Baixado Automaticamente via Arquivo",
        "09-37": "Cancelamento de Rateio por Motivo de Baixa Comandada",
        "09-43": "Ocorrência não Possui Rateio",
        "09-10": "Baixa Comandada pelo Cliente - Baixado Automaticamente via Arquivo",
        "09-18": "Pagador não Aceitou o Débito - Baixado Automaticamente via Arquivo",
        "09-19": "19.Pendente de Ação do Pagador - Baixado Automaticamente via Arquivo",
        "10-00": "Ocorrência Aceita - Baixado pelo Banco",
        "10-37": "Cancelamento de Rateio por Motivo de Baixa Comandada",
        "10-43": "Ocorrência não Possui Rateio",
        "10-14": "Título Protestado - Baixado pelo Banco",
        "10-16": "Título Baixado pelo Banco por Decurso Prazo - Baixado pelo Banco",
        "10-20": "Titulo Baixado e Transferido para Desconto/ Mudança de carteira  - Baixado pelo Banco",
        "15-00": "Crédito Disponível - Liquidação em Cartório",
        "15-15": "Liquidação em Cartório - Crédito",
        "23-00": "Protesto enviado a Cartório",
        "17-00": "Crédito Disponível - Liquidação após Baixa ou Título não Registrado",
        "17-15": "Crédito Indisponível - Liquidação após Baixa ou Título não Registrado,",
        "24-00": "Ocorrência Aceita - Entrada Rejeitada por CEP Irregular - Entrada Rejeitada por CEP Irregular",
        "24-48": "CEP Inválido - Entrada Rejeitada por CEP Irregular",
        "24-49": "CEP sem Praça de Cobrança - Entrada Rejeitada por CEP Irregular",
        "27-00": "Entrada Rejeitada por CEP Irregular - Baixa Rejeitada",
        "27-02": "Código do Registro Detalhe Inválido - Baixa Rejeitada",
        "27-04": "Código de Ocorrência não Permitido para a Carteira - Baixa Rejeitada",
        "27-07": "Agência/Conta/Dígito Inválidos - Baixa Rejeitada",
        "27-08": "Nosso Número Inválido - Baixa Rejeitada",
        "27-09": "Nosso Número Duplicado - Baixa Rejeitada",
        "27-10": "Carteira Inválida - Baixa Rejeitada",
        "27-15": "Carteira/Agência/Conta/Nosso Número Inválido - Baixa Rejeitada",
        "27-16": "Data Vencimento Inválida - Baixa Rejeitada",
        "27-18": "Vencimento Fora do Prazo de Operação - Baixa Rejeitada",
        "27-20": "Valor Título Inválido - Baixa Rejeitada",
        "27-40": "Título com Ordem de Protesto Emitido - Baixa Rejeitada",
        "27-42": "Código para Baixa/Devolução Inválido - Baixa Rejeitada",
        "27-45": "Nome do Sacado não Informado ou Inválido - Baixa Rejeitada",
        "27-46": "Tipo/Número de Inscrição do Sacado Inválido - Baixa Rejeitada",
        "27-47": "Endereço do Sacado não Informado - Baixa Rejeitada",
        "27-48": "CEP Inválido - Baixa Rejeitada",
        "27-60": "Movimento para Título não Cadastrado - Baixa Rejeitada",
        "27-77": "Transferência para Desconto não Permitido para a Carteira - Baixa Rejeitada",
        "27-85": "Título com Pagamento Vinculado - Baixa Rejeitada",
        "27-86": "Seu Número Inválido - Baixa Rejeitada",
        "28-02": "28..Tarifa de Permanência Título Cadastrado (*)",
        "28-03": "03..Tarifa de Sustação/Excl Negativação (*)",
        "28-04": "04..Tarifa de Protesto/Incl Negativação (*)",
        "28-08": "08..Custas de Protesto",
        "28-12": "12..Tarifa de Registro (*)",
        "28-13": "13..Tarifa Título Pago no Bradesco (*)",
        "28-14": "14..Tarifa Título Pago Compensação (*)",
        "28-15": "15..Tarifa Título Baixado não Pago (*)",
        "28-16": "16..Tarifa Alteração de Vencimento (*)",
        "28-17": "17..Tarifa Concessão Abatimento (*)",
        "28-18": "18..Tarifa Cancelamento de Abatimento (*)",
        "28-19": "19..Tarifa Concessão Desconto (*)",
        "28-20": "20..Tarifa Cancelamento Desconto (*)",
        "28-21": "21..Tarifa Título Pago CICS (*)",
        "28-22": "22..Tarifa Título Pago Internet (*)",
        "28-23": "23..Tarifa Título Pago Term. Gerencial Serviços (*)",
        "28-24": "24..Tarifa Título Pago Pag-Contas (*)",
        "28-25": "25..Tarifa Título Pago Fone Fácil (*)",
        "28-26": "26..Tarifa Título Déb. Postagem (*)",
        "28-28": "28..Tarifa Título Pago BDN (*)",
        "28-28": "28..Tarifa Título Pago Term. Multi Função (*)",
        "28-32": "32..Tarifa Título Pago PagFor (*)",
        "28-33": "33..Tarifa Reg/Pgto - Guichê Caixa (*)",
        "28-34": "34..Tarifa Título Pago Retaguarda (*)",
        "28-35": "35..Tarifa Título Pago Subcentro (*)",
        "28-36": "36..Tarifa Título Pago Cartão de Crédito (*)",
        "28-37": "37..Tarifa Título Pago Comp Eletrônica (*)",
        "28-38": "38..Tarifa Título Baix. Pg. Cartório (*)",
        "28-39": "39..Tarifa Título Baixado Acerto Bco (*)",
        "28-40": "40..Baixa Registro em Duplicidade (*)",
        "28-41": "41..Tarifa Título Baixado Decurso Prazo (*)",
        "28-42": "42..Tarifa Título Baixado Judicialmente (*)",
        "28-43": "43..Tarifa Título Baixado via Remessa (*)",
        "28-44": "44..Tarifa Título Baixado Rastreamento (*)",
        "28-45": "45..Tarifa Título Baixado Conf. Pedido (*)",
        "28-46": "46..Tarifa Título Baixado Protestado (*)",
        "28-47": "47..Tarifa Título Baixado p/ Devolução (*)",
        "28-48": "48..Tarifa Título Baixado Franco Pagto (*)",
        "28-49": "49..Tarifa Título Baixado Sust/Ret/Cartório (*)",
        "28-50": "50..Tarifa Título Baixado Sus/Sem/Rem/Cartório (*)",
        "28-51": "51..Tarifa Título Transferido Desconto (*)",
        "28-54": "54..Tarifa Baixa por Contabilidade (*)",
        "28-55": "55..Tr. Tentativa Cons Déb Aut",
        "28-56": "56..Tr. Crédito On-Line",
        "28-57": "57..Tarifa Reg/Pagto Bradesco Expresso",
        "28-58": "58..Tarifa Emissão Papeleta",
        "28-78": "78..Tarifa Cadastro Cartela Instrução Permanente (*)",
        "28-80": "80..Tarifa Parcial Pagamento Compensação (*)",
        "28-81": "81..Tarifa Reapresentação Automática Título (*)",
        "28-82": "82..Tarifa Registro Título Déb. Automático (*)",
        "28-83": "83..Tarifa Rateio de Crédito (*)",
        "28-89": "89..Tarifa Parcial Pagamento Bradesco (*)",
        "28-96": "Tarifa Reg. Pagto Outras Mídias (*)",
        "28-97": "Tarifa Reg/Pagto - Net Empresa (*)",
        "28-98": "98..Tarifa Título Pago Vencido (*)",
        "28-99": "Tr.Tít. Baixado por Decurso Prazo (*)",
        "29-78": "Pagador Alega que Faturamento é Indevido (*)",
        "29-95": "Pagador Aceita/Reconhece Faturamento (*)",
        "30-01": "Código do Banco Inválido",
        "30-04": "Código de Ocorrência não Permitido para a Carteira",
        "30-05": "Código da Ocorrência não Numérico",
        "30-08": "Nosso Número Inválido",
        "30-15": "Característica da Cobrança Incompatível",
        "30-16": "Data de Vencimento Inválido",
        "30-17": "Data de Vencimento Anterior à Data de Emissão",
        "30-18": "Vencimento Fora do Prazo de Operação",
        "30-20": "Valor Título Inválido",
        "30-21": "Espécie Título Inválida",
        "30-22": "Espécie não Permitida para a Carteira",
        "30-23": "Tipo Pagamento não Contratado",
        "30-24": "Data de Emissão Inválida",
        "30-26": "Código de Juros de Mora Inválido (*)",
        "30-27": "Valor/Taxa de Juros de Mora Inválido",
        "30-28": "Código de Desconto Inválido",
        "30-29": "Valor do Desconto Maior/Igual ao Valor do Título",
        "30-30": "Desconto a Conceder não Confere",
        "30-31": "Concessão de Desconto já Existente ( Desconto Anterior )",
        "30-32": "Valor do IOF Inválido",
        "30-33": "Valor do Abatimento Inválido",
        "30-34": "Valor do Abatimento Maior/Igual ao Valor do Título",
        "30-36": "Concessão Abatimento",
        "30-38": "Prazo para Protesto/ Negativação Inválido",
        "30-39": "Pedido para Protesto/ Negativação não Permitido para o Título",
        "30-40": "Título com Ordem/Pedido de Protesto/Negativação Emitido",
        "30-42": "Código para Baixa/Devolução Inválido",
        "30-43": "Prazo para Baixa/Devolução Inválido",
        "30-46": "Tipo/Número de Inscrição do Pagador Inválidos",
        "30-48": "CEP Inválido",
        "30-53": "Tipo/Número de Inscrição do Pagador/Avalista Inválidos",
        "30-54": "Pagador/Avalista não Informado",
        "30-57": "Código da Multa Inválido",
        "30-58": "Data da Multa Inválida",
        "30-60": "Movimento para Título não Cadastrado",
        "30-79": "Data de Juros de Mora Inválida",
        "30-80": "Data do Desconto Inválida",
        "30-85": "Título com Pagamento Vinculado.",
        "30-88": "E-mail Pagador não Lido no Prazo 5 Dias",
        "30-91": "E-mail Pagador não Recebido",
        "30-C0": "- Informações do Tipo 6 Inválidas",
        "30-C1": "Informações do Tipo 6 Divergentes do Cadastro",
        "32-01": "Código do Banco Inválido",
        "32-02": "Código Registro Detalhe Inválido",
        "32-04": "Código de Ocorrência não Permitido para a Carteira",
        "32-05": "Código de Ocorrência não Numérico",
        "32-06": "Espécie BDP, não Aceita Pagamento Parcial",
        "32-07": "Agência/Conta/Dígito Inválidos",
        "32-08": "Nosso Número Inválido",
        "32-10": "Carteira Inválida",
        "32-15": "Características da Cobrança Incompatíveis",
        "32-16": "Data de Vencimento Inválida",
        "32-17": "Data de Vencimento Anterior à Data de Emissão",
        "32-18": "Vencimento Fora do Prazo de Operação",
        "32-20": "Valor do Título Inválido",
        "32-21": "Espécie do Título Inválida",
        "32-22": "Espécie não Permitida para a Carteira",
        "32-23": "Tipo Pagamento não Contratado",
        "32-24": "Data de Emissão Inválida",
        "32-26": "Código Juros Mora Inválido",
        "32-27": "Valor/Taxa Juros Mira Inválido",
        "32-28": "Código de Desconto Inválido",
        "32-29": "Valor do Desconto Maior/Igual ao Valor do Título",
        "32-30": "Desconto a Conceder não Confere",
        "32-31": "Concessão de Desconto - Já Existe Desconto Anterior",
        "32-33": "Valor do Abatimento Inválido",
        "32-34": "Valor do Abatimento Maior/Igual ao Valor do Título",
        "32-36": "Concessão Abatimento - Já Existe Abatimento Anterior",
        "32-38": "Prazo para Protesto/Negativação Inválido",
        "32-39": "Pedido para Protesto/Negativação não Permitido para o Título",
        "32-40": "Título com Ordem/Pedido de Protesto/Negativação Emitido",
        "32-41": "Pedido de Sustação/Excl p/ Título sem Instrução de Protesto/Negativação",
        "32-45": "Nome do Pagador não Informado",
        "32-46": "Tipo/Número de Inscrição do Pagador Inválidos",
        "32-47": "Endereço do Pagador não Informado",
        "32-48": "CEP Inválido",
        "32-50": "CEP referente a um Banco Correspondente",
        "32-52": "Unidade da Federação Inválida",
        "32-53": "Tipo de Inscrição do Pagador Avalista Inválidos",
        "32-60": "Movimento para Título não Cadastrado",
        "32-65": "Limite Excedido",
        "32-66": "Número Autorização Inexistente",
        "32-85": "Título com Pagamento Vinculado",
        "32-86": "Seu Número Inválido",
        "32-94": "Título Cessão Fiduciária - Instrução Não Liberada pela Agência",
        "32-97": "Instrução não Permitida Título Negativado",
        "32-98": "Inclusão Bloqueada face à Determinação Judicial",
        "32-99": "Telefone Beneficiário não Informado / Inconsistente",
        "33-00": "Confirmação pedido alteração outros dados",
        "34-00": "Retirado de cartório e manut. carteira",
        "35-01": "Tentativas Esgotadas, Baixado",
        "35-02": "Tentativas Esgotadas, Pendente",
        "35-03": "Cancelado pelo Pagador e Mantido Pendente, Conforme Negociação (*)",
        "35-04": "Cancelado pelo Pagador e Baixado, Conforme Negociação (*)",
        "35-81": "Tentativas de desagendamento esgotadas, baixado",
        "35-82": "Tentativas de desagendamento esgotadas, pendente",
        "37-C0": "Informações do Tipo 6 Inválidas",
        "37-C1": "Informações do Tipo 6 Divergentes do Cadastro",
        "39-C0": "C0 - Informações do Tipo 6 Inválidas",
        "39-C1": "C1 - Informações do Tipo 6 Divergentes do Cadastr",
        "03-07": "07..Título Rejeitado na Cobrança",
        "24-07": "Título Rejeitado na Cobrança",
        "06-38": "Rateio Efetuado, Beneficiário Aguardando Crédito",
        "06-39": "Rateio Efetuado, Beneficiário já Creditado",
        "06-40": "Rateio não Efetuado, Conta Débito Beneficiário Bloqueada",
        "06-41": "Rateio não Efetuado, Conta Beneficiário Encerrada, para Banco 237",
        "06-42": "Rateio não Efetuado, Código Cálculo 2 (Valor Registro) e (Valor Pago Menor)",
        "06-43": "Ocorrência não Possui Rateio.",
        "15-38": "Rateio Efetuado, Beneficiário Aguardando Crédito",
        "15-39": "Rateio Efetuado, Beneficiário já Creditado",
        "15-40": "Rateio não Efetuado, Conta Débito Beneficiário Bloqueada",
        "15-41": "Rateio não Efetuado, Conta Beneficiário Encerrada, para Banco 237",
        "15-42": "Rateio não Efetuado, Código Cálculo 2 (Valor Registro) e (Valor Pago Menor)",
        "15-43": "Ocorrência não Possui Rateio.",
        "37-43": "Cancelamento de Rateio por Motivo de Baixa Comandada",
        "37-43": "Ocorrência não Possui Rateio",
        "68-00": "Remessa para Rateio Aceita, Título Aguardando Rateio",
        "68-01": "Conta Beneficiário Inválida, para o Banco 237",
        "68-02": "Rateio Rejeitada, posição 105 diferente de R” e acompanha tipo 3",
        "68-03": "Rateio Rejeitada, posição 105 igual a R”, e não acompanhar tipo 3",
        "68-04": "Rateio Rejeitada, posição 105 diferente de R” ou branco",
        "68-05": "Empresa Inativa para Rateio",
        "68-06": "Beneficiário Inativo para Rateio",
        "68-08": "Código de Cálculo de Rateio Diferente de 1, 2 ou 3",
        "68-09": "Banco/Agência/Conta Beneficiário não Numérico",
        "68-10": "Agência/Razão/Conta Beneficiário não Numérico",
        "68-11": "Valor Rateio Informado não Numérico",
        "68-12": "Percentual de Rateio não Numérico",
        "68-13": "Tipo de Valor Informado Diferente de 1 ou 2",
        "68-14": "Banco não Participante do Rateio, Banco Diferente de 237",
        "68-15": "Informado Percentual e Valor no Mesmo Beneficiário",
        "68-16": "Dígito Agência Beneficiário não Confere, para Banco 237",
        "68-17": "Dígito Conta Beneficiário não Confere, para Banco 237",
        "68-18": "Banco Agência Conta Beneficiário igual a Zeros",
        "68-19": "Agência/Razão/Conta Beneficiário igual a Zeros",
        "68-20": "Nome de Beneficiários não Informado",
        "68-21": "Quantidade de Beneficiários Excedeu 90",
        "68-22": "Quantidade de Beneficiários Excedeu 4 (Layout Velho)",
        "68-23": "Floating beneficiário superior a 30 dias",
        "68-24": "Código Cálculo 1 (Valor Cobrado) e Benef. não Informado em Percentual",
        "68-25": "Beneficiário com Códigos de Cálculo de Rateio Diferentes",
        "68-26": "Beneficiários Informados em Percentual e Outros em Valor",
        "68-27": "Somatória dos Valores dos Beneficiários Excedeu Valor do Título",
        "68-28": "Somatória dos Percentuais dos Beneficiários Excedeu 100%",
        "68-29": "Efetuado Acerto no Rateio",
        "68-30": "Acerto no Rateio Rejeitado, Empresa não Participante",
        "68-31": "Acerto no Rateio Rejeitado, Beneficiário não Participante",
        "68-32": "Empresa Bloqueada para Rateio",
        "68-33": "Beneficiário Bloqueado para Rateio",
        "68-34": "Acerto de Rateio Rejeitado, Título não Registrado na Cobrança",
        "68-35": "Título não Cadastrado para Rateio, Efetuada a Inclusão",
        "68-43": "Ocorrência não Possui Rateio",
        "68-44": "Título já Cadastrado para Rateio",
        "68-45": "Número do Título Inválido",
        "68-46": "Conta Beneficiário Inválida",
        "68-48": "Acerto Rejeitado, Título já Rateado ou Baixado",
        "69-04": "Remessa Rat. Rejeitado, posição 105 diferente de “R” ou branco",
        "69-05": "Empresa Inativa para Rateio",
        "69-06": "Beneficiário Inativo para Rateio",
        "69-32": "Empresa Bloqueada para Rateio",
        "69-33": "Beneficiário Bloqueado para Rateio",
        "69-36": "Cancelamento de Rateio Efetuado",
        "69-43": "Ocorrência não Possui Rateio",
        "69-45": "Número do Título Inválido",
        "69-46": "Conta Beneficiário Inválida",
        "69-47": "Cancelamento de Rateio Rejeitado, Título não Registrado na Cobrança",
        "69-49": "Cancelamento Rejeitado, Título não Registrado no Rateio",
        "69-50": "Cancelamento Rejeitado, Título já Rateado",
   
        // Adicione mais ocorrências e motivos conforme necessário
    };

    let tabelaHTML = "<table>";
    tabelaHTML += "<tr><th>Ocorrência</th><th>Motivo</th><th>Descrição</th></tr>";

    for (const chave in mapaOcorrenciaMotivo) {
        const ocorrencia = chave.split('-')[0];
        const motivo = chave.split('-')[1];
        const descricao = mapaOcorrenciaMotivo[chave];
        tabelaHTML += `<tr><td>${ocorrencia}</td><td>${motivo}</td><td>${descricao}</td></tr>`;
    }

    // Adiciona o botão de voltar
    tabelaHTML += "</table>";
    document.getElementById("resultadoTodos").innerHTML = tabelaHTML;
    // Torna o botão Voltar visível
    document.getElementById("botaoVoltar").style.display = "block";
}

function voltarTodos() {
    document.getElementById("resultadoTodos").innerHTML = "";

    // Oculta o botão Voltar ao voltar para a página inicial
    document.getElementById("botaoVoltar").style.display = "none";
}


function mostrarTodasTabelas() {
    let tabelaHTML = "<table>";
    tabelaHTML += "<tr><th>Número</th><th>Descrição</th></tr>";
    tabelaHTML += "<tr><td>02</td><td>Solicitar Baixa</td></tr>";
    tabelaHTML += "<tr><td>04</td><td>Conceder Abatimento</td></tr>";
    tabelaHTML += "<tr><td>05</td><td>Cancelar Abatimento</td></tr>";
    tabelaHTML += "<tr><td>06</td><td>Prorrogar Documento</td></tr>";
    tabelaHTML += "<tr><td>09</td><td>Protestar Documento</td></tr>";
    tabelaHTML += "<tr><td>19</td><td>Sustar protesto:</td></tr>";
    tabelaHTML += "<tr><td>23</td><td>Alterar Carteira</td></tr>";
    tabelaHTML += "<tr><td>31</td><td>Cancelar protesto</td></tr>";
    tabelaHTML += "<tr><td>18</td><td>Sustar Protesto/Baixar</td></tr>";
    tabelaHTML += "</table>";

    document.getElementById("resultadoTabela").innerHTML = tabelaHTML;

    // Adiciona o botão de voltar se ainda não estiver presente
    if (!document.getElementById("botaoDeVoltar")) {
        let botaoVoltarHTML = "<button id=\"botaoDeVoltar\" class=\"botaoDeVoltar\" onclick=\"voltarParaComandos()\">Voltar</button>";
        document.getElementById("resultadoTabela").insertAdjacentHTML('afterend', botaoVoltarHTML);
    }
}

function voltarParaComandos() {
    document.getElementById("resultadoTabela").innerHTML = ""; // Limpa a tabela
    // Remove o botão de voltar
    let botaoDeVoltar = document.getElementById("botaoDeVoltar");
    if (botaoDeVoltar) {
        botaoDeVoltar.remove();
    }
}





function obterNomePorOcorrenciaEMotivoItau(ocorrenciaItau, motivoItau) {
    const mapaOcorrenciaMotivoItau = {
        "02-00": "Entrada Confirmada",
        "03-00": "Entrada Rejeitada",
        "03-03": "Não foi possível atribuir a agência pelo CEP ou CEP Inválido",
        "03-04": "Sigla do Estado Inválida",
        "03-08": "Nome do sacado não informado",
        "03-09": "Agência/Conta Agência Encerrada",
        "03-10": "Logradouro - Não Informado ou deslocado",
        "03-11": "CEP - Não Numérico",
        "03-12": "Sacador Avalista - Nome não informado ou deslocado",
        "03-13": "CEP - Incompatível com a sigla do estado",
        "03-14": "Nosso Número já registrado no cadastro do banco",
        "03-15": "Nosso Número em duplicidade no mesmo movimento",
        "03-21": "Carteira não aceita depositária correspondente (ag. cobradora)",
        "03-22": "Carteira não permitida (necessário cadastrar faixa livre)",
        "03-29": "Código Empresa - Categoria da conta inválida",
        "03-35": "IOF - Maior que 5%",
        "03-36": "Quantidade de moeda incompatível com valor do título",
        "03-37": "CGC/CPF do Sacado - Não numérico ou igual a zero",
        "03-52": "Ag. Cobradora - Empresa não aceita banco correspondente",
        "03-53": "Ag. Cobradora - Empresa não aceita banco correspondente",
        "03-54": "Banco Correspondente - Título com vencimento inferior a 15 dias",
        "03-57": "CEP - Só depositária banco do Brasil com vencimento inferior a 8 dias",
        "03-60": "Valor do Abatimento Inválido",
        "03-61": "Juros de Mora maior que o permitido",
        "03-62": "Valor do desconto maior que o valor do Título",
        "03-63": "Importância por dia de desconto (Não Permitido)",
        "03-64": "Data da emissão do Título inválido (Vendor)",
        "03-65": "Taxa inválida (Vendor)",
        "03-66": "Data de vencimento inválida/fora de prazo de operação (mínimo ou máximo)",
        "03-67": "Valor de Título/quantidade de moeda inválida",
        "03-68": "Carteira inválida",
        "03-98": "Flash inválido - Diferente do cadastrado",
        "03-99": "Conta de Cobrança com flash cadastrado - sem registro",
        "04-00": "Alteração de Dados - Nova Entrada",
        "05-00": "Alteração de Dados - Baixa",
        "06-00": "Liquidação Normal",
        "07-00": "Liquidação por Conta",
        "08-00": "Liquidação em Cartório",
        "09-00": "Baixa Simples",
        "10-00": "Baixa por ter sido Liquidado",
        "11-00": "Em ser (só no retorno mensal)",
        "12-00": "Abatimento Concedido",
        "13-00": "Abatimento Cancelado",
        "14-00": "Vencimento Alterado",
        "15-00": "Baixa Rejeitada",
        "15-02": "Agência Cobradora inválida ou com o mesmo conteúdo",
        "15-04": "Sigla do estado inválida",
        "15-05": "Data de vencimento inválida ou com o mesmo conteúdo",
        "15-06": "Valor do título com outra alteração simultânea",
        "15-08": "Nomes do Sacado com o mesmo conteúdo",
        "15-11": "CEP - Inválido",
        "15-13": "Seu número com o mesmo conteúdo",
        "15-21": "Agência cobradora não consta no cadastro de depositária ou em encerramento",
        "15-53": "Instrução com o mesmo conteúdo",
        "15-55": "Alteração iguais para o mesmo controle (Agência/Conta/Carteira/Nosso Número)",
        "15-60": "Valor de IOF - Alteração não permitida",
        "15-61": "Título já baixado ou liquidado",
        "15-66": "Alteração não permitida para carteiras de notas de seguro",
        "15-81": "Alteração bloqueada - Título com protesto",
        "16-00": "Instruções Rejeitadas",
        "16-01": "Instrução/ocorrência não existe",
        "16-06": "Nosso número igual a zero",
        "16-09": "CNPJ/CPF - do sacado/avalista inválido",
        "16-14": "Registro em duplicidade",
        "16-15": "CNPJ/CPF - Informado sem nome do Sacador Avalista",
        "16-21": "Título não registrado no sistema",
        "16-22": "Título Baixado ou Liquidado",
        "16-23": "Instrução não aceita por ter sido emitido último aviso ao Sacado",
        "16-24": "Existe instrução de protesto para o título",
        "16-25": "Não existe instrução de protesto para o título",
        "16-26": "Instrução não aceita por ter sido emitido último aviso ao sacado",
        "16-27": "Instrução não aceita por não ter sido emitida a ordem de protesto ao cartório",
        "16-28": "Já existe uma mesma instrução cadastrada",
        "16-29": "Valor líquido + valor do abatimento diferente do valor registrado",
        "16-30": "Existe uma instrução de não protestar ativa para o título",
        "16-31": "Existe uma ocorrência do Sacado que bloqueia a instrução",
        "16-32": "Depositária do título = 9999 ou carteira não aceita protesto",
        "16-33": "Alteração do vencimento igual ao registrado no sistema",
        "16-34": "Instrução de emissão de aviso de cobrança para título vencido antes do vencimento",
        "16-35": "Solicitação de cancelamento de instrução inexistente",
        "16-36": "Título sofrendo alteração de controle",
        "16-37": "Instrução não permitida para a carteira",
        "17-00": "Alteração de dados rejeitados",
        "17-04": "Nosso número em duplicidade num mesmo movimento",
        "17-05": "Solicitação de baixa para o título já baixado ou liquidado",
        "17-06": "Solicitação de baixa para o título não registrado no sistema",
        "17-07": "Cobrança prazo curto - Solicitação de baixa para título não registrada no sistema",
        "17-08": "Solicitação de baixa para título em floating",
        "18-00": "Cobrança Contratual - Abatimento e baixa bloqueados",
        "18-16": "Abatimento/Alteração do valor do título ou solicitação e baixas bloqueadas",
        "19-00": "Confirma recebimento de instrução de protesto",
        "20-00": "Confirma recebimento de instrução de sustação de protesto",
        "21-00": "Confirma recebimento de instrução de não protestar",
        "23-00": "Protesto enviado a Cartório",
        "24-00": "Ordem de protesto sustada",
        "25-00": "Alegações do Sacado",
        "26-00": "Tarifa de aviso de Cobrança",
        "27-00": "Tarifa de extrato posição (B40X)",
        "28-00": "Tarifa de relação das liquidações",
        "29-00": "Tarifa de manutenção de títulos vencidos",
        "30-00": "Débito de tarifas (para entrada e baixa)",
        "32-00": "Baixa por ter sido protestado",
        "33-00": "Custas de Protesto",
        "34-00": "Custas de sustação",
        "35-00": "Custas de cartório distribuidor",
        "36-00": "Custas de edital",
        "37-00": "Tarifa de emissão de boleto/Tarifa de envio de duplicatas",
        "38-00": "Tarifa de Instrução",
        "39-00": "Tarifa de Ocorrências",
        "40-00": "Tarifa mensal de emissão de boleto/Tarifa mensal de envio de duplicata - itau",
    };

    const chaveItau = `${ocorrenciaItau.toLowerCase()}-${motivoItau.toUpperCase()}`;



    if (mapaOcorrenciaMotivoItau[chaveItau]) {
        return mapaOcorrenciaMotivoItau[chaveItau];
    } else {

        return `Combinação de ocorrência e motivo inválida`;

    }
}

function consultarItau() {
    const ocorrenciaItau = document.getElementById("ocorrenciaItau").value.trim().padStart(2, '0');
    const motivoItau = document.getElementById("motivoItau").value.trim().padStart(2, '0');

    const nomePessoaItau = obterNomePorOcorrenciaEMotivoItau(ocorrenciaItau, motivoItau);
    document.getElementById("resultadoitau").innerText = "Resultado: " + nomePessoaItau;


}

/*------------------------------------------------------------------------------------------*/
function obterNomePorOcorrenciaEMotivoItau(ocorrenciaItau, motivoItau) {
    const mapaOcorrenciaMotivoItau = {
        "02-00": "Entrada Confirmada",
        "03-00": "Entrada Rejeitada",
        "03-03": "Não foi possível atribuir a agência pelo CEP ou CEP Inválido",
        "03-04": "Sigla do Estado Inválida",
        "03-08": "Nome do sacado não informado",
        "03-09": "Agência/Conta Agência Encerrada",
        "03-10": "Logradouro - Não Informado ou deslocado",
        "03-11": "CEP - Não Numérico",
        "03-12": "Sacador Avalista - Nome não informado ou deslocado",
        "03-13": "CEP - Incompatível com a sigla do estado",
        "03-14": "Nosso Número já registrado no cadastro do banco",
        "03-15": "Nosso Número em duplicidade no mesmo movimento",
        "03-21": "Carteira não aceita depositária correspondente (ag. cobradora)",
        "03-22": "Carteira não permitida (necessário cadastrar faixa livre)",
        "03-29": "Código Empresa - Categoria da conta inválida",
        "03-35": "IOF - Maior que 5%",
        "03-36": "Quantidade de moeda incompatível com valor do título",
        "03-37": "CGC/CPF do Sacado - Não numérico ou igual a zero",
        "03-52": "Ag. Cobradora - Empresa não aceita banco correspondente",
        "03-53": "Ag. Cobradora - Empresa não aceita banco correspondente",
        "03-54": "Banco Correspondente - Título com vencimento inferior a 15 dias",
        "03-57": "CEP - Só depositária banco do Brasil com vencimento inferior a 8 dias",
        "03-60": "Valor do Abatimento Inválido",
        "03-61": "Juros de Mora maior que o permitido",
        "03-62": "Valor do desconto maior que o valor do Título",
        "03-63": "Importância por dia de desconto (Não Permitido)",
        "03-64": "Data da emissão do Título inválido (Vendor)",
        "03-65": "Taxa inválida (Vendor)",
        "03-66": "Data de vencimento inválida/fora de prazo de operação (mínimo ou máximo)",
        "03-67": "Valor de Título/quantidade de moeda inválida",
        "03-68": "Carteira inválida",
        "03-98": "Flash inválido - Diferente do cadastrado",
        "03-99": "Conta de Cobrança com flash cadastrado - sem registro",
        "04-00": "Alteração de Dados - Nova Entrada",
        "05-00": "Alteração de Dados - Baixa",
        "06-00": "Liquidação Normal",
        "07-00": "Liquidação por Conta",
        "08-00": "Liquidação em Cartório",
        "09-00": "Baixa Simples",
        "10-00": "Baixa por ter sido Liquidado",
        "11-00": "Em ser (só no retorno mensal)",
        "12-00": "Abatimento Concedido",
        "13-00": "Abatimento Cancelado",
        "14-00": "Vencimento Alterado",
        "15-00": "Baixa Rejeitada",
        "15-02": "Agência Cobradora inválida ou com o mesmo conteúdo",
        "15-04": "Sigla do estado inválida",
        "15-05": "Data de vencimento inválida ou com o mesmo conteúdo",
        "15-06": "Valor do título com outra alteração simultânea",
        "15-08": "Nomes do Sacado com o mesmo conteúdo",
        "15-11": "CEP - Inválido",
        "15-13": "Seu número com o mesmo conteúdo",
        "15-21": "Agência cobradora não consta no cadastro de depositária ou em encerramento",
        "15-53": "Instrução com o mesmo conteúdo",
        "15-55": "Alteração iguais para o mesmo controle (Agência/Conta/Carteira/Nosso Número)",
        "15-60": "Valor de IOF - Alteração não permitida",
        "15-61": "Título já baixado ou liquidado",
        "15-66": "Alteração não permitida para carteiras de notas de seguro",
        "15-81": "Alteração bloqueada - Título com protesto",
        "16-00": "Instruções Rejeitadas",
        "16-01": "Instrução/ocorrência não existe",
        "16-06": "Nosso número igual a zero",
        "16-09": "CNPJ/CPF - do sacado/avalista inválido",
        "16-14": "Registro em duplicidade",
        "16-15": "CNPJ/CPF - Informado sem nome do Sacador Avalista",
        "16-21": "Título não registrado no sistema",
        "16-22": "Título Baixado ou Liquidado",
        "16-23": "Instrução não aceita por ter sido emitido último aviso ao Sacado",
        "16-24": "Existe instrução de protesto para o título",
        "16-25": "Não existe instrução de protesto para o título",
        "16-26": "Instrução não aceita por ter sido emitido último aviso ao sacado",
        "16-27": "Instrução não aceita por não ter sido emitida a ordem de protesto ao cartório",
        "16-28": "Já existe uma mesma instrução cadastrada",
        "16-29": "Valor líquido + valor do abatimento diferente do valor registrado",
        "16-30": "Existe uma instrução de não protestar ativa para o título",
        "16-31": "Existe uma ocorrência do Sacado que bloqueia a instrução",
        "16-32": "Depositária do título = 9999 ou carteira não aceita protesto",
        "16-33": "Alteração do vencimento igual ao registrado no sistema",
        "16-34": "Instrução de emissão de aviso de cobrança para título vencido antes do vencimento",
        "16-35": "Solicitação de cancelamento de instrução inexistente",
        "16-36": "Título sofrendo alteração de controle",
        "16-37": "Instrução não permitida para a carteira",
        "17-00": "Alteração de dados rejeitados",
        "17-04": "Nosso número em duplicidade num mesmo movimento",
        "17-05": "Solicitação de baixa para o título já baixado ou liquidado",
        "17-06": "Solicitação de baixa para o título não registrado no sistema",
        "17-07": "Cobrança prazo curto - Solicitação de baixa para título não registrada no sistema",
        "17-08": "Solicitação de baixa para título em floating",
        "18-00": "Cobrança Contratual - Abatimento e baixa bloqueados",
        "18-16": "Abatimento/Alteração do valor do título ou solicitação e baixas bloqueadas",
        "19-00": "Confirma recebimento de instrução de protesto",
        "20-00": "Confirma recebimento de instrução de sustação de protesto",
        "21-00": "Confirma recebimento de instrução de não protestar",
        "23-00": "Protesto enviado a Cartório",
        "24-00": "Ordem de protesto sustada",
        "25-00": "Alegações do Sacado",
        "26-00": "Tarifa de aviso de Cobrança",
        "27-00": "Tarifa de extrato posição (B40X)",
        "28-00": "Tarifa de relação das liquidações",
        "29-00": "Tarifa de manutenção de títulos vencidos",
        "30-00": "Débito de tarifas (para entrada e baixa)",
        "32-00": "Baixa por ter sido protestado",
        "33-00": "Custas de Protesto",
        "34-00": "Custas de sustação",
        "35-00": "Custas de cartório distribuidor",
        "36-00": "Custas de edital",
        "37-00": "Tarifa de emissão de boleto/Tarifa de envio de duplicatas",
        "38-00": "Tarifa de Instrução",
        "39-00": "Tarifa de Ocorrências",
        "40-00": "Tarifa mensal de emissão de boleto/Tarifa mensal de envio de duplicata - itau",
    };

    const chaveItau = `${ocorrenciaItau.toLowerCase()}-${motivoItau.toUpperCase()}`;



    if (mapaOcorrenciaMotivoItau[chaveItau]) {
        return mapaOcorrenciaMotivoItau[chaveItau];
    } else {

        return `Combinação de ocorrência e motivo inválida`;

    }
}

function consultarItau() {
    const ocorrenciaItau = document.getElementById("ocorrenciaItau").value.trim().padStart(2, '0');
    const motivoItau = document.getElementById("motivoItau").value.trim().padStart(2, '0');

    const nomePessoaItau = obterNomePorOcorrenciaEMotivoItau(ocorrenciaItau, motivoItau);
    document.getElementById("resultadoitau").innerText = "Resultado: " + nomePessoaItau;


}


function mostrarTodasTabelasItau() {
    let tabelaHTMLItau = "<table>";
    tabelaHTMLItau += "<tr><th>Número</th><th>Descrição</th></tr>";
    tabelaHTMLItau += "<tr><td>02</td><td>Solicitar Baixa</td></tr>";
    tabelaHTMLItau += "<tr><td>04</td><td>Conceder Abatimento</td></tr>";
    tabelaHTMLItau += "<tr><td>05</td><td>Cancelar Abatimento</td></tr>";
    tabelaHTMLItau += "<tr><td>06</td><td>Prorrogar Documento</td></tr>";
    tabelaHTMLItau += "<tr><td>09</td><td>Protestar Documento</td></tr>";
    tabelaHTMLItau += "<tr><td>18</td><td>Sustar protesto</td></tr>";
    tabelaHTMLItau += "<tr><td>//</td><td>Alterar Carteira</td></tr>";
    tabelaHTMLItau += "<tr><td>35</td><td>Cancelar protesto</td></tr>";
    tabelaHTMLItau += "<tr><td>//</td><td>Sustar Protesto/Baixar</td></tr>";
    tabelaHTMLItau += "</table>";

    document.getElementById("resultadoTabelaItau").innerHTML = tabelaHTMLItau;

    // Adiciona o botão de voltar se ainda não estiver presente
    if (!document.getElementById("botaoDeVoltarItau")) {
        let botaoVoltarHTMLItau = "<button id=\"botaoDeVoltarItau\" class=\"botaoDeVoltar\" onclick=\"voltarParaComandosItau()\">Voltar</button>";
        document.getElementById("resultadoTabelaItau").insertAdjacentHTML('afterend', botaoVoltarHTMLItau);
    }
}

function voltarParaComandosItau() {
    document.getElementById("resultadoTabelaItau").innerHTML = ""; // Limpa a tabela
    // Remove o botão de voltar
    let botaoDeVoltarItau = document.getElementById("botaoDeVoltarItau");
    if (botaoDeVoltarItau) {
        botaoDeVoltarItau.remove();
    }
}


function todosItau() {
    const mapaOcorrenciaMotivoItau = {
        "02-00": "Entrada Confirmada",
        "03-00": "Entrada Rejeitada",
        "03-03": "Não foi possível atribuir a agência pelo CEP ou CEP Inválido",
        "03-04": "Sigla do Estado Inválida",
        "03-08": "Nome do sacado não informado",
        "03-09": "Agência/Conta Agência Encerrada",
        "03-10": "Logradouro - Não Informado ou deslocado",
        "03-11": "CEP - Não Numérico",
        "03-12": "Sacador Avalista - Nome não informado ou deslocado",
        "03-13": "CEP - Incompatível com a sigla do estado",
        "03-14": "Nosso Número já registrado no cadastro do banco",
        "03-15": "Nosso Número em duplicidade no mesmo movimento",
        "03-21": "Carteira não aceita depositária correspondente (ag. cobradora)",
        "03-22": "Carteira não permitida (necessário cadastrar faixa livre)",
        "03-29": "Código Empresa - Categoria da conta inválida",
        "03-35": "IOF - Maior que 5%",
        "03-36": "Quantidade de moeda incompatível com valor do título",
        "03-37": "CGC/CPF do Sacado - Não numérico ou igual a zero",
        "03-52": "Ag. Cobradora - Empresa não aceita banco correspondente",
        "03-53": "Ag. Cobradora - Empresa não aceita banco correspondente",
        "03-54": "Banco Correspondente - Título com vencimento inferior a 15 dias",
        "03-57": "CEP - Só depositária banco do Brasil com vencimento inferior a 8 dias",
        "03-60": "Valor do Abatimento Inválido",
        "03-61": "Juros de Mora maior que o permitido",
        "03-62": "Valor do desconto maior que o valor do Título",
        "03-63": "Importância por dia de desconto (Não Permitido)",
        "03-64": "Data da emissão do Título inválido (Vendor)",
        "03-65": "Taxa inválida (Vendor)",
        "03-66": "Data de vencimento inválida/fora de prazo de operação (mínimo ou máximo)",
        "03-67": "Valor de Título/quantidade de moeda inválida",
        "03-68": "Carteira inválida",
        "03-98": "Flash inválido - Diferente do cadastrado",
        "03-99": "Conta de Cobrança com flash cadastrado - sem registro",
        "04-00": "Alteração de Dados - Nova Entrada",
        "05-00": "Alteração de Dados - Baixa",
        "06-00": "Liquidação Normal",
        "07-00": "Liquidação por Conta",
        "08-00": "Liquidação em Cartório",
        "09-00": "Baixa Simples",
        "10-00": "Baixa por ter sido Liquidado",
        "11-00": "Em ser (só no retorno mensal)",
        "12-00": "Abatimento Concedido",
        "13-00": "Abatimento Cancelado",
        "14-00": "Vencimento Alterado",
        "15-00": "Baixa Rejeitada",
        "15-02": "Agência Cobradora inválida ou com o mesmo conteúdo",
        "15-04": "Sigla do estado inválida",
        "15-05": "Data de vencimento inválida ou com o mesmo conteúdo",
        "15-06": "Valor do título com outra alteração simultânea",
        "15-08": "Nomes do Sacado com o mesmo conteúdo",
        "15-11": "CEP - Inválido",
        "15-13": "Seu número com o mesmo conteúdo",
        "15-21": "Agência cobradora não consta no cadastro de depositária ou em encerramento",
        "15-53": "Instrução com o mesmo conteúdo",
        "15-55": "Alteração iguais para o mesmo controle (Agência/Conta/Carteira/Nosso Número)",
        "15-60": "Valor de IOF - Alteração não permitida",
        "15-61": "Título já baixado ou liquidado",
        "15-66": "Alteração não permitida para carteiras de notas de seguro",
        "15-81": "Alteração bloqueada - Título com protesto",
        "16-00": "Instruções Rejeitadas",
        "16-01": "Instrução/ocorrência não existe",
        "16-06": "Nosso número igual a zero",
        "16-09": "CNPJ/CPF - do sacado/avalista inválido",
        "16-14": "Registro em duplicidade",
        "16-15": "CNPJ/CPF - Informado sem nome do Sacador Avalista",
        "16-21": "Título não registrado no sistema",
        "16-22": "Título Baixado ou Liquidado",
        "16-23": "Instrução não aceita por ter sido emitido último aviso ao Sacado",
        "16-24": "Existe instrução de protesto para o título",
        "16-25": "Não existe instrução de protesto para o título",
        "16-26": "Instrução não aceita por ter sido emitido último aviso ao sacado",
        "16-27": "Instrução não aceita por não ter sido emitida a ordem de protesto ao cartório",
        "16-28": "Já existe uma mesma instrução cadastrada",
        "16-29": "Valor líquido + valor do abatimento diferente do valor registrado",
        "16-30": "Existe uma instrução de não protestar ativa para o título",
        "16-31": "Existe uma ocorrência do Sacado que bloqueia a instrução",
        "16-32": "Depositária do título = 9999 ou carteira não aceita protesto",
        "16-33": "Alteração do vencimento igual ao registrado no sistema",
        "16-34": "Instrução de emissão de aviso de cobrança para título vencido antes do vencimento",
        "16-35": "Solicitação de cancelamento de instrução inexistente",
        "16-36": "Título sofrendo alteração de controle",
        "16-37": "Instrução não permitida para a carteira",
        "17-00": "Alteração de dados rejeitados",
        "17-04": "Nosso número em duplicidade num mesmo movimento",
        "17-05": "Solicitação de baixa para o título já baixado ou liquidado",
        "17-06": "Solicitação de baixa para o título não registrado no sistema",
        "17-07": "Cobrança prazo curto - Solicitação de baixa para título não registrada no sistema",
        "17-08": "Solicitação de baixa para título em floating",
        "18-00": "Cobrança Contratual - Abatimento e baixa bloqueados",
        "18-16": "Abatimento/Alteração do valor do título ou solicitação e baixas bloqueadas",
        "19-00": "Confirma recebimento de instrução de protesto",
        "20-00": "Confirma recebimento de instrução de sustação de protesto",
        "21-00": "Confirma recebimento de instrução de não protestar",
        "23-00": "Protesto enviado a Cartório",
        "24-00": "Ordem de protesto sustada",
        "25-00": "Alegações do Sacado",
        "26-00": "Tarifa de aviso de Cobrança",
        "27-00": "Tarifa de extrato posição (B40X)",
        "28-00": "Tarifa de relação das liquidações",
        "29-00": "Tarifa de manutenção de títulos vencidos",
        "30-00": "Débito de tarifas (para entrada e baixa)",
        "32-00": "Baixa por ter sido protestado",
        "33-00": "Custas de Protesto",
        "34-00": "Custas de sustação",
        "35-00": "Custas de cartório distribuidor",
        "36-00": "Custas de edital",
        "37-00": "Tarifa de emissão de boleto/Tarifa de envio de duplicatas",
        "38-00": "Tarifa de Instrução",
        "39-00": "Tarifa de Ocorrências",
        "40-00": "Tarifa mensal de emissão de boleto/Tarifa mensal de envio de duplicata - itau",
    };

    let tabelaHTMLItau = "<table>";
    tabelaHTMLItau += "<tr><th>Ocorrência</th><th>Motivo</th><th>Descrição</th></tr>";

    for (const chaveItau in mapaOcorrenciaMotivoItau) {
        const ocorrenciaItau = chaveItau.split('-')[0];
        const motivoItau = chaveItau.split('-')[1];
        const descricaoItau = mapaOcorrenciaMotivoItau[chaveItau];
        tabelaHTMLItau += `<tr><td>${ocorrenciaItau}</td><td>${motivoItau}</td><td>${descricaoItau}</td></tr>`;
    }

    // Adiciona o botão de voltar
    tabelaHTMLItau += "</table>";
    document.getElementById("resultadoTodosItau").innerHTML = tabelaHTMLItau;
    // Torna o botão Voltar visível
    document.getElementById("botaoVoltarItau").style.display = "block";
}

function voltarTodosItau() {
    document.getElementById("resultadoTodosItau").innerHTML = "";

    // Oculta o botão Voltar ao voltar para a página inicial
    document.getElementById("botaoVoltarItau").style.display = "none";
}


function obterNomePorOcorrenciaEMotivoBB(ocorrenciaBB, motivoBB) {
    const mapaOcorrenciaMotivoBB = {
        "02-00": "Entrada confirmada por meio magnético",
        "02-11": "Entrada confirmada por cia convencional",
        "02-16": "Entrada confirmada por alteração do cód do cedente",
        "02-17": "Entrada confirmada por alteração de variação",
        "02-18": "Entrada confirmada por alteração de carteira",
        "03-00": "Entrada rejeitada",
        "03-01": "Identificação inválida",
        "03-02": "Variação por carteira inválida",
        "03-03": "Valor dos juros por um dia inválido",
        "03-04": "Valor o desconto inválido",
        "03-05": "Espécie de título invália para carteira/variação",
        "03-06": "Espécie de valor variável inválido",
        "03-07": "Prefixo da agência usuária inválido",
        "03-08": "Valor do título/apólice inválido",
        "03-09": "Data de vencimento inválida",
        "03-10": "Fora do prazo, só admissível na carteira 11",
        "03-11": "Inexistência de margem para desconto",
        "03-12": "O banco não tem agência na praça do sacado",
        "03-13": "Recusado por razões cadastrais",
        "03-14": "Sacado interligado com sacador",
        "03-15": "Título sacado contra órgão do Poder Público",
        "03-16": "Título preenchido de forma irregular",
        "03-17": "Título rasurado",
        "03-18": "Endereço do sacado não localizado ou incompleto",
        "03-19": "Código do cedente inválido",
        "03-20": "Nome/endereço do cliente não informado",
        "03-21": "Carteira inválida",
        "03-22": "Quantidade de valor variável inválida",
        "03-23": "Faixa nosso número excedida",
        "03-24": "Valor do abatimento inválido",
        "03-25": "Novo número do título dado pelo cedente inválido",
        "03-26": "Valor do IOF de seguro inválido",
        "03-27": "Nome do sacado/cedente inválido ou não informado",
        "03-28": "Data do novo vencimento inválida",
        "03-29": "Endereço não informado",
        "03-30": "Registro de título já liquidado",
        "03-31": "Número de borderô inválido",
        "03-32": "Nome de pessoa autorizada inválido",
        "03-33": "Nosso número já existente",
        "03-34": "Número da prestação do contrato inválido",
        "03-35": "Percentual de desconto inválido",
        "03-36": "Dias para fichamento de protesto inválido",
        "03-37": "Data de emissão do título inválida",
        "03-38": "Data do vencimento anterior à data de emissão",
        "03-39": "Comando de alteração indevido para a carteira",
        "03-40": "Tipo de moeda inválido",
        "03-41": "Abatimento não permitido",
        "03-42": "CEP do sacado inválido",
        "03-43": "Código de unidade variável incompatível com emissão",
        "03-44": "Dados para débito ao sacado inválidos",
        "03-45": "Carteira/variação encerrada",
        "03-46": "Convênio encerrado",
        "03-47": "Título tem valor diverso do informado",
        "03-48": "Motivo da baixa inválido para carteira",
        "03-49": "Abatimento a cancelar não consta do título",
        "03-50": "Comando incompatível com a carteira",
        "03-51": "Código do convenente inválido",
        "03-52": "Abatimento igual ou maior que o valor do título",
        "03-53": "Título já se encontra na situação pretendida",
        "03-54": "Título fora do prazo admitido para a conta 1",
        "03-55": "Novo vencimento fora dos limites da carteira",
        "03-56": "Título não pertence ao convenente",
        "03-57": "Variação incompatível com a carteira",
        "03-58": "Impossível a transferência para a carteira indicada",
        "03-59": "Título vencido em transferência para a carteira 51",
        "03-60": "Título com prazo superior a 179 dias",
        "03-61": "Título já foi fichado para protesto",
        "03-62": "Alteração da situação de débito inválida",
        "03-63": "DV do nosso número inválido",
        "03-64": "Título não passível de débito baixa",
        "03-65": "Título com ordem de não protestar",
        "03-80": "Nosso número inválido",
        "03-81": "Data para concessão do desconto inválida",
        "03-82": "CEP do sacado inválido",
        "03-83": "Carteira/variação não localizada no cedente",
        "03-84": "Título não localizado na existência",
        "03-99": "Recusado por outros motivos",
        "05-01": "Liquidação s/ reg. normal",
        "05-02": "Liquidação s/ reg. por conta",
        "05-03": "Liquidação s/ reg. por saldo",
        "05-04": "Liquidação s/ reg. c/ cheque a compensar",
        "05-05": "Liquidação de título sem registro",
        "05-07": "Liquidação s/ reg. na apresentação",
        "05-09": "Liquidação s/ reg. em cartório",
        "06-01": "Liquidação normal",
        "06-02": "Liquidação por conta",
        "06-03": "Liquidação por saldo",
        "06-04": "Liquidação com cheque a compensar",
        "06-05": "Liquidação de título sem registro",
        "06-07": "Liquidação na apresentação",
        "06-09": "Liquidação em cartório",
        "07-01": "Liquidação por conta normal",
        "07-02": "Liquidação por conta",
        "07-03": "Liquidação por conta por saldo",
        "07-04": "Liquidação por conta c/ cheque a compensar",
        "07-05": "Liquidação por conta sem registro",
        "07-07": "Liquidação por conta na apresentação",
        "07-09": "Liquidação por conta em cartório",
        "08-01": "Liquidação por saldo normal",
        "08-02": "Liquidação por saldo por conta",
        "08-03": "Liquidação por saldo",
        "08-04": "Liquidação por saldo c/ cheque a compensar",
        "08-05": "Liquidação por saldo sem registro",
        "08-07": "Liquidação por saldo na apresentação",
        "08-09": "Liquidação por saldo em cartório",
        "09-00": "Baixa de título solicitada pelo cliente",
        "09-15": "Baixa de título protestado",
        "09-18": "Baixa de título por alteração de carteira",
        "09-19": "Baixa de título por débito automático",
        "09-31": "Baixa de título liquidado anteriormente",
        "09-32": "Baixa de título habilitado em processo",
        "09-33": "Baixa de título incobrável por nosso intermédio",
        "09-34": "Baixa de título transferido p/ crédito em liquidação",
        "09-46": "Baixa de título por alteração do código do cedente",
        "09-47": "Baixa de título por alteração da variação",
        "09-51": "Baixa de título por acerto",
        "09-90": "Baixa de título automática",
        "10-00": "Baixa solicitada pelo cliente",
        "10-15": "Baixa solicitada protestado",
        "10-18": "Baixa solicitada por alteração da carteira",
        "10-19": "Baixa solicitada por débito automático",
        "10-31": "Baixa solicitada liquidado anteriormente",
        "10-32": "Baixa solicitada habilitado em processo",
        "10-33": "Baixa solicitada incobrável por nosso intermédio",
        "10-34": "Baixa solicitada transferido p/ crédito em liquidação",
        "10-46": "Baixa solicitada por alteração do código cedente",
        "10-47": "Baixa solicitada por alteração da variação",
        "10-51": "Baixa solicitada por acerto",
        "10-90": "Baixa solicitada automática",
        "11-00": "Títulos em SER",
        "12-00": "Abatimento concedido",
        "13-00": "Abatimento cancelado",
        "14-00": "Alteração de vencimento do título",
        "15-01": "Liquidação em cartório normal",
        "15-02": "Liquidação em cartório por conta",
        "15-03": "Liquidação em cartório por saldo",
        "15-04": "Liquidação em cartório c/ cheque a compensar",
        "15-05": "Liquidação em cartório sem registro",
        "15-07": "Liquidação em cartório na apresentação",
        "15-09": "Liquidação em cartório",
        "19-00": "Confirmação de recebimento instruções de protesto",
        "20-00": "Débito em conta",
        "21-00": "Alteração do nome do sacado",
        "22-00": "Alteração do endereço do sacado",
        "23-00": "Indic. de encaminhamento a cartório",
        "24-00": "Sustar protesto",
        "25-00": "Dispensa juros",
        "28-00": "Manutenção de título vencido",
        "31-00": "Tarifa de desconto",
        "72-00": "Mudança de Carteira",
        "96-00": "Despesas de protesto",
        "97-00": "Despesas de sustação de protesto",
        "98-00": "Débito de custas antecipadas - BRASIL",
    };

    const chaveBB = `${ocorrenciaBB.toLowerCase()}-${motivoBB.toUpperCase()}`;



    if (mapaOcorrenciaMotivoBB[chaveBB]) {
        return mapaOcorrenciaMotivoBB[chaveBB];
    } else {
        return "Combinação de ocorrência e motivo inválida";
    }
}

function consultarBB() {
    const ocorrenciaBB = document.getElementById("ocorrenciaBB").value.trim().padStart(2, '0');
    const motivoBB = document.getElementById("motivoBB").value.trim().padStart(2, '0');

    const nomePessoaBB = obterNomePorOcorrenciaEMotivoBB(ocorrenciaBB, motivoBB);
    document.getElementById("resultadoBB").innerText = "Resultado: " + nomePessoaBB;


}



function mostrarTodasTabelasBB() {
    let tabelaHTMLBB = "<table>";
    tabelaHTMLBB += "<tr><th>Número</th><th>Descrição</th></tr>";
    tabelaHTMLBB += "<tr><td>02</td><td>Solicitar Baixa</td></tr>";
    tabelaHTMLBB += "<tr><td>04</td><td>Conceder Abatimento</td></tr>";
    tabelaHTMLBB += "<tr><td>05</td><td>Cancelar Abatimento</td></tr>";
    tabelaHTMLBB += "<tr><td>06</td><td>Prorrogar Documento</td></tr>";
    tabelaHTMLBB += "<tr><td>09</td><td>Protestar Documento</td></tr>";
    tabelaHTMLBB += "<tr><td>10</td><td>Sustar protesto</td></tr>";
    tabelaHTMLBB += "<tr><td>//</td><td>Alterar Carteira</td></tr>";
    tabelaHTMLBB += "<tr><td>//</td><td>Cancelar protesto</td></tr>";
    tabelaHTMLBB += "<tr><td>//</td><td>Sustar Protesto/Baixar</td></tr>";
    tabelaHTMLBB += "</table>";

    document.getElementById("resultadoTabelaBB").innerHTML = tabelaHTMLBB;

    // Adiciona o botão de voltar se ainda não estiver presente
    if (!document.getElementById("botaoDeVoltarBB")) {
        let botaoVoltarHTMLBB = "<button id=\"botaoDeVoltarBB\" class=\"botaoDeVoltar\" onclick=\"voltarParaComandosBB()\">Voltar</button>";
        document.getElementById("resultadoTabelaBB").insertAdjacentHTML('afterend', botaoVoltarHTMLBB);
    }
    
}

function voltarParaComandosBB() {
    document.getElementById("resultadoTabelaBB").innerHTML = ""; // Limpa a tabela
    // Remove o botão de voltar
    let botaoDeVoltarBB = document.getElementById("botaoDeVoltarBB");
    if (botaoDeVoltarBB) {
        botaoDeVoltarBB.remove();
    }
}



function todosBB() {
    const mapaOcorrenciaMotivoBB = {
        "02-00": "Entrada confirmada por meio magnético",
        "02-11": "Entrada confirmada por cia convencional",
        "02-16": "Entrada confirmada por alteração do cód do cedente",
        "02-17": "Entrada confirmada por alteração de variação",
        "02-18": "Entrada confirmada por alteração de carteira",
        "03-00": "Entrada rejeitada",
        "03-01": "Identificação inválida",
        "03-02": "Variação por carteira inválida",
        "03-03": "Valor dos juros por um dia inválido",
        "03-04": "Valor o desconto inválido",
        "03-05": "Espécie de título invália para carteira/variação",
        "03-06": "Espécie de valor variável inválido",
        "03-07": "Prefixo da agência usuária inválido",
        "03-08": "Valor do título/apólice inválido",
        "03-09": "Data de vencimento inválida",
        "03-10": "Fora do prazo, só admissível na carteira 11",
        "03-11": "Inexistência de margem para desconto",
        "03-12": "O banco não tem agência na praça do sacado",
        "03-13": "Recusado por razões cadastrais",
        "03-14": "Sacado interligado com sacador",
        "03-15": "Título sacado contra órgão do Poder Público",
        "03-16": "Título preenchido de forma irregular",
        "03-17": "Título rasurado",
        "03-18": "Endereço do sacado não localizado ou incompleto",
        "03-19": "Código do cedente inválido",
        "03-20": "Nome/endereço do cliente não informado",
        "03-21": "Carteira inválida",
        "03-22": "Quantidade de valor variável inválida",
        "03-23": "Faixa nosso número excedida",
        "03-24": "Valor do abatimento inválido",
        "03-25": "Novo número do título dado pelo cedente inválido",
        "03-26": "Valor do IOF de seguro inválido",
        "03-27": "Nome do sacado/cedente inválido ou não informado",
        "03-28": "Data do novo vencimento inválida",
        "03-29": "Endereço não informado",
        "03-30": "Registro de título já liquidado",
        "03-31": "Número de borderô inválido",
        "03-32": "Nome de pessoa autorizada inválido",
        "03-33": "Nosso número já existente",
        "03-34": "Número da prestação do contrato inválido",
        "03-35": "Percentual de desconto inválido",
        "03-36": "Dias para fichamento de protesto inválido",
        "03-37": "Data de emissão do título inválida",
        "03-38": "Data do vencimento anterior à data de emissão",
        "03-39": "Comando de alteração indevido para a carteira",
        "03-40": "Tipo de moeda inválido",
        "03-41": "Abatimento não permitido",
        "03-42": "CEP do sacado inválido",
        "03-43": "Código de unidade variável incompatível com emissão",
        "03-44": "Dados para débito ao sacado inválidos",
        "03-45": "Carteira/variação encerrada",
        "03-46": "Convênio encerrado",
        "03-47": "Título tem valor diverso do informado",
        "03-48": "Motivo da baixa inválido para carteira",
        "03-49": "Abatimento a cancelar não consta do título",
        "03-50": "Comando incompatível com a carteira",
        "03-51": "Código do convenente inválido",
        "03-52": "Abatimento igual ou maior que o valor do título",
        "03-53": "Título já se encontra na situação pretendida",
        "03-54": "Título fora do prazo admitido para a conta 1",
        "03-55": "Novo vencimento fora dos limites da carteira",
        "03-56": "Título não pertence ao convenente",
        "03-57": "Variação incompatível com a carteira",
        "03-58": "Impossível a transferência para a carteira indicada",
        "03-59": "Título vencido em transferência para a carteira 51",
        "03-60": "Título com prazo superior a 179 dias",
        "03-61": "Título já foi fichado para protesto",
        "03-62": "Alteração da situação de débito inválida",
        "03-63": "DV do nosso número inválido",
        "03-64": "Título não passível de débito baixa",
        "03-65": "Título com ordem de não protestar",
        "03-80": "Nosso número inválido",
        "03-81": "Data para concessão do desconto inválida",
        "03-82": "CEP do sacado inválido",
        "03-83": "Carteira/variação não localizada no cedente",
        "03-84": "Título não localizado na existência",
        "03-99": "Recusado por outros motivos",
        "05-01": "Liquidação s/ reg. normal",
        "05-02": "Liquidação s/ reg. por conta",
        "05-03": "Liquidação s/ reg. por saldo",
        "05-04": "Liquidação s/ reg. c/ cheque a compensar",
        "05-05": "Liquidação de título sem registro",
        "05-07": "Liquidação s/ reg. na apresentação",
        "05-09": "Liquidação s/ reg. em cartório",
        "06-01": "Liquidação normal",
        "06-02": "Liquidação por conta",
        "06-03": "Liquidação por saldo",
        "06-04": "Liquidação com cheque a compensar",
        "06-05": "Liquidação de título sem registro",
        "06-07": "Liquidação na apresentação",
        "06-09": "Liquidação em cartório",
        "07-01": "Liquidação por conta normal",
        "07-02": "Liquidação por conta",
        "07-03": "Liquidação por conta por saldo",
        "07-04": "Liquidação por conta c/ cheque a compensar",
        "07-05": "Liquidação por conta sem registro",
        "07-07": "Liquidação por conta na apresentação",
        "07-09": "Liquidação por conta em cartório",
        "08-01": "Liquidação por saldo normal",
        "08-02": "Liquidação por saldo por conta",
        "08-03": "Liquidação por saldo",
        "08-04": "Liquidação por saldo c/ cheque a compensar",
        "08-05": "Liquidação por saldo sem registro",
        "08-07": "Liquidação por saldo na apresentação",
        "08-09": "Liquidação por saldo em cartório",
        "09-00": "Baixa de título solicitada pelo cliente",
        "09-15": "Baixa de título protestado",
        "09-18": "Baixa de título por alteração de carteira",
        "09-19": "Baixa de título por débito automático",
        "09-31": "Baixa de título liquidado anteriormente",
        "09-32": "Baixa de título habilitado em processo",
        "09-33": "Baixa de título incobrável por nosso intermédio",
        "09-34": "Baixa de título transferido p/ crédito em liquidação",
        "09-46": "Baixa de título por alteração do código do cedente",
        "09-47": "Baixa de título por alteração da variação",
        "09-51": "Baixa de título por acerto",
        "09-90": "Baixa de título automática",
        "10-00": "Baixa solicitada pelo cliente",
        "10-15": "Baixa solicitada protestado",
        "10-18": "Baixa solicitada por alteração da carteira",
        "10-19": "Baixa solicitada por débito automático",
        "10-31": "Baixa solicitada liquidado anteriormente",
        "10-32": "Baixa solicitada habilitado em processo",
        "10-33": "Baixa solicitada incobrável por nosso intermédio",
        "10-34": "Baixa solicitada transferido p/ crédito em liquidação",
        "10-46": "Baixa solicitada por alteração do código cedente",
        "10-47": "Baixa solicitada por alteração da variação",
        "10-51": "Baixa solicitada por acerto",
        "10-90": "Baixa solicitada automática",
        "11-00": "Títulos em SER",
        "12-00": "Abatimento concedido",
        "13-00": "Abatimento cancelado",
        "14-00": "Alteração de vencimento do título",
        "15-01": "Liquidação em cartório normal",
        "15-02": "Liquidação em cartório por conta",
        "15-03": "Liquidação em cartório por saldo",
        "15-04": "Liquidação em cartório c/ cheque a compensar",
        "15-05": "Liquidação em cartório sem registro",
        "15-07": "Liquidação em cartório na apresentação",
        "15-09": "Liquidação em cartório",
        "19-00": "Confirmação de recebimento instruções de protesto",
        "20-00": "Débito em conta",
        "21-00": "Alteração do nome do sacado",
        "22-00": "Alteração do endereço do sacado",
        "23-00": "Indic. de encaminhamento a cartório",
        "24-00": "Sustar protesto",
        "25-00": "Dispensa juros",
        "28-00": "Manutenção de título vencido",
        "31-00": "Tarifa de desconto",
        "72-00": "Mudança de Carteira",
        "96-00": "Despesas de protesto",
        "97-00": "Despesas de sustação de protesto",
        "98-00": "Débito de custas antecipadas - BRASIL",
    };

    let tabelaHTMLBB = "<table>";
    tabelaHTMLBB += "<tr><th>Ocorrência</th><th>Motivo</th><th>Descrição</th></tr>";

    for (const chaveBB in mapaOcorrenciaMotivoBB) {
        const ocorrenciaBB = chaveBB.split('-')[0];
        const motivoBB = chaveBB.split('-')[1];
        const descricaoBB = mapaOcorrenciaMotivoBB[chaveBB];
        tabelaHTMLBB += `<tr><td>${ocorrenciaBB}</td><td>${motivoBB}</td><td>${descricaoBB}</td></tr>`;
    }

    // Adiciona o botão de voltar
    tabelaHTMLBB += "</table>";
    document.getElementById("resultadoTodosBB").innerHTML = tabelaHTMLBB;
    // Torna o botão Voltar visível
    document.getElementById("botaoVoltarBB").style.display = "block";
}

function voltarTodosBB() {
    document.getElementById("resultadoTodosBB").innerHTML = "";

    // Oculta o botão Voltar ao voltar para a página inicial
    document.getElementById("botaoVoltarBB").style.display = "none";
}


function obterNomePorOcorrenciaEMotivoBB240(ocorrenciaBB240, motivoBB240) {
    const mapaOcorrenciaMotivoBB240 = {
        "02-00": "Entrada Confirmada",
        "03-01": "Entrada Rejeitada - Código do banco inválido",
        "03-02": "Entrada Rejeitada - Código do Regist Detalhe Inval",
        "03-03": "Entrada Rejeitada - Código de Segmento Inválido",
        "03-04": "Entrada Rejeitada - Códig Movi Não permitido Cart",
        "03-05": "Entrada Rejeitada - Código de Movimento Inválido",
        "03-06": "Entr Rejeitada - Tipo/Num de inscri. Cenden invál",
        "03-07": "Entrada Rejeitada - Agencia/Conta/DV Inválido",
        "03-08": "Entrada Rejeitada - Nosso Número Inválido",
        "03-09": "Entrada Rejeitada - Nosso Número Duplicado",
        "03-10": "Entrada Rejeitada - Carteira Inválida",
        "03-11": "Entrada Rejeitada - Forma de Cadastr. Título Inval",
        "03-12": "Entrada Rejeitada - Típo de Documento Inválido",
        "03-13": "Entrada Rejeitada - Ident. Emissão do Bloq Inváli",
        "03-14": "Entr. Rejeitada - Identific. Distribuição Bloq Inv",
        "03-15": "Entrada Rejeitada - Caract. Cobrança Incompativeis",
        "03-16": "Entrada Rejeitada - Data de Vencimento Inválida",
        "03-17": "Entr Rejeitada - Data de venc. anterior a DT emiss",
        "03-18": "Entr Rejeitada - Vencimento Fora do Prazo Operação",
        "03-19": "Titulo cargo correspond, com Venciment Inferior",
        "03-20": "Entrada Rejeitada - Valor do Título Inválido",
        "03-21": "Entrada Rejeitada - Espécie do Título Inválida",
        "03-22": "Entrada Rejeitada - Espécie não Pemitid Carteira",
        "03-23": "Entrada Rejeitada - Aceite Inválido",
        "03-24": "Entrada Rejeitada - Data da Emissão Inválida",
        "03-25": "Entrada Rejeitada -Data da Emissão Posterior a Dat",
        "03-26": "Entrad Rejeitada- Código de Juros de Mora Inválido",
        "03-27": "Entr Rejeitada- Valor/Taxa de Jurs de Mora Inválid",
        "03-28": "Entrada Rejeitada-Código de Desconto Inválido",
        "03-29": "Valor do Desconto Maior ou Igual ao Vr do Título",
        "03-30": "Entrada Rejeitada-Desconto a Conceder não Confere",
        "03-31": "Concessão de Desconto ja existe Desconto Anterior",
        "03-32": "Entrada Rejeitada- Valor do IOF Inválido",
        "03-33": "Entrada Rejeitada- Valor Abatimento Inválido",
        "03-34": "Valor do Abatimen Maior ou Igual ao valor do Titul",
        "03-35": "Abatimento a Conceder não Confere",
        "03-36": "Concessão de Abatimento - Ja Existe Abatimento Ant",
        "03-37": "Código Para Protesto Inválido",
        "03-38": "Prazo para Protesto Inválido",
        "03-39": "Pedido de Protesto Não Permitido Para o Título",
        "03-40": "Título com Ordem de Protesto Emitida",
        "03-41": "Pedido de Cancelamento/Sustação de Títulos sem Instrução de Protesto",
        "03-42": "Código para Baixa/Devolução Inválido",
        "03-43": "Prazo para Baixa/Devolução Inválido",
        "03-44": "Código da Moeda Inválido",
        "03-45": "Nome do Sacado não Informado",
        "03-46": "Tipo/ Numero inscrição do Sacado Inválido",
        "03-47": "Endereço do Sacado não Informado",
        "03-48": "CEP Inválido",
        "03-49": "CEP sem praça de cobrança / não localizado",
        "03-50": "CEP referente a um Banco Correspondente",
        "03-51": "CEP Incompativel com a unidade da Federação",
        "03-52": "Unidade da Federação Inválida",
        "03-53": "Tipo/Numero de Inscrição do Sacador/Avalista Inválidos",
        "03-54": "Sacador/Avalista não Informado.",
        "03-55": "Nosso Numero do Banco Correspondente não Informado",
        "03-56": "Código do Banco Correspondente não Informado",
        "03-57": "Código da Multa Inválido",
        "03-58": "Data da Multa Inválida",
        "03-59": "Valor /Percentual da Multa Inválido",
        "03-60": "Movimento Para Título não Cadastrado",
        "03-61": "Alteração da Agencia Cobradora/dv Inválida",
        "03-62": "Tipo de Impressão Inválido",
        "03-63": "Entrada Para Título já Cadastrado",
        "03-64": "Numero da Linha Inválido",
        "03-65": "Código do Banco para Débito Inválido",
        "03-66": "Agencia/Conta/DV Débito Inválido",
        "03-67": "Dados Débito Incompat com identificaç Emissão Bloq",
        "03-88": "Arquivo em Duplicidade",
        "03-99": "Contrato Inexistente",
        "04-00": "Transferência de Carteira/Entrada",
        "05-00": "Transferência de Carteira/Baixa",
        "06-00": "Liquidação",
        "09-00": "Baixa",
        "11-00": "Títulos em Carteira /em ser/",
        "12-00": "Confirmação Recebimento Instrução de Abatimento",
        "13-00": "Confirmação Recebimento Instrução de Cancel Abatimento",
        "14-00": "Confirmação Recebimento Instrução Alteração de Vencimento",
        "15-00": "Franco de Pagamento",
        "17-00": "Liquidação Após Baixa ou Liquidação do Título Não Registrado",
        "19-00": "Confirmação Recebimento Instrução de Protesto",
        "20-00": "Confirmação Recebimento Instrução de Sustação Cancelamento de Protesto",
        "23-00": "Remessa Cartório/aponte em Cartório/",
        "24-00": "Retirada de Cartório e Manutenção em Carteira",
        "25-00": "Protestado e Baixado/Baixa por ter Sido Protestado",
        "26-00": "Instrução Rejeitada",
        "26-01": "Código do Banco Inválido",
        "26-02": "Código do Registro Detalhe Inválido",
        "26-03": "Código de Segmento Inválido",
        "26-04": "Código de Movimento não Permitido Para Carteira",
        "26-05": "Código de Movimento Inválido",
        "26-06": "Tipo/Numero de Inscrição do Cedente Inválidos",
        "26-07": "Agencia/ Conta / DV Inválido",
        "26-08": "Nosso Número Inválido",
        "26-09": "Nosso Número Duplicado",
        "26-10": "Carteira Inválida",
        "26-11": "Forma de Cadastramento do Título Inválido",
        "26-12": "Tipo de Documento Inválido",
        "26-13": "Identificação da Emissão do Bloqueto Inválida",
        "26-14": "Identificação da Distribuição do Bloqueto Inválida",
        "26-15": "Características da Cobrança Incompatíveis",
        "26-16": "Data de Vencimento Inválida",
        "26-17": "Data de Vencimento anterior a Data de Emissão",
        "26-18": "Vencimento Fora do Prazo de Operação",
        "26-19": "Título a Cargo de Bancos Correspondentes Com Vencimento Inferior",
        "26-20": "Valor do Título Inválido",
        "26-21": "Espécie do Título Inválida",
        "26-22": "Espécie não Permitida Para a Carteira",
        "26-23": "Aceite Inválido",
        "26-24": "Data da Emissão Inválida",
        "26-25": "Data da Emissão Posterior a Data",
        "26-26": "Código de Juros de Mora Inválido",
        "26-27": "Valor/Taxa de Juros de Mora Inválido",
        "26-28": "Código de Desconto Inválido",
        "26-29": "Valor Desconto Maior ou Igual ao Valor do Título",
        "26-30": "Desconto a Conceder não Confere",
        "26-31": "Concessão de Desconto ja Existe Documento Anterior",
        "26-32": "Valor do IOF Inválido",
        "26-33": "Valor do Abatimento Inválido",
        "26-34": "Valor do Abatimento Maior ou Igual ao Valor Título",
        "26-35": "Abatimento a Conceder não Confere",
        "26-36": "Concessão de Abatimento ja Existe Abatimento Anterior",
        "26-37": "Código para Protesto Inválido",
        "26-38": "Prazo para Protesto Válido",
        "26-39": "Pedido Para Protesto não Permitido Para o Título",
        "26-40": "Título com Ordem de Protesto Emitida",
        "26-41": "Pedido Cancelamento/Sustação Título s/ intru Prote",
        "26-42": "Código para Baixa/Devolução Inválido",
        "26-43": "Prazo para Baixa/ Devolução Inválido",
        "26-44": "Código da Moeda Inválido",
        "26-45": "Nome do Sacado não Informado",
        "26-46": "Tipo/ Numero inscrição do Sacado Inválido",
        "26-47": "Endereço do Sacado não Informado",
        "26-48": "CEP Inválido",
        "26-49": "CEP sem praça de cobrança / não localizado",
        "26-50": "CEP referente a um Banco Correspondente",
        "26-51": "CEP Incompatível com unidade da Federação",
        "26-52": "Unidade da Federação Inválida",
        "26-53": "Tipo / Numero de Inscrição do Sacador Avalista Inválidos",
        "26-54": "Sacador/Avalista não Informado",
        "26-55": "Nosso Numero do Banco Correspondente não Informado",
        "26-56": "Código do Banco Correspondente não Informado",
        "26-57": "Código da Multa Inválido",
        "26-58": "Data da Multa Inválida",
        "26-59": "Valor / Percentual da Multa Inválido",
        "26-60": "Movimento Para Título não Cadastrado",
        "26-61": "Alteração da Agencia Cobradora / DV Inválido",
        "26-62": "Tipo de Impressão Inválido",
        "26-63": "Entrada para Título ja Cadastrado",
        "26-64": "Numero da Linha Inválido",
        "26-65": "Código do Banco para Débito Inválido",
        "26-66": "Agencia / conta / DV para Débito Inválido",
        "26-67": "Dados para Débitos Incompatível com Identificação de Emissão Bloqueada",
        "26-88": "Arquivo em Duplicidade",
        "26-99": "Contrato Inexistente",
        "27-00": "Confirmação do Pedido de Alteração de Outros Dados",
        "28-00": "Débito de Tarifas / Custas",
        "29-00": "Ocorrências do Sacado",
        "30-00": "Alteração de Dados Rejeitada",
        "30-01": "Código do Banco Inválido",
        "30-02": "Código do Registro Detalhe Inválido",
        "30-03": "Código do Segmento Inválido",
        "30-04": "Código de Movimento Não Permitido Para Carteira",
        "30-05": "Código de Movimento Inválido",
        "30-06": "Tipo/Numero de Inscrição de Cedente Inválidos",
        "30-08": "Nosso Numero Inválido",
        "30-09": "Nosso Numero Duplicado",
        "30-10": "Carteira Inválida",
        "30-11": "Forma de Cadastramento do Título Inválido",
        "30-12": "Tipo de Documento Inválido",
        "30-13": "Identificação da Emissão do Bloqueto Inválida",
        "30-14": "Identificação da Distribuição do Bloqueto Inválida",
        "30-15": "Caracteristicas da Cobrança Incompatíveis",
        "30-16": "Data de Vencimento Inválida",
        "30-17": "Data de Vencimento anterior a Data de Emissão",
        "30-18": "Vencimento Fora do Prazo de Operação",
        "30-19": "Título Cargo Bancos Corresp. Com Vencimento Inferior",
        "30-20": "Valor do Título Inválido",
        "30-21": "Espécie do Título Inválida",
        "30-22": "Espécie não Permitida para carteira",
        "30-23": "Aceite Inválido",
        "30-24": "Data da Emissão Inválida",
        "30-25": "Data da Emissão Posterior a Data",
        "30-26": "Código de Juros de Mora Inválido",
        "30-27": "Valor/Taxa de Juros de Mora Inválido",
        "30-28": "Códogo do Desconto Inválido",
        "30-29": "Valor Desconto Maior ou Igual ao Valor do Título",
        "30-30": "Desconto a Conceder não Confere",
        "30-31": "Concessão de Desconto ja Existe Desconto Anterior",
        "30-32": "Valor Do IOF Inválido",
        "30-33": "Valor do Abatimento Inválido",
        "30-34": "Valor Abatimento Maior ou Igual ao Valor do Título",
        "30-35": "Abatimento a Conceder não Confere",
        "30-36": "Concessão de Abat - ja Existe abatment anterior",
        "30-37": "Código para protesto Inválido",
        "30-38": "Prazo para Protesto inválido",
        "30-39": "Pedido de Protesto não Permitido para o Título",
        "30-40": "Título com Ordem de Protesto Emitida",
        "30-41": "Pedido Cancelamento/Sustação Títulos s/ instru Prote",
        "30-42": "Código para Baixa / Devolução Inválido",
        "30-43": "Prazo para Baixa/ devolução Inválido",
        "30-44": "Código da Moeda Inválido",
        "30-45": "Nome do sacado não Informado",
        "30-46": "Tipo/ Numero de inscrição do sacado Inválidos",
        "30-47": "Endereço do Sacado não Informado",
        "30-48": "CEP Inválido",
        "30-49": "CEP sem Praça de Cobrança/não Localizado",
        "30-50": "CEP Referente a um Banco Correspondente",
        "30-51": "CEP Incompatível com a Unidade da Federação",
        "30-52": "Unidade da Federação Inválida",
        "30-53": "Tipo / Numero de Inscrição Sacador/Avalista Inválidos",
        "30-54": "Sacador / Avalista não Informado",
        "30-55": "Nosso Numero no Banco Correspondente não Informad",
        "30-56": "Código do banco correspondente não Informado",
        "30-57": "Código da Multa Inválido",
        "30-58": "Data da Multa inválida",
        "30-59": "Valor/ Percentual da Multa Inválido",
        "30-60": "Movimento Para Título não Cadastrado",
        "30-61": "Alteração da Agencia Cobradora inválida",
        "30-62": "Tipo de Impressão inválida",
        "30-63": "Entrada para Título ja Cadastrado",
        "30-64": "Numero da Linha Inválido",
        "30-65": "Código do Banco para Débito Inválido",
        "30-66": "Agencia / conta / DV para Débito Inválido",
        "30-67": "Dados para Débitos Incompatíveis com a identificação de Emissão Bloqueada",
        "30-88": "Arquivo em Duplicidade",
        "30-99": "Contrato Inexistente BANCO 240"
    };

    const chaveBB240 = `${ocorrenciaBB240.toLowerCase()}-${motivoBB240.toUpperCase()}`;



    if (mapaOcorrenciaMotivoBB240[chaveBB240]) {
        return mapaOcorrenciaMotivoBB240[chaveBB240];
    } else {
        return "Combinação de ocorrência e motivo inválida";
    }
}

function consultarBB240() {
    const ocorrenciaBB240 = document.getElementById("ocorrenciaBB240").value.trim().padStart(2, '0');
    const motivoBB240 = document.getElementById("motivoBB240").value.trim().padStart(2, '0');

    const nomePessoaBB240 = obterNomePorOcorrenciaEMotivoBB240(ocorrenciaBB240, motivoBB240);
    document.getElementById("resultadoBB240").innerText = "Resultado: " + nomePessoaBB240;


}


function mostrarTodasTabelasBB240() {
    let tabelaHTMLBB240 = "<table>";
    tabelaHTMLBB240 += "<tr><th>Número</th><th>Descrição</th></tr>";
    tabelaHTMLBB240 += "<tr><td>02</td><td>Solicitar Baixa</td></tr>";
    tabelaHTMLBB240 += "<tr><td>04</td><td>Conceder Abatimento</td></tr>";
    tabelaHTMLBB240 += "<tr><td>05</td><td>Cancelar Abatimento</td></tr>";
    tabelaHTMLBB240 += "<tr><td>06</td><td>Prorrogar Documento</td></tr>";
    tabelaHTMLBB240 += "<tr><td>09</td><td>Protestar Documento</td></tr>";
    tabelaHTMLBB240 += "<tr><td>10</td><td>Sustar protesto</td></tr>";
    tabelaHTMLBB240 += "<tr><td>//</td><td>Alterar Carteira</td></tr>";
    tabelaHTMLBB240 += "<tr><td>//</td><td>Cancelar protesto</td></tr>";
    tabelaHTMLBB240 += "<tr><td>//</td><td>Sustar Protesto/Baixar</td></tr>";
    tabelaHTMLBB240 += "</table>";

    document.getElementById("resultadoTabelaBB240").innerHTML = tabelaHTMLBB240;

    // Adiciona o botão de voltar se ainda não estiver presente
    if (!document.getElementById("botaoDeVoltarBB240")) {
        let botaoVoltarHTMLBB240 = "<button id=\"botaoDeVoltarBB240\" class=\"botaoDeVoltar\" onclick=\"voltarParaComandosBB240()\">Voltar</button>";
        document.getElementById("resultadoTabelaBB240").insertAdjacentHTML('afterend', botaoVoltarHTMLBB240);
    }
}

function voltarParaComandosBB240() {
    document.getElementById("resultadoTabelaBB240").innerHTML = ""; // Limpa a tabela
    // Remove o botão de voltar
    let botaoDeVoltarBB240 = document.getElementById("botaoDeVoltarBB240");
    if (botaoDeVoltarBB240) {
        botaoDeVoltarBB240.remove();
    }
}


function todosBB240() {
    const mapaOcorrenciaMotivoBB240 = {
        "02-00": "Entrada Confirmada",
        "03-01": "Entrada Rejeitada - Código do banco inválido",
        "03-02": "Entrada Rejeitada - Código do Regist Detalhe Inval",
        "03-03": "Entrada Rejeitada - Código de Segmento Inválido",
        "03-04": "Entrada Rejeitada - Códig Movi Não permitido Cart",
        "03-05": "Entrada Rejeitada - Código de Movimento Inválido",
        "03-06": "Entr Rejeitada - Tipo/Num de inscri. Cenden invál",
        "03-07": "Entrada Rejeitada - Agencia/Conta/DV Inválido",
        "03-08": "Entrada Rejeitada - Nosso Número Inválido",
        "03-09": "Entrada Rejeitada - Nosso Número Duplicado",
        "03-10": "Entrada Rejeitada - Carteira Inválida",
        "03-11": "Entrada Rejeitada - Forma de Cadastr. Título Inval",
        "03-12": "Entrada Rejeitada - Típo de Documento Inválido",
        "03-13": "Entrada Rejeitada - Ident. Emissão do Bloq Inváli",
        "03-14": "Entr. Rejeitada - Identific. Distribuição Bloq Inv",
        "03-15": "Entrada Rejeitada - Caract. Cobrança Incompativeis",
        "03-16": "Entrada Rejeitada - Data de Vencimento Inválida",
        "03-17": "Entr Rejeitada - Data de venc. anterior a DT emiss",
        "03-18": "Entr Rejeitada - Vencimento Fora do Prazo Operação",
        "03-19": "Titulo cargo correspond, com Venciment Inferior",
        "03-20": "Entrada Rejeitada - Valor do Título Inválido",
        "03-21": "Entrada Rejeitada - Espécie do Título Inválida",
        "03-22": "Entrada Rejeitada - Espécie não Pemitid Carteira",
        "03-23": "Entrada Rejeitada - Aceite Inválido",
        "03-24": "Entrada Rejeitada - Data da Emissão Inválida",
        "03-25": "Entrada Rejeitada -Data da Emissão Posterior a Dat",
        "03-26": "Entrad Rejeitada- Código de Juros de Mora Inválido",
        "03-27": "Entr Rejeitada- Valor/Taxa de Jurs de Mora Inválid",
        "03-28": "Entrada Rejeitada-Código de Desconto Inválido",
        "03-29": "Valor do Desconto Maior ou Igual ao Vr do Título",
        "03-30": "Entrada Rejeitada-Desconto a Conceder não Confere",
        "03-31": "Concessão de Desconto ja existe Desconto Anterior",
        "03-32": "Entrada Rejeitada- Valor do IOF Inválido",
        "03-33": "Entrada Rejeitada- Valor Abatimento Inválido",
        "03-34": "Valor do Abatimen Maior ou Igual ao valor do Titul",
        "03-35": "Abatimento a Conceder não Confere",
        "03-36": "Concessão de Abatimento - Ja Existe Abatimento Ant",
        "03-37": "Código Para Protesto Inválido",
        "03-38": "Prazo para Protesto Inválido",
        "03-39": "Pedido de Protesto Não Permitido Para o Título",
        "03-40": "Título com Ordem de Protesto Emitida",
        "03-41": "Pedido de Cancelamento/Sustação de Títulos sem Instrução de Protesto",
        "03-42": "Código para Baixa/Devolução Inválido",
        "03-43": "Prazo para Baixa/Devolução Inválido",
        "03-44": "Código da Moeda Inválido",
        "03-45": "Nome do Sacado não Informado",
        "03-46": "Tipo/ Numero inscrição do Sacado Inválido",
        "03-47": "Endereço do Sacado não Informado",
        "03-48": "CEP Inválido",
        "03-49": "CEP sem praça de cobrança / não localizado",
        "03-50": "CEP referente a um Banco Correspondente",
        "03-51": "CEP Incompativel com a unidade da Federação",
        "03-52": "Unidade da Federação Inválida",
        "03-53": "Tipo/Numero de Inscrição do Sacador/Avalista Inválidos",
        "03-54": "Sacador/Avalista não Informado.",
        "03-55": "Nosso Numero do Banco Correspondente não Informado",
        "03-56": "Código do Banco Correspondente não Informado",
        "03-57": "Código da Multa Inválido",
        "03-58": "Data da Multa Inválida",
        "03-59": "Valor /Percentual da Multa Inválido",
        "03-60": "Movimento Para Título não Cadastrado",
        "03-61": "Alteração da Agencia Cobradora/dv Inválida",
        "03-62": "Tipo de Impressão Inválido",
        "03-63": "Entrada Para Título já Cadastrado",
        "03-64": "Numero da Linha Inválido",
        "03-65": "Código do Banco para Débito Inválido",
        "03-66": "Agencia/Conta/DV Débito Inválido",
        "03-67": "Dados Débito Incompat com identificaç Emissão Bloq",
        "03-88": "Arquivo em Duplicidade",
        "03-99": "Contrato Inexistente",
        "04-00": "Transferência de Carteira/Entrada",
        "05-00": "Transferência de Carteira/Baixa",
        "06-00": "Liquidação",
        "09-00": "Baixa",
        "11-00": "Títulos em Carteira /em ser/",
        "12-00": "Confirmação Recebimento Instrução de Abatimento",
        "13-00": "Confirmação Recebimento Instrução de Cancel Abatimento",
        "14-00": "Confirmação Recebimento Instrução Alteração de Vencimento",
        "15-00": "Franco de Pagamento",
        "17-00": "Liquidação Após Baixa ou Liquidação do Título Não Registrado",
        "19-00": "Confirmação Recebimento Instrução de Protesto",
        "20-00": "Confirmação Recebimento Instrução de Sustação Cancelamento de Protesto",
        "23-00": "Remessa Cartório/aponte em Cartório/",
        "24-00": "Retirada de Cartório e Manutenção em Carteira",
        "25-00": "Protestado e Baixado/Baixa por ter Sido Protestado",
        "26-00": "Instrução Rejeitada",
        "26-01": "Código do Banco Inválido",
        "26-02": "Código do Registro Detalhe Inválido",
        "26-03": "Código de Segmento Inválido",
        "26-04": "Código de Movimento não Permitido Para Carteira",
        "26-05": "Código de Movimento Inválido",
        "26-06": "Tipo/Numero de Inscrição do Cedente Inválidos",
        "26-07": "Agencia/ Conta / DV Inválido",
        "26-08": "Nosso Número Inválido",
        "26-09": "Nosso Número Duplicado",
        "26-10": "Carteira Inválida",
        "26-11": "Forma de Cadastramento do Título Inválido",
        "26-12": "Tipo de Documento Inválido",
        "26-13": "Identificação da Emissão do Bloqueto Inválida",
        "26-14": "Identificação da Distribuição do Bloqueto Inválida",
        "26-15": "Características da Cobrança Incompatíveis",
        "26-16": "Data de Vencimento Inválida",
        "26-17": "Data de Vencimento anterior a Data de Emissão",
        "26-18": "Vencimento Fora do Prazo de Operação",
        "26-19": "Título a Cargo de Bancos Correspondentes Com Vencimento Inferior",
        "26-20": "Valor do Título Inválido",
        "26-21": "Espécie do Título Inválida",
        "26-22": "Espécie não Permitida Para a Carteira",
        "26-23": "Aceite Inválido",
        "26-24": "Data da Emissão Inválida",
        "26-25": "Data da Emissão Posterior a Data",
        "26-26": "Código de Juros de Mora Inválido",
        "26-27": "Valor/Taxa de Juros de Mora Inválido",
        "26-28": "Código de Desconto Inválido",
        "26-29": "Valor Desconto Maior ou Igual ao Valor do Título",
        "26-30": "Desconto a Conceder não Confere",
        "26-31": "Concessão de Desconto ja Existe Documento Anterior",
        "26-32": "Valor do IOF Inválido",
        "26-33": "Valor do Abatimento Inválido",
        "26-34": "Valor do Abatimento Maior ou Igual ao Valor Título",
        "26-35": "Abatimento a Conceder não Confere",
        "26-36": "Concessão de Abatimento ja Existe Abatimento Anterior",
        "26-37": "Código para Protesto Inválido",
        "26-38": "Prazo para Protesto Válido",
        "26-39": "Pedido Para Protesto não Permitido Para o Título",
        "26-40": "Título com Ordem de Protesto Emitida",
        "26-41": "Pedido Cancelamento/Sustação Título s/ intru Prote",
        "26-42": "Código para Baixa/Devolução Inválido",
        "26-43": "Prazo para Baixa/ Devolução Inválido",
        "26-44": "Código da Moeda Inválido",
        "26-45": "Nome do Sacado não Informado",
        "26-46": "Tipo/ Numero inscrição do Sacado Inválido",
        "26-47": "Endereço do Sacado não Informado",
        "26-48": "CEP Inválido",
        "26-49": "CEP sem praça de cobrança / não localizado",
        "26-50": "CEP referente a um Banco Correspondente",
        "26-51": "CEP Incompatível com unidade da Federação",
        "26-52": "Unidade da Federação Inválida",
        "26-53": "Tipo / Numero de Inscrição do Sacador Avalista Inválidos",
        "26-54": "Sacador/Avalista não Informado",
        "26-55": "Nosso Numero do Banco Correspondente não Informado",
        "26-56": "Código do Banco Correspondente não Informado",
        "26-57": "Código da Multa Inválido",
        "26-58": "Data da Multa Inválida",
        "26-59": "Valor / Percentual da Multa Inválido",
        "26-60": "Movimento Para Título não Cadastrado",
        "26-61": "Alteração da Agencia Cobradora / DV Inválido",
        "26-62": "Tipo de Impressão Inválido",
        "26-63": "Entrada para Título ja Cadastrado",
        "26-64": "Numero da Linha Inválido",
        "26-65": "Código do Banco para Débito Inválido",
        "26-66": "Agencia / conta / DV para Débito Inválido",
        "26-67": "Dados para Débitos Incompatível com Identificação de Emissão Bloqueada",
        "26-88": "Arquivo em Duplicidade",
        "26-99": "Contrato Inexistente",
        "27-00": "Confirmação do Pedido de Alteração de Outros Dados",
        "28-00": "Débito de Tarifas / Custas",
        "29-00": "Ocorrências do Sacado",
        "30-00": "Alteração de Dados Rejeitada",
        "30-01": "Código do Banco Inválido",
        "30-02": "Código do Registro Detalhe Inválido",
        "30-03": "Código do Segmento Inválido",
        "30-04": "Código de Movimento Não Permitido Para Carteira",
        "30-05": "Código de Movimento Inválido",
        "30-06": "Tipo/Numero de Inscrição de Cedente Inválidos",
        "30-08": "Nosso Numero Inválido",
        "30-09": "Nosso Numero Duplicado",
        "30-10": "Carteira Inválida",
        "30-11": "Forma de Cadastramento do Título Inválido",
        "30-12": "Tipo de Documento Inválido",
        "30-13": "Identificação da Emissão do Bloqueto Inválida",
        "30-14": "Identificação da Distribuição do Bloqueto Inválida",
        "30-15": "Caracteristicas da Cobrança Incompatíveis",
        "30-16": "Data de Vencimento Inválida",
        "30-17": "Data de Vencimento anterior a Data de Emissão",
        "30-18": "Vencimento Fora do Prazo de Operação",
        "30-19": "Título Cargo Bancos Corresp. Com Vencimento Inferior",
        "30-20": "Valor do Título Inválido",
        "30-21": "Espécie do Título Inválida",
        "30-22": "Espécie não Permitida para carteira",
        "30-23": "Aceite Inválido",
        "30-24": "Data da Emissão Inválida",
        "30-25": "Data da Emissão Posterior a Data",
        "30-26": "Código de Juros de Mora Inválido",
        "30-27": "Valor/Taxa de Juros de Mora Inválido",
        "30-28": "Códogo do Desconto Inválido",
        "30-29": "Valor Desconto Maior ou Igual ao Valor do Título",
        "30-30": "Desconto a Conceder não Confere",
        "30-31": "Concessão de Desconto ja Existe Desconto Anterior",
        "30-32": "Valor Do IOF Inválido",
        "30-33": "Valor do Abatimento Inválido",
        "30-34": "Valor Abatimento Maior ou Igual ao Valor do Título",
        "30-35": "Abatimento a Conceder não Confere",
        "30-36": "Concessão de Abat - ja Existe abatment anterior",
        "30-37": "Código para protesto Inválido",
        "30-38": "Prazo para Protesto inválido",
        "30-39": "Pedido de Protesto não Permitido para o Título",
        "30-40": "Título com Ordem de Protesto Emitida",
        "30-41": "Pedido Cancelamento/Sustação Títulos s/ instru Prote",
        "30-42": "Código para Baixa / Devolução Inválido",
        "30-43": "Prazo para Baixa/ devolução Inválido",
        "30-44": "Código da Moeda Inválido",
        "30-45": "Nome do sacado não Informado",
        "30-46": "Tipo/ Numero de inscrição do sacado Inválidos",
        "30-47": "Endereço do Sacado não Informado",
        "30-48": "CEP Inválido",
        "30-49": "CEP sem Praça de Cobrança/não Localizado",
        "30-50": "CEP Referente a um Banco Correspondente",
        "30-51": "CEP Incompatível com a Unidade da Federação",
        "30-52": "Unidade da Federação Inválida",
        "30-53": "Tipo / Numero de Inscrição Sacador/Avalista Inválidos",
        "30-54": "Sacador / Avalista não Informado",
        "30-55": "Nosso Numero no Banco Correspondente não Informad",
        "30-56": "Código do banco correspondente não Informado",
        "30-57": "Código da Multa Inválido",
        "30-58": "Data da Multa inválida",
        "30-59": "Valor/ Percentual da Multa Inválido",
        "30-60": "Movimento Para Título não Cadastrado",
        "30-61": "Alteração da Agencia Cobradora inválida",
        "30-62": "Tipo de Impressão inválida",
        "30-63": "Entrada para Título ja Cadastrado",
        "30-64": "Numero da Linha Inválido",
        "30-65": "Código do Banco para Débito Inválido",
        "30-66": "Agencia / conta / DV para Débito Inválido",
        "30-67": "Dados para Débitos Incompatíveis com a identificação de Emissão Bloqueada",
        "30-88": "Arquivo em Duplicidade",
        "30-99": "Contrato Inexistente BANCO 240"
        
    };

    let tabelaHTMLBB240 = "<table>";
    tabelaHTMLBB240 += "<tr><th>Ocorrência</th><th>Motivo</th><th>Descrição</th></tr>";

    for (const chaveBB240 in mapaOcorrenciaMotivoBB240) {
        const ocorrenciaBB240 = chaveBB240.split('-')[0];
        const motivoBB240 = chaveBB240.split('-')[1];
        const descricaoBB240 = mapaOcorrenciaMotivoBB240[chaveBB240];
        tabelaHTMLBB240 += `<tr><td>${ocorrenciaBB240}</td><td>${motivoBB240}</td><td>${descricaoBB240}</td></tr>`;
    }

    // Adiciona o botão de voltar
    tabelaHTMLBB240 += "</table>";
    document.getElementById("resultadoTodosBB240").innerHTML = tabelaHTMLBB240;
    // Torna o botão Voltar visível
    document.getElementById("botaoVoltarBB240").style.display = "block";
}

function voltarTodosBB240() {
    document.getElementById("resultadoTodosBB240").innerHTML = "";

    // Oculta o botão Voltar ao voltar para a página inicial
    document.getElementById("botaoVoltarBB240").style.display = "none";
}



function mostrarTodasTabelasBanrisul() {
    let tabelaHTMLBanrisul = "<table>";
    tabelaHTMLBanrisul += "<tr><th>Número</th><th>Descrição</th></tr>";
    tabelaHTMLBanrisul += "<tr><td>02</td><td>Solicitar Baixa</td></tr>";
    tabelaHTMLBanrisul += "<tr><td>04</td><td>Conceder Abatimento</td></tr>";
    tabelaHTMLBanrisul += "<tr><td>05</td><td>Cancelar Abatimento</td></tr>";
    tabelaHTMLBanrisul += "<tr><td>06</td><td>Prorrogar Documento</td></tr>";
    tabelaHTMLBanrisul += "<tr><td>09</td><td>Protestar Documento</td></tr>";
    tabelaHTMLBanrisul += "<tr><td>10</td><td>Sustar protesto</td></tr>";
    tabelaHTMLBanrisul += "<tr><td>//</td><td>Alterar Carteira</td></tr>";
    tabelaHTMLBanrisul += "<tr><td>//</td><td>Cancelar protesto</td></tr>";
    tabelaHTMLBanrisul += "<tr><td>//</td><td>Sustar Protesto/Baixar</td></tr>";
    tabelaHTMLBanrisul += "</table>";

    document.getElementById("resultadoTabelaBanrisul").innerHTML = tabelaHTMLBanrisul;

    // Adiciona o botão de voltar se ainda não estiver presente
    if (!document.getElementById("botaoDeVoltarBanrisul")) {
        let botaoVoltarHTMLBanrisul = "<button id=\"botaoDeVoltarBanrisul\" class=\"botaoDeVoltar\" onclick=\"voltarParaComandosBanrisul()\">Voltar</button>";
        document.getElementById("resultadoTabelaBanrisul").insertAdjacentHTML('afterend', botaoVoltarHTMLBanrisul);
    }
}

function voltarParaComandosBanrisul() {
    document.getElementById("resultadoTabelaBanrisul").innerHTML = ""; // Limpa a tabela
    // Remove o botão de voltar
    let botaoDeVoltarBanrisul = document.getElementById("botaoDeVoltarBanrisul");
    if (botaoDeVoltarBanrisul) {
        botaoDeVoltarBanrisul.remove();
    }
}


function obterNomePorOcorrenciaMotivoBanrisul(ocorrenciaBanrisul, motivoBanrisul) {
    const mapaOcorrenciaMotivoBanrisul = {
        "02-00": "Entrada teste capirto",
        "03-00": "Entrada Rejeitada",
        "03-01": "Entrada Rejeitada - Código do banco inválido",
        "04-00": "Baixa do Título liquidado por Edital",
        "06-00": "Liquidação Normal",
        "07-00": "Liquidação Parcial",
        "08-00": "Baixa por Pagamento, Liquidação pelo Saldo",
        "09-00": "Devolução Automática",
        "10-00": "Baixa Conforme Instruções",
        "11-00": "Arquivo Levantamento",
        "12-00": "Concessão de Abatimento",
        "13-00": "Cancelamento de Abatimento",
        "14-00": "Vencimento Alterado",
        "15-00": "Pagamento Cartório",
        "18-00": "Alteração de Instruções",
        "19-00": "Confirmação de Instrução Protesto",
        "20-00": "Confirmação de Instrução para Sustar Protesto",
        "21-00": "Aguardando Autorização para Protesto por Edital",
        "22-00": "Protesto Sustado por alteração de vencimento e prazo de Cartório",
        "23-00": "Confirmação de Entrada em Cartório",
        "25-00": "Devolução, Liquidado Anteriormente",
        "26-00": "Devolvido Pelo Cartório - Erro de informação",
        "30-00": "Cobrança a creditar - (Liquidação em Trânsito)",
        "31-00": "Título em trânsito pago em cartório",
        "32-00": "Reembolso e transferência desconto e vendor ou carteira em Garantia",
        "33-00": "Reembolso e Devolução Desconto",
        "34-00": "Reembolso não efetuado por falta de Saldo",
        "40-00": "Baixa de Títulos protestados",
        "41-00": "Despesa de aponte",
        "42-00": "Alteração de Título",
        "43-00": "Relação de Títulos",
        "44-00": "Manutenção Mensal",
        "45-00": "Sustação de cartório e envio de títulos a cartório",
        "46-00": "Fornecimento de formulário pré-impresso",
        "68-00": "Acerto dos dados do rateio de crédito",
        "69-00": "Cancelamento dos dados Rateio"
    };


    const chaveBanrisul = `${ocorrenciaBanrisul.toLowerCase()}-${motivoBanrisul.toUpperCase()}`;



    if (mapaOcorrenciaMotivoBanrisul[chaveBanrisul]) {
        return mapaOcorrenciaMotivoBanrisul[chaveBanrisul];
    } else {
        return "Combinação de ocorrência e motivo inválida";
    }
}



function consultarBanrisul() {
    const ocorrenciaBanrisul = document.getElementById("ocorrenciaBanrisul").value.trim().padStart(2, '0');
    const motivoBanrisul = document.getElementById("motivoBanrisul").value.trim().padStart(2, '0');

    const nomePessoaBanrisul = obterNomePorOcorrenciaMotivoBanrisul(ocorrenciaBanrisul, motivoBanrisul);
    document.getElementById("resultadoBanrisul").innerText = "Resultado: " + nomePessoaBanrisul;
}


function todosBanrisul() {
    const mapaOcorrenciaMotivoBanrisul = {
        "02-00": "Entrada teste capirto",
        "03-00": "Entrada Rejeitada",
        "03-01": "Entrada Rejeitada - Código do banco inválido",
        "04-00": "Baixa do Título liquidado por Edital",
        "06-00": "Liquidação Normal",
        "07-00": "Liquidação Parcial",
        "08-00": "Baixa por Pagamento, Liquidação pelo Saldo",
        "09-00": "Devolução Automática",
        "10-00": "Baixa Conforme Instruções",
        "11-00": "Arquivo Levantamento",
        "12-00": "Concessão de Abatimento",
        "13-00": "Cancelamento de Abatimento",
        "14-00": "Vencimento Alterado",
        "15-00": "Pagamento Cartório",
        "18-00": "Alteração de Instruções",
        "19-00": "Confirmação de Instrução Protesto",
        "20-00": "Confirmação de Instrução para Sustar Protesto",
        "21-00": "Aguardando Autorização para Protesto por Edital",
        "22-00": "Protesto Sustado por alteração de vencimento e prazo de Cartório",
        "23-00": "Confirmação de Entrada em Cartório",
        "25-00": "Devolução, Liquidado Anteriormente",
        "26-00": "Devolvido Pelo Cartório - Erro de informação",
        "30-00": "Cobrança a creditar - (Liquidação em Trânsito)",
        "31-00": "Título em trânsito pago em cartório",
        "32-00": "Reembolso e transferência desconto e vendor ou carteira em Garantia",
        "33-00": "Reembolso e Devolução Desconto",
        "34-00": "Reembolso não efetuado por falta de Saldo",
        "40-00": "Baixa de Títulos protestados",
        "41-00": "Despesa de aponte",
        "42-00": "Alteração de Título",
        "43-00": "Relação de Títulos",
        "44-00": "Manutenção Mensal",
        "45-00": "Sustação de cartório e envio de títulos a cartório",
        "46-00": "Fornecimento de formulário pré-impresso",
        "68-00": "Acerto dos dados do rateio de crédito",
        "69-00": "Cancelamento dos dados Rateio",
        
    };

    let tabelaHTMLBanrisul = "<table>";
    tabelaHTMLBanrisul += "<tr><th>Ocorrência</th><th>Motivo</th><th>Descrição</th></tr>";

    for (const chaveBanrisul in mapaOcorrenciaMotivoBanrisul) {
        const ocorrenciaBanrisul = chaveBanrisul.split('-')[0];
        const motivoBanrisul = chaveBanrisul.split('-')[1];
        const descricaoBanrisul = mapaOcorrenciaMotivoBanrisul[chaveBanrisul];
        tabelaHTMLBanrisul += `<tr><td>${ocorrenciaBanrisul}</td><td>${motivoBanrisul}</td><td>${descricaoBanrisul}</td></tr>`;
    }

    // Adiciona o botão de voltar
    tabelaHTMLBanrisul += "</table>";
    document.getElementById("resultadoTodosBanrisul").innerHTML = tabelaHTMLBanrisul;
    // Torna o botão Voltar visível
    document.getElementById("botaoVoltarBanrisul").style.display = "block";
}

function voltarTodosBanrisul() {
    document.getElementById("resultadoTodosBanrisul").innerHTML = "";

    // Oculta o botão Voltar ao voltar para a página inicial
    document.getElementById("botaoVoltarBanrisul").style.display = "none";
}


function obterNomePorOcorrenciaMotivoSafra(ocorrenciaSafra, motivoSafra) {
    const mapaOcorrenciaMotivoSafra = {
        "02-00": "Entrada Confirmada",
        "02-17": "Data de vencimento anterior à data de emissão",
        "02-21": "Espécie do título inválida",
        "02-45": "Nome do sacado inválido",
        "02-46": "CNPJ/CPF do sacado inválido",
        "02-47": "Endereço do sacado não informado",
        "02-48": "CEP irregular",
        "02-53": "CNPJ/CPF do cliente inválido",
        "02-54": "Cliente não informado",
        "02-67": "Débito automático agendado",
        "02-68": "Débito não agendado - erro nos dados de remessa",
        "02-69": "Débito não agendado - sacado não consta no cadastro",
        "02-70": "Débito não agendado - cedente não autorizado",
        "02-71": "Débito não agendado - cedente não tem débito automático",
        "02-72": "Débito não agendado - código de moeda diferente de R$",
        "02-73": "Débito não agendado - data de vencimento inválida",
        "03-02": "Código do registro detalhe inválido",
        "03-03": "Código de ocorrência inválido",
        "03-04": "Código de ocorrência não permitido para a carteira",
        "03-05": "Código de ocorrência não numérico",
        "03-08": "Nosso número inválido",
        "03-09": "Nosso número duplicado",
        "03-10": "Carteira inválida",
        "03-16": "Data de vencimento inválida",
        "03-18": "Vencimento fora do prazo de operação",
        "03-20": "Valor do título inválido",
        "03-21": "Espécie do título inválida",
        "03-22": "Espécie não permitida para a carteira",
        "03-24": "Data de emissão inválida",
        "03-38": "Prazo para protesto inválido",
        "03-44": "Agência cedente não prevista",
        "03-50": "CEP irregular - banco correspondente",
        "03-63": "Entrada para título já cadastrado",
        "03-74": "Débito não agendado, título não registrado",
        "06-00": "Liquidação normal",
        "06-15": "Liquidação com cheque",
        "09-10": "Baixa comandada pela empresa",
        "10-00": "Baixa comandada",
        "10-14": "Título protestado",
        "10-16": "Baixado por tempo excedido",
        "10-20": "Mudança de carteira",
        "11-00": "Em SER - arquivo de títulos pendentes",
        "12-00": "Abatimento concedido",
        "13-00": "Abatimento cancelado",
        "14-00": "Vencimento alterado",
        "15-00": "Liquidação em cartório",
        "16-00": "Liquidado cheque vinculado",
        "17-00": "Liquidação após baixa ou título não registrado",
        "18-00": "Acerto de depositária",
        "19-00": "Título encaminhado a cartório",
        "20-00": "Confirmação receb. instr. sustação de protesto",
        "21-00": "Acerto de controle de participante",
        "23-00": "Entrada de título em cartório",
        "24-48": "CEP inválido",
        "27-07": "Baixa rejeitada - agência/conta/dígito inválidos",
        "27-08": "Baixa rejeitada - nosso número inválido",
        "27-10": "Baixa rejeitada - carteira inválida",
        "27-15": "Baixa rejeitada - carteira/agência/conta/nosso número inválidos",
        "27-40": "Baixa rejeitada - título com protesto emitido",
        "27-42": "Baixa rejeitada - código via Telebradesco inválido",
        "27-60": "Baixa rejeitada - movimento para título não cadastrado",
        "28-03": "Tarifa de sustação",
        "28-04": "Tarifa de protesto",
        "28-08": "Custas de protesto",
        "30-01": "Alteração - código do banco inválido",
        "30-05": "Alteração - código da ocorrência não numérico",
        "30-08": "Alteração - nosso número inválido",
        "30-15": "Alteração - carteira/agência/conta/nosso número inválidos",
        "30-28": "Alteração - código via Telebradesco inválido",
        "30-29": "Alteração - valor de desconto >= valor do título",
        "30-33": "Alteração - valor do abatimento inválido",
        "30-34": "Alteração - valor do abatimento >= valor do título",
        "30-38": "Alteração - prazo para protesto inválido",
        "30-39": "Alteração - pedido de protesto não permitido",
        "30-40": "Alteração - título com protesto emitido",
        "30-60": "Alteração - movimento para título não cadastrado",
        "32-01": "Instrução rejeitada - código do banco inválido",
        "32-02": "Instrução rejeitada - código do registro detalhe inválido",
        "32-04": "Instrução rejeitada - código de ocorrência não permitido",
        "32-05": "Instrução rejeitada - código de ocorrência não numérico",
        "32-07": "Instrução rejeitada - agência/conta/dígito inválidos",
        "32-08": "Instrução rejeitada - nosso número inválido",
        "32-10": "Instrução rejeitada - carteira inválida",
        "32-16": "Instrução rejeitada - data de vencimento inválida",
        "32-17": "Instrução rejeitada - vencimento anterior à emissão",
        "32-18": "Instrução rejeitada CAP"
    }

    const chaveSafra = `${ocorrenciaSafra.toLowerCase()}-${motivoSafra.toUpperCase()}`;



    if (mapaOcorrenciaMotivoSafra[chaveSafra]) {
        return mapaOcorrenciaMotivoSafra[chaveSafra];
    } else {
        return "Combinação de ocorrência e motivo inválida";
    }
}



function consultarSafra() {
    const ocorrenciaSafra = document.getElementById("ocorrenciaSafra").value.trim().padStart(2, '0');
    const motivoSafra = document.getElementById("motivoSafra").value.trim().padStart(2, '0');

    const nomePessoaSafra = obterNomePorOcorrenciaMotivoSafra(ocorrenciaSafra, motivoSafra);
    document.getElementById("resultadoSafra").innerText = "Resultado: " + nomePessoaSafra;
}


function mostrarTodasTabelasSafra() {
    let tabelaHTMLSafra = "<table>";
    tabelaHTMLSafra += "<tr><th>Número</th><th>Descrição</th></tr>";
    tabelaHTMLSafra += "<tr><td>02</td><td>Solicitar Baixa</td></tr>";
    tabelaHTMLSafra += "<tr><td>04</td><td>Conceder Abatimento</td></tr>";
    tabelaHTMLSafra += "<tr><td>05</td><td>Cancelar Abatimento</td></tr>";
    tabelaHTMLSafra += "<tr><td>06</td><td>Prorrogar Documento</td></tr>";
    tabelaHTMLSafra += "<tr><td>09</td><td>Protestar Documento</td></tr>";
    tabelaHTMLSafra += "<tr><td>18</td><td>Sustar protesto</td></tr>";
    tabelaHTMLSafra += "<tr><td>//</td><td>Alterar Carteira</td></tr>";
    tabelaHTMLSafra += "<tr><td>35</td><td>Cancelar protesto</td></tr>";
    tabelaHTMLSafra += "<tr><td>//</td><td>Sustar Protesto/Baixar</td></tr>";
    tabelaHTMLSafra += "</table>";

    document.getElementById("resultadoTabelaSafra").innerHTML = tabelaHTMLSafra;

    // Adiciona o botão de voltar se ainda não estiver presente
    if (!document.getElementById("botaoDeVoltarSafra")) {
        let botaoVoltarHTMLSafra = "<button id=\"botaoDeVoltarSafra\" class=\"botaoDeVoltar\" onclick=\"voltarParaComandosSafra()\">Voltar</button>";
        document.getElementById("resultadoTabelaSafra").insertAdjacentHTML('afterend', botaoVoltarHTMLSafra);
    }
}

function voltarParaComandosSafra() {
    document.getElementById("resultadoTabelaSafra").innerHTML = ""; // Limpa a tabela
    // Remove o botão de voltar
    let botaoDeVoltarSafra = document.getElementById("botaoDeVoltarSafra");
    if (botaoDeVoltarSafra) {
        botaoDeVoltarSafra.remove();
    }
}




function todosSafra() {
    const mapaOcorrenciaMotivoSafra = {
        "02-00": "Entrada Confirmada",
        "02-17": "Data de vencimento anterior à data de emissão",
        "02-21": "Espécie do título inválida",
        "02-45": "Nome do sacado inválido",
        "02-46": "CNPJ/CPF do sacado inválido",
        "02-47": "Endereço do sacado não informado",
        "02-48": "CEP irregular",
        "02-53": "CNPJ/CPF do cliente inválido",
        "02-54": "Cliente não informado",
        "02-67": "Débito automático agendado",
        "02-68": "Débito não agendado - erro nos dados de remessa",
        "02-69": "Débito não agendado - sacado não consta no cadastro",
        "02-70": "Débito não agendado - cedente não autorizado",
        "02-71": "Débito não agendado - cedente não tem débito automático",
        "02-72": "Débito não agendado - código de moeda diferente de R$",
        "02-73": "Débito não agendado - data de vencimento inválida",
        "03-02": "Código do registro detalhe inválido",
        "03-03": "Código de ocorrência inválido",
        "03-04": "Código de ocorrência não permitido para a carteira",
        "03-05": "Código de ocorrência não numérico",
        "03-08": "Nosso número inválido",
        "03-09": "Nosso número duplicado",
        "03-10": "Carteira inválida",
        "03-16": "Data de vencimento inválida",
        "03-18": "Vencimento fora do prazo de operação",
        "03-20": "Valor do título inválido",
        "03-21": "Espécie do título inválida",
        "03-22": "Espécie não permitida para a carteira",
        "03-24": "Data de emissão inválida",
        "03-38": "Prazo para protesto inválido",
        "03-44": "Agência cedente não prevista",
        "03-50": "CEP irregular - banco correspondente",
        "03-63": "Entrada para título já cadastrado",
        "03-74": "Débito não agendado, título não registrado",
        "06-00": "Liquidação normal",
        "06-15": "Liquidação com cheque",
        "09-10": "Baixa comandada pela empresa",
        "10-00": "Baixa comandada",
        "10-14": "Título protestado",
        "10-16": "Baixado por tempo excedido",
        "10-20": "Mudança de carteira",
        "11-00": "Em SER - arquivo de títulos pendentes",
        "12-00": "Abatimento concedido",
        "13-00": "Abatimento cancelado",
        "14-00": "Vencimento alterado",
        "15-00": "Liquidação em cartório",
        "16-00": "Liquidado cheque vinculado",
        "17-00": "Liquidação após baixa ou título não registrado",
        "18-00": "Acerto de depositária",
        "19-00": "Título encaminhado a cartório",
        "20-00": "Confirmação receb. instr. sustação de protesto",
        "21-00": "Acerto de controle de participante",
        "23-00": "Entrada de título em cartório",
        "24-48": "CEP inválido",
        "27-07": "Baixa rejeitada - agência/conta/dígito inválidos",
        "27-08": "Baixa rejeitada - nosso número inválido",
        "27-10": "Baixa rejeitada - carteira inválida",
        "27-15": "Baixa rejeitada - carteira/agência/conta/nosso número inválidos",
        "27-40": "Baixa rejeitada - título com protesto emitido",
        "27-42": "Baixa rejeitada - código via Telebradesco inválido",
        "27-60": "Baixa rejeitada - movimento para título não cadastrado",
        "28-03": "Tarifa de sustação",
        "28-04": "Tarifa de protesto",
        "28-08": "Custas de protesto",
        "30-01": "Alteração - código do banco inválido",
        "30-05": "Alteração - código da ocorrência não numérico",
        "30-08": "Alteração - nosso número inválido",
        "30-15": "Alteração - carteira/agência/conta/nosso número inválidos",
        "30-28": "Alteração - código via Telebradesco inválido",
        "30-29": "Alteração - valor de desconto >= valor do título",
        "30-33": "Alteração - valor do abatimento inválido",
        "30-34": "Alteração - valor do abatimento >= valor do título",
        "30-38": "Alteração - prazo para protesto inválido",
        "30-39": "Alteração - pedido de protesto não permitido",
        "30-40": "Alteração - título com protesto emitido",
        "30-60": "Alteração - movimento para título não cadastrado",
        "32-01": "Instrução rejeitada - código do banco inválido",
        "32-02": "Instrução rejeitada - código do registro detalhe inválido",
        "32-04": "Instrução rejeitada - código de ocorrência não permitido",
        "32-05": "Instrução rejeitada - código de ocorrência não numérico",
        "32-07": "Instrução rejeitada - agência/conta/dígito inválidos",
        "32-08": "Instrução rejeitada - nosso número inválido",
        "32-10": "Instrução rejeitada - carteira inválida",
        "32-16": "Instrução rejeitada - data de vencimento inválida",
        "32-17": "Instrução rejeitada - vencimento anterior à emissão",
        "32-18": "Instrução rejeitada CAP"
    };

    let tabelaHTMLSafra = "<table>";
    tabelaHTMLSafra += "<tr><th>Ocorrência</th><th>Motivo</th><th>Descrição</th></tr>";

    for (const chaveSafra in mapaOcorrenciaMotivoSafra) {
        const ocorrenciaSafra = chaveSafra.split('-')[0];
        const motivoSafra = chaveSafra.split('-')[1];
        const descricaoSafra = mapaOcorrenciaMotivoSafra[chaveSafra];
        tabelaHTMLSafra += `<tr><td>${ocorrenciaSafra}</td><td>${motivoSafra}</td><td>${descricaoSafra}</td></tr>`;
    }

    // Adiciona o botão de voltar
    tabelaHTMLSafra += "</table>";
    document.getElementById("resultadoTodosSafra").innerHTML = tabelaHTMLSafra;
    // Torna o botão Voltar visível
    document.getElementById("botaoVoltarSafra").style.display = "block";
}

function voltarTodosSafra() {
    document.getElementById("resultadoTodosSafra").innerHTML = "";

    // Oculta o botão Voltar ao voltar para a página inicial
    document.getElementById("botaoVoltarSafra").style.display = "none";
}



function obterNomePorOcorrenciaMotivoCaixa240(ocorrenciaCaixa240, motivoCaixa240) {
    const mapaOcorrenciaMotivoCaixa240 = {
        "02-00": "Entrada Confirmada",
        "03-01": "Entrada Rejeitada - Código do Banco Inválido",
        "03-02": "Entrada Rejeitada - Código do Registro Inválido",
        "03-03": "Entrada Rejeitada - Código do Segmento Inválido",
        "03-05": "Entrada Rejeitada - Código de Movimento Inválido",
        "03-06": "Entrada Rejeitada - Tipo/Número de Inscrição do Cedente Inválido",
        "03-07": "Entrada Rejeitada - Agência/Conta/DV Inválido",
        "03-08": "Entrada Rejeitada - Nosso Número Inválido",
        "03-09": "Entrada Rejeitada - Nosso Número Duplicado",
        "03-10": "Entrada Rejeitada - Carteira Inválida",
        "03-11": "Entrada Rejeitada - Forma de Cadastro do Título Inválida",
        "03-12": "Entrada Rejeitada - Tipo de Documento Inválido",
        "03-13": "Entrada Rejeitada - Identificação da Emissão Bloqueio Inválido",
        "03-14": "Entrada Rejeitada - Identificação da Distribuição Bloqueto Inválida",
        "03-15": "Entrada Rejeitada - Característica da Cobrança Incompatível",
        "03-16": "Entrada Rejeitada - Data de Vencimento Inválida",
        "03-20": "Entrada Rejeitada - Valor do Título Inválido",
        "03-21": "Entrada Rejeitada - Espécie do Título Inválida",
        "03-23": "Entrada Rejeitada - Aceite Inválido",
        "03-24": "Entrada Rejeitada - Data da Emissão Inválida",
        "03-26": "Entrada Rejeitada - Código de Juros de Mora Inválido",
        "03-27": "Entrada Rejeitada - Valor/Taxa de Juros de Mora Inválido",
        "03-28": "Entrada Rejeitada - Código de Desconto Inválido",
        "03-29": "Entrada Rejeitada - Valor de Desconto Maior ou Igual ao Valor do Título",
        "03-30": "Entrada Rejeitada - Desconto a Conceder Não Confere",
        "03-32": "Entrada Rejeitada - Valor do IOF Inválido",
        "03-33": "Entrada Rejeitada - Valor de Abatimento Inválido",
        "03-37": "Entrada Rejeitada - Código para Protesto Inválido",
        "03-38": "Entrada Rejeitada - Prazo para Protesto Inválido",
        "03-40": "Entrada Rejeitada - Título com Ordem de Protesto Emitida",
        "03-42": "Entrada Rejeitada - Código de Baixa/Devolução Inválido",
        "03-43": "Entrada Rejeitada - Prazo para Baixa/Devolução Inválida",
        "03-44": "Entrada Rejeitada - Código de Moeda Inválido",
        "03-45": "Entrada Rejeitada - Nome do Sacado Não Informado",
        "03-46": "Entrada Rejeitada - Tipo/Número de Inscrição do Sacado Inválido",
        "03-47": "Entrada Rejeitada - Endereço do Sacado Não Informado",
        "03-48": "Entrada Rejeitada - CEP Inválido",
        "03-49": "Entrada Rejeitada - CEP Sem Praça de Cobrança",
        "03-52": "Entrada Rejeitada - Unidade da Federação Inválida",
        "03-53": "Entrada Rejeitada - Tipo/Número de Inscrição do Sacador Inválido",
        "03-57": "Entrada Rejeitada - Código da Multa Inválido",
        "03-58": "Entrada Rejeitada - Data da Multa Inválida",
        "03-59": "Entrada Rejeitada - Valor/Percentual da Multa Inválido",
        "03-60": "Entrada Rejeitada - Movimento para Título não Cadastrado",
        "03-61": "Entrada Rejeitada - Agência Cobradora Inválida",
        "03-62": "Entrada Rejeitada - Tipo da Impressão Inválida",
        "03-63": "Entrada Rejeitada - Entrada para Título já Cadastrado",
        "03-68": "Entrada Rejeitada - Movimentação Inválida para Título",
        "03-69": "Entrada Rejeitada - Alteração de Dados Inválida",
        "03-70": "Entrada Rejeitada - Apelido do Cliente não Cadastrado",
        "03-71": "Entrada Rejeitada - Erro na Composição do Arquivo",
        "03-72": "Entrada Rejeitada - Lote de Serviço Inválido",
        "03-73": "Entrada Rejeitada - Código do Cedente Inválido",
        "03-74": "Entrada Rejeitada - Cedente Não Pertence à Cobrança Eletrônica",
        "03-75": "Entrada Rejeitada - Nome da Empresa Inválido",
        "03-76": "Entrada Rejeitada - Nome do Banco Inválido",
        "03-77": "Entrada Rejeitada - Código da Remessa Inválido",
        "03-78": "Entrada Rejeitada - Data/Hora de Geração de Arquivo Inválida",
        "03-79": "Entrada Rejeitada - Número Sequencial do Arquivo Inválido",
        "03-80": "Entrada Rejeitada - Número de Versão Layout Inválido",
        "03-81": "Entrada Rejeitada - Literal 'REMESSA TESTE' Válida Somente para Fase de Testes",
        "03-82": "Entrada Rejeitada - Literal 'REMESSA TESTE' Obrigatório para Fase de Testes",
        "03-83": "Entrada Rejeitada - Tipo/Número de Inscrição da Empresa Inválida",
        "03-84": "Entrada Rejeitada - Tipo de Operação Inválido",
        "03-85": "Entrada Rejeitada - Tipo de Serviço Inválido",
        "03-86": "Entrada Rejeitada - Forma de Lançamento Inválida",
        "03-87": "Entrada Rejeitada - Número da Remessa Inválido",
        "03-88": "Entrada Rejeitada - Código de CNAB Inválido",
        "03-89": "Entrada Rejeitada - Nome da Empresa Não Informado",
        "03-94": "Entrada Rejeitada - Informação Necessária para Traçar o CEP",
        "03-97": "Entrada Rejeitada - Código do Banco para Débito Inválido",
        "03-98": "Entrada Rejeitada - Agência/Conta Não Liberada para Débito",
        "06-01": "Liquidação - Dinheiro",
        "06-02": "Liquidação - Lotéricas",
        "06-03": "Liquidação - No Próprio Banco",
        "06-04": "Liquidação - Compensação Eletrônica",
        "06-05": "Compensação Convencional",
        "06-06": "Liquidação - Outros Canais",
        "06-07": "Liquidação - Correspondente Bancário",
        "06-08": "Liquidação - Em cartório",
        "06-09": "Liquidação Comandada pelo banco",
        "06-10": "Liquidação - Comandada pelo Cliente Arquivo",
        "09-01": "Baixa - Dinheiro",
        "09-02": "Baixa - Lotéricas",
        "09-03": "Baixa - No Próprio Banco",
        "09-04": "Baixa - Compensação Eletrônica",
        "09-05": "Baixa - Compensação Convencional",
        "09-06": "Baixa - Outros Canais",
        "09-07": "Baixa - Correspondente Bancário",
        "09-08": "Baixa - Em cartório",
        "09-09": "Baixa - Comandada pelo banco",
        "09-10": "Baixa - Comandada pelo Cliente Arquivo",
        "12-00": "Confirmação de Recebimento Instrução Abatimento",
        "13-00": "Confirmação de Recebimento Instrução Cancela Abatimento",
        "14-00": "Confirmação de Recebimento Instrução Alteração de Vencimento",
        "17-00": "Liquidação Após Baixa ou Título não Registrado",
        "17-01": "Liquidação após Baixa - Dinheiro",
        "17-02": "Liquidação após Baixa - Lotéricas",
        "17-03": "Liquidação após Baixa - No Próprio Banco",
        "17-04": "Liquidação após Baixa - Compensação Eletrônica",
        "17-05": "Liquidação após Baixa - Compensação Convencional",
        "17-06": "Liquidação após Baixa - Outros Canais",
        "17-07": "Liquidação após Baixa - Correspondente Bancário",
        "17-08": "Liquidação após Baixa - Em Cartório",
        "17-09": "Liquidação após Baixa - Comandada pelo Banco",
        "17-10": "Liquidação após Baixa - Comandada pelo Cliente Arquivo",
        "19-00": "Confirmação de Recebimento Instrução de Protesto",
        "20-00": "Confirmação de Recebimento Instrução de Sustação/Cancelamento",
        "23-00": "Remessa em Cartório (Aponte em Cartório)",
        "24-00": "Retirada de Cartório - Manutenção em Carteira",
        "25-00": "Protestado e Baixado (Baixa por Protesto)",
        "26-00": "Instrução Rejeitada",
        "26-01": "Instrução Rejeitada - Código do Banco Inválido",
        "26-02": "Instrução Rejeitada - Código do Registro Inválido",
        "26-03": "Instrução Rejeitada - Código do Segmento Inválido",
        "26-05": "Instrução Rejeitada - Código de Movimento Inválido",
        "26-06": "Instrução Rejeitada - Tipo/Num Inscrição Cedente Inválido",
        "26-07": "Instrução Rejeitada - Agência/Conta/DV Inválido",
        "26-08": "Instrução Rejeitada - Nosso Número Inválido",
        "26-09": "Instrução Rejeitada - Nosso Número Duplicado",
        "26-10": "Instrução Rejeitada - Carteira Inválida",
        "26-11": "Instrução Rejeitada - Forma de Cadastramento Título Inválida",
        "26-12": "Instrução Rejeitada - Tipo de Documento Inválido",
        "26-13": "Instrução Rejeitada - Identificação Emissão Bloqueto Inválido",
        "26-14": "Instrução Rejeitada - Identificação Distribuição Bloqueto Inválido",
        "26-15": "Instrução Rejeitada - Caract Cobrança Incompatíveis",
        "26-16": "Instrução Rejeitada - Data do Vencimento Inválida",
        "26-20": "Instrução Rejeitada - Valor do Título Inválido",
        "26-21": "Instrução Rejeitada - Espécie do Título Inválida",
        "26-23": "Instrução Rejeitada - Aceite Inválido",
        "26-24": "Instrução Rejeitada - Data da Emissão Inválida",
        "26-26": "Instrução Rejeitada - Código Juros Mora Inválido",
        "26-27": "Instrução Rejeitada - Valor/Taxa Juros Mora Inválido",
        "26-28": "Instrução Rejeitada - Código do Desconto Inválido",
        "26-29": "Instrução Rejeitada - Valor do Desconto Maior ou Igual ao Valor do Título",
        "26-30": "Instrução Rejeitada - Desconto a Conceder não Confere",
        "26-32": "Instrução Rejeitada - Valor do IOF Inválido",
        "26-33": "Instrução Rejeitada - Valor do Abatimento Inválido",
        "26-37": "Instrução Rejeitada - Código para Protesto Inválido",
        "26-38": "Instrução Rejeitada - Prazo para Protesto Inválido",
        "26-40": "Instrução Rejeitada - Título com Ordem de Protesto Emitida",
        "26-42": "Instrução Rejeitada - Código para Baixa/Devolução Inválido",
        "26-43": "Instrução Rejeitada - Prazo para Baixa/Devolução Inválido",
        "26-44": "Instrução Rejeitada - Código de Moeda Inválido",
        "26-45": "Instrução Rejeitada - Nome do Sacado não Informado",
        "26-46": "Instrução Rejeitada - Tipo/Num Inscrição Sacado/Avalista Inválido",
        "26-47": "Instrução Rejeitada - Endereço Sacado não Informado",
        "26-48": "Instrução Rejeitada - CEP Inválido",
        "26-49": "Instrução Rejeitada - CEP sem Praça de Cobrança (Não Localizado)",
        "26-52": "Instrução Rejeitada - Unidade da Federação Inválida",
        "26-53": "Instrução Rejeitada - Tipo/Num Inscrição Sacador/Avalista Inválidos",
        "26-57": "Instrução Rejeitada - Código da Multa Inválido",
        "26-58": "Instrução Rejeitada - Data da Multa Inválida",
        "26-59": "Instrução Rejeitada - Valor/Percentual da Multa Inválido",
        "26-60": "Instrução Rejeitada - Movimento para Título não Cadastrado",
        "26-61": "Instrução Rejeitada - Agência Cobradora Inválida",
        "26-62": "Instrução Rejeitada - Tipo de Impressão Inválido",
        "26-63": "Instrução Rejeitada - Entrada para Título já Cadastrado",
        "26-68": "Instrução Rejeitada - Movimentação Inválida para Título",
        "26-69": "Instrução Rejeitada - Alteração de Dados Inválida",
        "26-70": "Instrução Rejeitada - Apelido do Cliente não Cadastrado",
        "26-71": "Instrução Rejeitada - Erro na Composição do Arquivo",
        "26-72": "Instrução Rejeitada - Lote de Serviço Inválido",
        "26-73": "Instrução Rejeitada - Código do Cedente Inválido",
        "26-74": "Instrução Rejeitada - Cedente não Pertence à Cobrança Eletrônica/Apelido não Conferido",
        "26-75": "Instrução Rejeitada - Nome da Empresa Inválido",
        "26-76": "Instrução Rejeitada - Nome do Banco Inválido",
        "26-77": "Instrução Rejeitada - Código da Remessa Inválido",
        "26-78": "Instrução Rejeitada - Data/Hora de Geração do Arquivo Inválida",
        "26-79": "Instrução Rejeitada - Número Sequencial do Arquivo Inválido",
        "26-80": "Número da Versão do Layout do Arquivo/Lote Inválido",
        "26-81": "Instrução Rejeitada - Literal REMESSA TESTE - Válida Somente para Fases de Teste",
        "26-82": "Instrução Rejeitada - Literal REMESSA TESTE - Obrigatório para Fase de Testes",
        "26-83": "Instrução Rejeitada - Tipo/Numero de Inscrição da Empresa Inválidos",
        "26-84": "Instrução Rejeitada - Tipo de Operação Inválido",
        "26-85": "Instrução Rejeitada - Tipo de Serviço Inválido",
        "26-86": "Instrução Rejeitada - Forma de Lançamento Inválida",
        "26-87": "Instrução Rejeitada - Número da Remessa Inválido",
        "26-88": "Instrução Rejeitada - Número da Remessa Menor ou Igual à da Remessa Anterior",
        "26-89": "Instrução Rejeitada - Lote de Serviço Divergente",
        "26-90": "Instrução Rejeitada - Número Sequencial do Registro Inválido",
        "26-91": "Instrução Rejeitada - Erro na Sequência de Segmento do Registro Detalhe",
        "26-92": "Instrução Rejeitada - Código de Movimento Divergente entre Grupo de Segmento",
        "26-93": "Instrução Rejeitada - Quantidade de Registros no Lote Inválida",
        "26-94": "Instrução Rejeitada - Quantidade de Registros no Lote Divergente",
        "26-95": "Instrução Rejeitada - Quantidade de Lotes dos Arquivos Inválidos",
        "26-96": "Instrução Rejeitada - Quantidade de Lotes dos Arquivos Divergentes",
        "26-97": "Instrução Rejeitada - Quantidade de Registro no Arquivo Inválida",
        "26-98": "Instrução Rejeitada - Quantidade de Registro no Arquivo Divergente",
        "27-00": "Confirmação do Pedido de Alteração de Outros Dados",
        "28-00": "Débito de Tarifas/Custas",
        "30-00": "Alteração de Dados Rejeitada",
        "30-01": "Alteração de Dados Rejeitada - Código do Banco Inválido",
        "30-02": "Alteração de Dados Rejeitada - Código do Registro Inválido",
        "30-03": "Alteração de Dados Rejeitada - Código do Segmento Inválido",
        "30-05": "Alteração de Dados Rejeitada - Código de Movimento Inválido",
        "30-06": "Alteração de Dados Rejeitada - Tipo/Num de Inscrição do Cedente Inválido",
        "30-07": "Alteração de Dados Rejeitada - Agência/Conta/DV Inválido",
        "30-08": "Alteração de Dados Rejeitada - Nosso Número Inválido",
        "30-09": "Alteração de Dados Rejeitada - Nosso Número Duplicado",
        "30-10": "Alteração de Dados Rejeitada - Carteira Inválida",
        "30-11": "Alteração de Dados Rejeitada - Forma de Cadastramento do Título Inválida",
        "30-12": "Alteração de Dados Rejeitada - Tipo de Documento Inválido",
        "30-13": "Alteração de Dados Rejeitada - Identificação da Emissão do Bloqueto Inválida",
        "30-14": "Alteração de Dados Rejeitada - Identificação da Distribuição do Bloqueto Inválida",
        "30-15": "Alteração de Dados Rejeitada - Características de Cobrança Incompatíveis",
        "30-16": "Alteração de Dados Rejeitada - Data de Vencimento Inválida",
        "30-20": "Alteração de Dados Rejeitada - Valor do Título Inválido",
        "30-21": "Alteração de Dados Rejeitada - Espécie do Título Inválida",
        "30-23": "Alteração de Dados Rejeitada - Aceite Inválido",
        "30-24": "Alteração de Dados Rejeitada - Data de Emissão Inválida",
        "30-26": "Alteração de Dados Rejeitada - Código de Juros de Mora Inválido",
        "30-27": "Alteração de Dados Rejeitada - Valor/Taxa de Juros de Mora Inválido",
        "30-28": "Alteração de Dados Rejeitada - Código de Desconto Inválido",
        "30-29": "Alteração de Dados Rejeitada - Valor de Desconto Maior ou Igual ao Valor do Título",
        "30-30": "Alteração de Dados Rejeitada - Desconto a Conceder não Confere",
        "30-32": "Alteração de Dados Rejeitada - Valor do IOF Inválido",
        "30-33": "Alteração de Dados Rejeitada - Valor do Abatimento Inválido",
        "30-37": "Alteração de Dados Rejeitada - Código para Protesto Inválido",
        "30-38": "Alteração de Dados Rejeitada - Prazo para Protesto Inválido",
        "30-40": "Alteração de Dados Rejeitada - Título com Ordem de Protesto Emitida",
        "30-42": "Alteração de Dados Rejeitada - Código para Baixa/Devolução Inválido",
        "30-43": "Alteração de Dados Rejeitada - Prazo para Baixa/Devolução Inválido",
        "30-44": "Alteração de Dados Rejeitada - Código da Moeda Inválido",
        "30-45": "Alteração de Dados Rejeitada - Nome do Sacado não Informado",
        "30-46": "Alteração de Dados Rejeitada - Tipo/Numero de Inscrição do Sacado Inválido",
        "30-47": "Alteração de Dados Rejeitada - Endereço do Sacado não Informado",
        "30-48": "Alteração de Dados Rejeitada - CEP Inválido",
        "30-49": "Alteração de Dados Rejeitada - CEP sem Praça de Cobrança (não localizado)",
        "30-52": "Alteração de Dados Rejeitada - Unidade da Federação Inválida",
        "30-53": "Alteração de Dados Rejeitada - Tipo/Numero de Inscrição do Sacador/Avalista Inválidos",
        "30-57": "Alteração de Dados Rejeitada - Código da Multa Inválido",
        "30-58": "Alteração de Dados Rejeitada - Data da Multa Inválida",
        "30-59": "Alteração de Dados Rejeitada - Valor/Percentual da Multa Inválido",
        "30-60": "Alteração de Dados Rejeitada - Movimento para Título não Cadastrado",
        "30-61": "Alteração de Dados Rejeitada - Agência Cobradora Inválida",
        "30-62": "Alteração de Dados Rejeitada - Tipo de Impressão Inválido",
        "30-63": "Alteração de Dados Rejeitada - Entrada para Título já Cadastrado",
        "30-68": "Alteração de Dados Rejeitada - Movimento Inválido para Título",
        "30-69": "Alteração de Dados Rejeitada - Alteração de Dados Inválida",
        "30-70": "Alteração de Dados Rejeitada - Apelido do Cliente não Cadastrado",
        "30-71": "Alteração de Dados Rejeitada - Erro na Composição do Arquivo",
        "30-72": "Alteração de Dados Rejeitada - Lote de Serviço Inválido",
        "30-73": "Alteração de Dados Rejeitada - Código do Cedente Inválido",
        "30-74": "Alteração de Dados Rejeitada - Cedente não Pertence a Cobrança Eletrônica/Apelido não Confere",
        "30-75": "Alteração de Dados Rejeitada - Nome da Empresa Inválido",
        "30-76": "Alteração de Dados Rejeitada - Nome do Banco Inválido",
        "30-77": "Alteração de Dados Rejeitada - Código de Remessa Inválido",
        "30-78": "Alteração de Dados Rejeitada - Data/Hora de Geração de Arquivo Inválida",
        "30-79": "Alteração de Dados Rejeitada - Número Sequencial do Arquivo Inválido",
        "30-80": "Número da Versão do Layout do Arquivo/Lote Inválido",
        "30-81": "Alteração de Dados Rejeitada - Literal REMESSA TESTE Válida Somente para Fases de Teste",
        "30-82": "Alteração de Dados Rejeitada - Literal REMESSA TESTE Obrigatório para Fase de Testes",
        "30-83": "Alteração de Dados Rejeitada - Tipo/Numero de Inscrição da Empresa Inválidos",
        "30-84": "Alteração de Dados Rejeitada - Tipo de Operação Inválido",
        "30-85": "Alteração de Dados Rejeitada - Tipo de Serviço Inválido",
        "30-86": "Alteração de Dados Rejeitada - Forma de Lançamento Inválida",
        "30-87": "Alteração de Dados Rejeitada - Número da Remessa Inválido",
        "30-88": "Alteração de Dados Rejeitada - Número da Remessa Menos ou Igual à Remessa Anterior",
        "30-89": "Alteração de Dados Rejeitada - Lote de Serviço Divergente",
        "30-90": "Alteração de Dados Rejeitada - Número Sequencial do Registro Inválido",
        "30-91": "Alteração de Dados Rejeitada - Erro na Sequência de Segmento",
        "30-92": "Alteração de Dados Rejeitada - Código de Movimento Divergente entre Grupo de Segmento",
        "30-93": "Alteração de Dados Rejeitada - Quantidade de Registros no Lote Inválida",
        "30-94": "Alteração de Dados Rejeitada - Quantidade de Registro no Lote Divergente",
        "30-95": "Alteração de Dados Rejeitada - Quantidade de Lotes dos Arquivos Inválidos",
        "30-96": "Alteração de Dados Rejeitada - Quantidade de Lotes dos Arquivos Divergentes",
        "30-97": "Alteração de Dados Rejeitada - Quantidade de Registros no Arquivo Inválido",
        "30-98": "Alteração de Dados Rejeitada - Quantidade de Registro no Arquivo Divergente",
        "36-00": "Confirmação de Recebimento de Instrução de Desconto",
        "37-00": "Confirmação de Recebimento de Instrução de Cancelamento de Desconto",
        "43-00": "Estorno de Protesto/Sustação",
        "44-00": "Estorno de Baixa/Liquidação",
        "45-00": "Alteração de Dados"



    };


    const chaveCaixa240 = `${ocorrenciaCaixa240.toLowerCase()}-${motivoCaixa240.toUpperCase()}`;



    if (mapaOcorrenciaMotivoCaixa240[chaveCaixa240]) {
        return mapaOcorrenciaMotivoCaixa240[chaveCaixa240];
    } else {
        return "Combinação de ocorrência e motivo inválida";
    }
}



function consultarCaixa240() {
    const ocorrenciaCaixa240 = document.getElementById("ocorrenciaCaixa240").value.trim().padStart(2, '0');
    const motivoCaixa240 = document.getElementById("motivoCaixa240").value.trim().padStart(2, '0');

    const nomePessoaCaixa240 = obterNomePorOcorrenciaMotivoCaixa240(ocorrenciaCaixa240, motivoCaixa240);
    document.getElementById("resultadoCaixa240").innerText = "Resultado: " + nomePessoaCaixa240;
}


function mostrarTodasTabelasCaixa240() {
    let tabelaHTMLCaixa240 = "<table>";
    tabelaHTMLCaixa240 += "<tr><th>Número</th><th>Descrição</th></tr>";
    tabelaHTMLCaixa240 += "<tr><td>02</td><td>Solicitar Baixa Caixa</td></tr>";
    tabelaHTMLCaixa240 += "<tr><td>04</td><td>Conceder Abatimento</td></tr>";
    tabelaHTMLCaixa240 += "<tr><td>05</td><td>Cancelar Abatimento</td></tr>";
    tabelaHTMLCaixa240 += "<tr><td>06</td><td>Prorrogar Documento</td></tr>";
    tabelaHTMLCaixa240 += "<tr><td>09</td><td>Protestar Documento</td></tr>";
    tabelaHTMLCaixa240 += "<tr><td>10</td><td>Sustar protesto</td></tr>";
    tabelaHTMLCaixa240 += "<tr><td>//</td><td>Alterar Carteira</td></tr>";
    tabelaHTMLCaixa240 += "<tr><td>//</td><td>Cancelar protesto</td></tr>";
    tabelaHTMLCaixa240 += "<tr><td>//</td><td>Sustar Protesto/Baixar</td></tr>";
    tabelaHTMLCaixa240 += "</table>";

    document.getElementById("resultadoTabelaCaixa240").innerHTML = tabelaHTMLCaixa240;

    // Adiciona o botão de voltar se ainda não estiver presente
    if (!document.getElementById("botaoDeVoltarCaixa240")) {
        let botaoVoltarHTMLCaixa240 = "<button id=\"botaoDeVoltarCaixa240\" class=\"botaoDeVoltar\" onclick=\"voltarParaComandosCaixa240()\">Voltar</button>";
        document.getElementById("resultadoTabelaCaixa240").insertAdjacentHTML('afterend', botaoVoltarHTMLCaixa240);
    }
}

function voltarParaComandosCaixa240() {
    document.getElementById("resultadoTabelaCaixa240").innerHTML = ""; // Limpa a tabela
    // Remove o botão de voltar
    let botaoDeVoltarCaixa240 = document.getElementById("botaoDeVoltarCaixa240");
    if (botaoDeVoltarCaixa240) {
        botaoDeVoltarCaixa240.remove();
    }
}


function todosCaixa240() {
    const mapaOcorrenciaMotivoCaixa240 = {
        "02-00": "Entrada Confirmada",
        "03-01": "Entrada Rejeitada - Código do Banco Inválido",
        "03-02": "Entrada Rejeitada - Código do Registro Inválido",
        "03-03": "Entrada Rejeitada - Código do Segmento Inválido",
        "03-05": "Entrada Rejeitada - Código de Movimento Inválido",
        "03-06": "Entrada Rejeitada - Tipo/Número de Inscrição do Cedente Inválido",
        "03-07": "Entrada Rejeitada - Agência/Conta/DV Inválido",
        "03-08": "Entrada Rejeitada - Nosso Número Inválido",
        "03-09": "Entrada Rejeitada - Nosso Número Duplicado",
        "03-10": "Entrada Rejeitada - Carteira Inválida",
        "03-11": "Entrada Rejeitada - Forma de Cadastro do Título Inválida",
        "03-12": "Entrada Rejeitada - Tipo de Documento Inválido",
        "03-13": "Entrada Rejeitada - Identificação da Emissão Bloqueio Inválido",
        "03-14": "Entrada Rejeitada - Identificação da Distribuição Bloqueto Inválida",
        "03-15": "Entrada Rejeitada - Característica da Cobrança Incompatível",
        "03-16": "Entrada Rejeitada - Data de Vencimento Inválida",
        "03-20": "Entrada Rejeitada - Valor do Título Inválido",
        "03-21": "Entrada Rejeitada - Espécie do Título Inválida",
        "03-23": "Entrada Rejeitada - Aceite Inválido",
        "03-24": "Entrada Rejeitada - Data da Emissão Inválida",
        "03-26": "Entrada Rejeitada - Código de Juros de Mora Inválido",
        "03-27": "Entrada Rejeitada - Valor/Taxa de Juros de Mora Inválido",
        "03-28": "Entrada Rejeitada - Código de Desconto Inválido",
        "03-29": "Entrada Rejeitada - Valor de Desconto Maior ou Igual ao Valor do Título",
        "03-30": "Entrada Rejeitada - Desconto a Conceder Não Confere",
        "03-32": "Entrada Rejeitada - Valor do IOF Inválido",
        "03-33": "Entrada Rejeitada - Valor de Abatimento Inválido",
        "03-37": "Entrada Rejeitada - Código para Protesto Inválido",
        "03-38": "Entrada Rejeitada - Prazo para Protesto Inválido",
        "03-40": "Entrada Rejeitada - Título com Ordem de Protesto Emitida",
        "03-42": "Entrada Rejeitada - Código de Baixa/Devolução Inválido",
        "03-43": "Entrada Rejeitada - Prazo para Baixa/Devolução Inválida",
        "03-44": "Entrada Rejeitada - Código de Moeda Inválido",
        "03-45": "Entrada Rejeitada - Nome do Sacado Não Informado",
        "03-46": "Entrada Rejeitada - Tipo/Número de Inscrição do Sacado Inválido",
        "03-47": "Entrada Rejeitada - Endereço do Sacado Não Informado",
        "03-48": "Entrada Rejeitada - CEP Inválido",
        "03-49": "Entrada Rejeitada - CEP Sem Praça de Cobrança",
        "03-52": "Entrada Rejeitada - Unidade da Federação Inválida",
        "03-53": "Entrada Rejeitada - Tipo/Número de Inscrição do Sacador Inválido",
        "03-57": "Entrada Rejeitada - Código da Multa Inválido",
        "03-58": "Entrada Rejeitada - Data da Multa Inválida",
        "03-59": "Entrada Rejeitada - Valor/Percentual da Multa Inválido",
        "03-60": "Entrada Rejeitada - Movimento para Título não Cadastrado",
        "03-61": "Entrada Rejeitada - Agência Cobradora Inválida",
        "03-62": "Entrada Rejeitada - Tipo da Impressão Inválida",
        "03-63": "Entrada Rejeitada - Entrada para Título já Cadastrado",
        "03-68": "Entrada Rejeitada - Movimentação Inválida para Título",
        "03-69": "Entrada Rejeitada - Alteração de Dados Inválida",
        "03-70": "Entrada Rejeitada - Apelido do Cliente não Cadastrado",
        "03-71": "Entrada Rejeitada - Erro na Composição do Arquivo",
        "03-72": "Entrada Rejeitada - Lote de Serviço Inválido",
        "03-73": "Entrada Rejeitada - Código do Cedente Inválido",
        "03-74": "Entrada Rejeitada - Cedente Não Pertence à Cobrança Eletrônica",
        "03-75": "Entrada Rejeitada - Nome da Empresa Inválido",
        "03-76": "Entrada Rejeitada - Nome do Banco Inválido",
        "03-77": "Entrada Rejeitada - Código da Remessa Inválido",
        "03-78": "Entrada Rejeitada - Data/Hora de Geração de Arquivo Inválida",
        "03-79": "Entrada Rejeitada - Número Sequencial do Arquivo Inválido",
        "03-80": "Entrada Rejeitada - Número de Versão Layout Inválido",
        "03-81": "Entrada Rejeitada - Literal 'REMESSA TESTE' Válida Somente para Fase de Testes",
        "03-82": "Entrada Rejeitada - Literal 'REMESSA TESTE' Obrigatório para Fase de Testes",
        "03-83": "Entrada Rejeitada - Tipo/Número de Inscrição da Empresa Inválida",
        "03-84": "Entrada Rejeitada - Tipo de Operação Inválido",
        "03-85": "Entrada Rejeitada - Tipo de Serviço Inválido",
        "03-86": "Entrada Rejeitada - Forma de Lançamento Inválida",
        "03-87": "Entrada Rejeitada - Número da Remessa Inválido",
        "03-88": "Entrada Rejeitada - Código de CNAB Inválido",
        "03-89": "Entrada Rejeitada - Nome da Empresa Não Informado",
        "03-94": "Entrada Rejeitada - Informação Necessária para Traçar o CEP",
        "03-97": "Entrada Rejeitada - Código do Banco para Débito Inválido",
        "03-98": "Entrada Rejeitada - Agência/Conta Não Liberada para Débito",
        "06-01": "Liquidação - Dinheiro",
        "06-02": "Liquidação - Lotéricas",
        "06-03": "Liquidação - No Próprio Banco",
        "06-04": "Liquidação - Compensação Eletrônica",
        "06-05": "Compensação Convencional",
        "06-06": "Liquidação - Outros Canais",
        "06-07": "Liquidação - Correspondente Bancário",
        "06-08": "Liquidação - Em cartório",
        "06-09": "Liquidação Comandada pelo banco",
        "06-10": "Liquidação - Comandada pelo Cliente Arquivo",
        "09-01": "Baixa - Dinheiro",
        "09-02": "Baixa - Lotéricas",
        "09-03": "Baixa - No Próprio Banco",
        "09-04": "Baixa - Compensação Eletrônica",
        "09-05": "Baixa - Compensação Convencional",
        "09-06": "Baixa - Outros Canais",
        "09-07": "Baixa - Correspondente Bancário",
        "09-08": "Baixa - Em cartório",
        "09-09": "Baixa - Comandada pelo banco",
        "09-10": "Baixa - Comandada pelo Cliente Arquivo",
        "12-00": "Confirmação de Recebimento Instrução Abatimento",
        "13-00": "Confirmação de Recebimento Instrução Cancela Abatimento",
        "14-00": "Confirmação de Recebimento Instrução Alteração de Vencimento",
        "17-00": "Liquidação Após Baixa ou Título não Registrado",
        "17-01": "Liquidação após Baixa - Dinheiro",
        "17-02": "Liquidação após Baixa - Lotéricas",
        "17-03": "Liquidação após Baixa - No Próprio Banco",
        "17-04": "Liquidação após Baixa - Compensação Eletrônica",
        "17-05": "Liquidação após Baixa - Compensação Convencional",
        "17-06": "Liquidação após Baixa - Outros Canais",
        "17-07": "Liquidação após Baixa - Correspondente Bancário",
        "17-08": "Liquidação após Baixa - Em Cartório",
        "17-09": "Liquidação após Baixa - Comandada pelo Banco",
        "17-10": "Liquidação após Baixa - Comandada pelo Cliente Arquivo",
        "19-00": "Confirmação de Recebimento Instrução de Protesto",
        "20-00": "Confirmação de Recebimento Instrução de Sustação/Cancelamento",
        "23-00": "Remessa em Cartório (Aponte em Cartório)",
        "24-00": "Retirada de Cartório - Manutenção em Carteira",
        "25-00": "Protestado e Baixado (Baixa por Protesto)",
        "26-00": "Instrução Rejeitada",
        "26-01": "Instrução Rejeitada - Código do Banco Inválido",
        "26-02": "Instrução Rejeitada - Código do Registro Inválido",
        "26-03": "Instrução Rejeitada - Código do Segmento Inválido",
        "26-05": "Instrução Rejeitada - Código de Movimento Inválido",
        "26-06": "Instrução Rejeitada - Tipo/Num Inscrição Cedente Inválido",
        "26-07": "Instrução Rejeitada - Agência/Conta/DV Inválido",
        "26-08": "Instrução Rejeitada - Nosso Número Inválido",
        "26-09": "Instrução Rejeitada - Nosso Número Duplicado",
        "26-10": "Instrução Rejeitada - Carteira Inválida",
        "26-11": "Instrução Rejeitada - Forma de Cadastramento Título Inválida",
        "26-12": "Instrução Rejeitada - Tipo de Documento Inválido",
        "26-13": "Instrução Rejeitada - Identificação Emissão Bloqueto Inválido",
        "26-14": "Instrução Rejeitada - Identificação Distribuição Bloqueto Inválido",
        "26-15": "Instrução Rejeitada - Caract Cobrança Incompatíveis",
        "26-16": "Instrução Rejeitada - Data do Vencimento Inválida",
        "26-20": "Instrução Rejeitada - Valor do Título Inválido",
        "26-21": "Instrução Rejeitada - Espécie do Título Inválida",
        "26-23": "Instrução Rejeitada - Aceite Inválido",
        "26-24": "Instrução Rejeitada - Data da Emissão Inválida",
        "26-26": "Instrução Rejeitada - Código Juros Mora Inválido",
        "26-27": "Instrução Rejeitada - Valor/Taxa Juros Mora Inválido",
        "26-28": "Instrução Rejeitada - Código do Desconto Inválido",
        "26-29": "Instrução Rejeitada - Valor do Desconto Maior ou Igual ao Valor do Título",
        "26-30": "Instrução Rejeitada - Desconto a Conceder não Confere",
        "26-32": "Instrução Rejeitada - Valor do IOF Inválido",
        "26-33": "Instrução Rejeitada - Valor do Abatimento Inválido",
        "26-37": "Instrução Rejeitada - Código para Protesto Inválido",
        "26-38": "Instrução Rejeitada - Prazo para Protesto Inválido",
        "26-40": "Instrução Rejeitada - Título com Ordem de Protesto Emitida",
        "26-42": "Instrução Rejeitada - Código para Baixa/Devolução Inválido",
        "26-43": "Instrução Rejeitada - Prazo para Baixa/Devolução Inválido",
        "26-44": "Instrução Rejeitada - Código de Moeda Inválido",
        "26-45": "Instrução Rejeitada - Nome do Sacado não Informado",
        "26-46": "Instrução Rejeitada - Tipo/Num Inscrição Sacado/Avalista Inválido",
        "26-47": "Instrução Rejeitada - Endereço Sacado não Informado",
        "26-48": "Instrução Rejeitada - CEP Inválido",
        "26-49": "Instrução Rejeitada - CEP sem Praça de Cobrança (Não Localizado)",
        "26-52": "Instrução Rejeitada - Unidade da Federação Inválida",
        "26-53": "Instrução Rejeitada - Tipo/Num Inscrição Sacador/Avalista Inválidos",
        "26-57": "Instrução Rejeitada - Código da Multa Inválido",
        "26-58": "Instrução Rejeitada - Data da Multa Inválida",
        "26-59": "Instrução Rejeitada - Valor/Percentual da Multa Inválido",
        "26-60": "Instrução Rejeitada - Movimento para Título não Cadastrado",
        "26-61": "Instrução Rejeitada - Agência Cobradora Inválida",
        "26-62": "Instrução Rejeitada - Tipo de Impressão Inválido",
        "26-63": "Instrução Rejeitada - Entrada para Título já Cadastrado",
        "26-68": "Instrução Rejeitada - Movimentação Inválida para Título",
        "26-69": "Instrução Rejeitada - Alteração de Dados Inválida",
        "26-70": "Instrução Rejeitada - Apelido do Cliente não Cadastrado",
        "26-71": "Instrução Rejeitada - Erro na Composição do Arquivo",
        "26-72": "Instrução Rejeitada - Lote de Serviço Inválido",
        "26-73": "Instrução Rejeitada - Código do Cedente Inválido",
        "26-74": "Instrução Rejeitada - Cedente não Pertence à Cobrança Eletrônica/Apelido não Conferido",
        "26-75": "Instrução Rejeitada - Nome da Empresa Inválido",
        "26-76": "Instrução Rejeitada - Nome do Banco Inválido",
        "26-77": "Instrução Rejeitada - Código da Remessa Inválido",
        "26-78": "Instrução Rejeitada - Data/Hora de Geração do Arquivo Inválida",
        "26-79": "Instrução Rejeitada - Número Sequencial do Arquivo Inválido",
        "26-80": "Número da Versão do Layout do Arquivo/Lote Inválido",
        "26-81": "Instrução Rejeitada - Literal REMESSA TESTE - Válida Somente para Fases de Teste",
        "26-82": "Instrução Rejeitada - Literal REMESSA TESTE - Obrigatório para Fase de Testes",
        "26-83": "Instrução Rejeitada - Tipo/Numero de Inscrição da Empresa Inválidos",
        "26-84": "Instrução Rejeitada - Tipo de Operação Inválido",
        "26-85": "Instrução Rejeitada - Tipo de Serviço Inválido",
        "26-86": "Instrução Rejeitada - Forma de Lançamento Inválida",
        "26-87": "Instrução Rejeitada - Número da Remessa Inválido",
        "26-88": "Instrução Rejeitada - Número da Remessa Menor ou Igual à da Remessa Anterior",
        "26-89": "Instrução Rejeitada - Lote de Serviço Divergente",
        "26-90": "Instrução Rejeitada - Número Sequencial do Registro Inválido",
        "26-91": "Instrução Rejeitada - Erro na Sequência de Segmento do Registro Detalhe",
        "26-92": "Instrução Rejeitada - Código de Movimento Divergente entre Grupo de Segmento",
        "26-93": "Instrução Rejeitada - Quantidade de Registros no Lote Inválida",
        "26-94": "Instrução Rejeitada - Quantidade de Registros no Lote Divergente",
        "26-95": "Instrução Rejeitada - Quantidade de Lotes dos Arquivos Inválidos",
        "26-96": "Instrução Rejeitada - Quantidade de Lotes dos Arquivos Divergentes",
        "26-97": "Instrução Rejeitada - Quantidade de Registro no Arquivo Inválida",
        "26-98": "Instrução Rejeitada - Quantidade de Registro no Arquivo Divergente",
        "27-00": "Confirmação do Pedido de Alteração de Outros Dados",
        "28-00": "Débito de Tarifas/Custas",
        "30-00": "Alteração de Dados Rejeitada",
        "30-01": "Alteração de Dados Rejeitada - Código do Banco Inválido",
        "30-02": "Alteração de Dados Rejeitada - Código do Registro Inválido",
        "30-03": "Alteração de Dados Rejeitada - Código do Segmento Inválido",
        "30-05": "Alteração de Dados Rejeitada - Código de Movimento Inválido",
        "30-06": "Alteração de Dados Rejeitada - Tipo/Num de Inscrição do Cedente Inválido",
        "30-07": "Alteração de Dados Rejeitada - Agência/Conta/DV Inválido",
        "30-08": "Alteração de Dados Rejeitada - Nosso Número Inválido",
        "30-09": "Alteração de Dados Rejeitada - Nosso Número Duplicado",
        "30-10": "Alteração de Dados Rejeitada - Carteira Inválida",
        "30-11": "Alteração de Dados Rejeitada - Forma de Cadastramento do Título Inválida",
        "30-12": "Alteração de Dados Rejeitada - Tipo de Documento Inválido",
        "30-13": "Alteração de Dados Rejeitada - Identificação da Emissão do Bloqueto Inválida",
        "30-14": "Alteração de Dados Rejeitada - Identificação da Distribuição do Bloqueto Inválida",
        "30-15": "Alteração de Dados Rejeitada - Características de Cobrança Incompatíveis",
        "30-16": "Alteração de Dados Rejeitada - Data de Vencimento Inválida",
        "30-20": "Alteração de Dados Rejeitada - Valor do Título Inválido",
        "30-21": "Alteração de Dados Rejeitada - Espécie do Título Inválida",
        "30-23": "Alteração de Dados Rejeitada - Aceite Inválido",
        "30-24": "Alteração de Dados Rejeitada - Data de Emissão Inválida",
        "30-26": "Alteração de Dados Rejeitada - Código de Juros de Mora Inválido",
        "30-27": "Alteração de Dados Rejeitada - Valor/Taxa de Juros de Mora Inválido",
        "30-28": "Alteração de Dados Rejeitada - Código de Desconto Inválido",
        "30-29": "Alteração de Dados Rejeitada - Valor de Desconto Maior ou Igual ao Valor do Título",
        "30-30": "Alteração de Dados Rejeitada - Desconto a Conceder não Confere",
        "30-32": "Alteração de Dados Rejeitada - Valor do IOF Inválido",
        "30-33": "Alteração de Dados Rejeitada - Valor do Abatimento Inválido",
        "30-37": "Alteração de Dados Rejeitada - Código para Protesto Inválido",
        "30-38": "Alteração de Dados Rejeitada - Prazo para Protesto Inválido",
        "30-40": "Alteração de Dados Rejeitada - Título com Ordem de Protesto Emitida",
        "30-42": "Alteração de Dados Rejeitada - Código para Baixa/Devolução Inválido",
        "30-43": "Alteração de Dados Rejeitada - Prazo para Baixa/Devolução Inválido",
        "30-44": "Alteração de Dados Rejeitada - Código da Moeda Inválido",
        "30-45": "Alteração de Dados Rejeitada - Nome do Sacado não Informado",
        "30-46": "Alteração de Dados Rejeitada - Tipo/Numero de Inscrição do Sacado Inválido",
        "30-47": "Alteração de Dados Rejeitada - Endereço do Sacado não Informado",
        "30-48": "Alteração de Dados Rejeitada - CEP Inválido",
        "30-49": "Alteração de Dados Rejeitada - CEP sem Praça de Cobrança (não localizado)",
        "30-52": "Alteração de Dados Rejeitada - Unidade da Federação Inválida",
        "30-53": "Alteração de Dados Rejeitada - Tipo/Numero de Inscrição do Sacador/Avalista Inválidos",
        "30-57": "Alteração de Dados Rejeitada - Código da Multa Inválido",
        "30-58": "Alteração de Dados Rejeitada - Data da Multa Inválida",
        "30-59": "Alteração de Dados Rejeitada - Valor/Percentual da Multa Inválido",
        "30-60": "Alteração de Dados Rejeitada - Movimento para Título não Cadastrado",
        "30-61": "Alteração de Dados Rejeitada - Agência Cobradora Inválida",
        "30-62": "Alteração de Dados Rejeitada - Tipo de Impressão Inválido",
        "30-63": "Alteração de Dados Rejeitada - Entrada para Título já Cadastrado",
        "30-68": "Alteração de Dados Rejeitada - Movimento Inválido para Título",
        "30-69": "Alteração de Dados Rejeitada - Alteração de Dados Inválida",
        "30-70": "Alteração de Dados Rejeitada - Apelido do Cliente não Cadastrado",
        "30-71": "Alteração de Dados Rejeitada - Erro na Composição do Arquivo",
        "30-72": "Alteração de Dados Rejeitada - Lote de Serviço Inválido",
        "30-73": "Alteração de Dados Rejeitada - Código do Cedente Inválido",
        "30-74": "Alteração de Dados Rejeitada - Cedente não Pertence a Cobrança Eletrônica/Apelido não Confere",
        "30-75": "Alteração de Dados Rejeitada - Nome da Empresa Inválido",
        "30-76": "Alteração de Dados Rejeitada - Nome do Banco Inválido",
        "30-77": "Alteração de Dados Rejeitada - Código de Remessa Inválido",
        "30-78": "Alteração de Dados Rejeitada - Data/Hora de Geração de Arquivo Inválida",
        "30-79": "Alteração de Dados Rejeitada - Número Sequencial do Arquivo Inválido",
        "30-80": "Número da Versão do Layout do Arquivo/Lote Inválido",
        "30-81": "Alteração de Dados Rejeitada - Literal REMESSA TESTE Válida Somente para Fases de Teste",
        "30-82": "Alteração de Dados Rejeitada - Literal REMESSA TESTE Obrigatório para Fase de Testes",
        "30-83": "Alteração de Dados Rejeitada - Tipo/Numero de Inscrição da Empresa Inválidos",
        "30-84": "Alteração de Dados Rejeitada - Tipo de Operação Inválido",
        "30-85": "Alteração de Dados Rejeitada - Tipo de Serviço Inválido",
        "30-86": "Alteração de Dados Rejeitada - Forma de Lançamento Inválida",
        "30-87": "Alteração de Dados Rejeitada - Número da Remessa Inválido",
        "30-88": "Alteração de Dados Rejeitada - Número da Remessa Menos ou Igual à Remessa Anterior",
        "30-89": "Alteração de Dados Rejeitada - Lote de Serviço Divergente",
        "30-90": "Alteração de Dados Rejeitada - Número Sequencial do Registro Inválido",
        "30-91": "Alteração de Dados Rejeitada - Erro na Sequência de Segmento",
        "30-92": "Alteração de Dados Rejeitada - Código de Movimento Divergente entre Grupo de Segmento",
        "30-93": "Alteração de Dados Rejeitada - Quantidade de Registros no Lote Inválida",
        "30-94": "Alteração de Dados Rejeitada - Quantidade de Registro no Lote Divergente",
        "30-95": "Alteração de Dados Rejeitada - Quantidade de Lotes dos Arquivos Inválidos",
        "30-96": "Alteração de Dados Rejeitada - Quantidade de Lotes dos Arquivos Divergentes",
        "30-97": "Alteração de Dados Rejeitada - Quantidade de Registros no Arquivo Inválido",
        "30-98": "Alteração de Dados Rejeitada - Quantidade de Registro no Arquivo Divergente",
        "36-00": "Confirmação de Recebimento de Instrução de Desconto",
        "37-00": "Confirmação de Recebimento de Instrução de Cancelamento de Desconto",
        "43-00": "Estorno de Protesto/Sustação",
        "44-00": "Estorno de Baixa/Liquidação",
        "45-00": "Alteração de Dados"
    };

    let tabelaHTMLCaixa240 = "<table>";
    tabelaHTMLCaixa240 += "<tr><th>Ocorrência</th><th>Motivo</th><th>Descrição</th></tr>";

    for (const chaveCaixa240 in mapaOcorrenciaMotivoCaixa240) {
        const ocorrenciaCaixa240 = chaveCaixa240.split('-')[0];
        const motivoCaixa240 = chaveCaixa240.split('-')[1];
        const descricaoCaixa240 = mapaOcorrenciaMotivoCaixa240[chaveCaixa240];
        tabelaHTMLCaixa240 += `<tr><td>${ocorrenciaCaixa240}</td><td>${motivoCaixa240}</td><td>${descricaoCaixa240}</td></tr>`;
    }

    // Adiciona o botão de voltar
    tabelaHTMLCaixa240 += "</table>";
    document.getElementById("resultadoTodosCaixa240").innerHTML = tabelaHTMLCaixa240;
    // Torna o botão Voltar visível
    document.getElementById("botaoVoltarCaixa240").style.display = "block";
}

function voltarTodosCaixa240() {
    document.getElementById("resultadoTodosCaixa240").innerHTML = "";

    // Oculta o botão Voltar ao voltar para a página inicial
    document.getElementById("botaoVoltarCaixa240").style.display = "none";
}


function obterNomePorOcorrenciaBancoBic(ocorrenciaBancoBic, motivoBancoBic) {
    const mapaOcorrenciaMotivoBancoBic = {
        "02-00": "Entrada Confirmada",
        "03-08": "Entrada Rejeitada - Vencimento não validado",
        "03-12": "Entrada Rejeitada - Ocorrência não cadastrada",
        "03-13": "Entrada Rejeitada - CEP, endereço ou praça não atendida",
        "03-14": "Entrada Rejeitada - Agência cobradora não atendida",
        "03-15": "Entrada Rejeitada - Título duplicado",
        "03-16": "Entrada Rejeitada - Sacado com nome, CPF/CNPJ inválidos",
        "03-17": "Entrada Rejeitada - Erro dígito nosso número",
        "03-18": "Entrada Rejeitada - Título vencido",
        "03-19": "Entrada Rejeitada - CEP não cobrado pelo banco correspondente",
        "03-99": "Entrada Rejeitada - Título rejeitado pelo banco",
        "04-00": "Transferência de Carteira - Entrada",
        "05-00": "Transferência de Carteira - Baixa",
        "06-00": "Liquidação Normal",
        "07-00": "Liquidação Por Conta",
        "08-00": "Baixado Por Saldo",
        "09-00": "Baixado Automaticamente",
        "10-00": "Baixado Conforme Instruções",
        "11-00": "Em SER (Posição em Aberto)",
        "12-00": "Abatimento Concedido",
        "13-00": "Abatimento Cancelado",
        "14-00": "Vencimento Alterado",
        "15-00": "Liquidação em Cartório",
        "16-00": "Devolução do Cartório",
        "17-00": "Confirmação Envio Para Cartório",
        "18-00": "Título Não Processado",
        "19-00": "Baixa Por Crédito Manual"
    }

    const chaveBancoBic = `${ocorrenciaBancoBic.toLowerCase()}-${motivoBancoBic.toUpperCase()}`;



    if (mapaOcorrenciaMotivoBancoBic[chaveBancoBic]) {
        return mapaOcorrenciaMotivoBancoBic[chaveBancoBic];
    } else {
        return "Combinação de ocorrência e motivo inválida";
    }
}



function consultarBancoBic() {
    const ocorrenciaBancoBic = document.getElementById("ocorrenciaBancoBic").value.trim().padStart(2, '0');
    const motivoBancoBic = document.getElementById("motivoBancoBic").value.trim().padStart(2, '0');

    const nomePessoaBancoBic = obterNomePorOcorrenciaBancoBic(ocorrenciaBancoBic, motivoBancoBic);
    document.getElementById("resultadoBancoBic").innerText = "Resultado: " + nomePessoaBancoBic;
}


function mostrarTodasTabelasBancoBic() {
    let tabelaHTMLBancoBic = "<table>";
    tabelaHTMLBancoBic += "<tr><th>Número</th><th>Descrição</th></tr>";
    tabelaHTMLBancoBic += "<tr><td>02</td><td>Solicitar Baixa Caixa</td></tr>";
    tabelaHTMLBancoBic += "<tr><td>04</td><td>Conceder Abatimento</td></tr>";
    tabelaHTMLBancoBic += "<tr><td>05</td><td>Cancelar Abatimento</td></tr>";
    tabelaHTMLBancoBic += "<tr><td>06</td><td>Prorrogar Documento</td></tr>";
    tabelaHTMLBancoBic += "<tr><td>09</td><td>Protestar Documento</td></tr>";
    tabelaHTMLBancoBic += "<tr><td>18</td><td>Sustar protesto</td></tr>";
    tabelaHTMLBancoBic += "<tr><td>//</td><td>Alterar Carteira</td></tr>";
    tabelaHTMLBancoBic += "<tr><td>35</td><td>Cancelar protesto</td></tr>";
    tabelaHTMLBancoBic += "<tr><td>//</td><td>Sustar Protesto/Baixar</td></tr>";
    tabelaHTMLBancoBic += "</table>";

    document.getElementById("resultadoTabelaBancoBic").innerHTML = tabelaHTMLBancoBic;

    // Adiciona o botão de voltar se ainda não estiver presente
    if (!document.getElementById("botaoDeVoltarBancoBic")) {
        let botaoVoltarHTMLBancoBic = "<button id=\"botaoDeVoltarBancoBic\" class=\"botaoDeVoltar\" onclick=\"voltarParaComandosBancoBic()\">Voltar</button>";
        document.getElementById("resultadoTabelaBancoBic").insertAdjacentHTML('afterend', botaoVoltarHTMLBancoBic);
    }
}

function voltarParaComandosBancoBic() {
    document.getElementById("resultadoTabelaBancoBic").innerHTML = ""; // Limpa a tabela
    // Remove o botão de voltar
    let botaoDeVoltarBancoBic = document.getElementById("botaoDeVoltarBancoBic");
    if (botaoDeVoltarBancoBic) {
        botaoDeVoltarBancoBic.remove();
    }
}



function todosBancoBic() {
    const mapaOcorrenciaMotivoBancoBic = {
        "02-00": "Entrada Confirmada",
        "03-08": "Entrada Rejeitada - Vencimento não validado",
        "03-12": "Entrada Rejeitada - Ocorrência não cadastrada",
        "03-13": "Entrada Rejeitada - CEP, endereço ou praça não atendida",
        "03-14": "Entrada Rejeitada - Agência cobradora não atendida",
        "03-15": "Entrada Rejeitada - Título duplicado",
        "03-16": "Entrada Rejeitada - Sacado com nome, CPF/CNPJ inválidos",
        "03-17": "Entrada Rejeitada - Erro dígito nosso número",
        "03-18": "Entrada Rejeitada - Título vencido",
        "03-19": "Entrada Rejeitada - CEP não cobrado pelo banco correspondente",
        "03-99": "Entrada Rejeitada - Título rejeitado pelo banco",
        "04-00": "Transferência de Carteira - Entrada",
        "05-00": "Transferência de Carteira - Baixa",
        "06-00": "Liquidação Normal",
        "07-00": "Liquidação Por Conta",
        "08-00": "Baixado Por Saldo",
        "09-00": "Baixado Automaticamente",
        "10-00": "Baixado Conforme Instruções",
        "11-00": "Em SER (Posição em Aberto)",
        "12-00": "Abatimento Concedido",
        "13-00": "Abatimento Cancelado",
        "14-00": "Vencimento Alterado",
        "15-00": "Liquidação em Cartório",
        "16-00": "Devolução do Cartório",
        "17-00": "Confirmação Envio Para Cartório",
        "18-00": "Título Não Processado",
        "19-00": "Baixa Por Crédito Manual"
    };

    let tabelaHTMLBancoBic = "<table>";
    tabelaHTMLBancoBic += "<tr><th>Ocorrência</th><th>Motivo</th><th>Descrição</th></tr>";

    for (const chaveBancoBic in mapaOcorrenciaMotivoBancoBic) {
        const ocorrenciaBancoBic = chaveBancoBic.split('-')[0];
        const motivoBancoBic = chaveBancoBic.split('-')[1];
        const descricaoBancoBic = mapaOcorrenciaMotivoBancoBic[chaveBancoBic];
        tabelaHTMLBancoBic += `<tr><td>${ocorrenciaBancoBic}</td><td>${motivoBancoBic}</td><td>${descricaoBancoBic}</td></tr>`;
    }

    // Adiciona o botão de voltar
    tabelaHTMLBancoBic += "</table>";
    document.getElementById("resultadoTodosBancoBic").innerHTML = tabelaHTMLBancoBic;
    // Torna o botão Voltar visível
    document.getElementById("botaoVoltarBancoBic").style.display = "block";
}

function voltarTodosBancoBic() {
    document.getElementById("resultadoTodosBancoBic").innerHTML = "";

    // Oculta o botão Voltar ao voltar para a página inicial
    document.getElementById("botaoVoltarBancoBic").style.display = "none";
}


function mostrarTodasTabelasLiveBank() {
    let tabelaHTMLLiveBank = "<table>";
    tabelaHTMLLiveBank += "<tr><th>Número</th><th>Descrição</th></tr>";
    tabelaHTMLLiveBank += "<tr><td>02</td><td>Solicitar Baixa Caixa</td></tr>";
    tabelaHTMLLiveBank += "<tr><td>04</td><td>Conceder Abatimento</td></tr>";
    tabelaHTMLLiveBank += "<tr><td>05</td><td>Cancelar Abatimento</td></tr>";
    tabelaHTMLLiveBank += "<tr><td>06</td><td>Prorrogar Documento</td></tr>";
    tabelaHTMLLiveBank += "<tr><td>09</td><td>Protestar Documento</td></tr>";
    tabelaHTMLLiveBank += "<tr><td>19</td><td>Sustar protesto</td></tr>";
    tabelaHTMLLiveBank += "<tr><td>//</td><td>Alterar Carteira</td></tr>";
    tabelaHTMLLiveBank += "<tr><td>31</td><td>Cancelar protesto</td></tr>";
    tabelaHTMLLiveBank += "<tr><td>//</td><td>Sustar Protesto/Baixar</td></tr>";
    tabelaHTMLLiveBank += "</table>";

    document.getElementById("resultadoTabelaLiveBank").innerHTML = tabelaHTMLLiveBank;

    // Adiciona o botão de voltar se ainda não estiver presente
    if (!document.getElementById("botaoDeVoltarLiveBank")) {
        let botaoVoltarHTMLLiveBank = "<button id=\"botaoDeVoltarLiveBank\" class=\"botaoDeVoltar\" onclick=\"voltarParaComandosLiveBank()\">Voltar</button>";
        document.getElementById("resultadoTabelaLiveBank").insertAdjacentHTML('afterend', botaoVoltarHTMLLiveBank);
    }
}

function voltarParaComandosLiveBank() {
    document.getElementById("resultadoTabelaLiveBank").innerHTML = ""; // Limpa a tabela
    // Remove o botão de voltar
    let botaoDeVoltarLiveBank = document.getElementById("botaoDeVoltarLiveBank");
    if (botaoDeVoltarLiveBank) {
        botaoDeVoltarLiveBank.remove();
    }
}



function todosLiveBank() {
    const mapaOcorrenciaMotivoLiveBank = {
        "02-00": "Entrada confirmada",
        "02-17": "Data de vcto anterior a data de emissão",
        "02-21": "Espécie do título inválido",
        "02-45": "Nome do sacado inválido",
        "02-46": "CNPJ/CPF do sacado inválido",
        "02-47": "Endereço do sacado não informado",
        "02-48": "CEP irregular",
        "02-53": "CNPJ/CPF do cliente inválido",
        "02-54": "Cliente não informado",
        "02-67": "Débito automático agendado",
        "02-68": "Débito não agendado - erro nos dados de remessa",
        "02-69": "Débito não agendado - sacado não consta no cadastro",
        "02-70": "Débito não agendado - cedente não autorizado",
        "02-71": "Débito não agendado - cedente não tem débito aut.",
        "02-72": "Débito não agendado - código moeda diferente de R$",
        "02-73": "Débito não agendado - data de vcto inválida",
        "03-02": "Código do registro detalhe inválido",
        "03-03": "Código de ocorrência inválida",
        "03-04": "Código de ocorrência não permitida para a carteira",
        "03-05": "Código de ocorrência não numérico",
        "03-08": "Nosso número inválido",
        "03-09": "Nosso número duplicado",
        "03-10": "Carteira inválida",
        "03-16": "Data de vcto inválida",
        "03-18": "Vcto fora do prazo de operação",
        "03-20": "Valor do título inválido",
        "03-21": "Espécie do título inválida",
        "03-22": "Espécie não permitida para a carteira",
        "03-24": "Data de emissão inválida",
        "03-38": "Prazo para protesto inválido",
        "03-44": "Agência cedente não prevista",
        "03-50": "CEP irregular - banco correspondente",
        "03-63": "Entrada para título já cadastrado",
        "03-74": "Débito não agendado, título não registrado",
        "06-00": "Liquidação normal",
        "06-15": "Liquidação com cheque",
        "09-10": "Baixa comandada pela empresa",
        "10-00": "Baixa comandada",
        "10-14": "Título protestado",
        "10-16": "Baixado por tempo excedido",
        "10-20": "Mudança de carteira",
        "11-00": "Em SER - arquivo de títulos pendentes",
        "12-00": "Abatimento concedido",
        "13-00": "Abatimento cancelado",
        "14-00": "Vencimento alterado",
        "15-00": "Liquidação em cartório",
        "17-00": "Liquidação após baixa ou título não registrado",
        "18-00": "Acerto de depositária",
        "19-00": "Titulo encaminhado a cartorio",
        "20-00": "Confimação receb. instr. sustação de protesto",
        "21-00": "Acerto de controle de participante",
        "23-00": "Entrada de título em cartório",
        "24-48": "CEP inválido",
        "27-07": "Baixa rejeitada - agência/conta/dígito inválidos",
        "27-08": "Baixa rejeitada - nosso número inválido",
        "27-10": "Baixa rejeitada - carteira inválida",
        "27-15": "Baixa rejeitada - carteira/agência/conta/nn invál.",
        "27-40": "Baixa rejeitada - título com protesto emitido",
        "27-42": "Baixa rejeitada - código via Telebradesco inválido",
        "27-60": "Baixa rejeitada - movto para título não cadastrado",
        "28-03": "Tarifa de sustação",
        "28-04": "Tarifa de protesto",
        "28-08": "Custas de protesto",
        "30-01": "Alteração - código do banco inválido",
        "30-05": "Alteração - código da ocorrência não numérico",
        "30-08": "Alteração - nosso número inválido",
        "30-15": "Alteração - carteira/agência/conta/nn inválidos",
        "30-28": "Alteração - código via Telebradesco inválido",
        "30-29": "Alteração - valor de desconto >= valor do título",
        "30-33": "Alteração - valor do abatimento inválido",
        "30-34": "Alteração - valor do abatimento >= valor do título",
        "30-38": "Alteração - prazo para protesto inválido",
        "30-39": "Alteração - pedido de protesto não permitido",
        "30-40": "Alteração - título com protesto emitido",
        "30-60": "Alteração - movto para título não cadastrado",
        "32-01": "Instr. rejeitada - código do banco inválido",
        "32-02": "Instr. rejeitada - cód. do reg. detalhe inválido",
        "32-04": "Instr. rejeitada - código de ocorr. não permitido",
        "32-05": "Instr. rejeitada - código de ocorr. não numérico",
        "32-07": "Instr. rejeitada - agência/conta/dígito inválidos",
        "32-08": "Instr. rejeitada - nosso número inválido",
        "32-10": "Instr. rejeitada - carteira inválida",
        "32-16": "Instr. rejeitada - data de vcto inválida",
        "32-17": "Instr. rejeitada - vcto anterior a emissão",
        "32-18": "Instr. rejeitada - vcto fora do prazo de operação",
        "32-21": "Instr. rejeitada - espécie do título inválida",
        "32-22": "Instr. rejeitada - espécie não permitida",
        "32-24": "Instr. rejeitada - data de emissão inválida",
        "32-28": "Instr. rejeitada - código Telebradesco inválido",
        "32-29": "Instr. rejeitada - desconto >= valor do título",
        "32-31": "Instr. rejeitada - já existe desconto anterior",
        "32-33": "Instr. rejeitada - valor do abatiento inválido",
        "32-34": "Instr. rejeitada - abatimento >= valor do título",
        "32-36": "Instr. rejeitada - já existe abatimento anterior",
        "32-38": "Instr. rejeitada - prazo de protesto inválido",
        "32-39": "Instr. rejeitada - pedido protesto não permitido",
        "32-40": "Instr. rejeitada - título com protesto emitido",
        "32-41": "Instr. rejeitada - pedido canc./sust. inválido",
        "32-45": "Instr. rejeitada - nome do sacado não informado",
        "32-46": "Instr. rejeitada - CNPJ/CPF do sacado inválidos",
        "32-47": "Instr. rejeitada - endereço sacado não informado",
        "32-48": "Instr. rejeitada - CEP inválido",
        "32-50": "Instr. Rejeitada - Banco Correspondente",
        "32-60": "Instr. rejeitada - movto título não cadastrado",
        "33-00": "Confirmação pedido alteração outros dados",
        "34-00": "Retirado de cartório e manut. carteira",
        "35-81": "Tentativas de desagendamento esgotadas, baixado",
        "35-82": "Tentativas de desagendamento esgotadas, pendente LiveBank"
    };

    let tabelaHTMLLiveBank = "<table>";
    tabelaHTMLLiveBank += "<tr><th>Ocorrência</th><th>Motivo</th><th>Descrição</th></tr>";

    for (const chaveLiveBank in mapaOcorrenciaMotivoLiveBank) {
        const ocorrenciaLiveBank = chaveLiveBank.split('-')[0];
        const motivoLiveBank = chaveLiveBank.split('-')[1];
        const descricaoLiveBank = mapaOcorrenciaMotivoLiveBank[chaveLiveBank];
        tabelaHTMLLiveBank += `<tr><td>${ocorrenciaLiveBank}</td><td>${motivoLiveBank}</td><td>${descricaoLiveBank}</td></tr>`;
    }

    // Adiciona o botão de voltar
    tabelaHTMLLiveBank += "</table>";
    document.getElementById("resultadoTodosLiveBank").innerHTML = tabelaHTMLLiveBank;
    // Torna o botão Voltar visível
    document.getElementById("botaoVoltarLiveBank").style.display = "block";
}

function voltarTodosLiveBank() {
    document.getElementById("resultadoTodosLiveBank").innerHTML = "";

    // Oculta o botão Voltar ao voltar para a página inicial
    document.getElementById("botaoVoltarLiveBank").style.display = "none";
}



function obterNomePorOcorrenciaLiveBank(ocorrenciaLiveBank, motivoLiveBank) {
    const mapaOcorrenciaMotivoLiveBank = {
        "02-00": "Entrada confirmada",
        "02-17": "Data de vcto anterior a data de emissão",
        "02-21": "Espécie do título inválido",
        "02-45": "Nome do sacado inválido",
        "02-46": "CNPJ/CPF do sacado inválido",
        "02-47": "Endereço do sacado não informado",
        "02-48": "CEP irregular",
        "02-53": "CNPJ/CPF do cliente inválido",
        "02-54": "Cliente não informado",
        "02-67": "Débito automático agendado",
        "02-68": "Débito não agendado - erro nos dados de remessa",
        "02-69": "Débito não agendado - sacado não consta no cadastro",
        "02-70": "Débito não agendado - cedente não autorizado",
        "02-71": "Débito não agendado - cedente não tem débito aut.",
        "02-72": "Débito não agendado - código moeda diferente de R$",
        "02-73": "Débito não agendado - data de vcto inválida",
        "03-02": "Código do registro detalhe inválido",
        "03-03": "Código de ocorrência inválida",
        "03-04": "Código de ocorrência não permitida para a carteira",
        "03-05": "Código de ocorrência não numérico",
        "03-08": "Nosso número inválido",
        "03-09": "Nosso número duplicado",
        "03-10": "Carteira inválida",
        "03-16": "Data de vcto inválida",
        "03-18": "Vcto fora do prazo de operação",
        "03-20": "Valor do título inválido",
        "03-21": "Espécie do título inválida",
        "03-22": "Espécie não permitida para a carteira",
        "03-24": "Data de emissão inválida",
        "03-38": "Prazo para protesto inválido",
        "03-44": "Agência cedente não prevista",
        "03-50": "CEP irregular - banco correspondente",
        "03-63": "Entrada para título já cadastrado",
        "03-74": "Débito não agendado, título não registrado",
        "06-00": "Liquidação normal",
        "06-15": "Liquidação com cheque",
        "09-10": "Baixa comandada pela empresa",
        "10-00": "Baixa comandada",
        "10-14": "Título protestado",
        "10-16": "Baixado por tempo excedido",
        "10-20": "Mudança de carteira",
        "11-00": "Em SER - arquivo de títulos pendentes",
        "12-00": "Abatimento concedido",
        "13-00": "Abatimento cancelado",
        "14-00": "Vencimento alterado",
        "15-00": "Liquidação em cartório",
        "17-00": "Liquidação após baixa ou título não registrado",
        "18-00": "Acerto de depositária",
        "19-00": "Titulo encaminhado a cartorio",
        "20-00": "Confimação receb. instr. sustação de protesto",
        "21-00": "Acerto de controle de participante",
        "23-00": "Entrada de título em cartório",
        "24-48": "CEP inválido",
        "27-07": "Baixa rejeitada - agência/conta/dígito inválidos",
        "27-08": "Baixa rejeitada - nosso número inválido",
        "27-10": "Baixa rejeitada - carteira inválida",
        "27-15": "Baixa rejeitada - carteira/agência/conta/nn invál.",
        "27-40": "Baixa rejeitada - título com protesto emitido",
        "27-42": "Baixa rejeitada - código via Telebradesco inválido",
        "27-60": "Baixa rejeitada - movto para título não cadastrado",
        "28-03": "Tarifa de sustação",
        "28-04": "Tarifa de protesto",
        "28-08": "Custas de protesto",
        "30-01": "Alteração - código do banco inválido",
        "30-05": "Alteração - código da ocorrência não numérico",
        "30-08": "Alteração - nosso número inválido",
        "30-15": "Alteração - carteira/agência/conta/nn inválidos",
        "30-28": "Alteração - código via Telebradesco inválido",
        "30-29": "Alteração - valor de desconto >= valor do título",
        "30-33": "Alteração - valor do abatimento inválido",
        "30-34": "Alteração - valor do abatimento >= valor do título",
        "30-38": "Alteração - prazo para protesto inválido",
        "30-39": "Alteração - pedido de protesto não permitido",
        "30-40": "Alteração - título com protesto emitido",
        "30-60": "Alteração - movto para título não cadastrado",
        "32-01": "Instr. rejeitada - código do banco inválido",
        "32-02": "Instr. rejeitada - cód. do reg. detalhe inválido",
        "32-04": "Instr. rejeitada - código de ocorr. não permitido",
        "32-05": "Instr. rejeitada - código de ocorr. não numérico",
        "32-07": "Instr. rejeitada - agência/conta/dígito inválidos",
        "32-08": "Instr. rejeitada - nosso número inválido",
        "32-10": "Instr. rejeitada - carteira inválida",
        "32-16": "Instr. rejeitada - data de vcto inválida",
        "32-17": "Instr. rejeitada - vcto anterior a emissão",
        "32-18": "Instr. rejeitada - vcto fora do prazo de operação",
        "32-21": "Instr. rejeitada - espécie do título inválida",
        "32-22": "Instr. rejeitada - espécie não permitida",
        "32-24": "Instr. rejeitada - data de emissão inválida",
        "32-28": "Instr. rejeitada - código Telebradesco inválido",
        "32-29": "Instr. rejeitada - desconto >= valor do título",
        "32-31": "Instr. rejeitada - já existe desconto anterior",
        "32-33": "Instr. rejeitada - valor do abatiento inválido",
        "32-34": "Instr. rejeitada - abatimento >= valor do título",
        "32-36": "Instr. rejeitada - já existe abatimento anterior",
        "32-38": "Instr. rejeitada - prazo de protesto inválido",
        "32-39": "Instr. rejeitada - pedido protesto não permitido",
        "32-40": "Instr. rejeitada - título com protesto emitido",
        "32-41": "Instr. rejeitada - pedido canc./sust. inválido",
        "32-45": "Instr. rejeitada - nome do sacado não informado",
        "32-46": "Instr. rejeitada - CNPJ/CPF do sacado inválidos",
        "32-47": "Instr. rejeitada - endereço sacado não informado",
        "32-48": "Instr. rejeitada - CEP inválido",
        "32-50": "Instr. Rejeitada - Banco Correspondente",
        "32-60": "Instr. rejeitada - movto título não cadastrado",
        "33-00": "Confirmação pedido alteração outros dados",
        "34-00": "Retirado de cartório e manut. carteira",
        "35-81": "Tentativas de desagendamento esgotadas, baixado",
        "35-82": "Tentativas de desagendamento esgotadas, pendente LiveBank"
    }

    const chaveLiveBank = `${ocorrenciaLiveBank.toLowerCase()}-${motivoLiveBank.toUpperCase()}`;



    if (mapaOcorrenciaMotivoLiveBank[chaveLiveBank]) {
        return mapaOcorrenciaMotivoLiveBank[chaveLiveBank];
    } else {
        return "Combinação de ocorrência e motivo inválida";
    }
}



function consultarLiveBank() {
    const ocorrenciaLiveBank = document.getElementById("ocorrenciaLiveBank").value.trim().padStart(2, '0');
    const motivoLiveBank = document.getElementById("motivoLiveBank").value.trim().padStart(2, '0');

    const nomePessoaLiveBank = obterNomePorOcorrenciaLiveBank(ocorrenciaLiveBank, motivoLiveBank);
    document.getElementById("resultadoLiveBank").innerText = "Resultado: " + nomePessoaLiveBank;
}



function obterNomePorOcorrenciaSantander(ocorrenciaSantander, motivoSantander) {
    const mapaOcorrenciaMotivoSantander = {
        "02-00": "Entrada Confirmada",
        "03-02": "Código do registro detalhe inválido",
        "03-23": "Aceite inválido",
        "03-43": "Prazo para baixa/devolução inválido",
        "03-35": "Abatimento a conceder não confere",
        "03-24": "Data de emissão inválida",
        "03-17": "Data de vencimento anterior à data de emissão",
        "03-20": "Valor do título inválido",
        "03-33": "Valor do abatimento inválido",
        "03-51": "CEP incompatível com a unidade da federação",
        "03-15": "Características da cobrança incompatíveis",
        "03-00": "Entrada Rejeitada",
        "03-41": "Pedido de cancelamento/sustação para títulos sem instrução de protesto",
        "03-12": "Tipo de documento inválido",
        "03-09": "Nosso número duplicado",
        "03-21": "Espécie do título inválida",
        "03-25": "Data de emissão posterior à data de entrada",
        "03-40": "Título com ordem de protesto emitida",
        "03-05": "Código de movimento inválido",
        "03-48": "CEP inválido",
        "03-36": "Concessão de abatimento - já existe abatimento anterior",
        "03-07": "Agência/conta DV inválidos",
        "03-34": "Valor do abatimento maior ou igual ao valor do título",
        "03-30": "Desconto a conceder não confere",
        "03-31": "Concessão de desconto - já existe desconto anterior",
        "03-10": "Carteira inválida",
        "03-39": "Pedido de protesto não permitido para o título",
        "03-04": "Código de movimento não permitido para a carteira",
        "03-37": "Código para protesto inválido",
        "03-32": "Valor de IOF",
        "03-50": "CEP referente a um Banco Correspondente",
        "03-19": "Título a cargo de bancos correspondentes com vencimento inferior a xx dias",
        "03-08": "Nosso número inválido",
        "03-26": "Código de juros de mora inválido",
        "03-13": "Identificação da emissão do boleto inválida",
        "03-16": "Data de vencimento inválida",
        "03-49": "CEP sem praça de cobrança (não localizado)",
        "03-11": "Forma de cadastramento do título inválida Se desconto título rejeitado-operação de desconto/limite",
        "03-29": "Valor do desconto maior ou igual ao valor do título",
        "03-47": "Endereço do sacado não informado",
        "03-22": "Espécie não permitida para a carteira",
        "03-46": "Tipo/Número de inscrição do sacado inválido",
        "03-18": "Vencimento fora do prazo de operação",
        "03-45": "Nome do sacado não informado",
        "03-14": "Identificação da distribuição do boleto inválida",
        "03-44": "Código de moeda inválido",
        "03-01": "Código do Banco Inválido",
        "03-42": "Código para baixa/devolução inválido",
        "03-38": "Prazo para protesto inválido",
        "03-06": "Tipo/número de inscrição do cedente inválidos",
        "03-03": "Código do segmento inválido",
        "03-27": "Valor/taxa de juros de mora inválido",
        "03-28": "Código de desconto inválido",
        "04-00": "Transferência de carteira/entrada",
        "05-00": "Transferência de carteira/baixa",
        "06-06": "Arquivo magnético",
        "06-08": "Em cartório",
        "06-00": "Liquidação",
        "06-05": "Compensação convencional",
        "06-02": "Por conta",
        "06-03": "No próprio banco",
        "06-07": "Após feriado local",
        "06-01": "Por saldo",
        "06-04": "Compensação eletrônica",
        "09-00": "Baixa",
        "09-04": "Decurso prazo - cliente",
        "09-05": "Decurso prazo - banco",
        "09-02": "Comandada cliente arquivo",
        "09-01": "Comandada banco",
        "09-03": "Comandada cliente on-line",
        "11-00": "Título em carteira (em ser)",
        "12-00": "Confirmação recebimento instrução de abatimento",
        "13-00": "Confirmação recebimento instrução de cancelamento abatimento",
        "14-00": "Confirmação recebimento instrução alteração de vencimento",
        "17-08": "Em cartório",
        "17-13": "Decurso prazo - banco",
        "17-06": "Arquivo magnético",
        "17-02": "Por conta",
        "17-12": "Decurso prazo - cliente",
        "17-11": "Comandada cliente on-line",
        "17-07": "Após feriado local",
        "17-09": "Comandada banco",
        "17-00": "Liquidação após baixa ou liquidação título não registrado",
        "17-03": "No próprio banco",
        "17-01": "Por Saldo",
        "17-04": "Compensação eletrônica",
        "17-10": "Comandada cliente arquivo",
        "17-05": "Compensação convencional",
        "19-00": "Confirmação recebimento instrução de protesto",
        "20-00": "Confirmação recebimento instrução de sustação/cancelamento de protesto",
        "23-00": "Remessa a cartório (aponte em cartório)",
        "24-00": "Retirada de cartório e manutenção em carteira",
        "25-00": "Protestado e baixado (baixa por ter sido protestado)",
        "26-01": "Código do banco inválido",
        "26-00": "Instrução rejeitada",
        "26-05": "Código de movimento inválido",
        "26-06": "Tipo/número de inscrição do cedente inválidos",
        "26-07": "Agência/conta/DV inválido",
        "26-04": "Código do movimento não permitido para carteira",
        "26-10": "Carteira inválida",
        "26-09": "Nosso número duplicado",
        "26-02": "Código do registro inválido",
        "26-08": "Nosso número inválido",
        "26-03": "Código do segmento inválido",
        "27-00": "Confirmação do pedido de alteração de outros dados",
        "28-00": "Débito de tarifas/custas",
        "29-00": "Ocorrências do sacado",
        "30-09": "Nosso número duplicado",
        "30-10": "Carteira inválida",
        "30-04": "Código do movimento não permitido para carteira",
        "30-05": "Código de movimento inválido",
        "30-00": "Alteração de dados rejeitada",
        "30-01": "Código do banco inválido",
        "30-03": "Código do segmento inválido",
        "30-06": "Tipo/número de inscrição do cedente inválidos",
        "30-07": "Agência/conta/DV inválido",
        "30-02": "Código do registro detalhe inválido",
        "30-08": "Nosso número inválido",
        "51-00": "Título DDA reconhecido pelo sacado",
        "52-00": "Título DDA não reconhecido pelo sacado SANTANDER"

    }

    const chaveSantander = `${ocorrenciaSantander.toLowerCase()}-${motivoSantander.toUpperCase()}`;



    if (mapaOcorrenciaMotivoSantander[chaveSantander]) {
        return mapaOcorrenciaMotivoSantander[chaveSantander];
    } else {
        return "Combinação de ocorrência e motivo inválida";
    }
}



function consultarSantander() {
    const ocorrenciaSantander = document.getElementById("ocorrenciaSantander").value.trim().padStart(2, '0');
    const motivoSantander = document.getElementById("motivoSantander").value.trim().padStart(2, '0');

    const nomePessoaSantander = obterNomePorOcorrenciaSantander(ocorrenciaSantander, motivoSantander);
    document.getElementById("resultadoSantander").innerText = "Resultado: " + nomePessoaSantander;
}




function mostrarTodasTabelasSantander() { /* ok */
    let tabelaHTMLSantander = "<table>";
    tabelaHTMLSantander += "<tr><th>Número</th><th>Descrição</th></tr>";
    tabelaHTMLSantander += "<tr><td>02</td><td>Solicitar Baixa Caixa</td></tr>";
    tabelaHTMLSantander += "<tr><td>04</td><td>Conceder Abatimento</td></tr>";
    tabelaHTMLSantander += "<tr><td>05</td><td>Cancelar Abatimento</td></tr>";
    tabelaHTMLSantander += "<tr><td>06</td><td>Prorrogar Documento</td></tr>";
    tabelaHTMLSantander += "<tr><td>09</td><td>Protestar Documento</td></tr>";
    tabelaHTMLSantander += "<tr><td>19</td><td>Sustar protesto</td></tr>";
    tabelaHTMLSantander += "<tr><td>//</td><td>Alterar Carteira</td></tr>";
    tabelaHTMLSantander += "<tr><td>//</td><td>Cancelar protesto</td></tr>";
    tabelaHTMLSantander += "<tr><td>//</td><td>Sustar Protesto/Baixar</td></tr>";
    tabelaHTMLSantander += "</table>";

    document.getElementById("resultadoTabelaSantander").innerHTML = tabelaHTMLSantander;

    // Adiciona o botão de voltar se ainda não estiver presente
    if (!document.getElementById("botaoDeVoltarSantander")) {
        let botaoVoltarHTMLSantander = "<button id=\"botaoDeVoltarSantander\" class=\"botaoDeVoltar\" onclick=\"voltarParaComandosSantander()\">Voltar</button>";
        document.getElementById("resultadoTabelaSantander").insertAdjacentHTML('afterend', botaoVoltarHTMLSantander);
    }
}

function voltarParaComandosSantander() {
    document.getElementById("resultadoTabelaSantander").innerHTML = ""; // Limpa a tabela
    // Remove o botão de voltar
    let botaoDeVoltarSantander = document.getElementById("botaoDeVoltarSantander");
    if (botaoDeVoltarSantander) {
        botaoDeVoltarSantander.remove();
    }
}



function todosSantander() {
    const mapaOcorrenciaMotivoSantander = {
        "02-00": "Entrada Confirmada",
        "03-02": "Código do registro detalhe inválido",
        "03-23": "Aceite inválido",
        "03-43": "Prazo para baixa/devolução inválido",
        "03-35": "Abatimento a conceder não confere",
        "03-24": "Data de emissão inválida",
        "03-17": "Data de vencimento anterior à data de emissão",
        "03-20": "Valor do título inválido",
        "03-33": "Valor do abatimento inválido",
        "03-51": "CEP incompatível com a unidade da federação",
        "03-15": "Características da cobrança incompatíveis",
        "03-00": "Entrada Rejeitada",
        "03-41": "Pedido de cancelamento/sustação para títulos sem instrução de protesto",
        "03-12": "Tipo de documento inválido",
        "03-09": "Nosso número duplicado",
        "03-21": "Espécie do título inválida",
        "03-25": "Data de emissão posterior à data de entrada",
        "03-40": "Título com ordem de protesto emitida",
        "03-05": "Código de movimento inválido",
        "03-48": "CEP inválido",
        "03-36": "Concessão de abatimento - já existe abatimento anterior",
        "03-07": "Agência/conta DV inválidos",
        "03-34": "Valor do abatimento maior ou igual ao valor do título",
        "03-30": "Desconto a conceder não confere",
        "03-31": "Concessão de desconto - já existe desconto anterior",
        "03-10": "Carteira inválida",
        "03-39": "Pedido de protesto não permitido para o título",
        "03-04": "Código de movimento não permitido para a carteira",
        "03-37": "Código para protesto inválido",
        "03-32": "Valor de IOF",
        "03-50": "CEP referente a um Banco Correspondente",
        "03-19": "Título a cargo de bancos correspondentes com vencimento inferior a xx dias",
        "03-08": "Nosso número inválido",
        "03-26": "Código de juros de mora inválido",
        "03-13": "Identificação da emissão do boleto inválida",
        "03-16": "Data de vencimento inválida",
        "03-49": "CEP sem praça de cobrança (não localizado)",
        "03-11": "Forma de cadastramento do título inválida Se desconto título rejeitado-operação de desconto/limite",
        "03-29": "Valor do desconto maior ou igual ao valor do título",
        "03-47": "Endereço do sacado não informado",
        "03-22": "Espécie não permitida para a carteira",
        "03-46": "Tipo/Número de inscrição do sacado inválido",
        "03-18": "Vencimento fora do prazo de operação",
        "03-45": "Nome do sacado não informado",
        "03-14": "Identificação da distribuição do boleto inválida",
        "03-44": "Código de moeda inválido",
        "03-01": "Código do Banco Inválido",
        "03-42": "Código para baixa/devolução inválido",
        "03-38": "Prazo para protesto inválido",
        "03-06": "Tipo/número de inscrição do cedente inválidos",
        "03-03": "Código do segmento inválido",
        "03-27": "Valor/taxa de juros de mora inválido",
        "03-28": "Código de desconto inválido",
        "04-00": "Transferência de carteira/entrada",
        "05-00": "Transferência de carteira/baixa",
        "06-06": "Arquivo magnético",
        "06-08": "Em cartório",
        "06-00": "Liquidação",
        "06-05": "Compensação convencional",
        "06-02": "Por conta",
        "06-03": "No próprio banco",
        "06-07": "Após feriado local",
        "06-01": "Por saldo",
        "06-04": "Compensação eletrônica",
        "09-00": "Baixa",
        "09-04": "Decurso prazo - cliente",
        "09-05": "Decurso prazo - banco",
        "09-02": "Comandada cliente arquivo",
        "09-01": "Comandada banco",
        "09-03": "Comandada cliente on-line",
        "11-00": "Título em carteira (em ser)",
        "12-00": "Confirmação recebimento instrução de abatimento",
        "13-00": "Confirmação recebimento instrução de cancelamento abatimento",
        "14-00": "Confirmação recebimento instrução alteração de vencimento",
        "17-08": "Em cartório",
        "17-13": "Decurso prazo - banco",
        "17-06": "Arquivo magnético",
        "17-02": "Por conta",
        "17-12": "Decurso prazo - cliente",
        "17-11": "Comandada cliente on-line",
        "17-07": "Após feriado local",
        "17-09": "Comandada banco",
        "17-00": "Liquidação após baixa ou liquidação título não registrado",
        "17-03": "No próprio banco",
        "17-01": "Por Saldo",
        "17-04": "Compensação eletrônica",
        "17-10": "Comandada cliente arquivo",
        "17-05": "Compensação convencional",
        "19-00": "Confirmação recebimento instrução de protesto",
        "20-00": "Confirmação recebimento instrução de sustação/cancelamento de protesto",
        "23-00": "Remessa a cartório (aponte em cartório)",
        "24-00": "Retirada de cartório e manutenção em carteira",
        "25-00": "Protestado e baixado (baixa por ter sido protestado)",
        "26-01": "Código do banco inválido",
        "26-00": "Instrução rejeitada",
        "26-05": "Código de movimento inválido",
        "26-06": "Tipo/número de inscrição do cedente inválidos",
        "26-07": "Agência/conta/DV inválido",
        "26-04": "Código do movimento não permitido para carteira",
        "26-10": "Carteira inválida",
        "26-09": "Nosso número duplicado",
        "26-02": "Código do registro inválido",
        "26-08": "Nosso número inválido",
        "26-03": "Código do segmento inválido",
        "27-00": "Confirmação do pedido de alteração de outros dados",
        "28-00": "Débito de tarifas/custas",
        "29-00": "Ocorrências do sacado",
        "30-09": "Nosso número duplicado",
        "30-10": "Carteira inválida",
        "30-04": "Código do movimento não permitido para carteira",
        "30-05": "Código de movimento inválido",
        "30-00": "Alteração de dados rejeitada",
        "30-01": "Código do banco inválido",
        "30-03": "Código do segmento inválido",
        "30-06": "Tipo/número de inscrição do cedente inválidos",
        "30-07": "Agência/conta/DV inválido",
        "30-02": "Código do registro detalhe inválido",
        "30-08": "Nosso número inválido",
        "51-00": "Título DDA reconhecido pelo sacado",
        "52-00": "Título DDA não reconhecido pelo sacado SANTANDER"
    };

    let tabelaHTMLSantander = "<table>";
    tabelaHTMLSantander += "<tr><th>Ocorrência</th><th>Motivo</th><th>Descrição</th></tr>";

    for (const chaveSantander in mapaOcorrenciaMotivoSantander) {
        const ocorrenciaSantander = chaveSantander.split('-')[0];
        const motivoSantander = chaveSantander.split('-')[1];
        const descricaoSantander = mapaOcorrenciaMotivoSantander[chaveSantander];
        tabelaHTMLSantander += `<tr><td>${ocorrenciaSantander}</td><td>${motivoSantander}</td><td>${descricaoSantander}</td></tr>`;
    }

    // Adiciona o botão de voltar
    tabelaHTMLSantander += "</table>";
    document.getElementById("resultadoTodosSantander").innerHTML = tabelaHTMLSantander;
    // Torna o botão Voltar visível
    document.getElementById("botaoVoltarSantander").style.display = "block";
}

function voltarTodosSantander() {
    document.getElementById("resultadoTodosSantander").innerHTML = "";

    // Oculta o botão Voltar ao voltar para a página inicial
    document.getElementById("botaoVoltarSantander").style.display = "none";
}

function mostrarTodasTabelasSicoob240() {
    let tabelaHTMLSicoob240 = "<table>";
    tabelaHTMLSicoob240 += "<tr><th>Número</th><th>Descrição</th></tr>";
    tabelaHTMLSicoob240 += "<tr><td>02</td><td>Solicitar Baixa Caixa</td></tr>";
    tabelaHTMLSicoob240 += "<tr><td>04</td><td>Conceder Abatimento</td></tr>";
    tabelaHTMLSicoob240 += "<tr><td>05</td><td>Cancelar Abatimento</td></tr>";
    tabelaHTMLSicoob240 += "<tr><td>06</td><td>Prorrogar Documento</td></tr>";
    tabelaHTMLSicoob240 += "<tr><td>09</td><td>Protestar Documento</td></tr>";
    tabelaHTMLSicoob240 += "<tr><td>18</td><td>Sustar protesto</td></tr>";
    tabelaHTMLSicoob240 += "<tr><td>//</td><td>Alterar Carteira</td></tr>";
    tabelaHTMLSicoob240 += "<tr><td>35</td><td>Cancelar protesto</td></tr>";
    tabelaHTMLSicoob240 += "<tr><td>//</td><td>Sustar Protesto/Baixar</td></tr>";
    tabelaHTMLSicoob240 += "</table>";

    document.getElementById("resultadoTabelaSicoob240").innerHTML = tabelaHTMLSicoob240;

    // Adiciona o botão de voltar se ainda não estiver presente
    if (!document.getElementById("botaoDeVoltarSicoob240")) {
        let botaoVoltarHTMLSicoob240 = "<button id=\"botaoDeVoltarSicoob240\" class=\"botaoDeVoltar\" onclick=\"voltarParaComandosSicoob240()\">Voltar</button>";
        document.getElementById("resultadoTabelaSicoob240").insertAdjacentHTML('afterend', botaoVoltarHTMLSicoob240);
    }
}

function voltarParaComandosSicoob240() {
    document.getElementById("resultadoTabelaSicoob240").innerHTML = ""; // Limpa a tabela
    // Remove o botão de voltar
    let botaoDeVoltarSicoob240 = document.getElementById("botaoDeVoltarSicoob240");
    if (botaoDeVoltarSicoob240) {
        botaoDeVoltarSicoob240.remove();
    }
}

function todosSicoob240() {
    const mapaOcorrenciaMotivoSicoob240 = {
        "02-00": "Entrada Confirmada",
        "03-00": "Entrada Rejeitada",
        "03-03": "Tarifa Desistência",
        "04-00": "Transferência de Carteira/Entrada",
        "05-00": "Transferência de Carteira/Baixa",
        "06-00": "Liquidação",
        "07-00": "Confirmação do Recebimento da Instrução de Desconto",
        "08-00": "Confirmação do Recebimento do Cancelamento do Desconto",
        "09-00": "Baixa",
        "11-00": "Títulos em Carteira (Em Ser)",
        "12-00": "Confirmação Recebimento Instrução de Abatimento",
        "13-00": "Confirmação Recebimento Instrução de Cancelamento Abatimento",
        "14-00": "Confirmação Recebimento Instrução Alteração de Vencimento",
        "15-00": "Franco de Pagamento",
        "17-00": "Liquidação Após Baixa ou Liquidação Título Não Registrado",
        "19-00": "Confirmação Recebimento Instrução de Protesto",
        "20-00": "Confirmação Recebimento Instrução De Sustação / Cancelamento de Protesto",
        "23-00": "Remessa a Cartório (Aponte a Cartório)",
        "24-00": "Retirada de Cartório e Manutenção em Carteira",
        "25-00": "Protestado e Baixado (Baixa por Ter Sido Protestado)",
        "26-00": "Instrução Rejeitada",
        "27-00": "Confirmação do Pedido de Alteração de Outros Dados",
        "28-00": "Débito de Tarifas/Custas",
        "29-00": "Ocorrência do Pagador",
        "30-00": "Alteração de Dados Rejeitada",
        "33-00": "Confirmação da Alteração dos Dados do Rateio de Crédito",
        "34-00": "Confirmação do Cancelamento dos Dados do Rateio de Crédito",
        "35-00": "Confirmação do Desagendamento do Débito Automático",
        "36-00": "Confirmação de envio de e-mail/SMS",
        "37-00": "Envio de e-mail/SMS rejeitado",
        "38-00": "Confirmação de Alteração do Prazo Limite de Recebimento (a data deve ser",
        "40-00": "Confirmação da alteração do número do título dado pelo beneficiário",
        "41-00": "Confirmação da alteração do número controle do Participante",
        "42-00": "Confirmação da alteração dos dados do Pagador",
        "43-00": "Confirmação da alteração dos dados do Sacador/Avalista",
        "44-00": "Título pago com cheque devolvido",
        "45-00": "Título pago com cheque compensado",
        "46-00": "Instrução para cancelar protesto confirmada",
        "47-00": "Instrução para protesto para fins falimentares confirmada",
        "48-00": "Confirmação de instrução de transferência de carteira/modalidade de cobrança",
        "49-00": "Alteração de contrato de cobrança",
        "50-00": "Título pago com cheque pendente de liquidação",
        "51-00": "Título DDA reconhecido pelo pagador",
        "52-00": "Título DDA não reconhecido pelo pagador",
        "53-00": "Título DDA recusado pela CIP",
        "54-00": "Confirmação da Instrução de Baixa de Título Negativado sem Protesto",
        "55-00": "Confirmação de Pedido de Dispensa de Multa",
        "56-00": "Confirmação do Pedido de Cobrança de Multa",
        "57-00": "Confirmação do Pedido de Alteração de Cobrança de Juros",
        "58-00": "Confirmação do Pedido de Alteração do Valor/Data de Desconto",
        "59-00": "Confirmação do Pedido de Alteração do Beneficiário do Título",
        "60-00": "Confirmação do Pedido de Dispensa de Juros de Mora - sicoob"

    };

    let tabelaHTMLSicoob240 = "<table>";
    tabelaHTMLSicoob240 += "<tr><th>Ocorrência</th><th>Motivo</th><th>Descrição</th></tr>";

    for (const chaveSicoob240 in mapaOcorrenciaMotivoSicoob240) {
        const ocorrenciaSicoob240 = chaveSicoob240.split('-')[0];
        const motivoSicoob240 = chaveSicoob240.split('-')[1];
        const descricaoSicoob240 = mapaOcorrenciaMotivoSicoob240[chaveSicoob240];
        tabelaHTMLSicoob240 += `<tr><td>${ocorrenciaSicoob240}</td><td>${motivoSicoob240}</td><td>${descricaoSicoob240}</td></tr>`;
    }

    // Adiciona o botão de voltar
    tabelaHTMLSicoob240 += "</table>";
    document.getElementById("resultadoTodosSicoob240").innerHTML = tabelaHTMLSicoob240;
    // Torna o botão Voltar visível
    document.getElementById("botaoVoltarSicoob240").style.display = "block";
}

function voltarTodosSicoob240() {
    document.getElementById("resultadoTodosSicoob240").innerHTML = "";

    // Oculta o botão Voltar ao voltar para a página inicial
    document.getElementById("botaoVoltarSicoob240").style.display = "none";
}


function obterNomePorOcorrenciaSicoob240(ocorrenciaSicoob240, motivoSicoob240) {
    const mapaOcorrenciaMotivoSicoob240 = {

        "02-00": "Entrada Confirmada",
        "03-00": "Entrada Rejeitada",
        "03-03": "Tarifa Desistência",
        "04-00": "Transferência de Carteira/Entrada",
        "05-00": "Transferência de Carteira/Baixa",
        "06-00": "Liquidação",
        "07-00": "Confirmação do Recebimento da Instrução de Desconto",
        "08-00": "Confirmação do Recebimento do Cancelamento do Desconto",
        "09-00": "Baixa",
        "11-00": "Títulos em Carteira (Em Ser)",
        "12-00": "Confirmação Recebimento Instrução de Abatimento",
        "13-00": "Confirmação Recebimento Instrução de Cancelamento Abatimento",
        "14-00": "Confirmação Recebimento Instrução Alteração de Vencimento",
        "15-00": "Franco de Pagamento",
        "17-00": "Liquidação Após Baixa ou Liquidação Título Não Registrado",
        "19-00": "Confirmação Recebimento Instrução de Protesto",
        "20-00": "Confirmação Recebimento Instrução De Sustação / Cancelamento de Protesto",
        "23-00": "Remessa a Cartório (Aponte a Cartório)",
        "24-00": "Retirada de Cartório e Manutenção em Carteira",
        "25-00": "Protestado e Baixado (Baixa por Ter Sido Protestado)",
        "26-00": "Instrução Rejeitada",
        "27-00": "Confirmação do Pedido de Alteração de Outros Dados",
        "28-00": "Débito de Tarifas/Custas",
        "29-00": "Ocorrência do Pagador",
        "30-00": "Alteração de Dados Rejeitada",
        "33-00": "Confirmação da Alteração dos Dados do Rateio de Crédito",
        "34-00": "Confirmação do Cancelamento dos Dados do Rateio de Crédito",
        "35-00": "Confirmação do Desagendamento do Débito Automático",
        "36-00": "Confirmação de envio de e-mail/SMS",
        "37-00": "Envio de e-mail/SMS rejeitado",
        "38-00": "Confirmação de Alteração do Prazo Limite de Recebimento (a data deve ser",
        "40-00": "Confirmação da alteração do número do título dado pelo beneficiário",
        "41-00": "Confirmação da alteração do número controle do Participante",
        "42-00": "Confirmação da alteração dos dados do Pagador",
        "43-00": "Confirmação da alteração dos dados do Sacador/Avalista",
        "44-00": "Título pago com cheque devolvido",
        "45-00": "Título pago com cheque compensado",
        "46-00": "Instrução para cancelar protesto confirmada",
        "47-00": "Instrução para protesto para fins falimentares confirmada",
        "48-00": "Confirmação de instrução de transferência de carteira/modalidade de cobrança",
        "49-00": "Alteração de contrato de cobrança",
        "50-00": "Título pago com cheque pendente de liquidação",
        "51-00": "Título DDA reconhecido pelo pagador",
        "52-00": "Título DDA não reconhecido pelo pagador",
        "53-00": "Título DDA recusado pela CIP",
        "54-00": "Confirmação da Instrução de Baixa de Título Negativado sem Protesto",
        "55-00": "Confirmação de Pedido de Dispensa de Multa",
        "56-00": "Confirmação do Pedido de Cobrança de Multa",
        "57-00": "Confirmação do Pedido de Alteração de Cobrança de Juros",
        "58-00": "Confirmação do Pedido de Alteração do Valor/Data de Desconto",
        "59-00": "Confirmação do Pedido de Alteração do Beneficiário do Título",
        "60-00": "Confirmação do Pedido de Dispensa de Juros de Mora - sicoob"

    }

    const chaveSicoob240 = `${ocorrenciaSicoob240.toLowerCase()}-${motivoSicoob240.toUpperCase()}`;



    if (mapaOcorrenciaMotivoSicoob240[chaveSicoob240]) {
        return mapaOcorrenciaMotivoSicoob240[chaveSicoob240];
    } else {
        return "Combinação de ocorrência e motivo inválida";
    }
}



function consultarSicoob240() {
    const ocorrenciaSicoob240 = document.getElementById("ocorrenciaSicoob240").value.trim().padStart(2, '0');
    const motivoSicoob240 = document.getElementById("motivoSicoob240").value.trim().padStart(2, '0');

    const nomePessoaSicoob240 = obterNomePorOcorrenciaSicoob240(ocorrenciaSicoob240, motivoSicoob240);
    document.getElementById("resultadoSicoob240").innerText = "Resultado: " + nomePessoaSicoob240;
}


function mostrarTodasTabelasGrafeno400() { /*ok*/
    let tabelaHTMLGrafeno400 = "<table>";
    tabelaHTMLGrafeno400 += "<tr><th>Número</th><th>Descrição</th></tr>";
    tabelaHTMLGrafeno400 += "<tr><td>02</td><td>Solicitar Baixa/Caixa</td></tr>";
    tabelaHTMLGrafeno400 += "<tr><td>04</td><td>Conceder Abatimento</td></tr>";
    tabelaHTMLGrafeno400 += "<tr><td>05</td><td>Cancelar Abatimento</td></tr>";
    tabelaHTMLGrafeno400 += "<tr><td>06</td><td>Prorrogar Documento</td></tr>";
    tabelaHTMLGrafeno400 += "<tr><td>09</td><td>Protestar Documento</td></tr>";
    tabelaHTMLGrafeno400 += "<tr><td>19</td><td>Sustar protesto</td></tr>";
    tabelaHTMLGrafeno400 += "<tr><td>//</td><td>Alterar Carteira</td></tr>";
    tabelaHTMLGrafeno400 += "<tr><td>31</td><td>Cancelar protesto</td></tr>";
    tabelaHTMLGrafeno400 += "<tr><td>//</td><td>Sustar Protesto/Baixar</td></tr>";
    tabelaHTMLGrafeno400 += "</table>";

    document.getElementById("resultadoTabelaGrafeno400").innerHTML = tabelaHTMLGrafeno400;

    // Adiciona o botão de voltar se ainda não estiver presente
    if (!document.getElementById("botaoDeVoltarGrafeno400")) {
        let botaoVoltarHTMLGrafeno400 = "<button id=\"botaoDeVoltarGrafeno400\" class=\"botaoDeVoltar\" onclick=\"voltarParaComandosGrafeno400()\">Voltar</button>";
        document.getElementById("resultadoTabelaGrafeno400").insertAdjacentHTML('afterend', botaoVoltarHTMLGrafeno400);
    }
}

function voltarParaComandosGrafeno400() {
    document.getElementById("resultadoTabelaGrafeno400").innerHTML = ""; // Limpa a tabela
    // Remove o botão de voltar
    let botaoDeVoltarGrafeno400 = document.getElementById("botaoDeVoltarGrafeno400");
    if (botaoDeVoltarGrafeno400) {
        botaoDeVoltarGrafeno400.remove();
    }
}


function obterNomePorOcorrenciaGrafeno400(ocorrenciaGrafeno400, motivoGrafeno400) {
    const mapaOcorrenciaMotivoGrafeno400 = {
        "02-00": "Entrada Confirmada",
        "02-17": "Data de Vencimento anterior à Data de Emissão",
        "02-21": "Espécie do Título Inválida",
        "02-45": "Nome do Sacado Inválido",
        "02-46": "CNPJ/CPF do Sacado Inválido",
        "02-47": "Endereço do Sacado Não Informado",
        "02-48": "CEP Irregular",
        "02-53": "CNPJ/CPF do Cliente Inválido",
        "02-54": "Cliente Não Informado",
        "02-67": "Débito Automático Agendado",
        "02-68": "Débito não Agendado - Erro nos Dados de Remessa",
        "02-69": "Débito não Agendado - Sacado não Cadastrado",
        "02-70": "Débito não Agendado - Cedente não Autorizado",
        "02-71": "Débito não Agendado - Cedente sem Débito Automático",
        "02-72": "Débito não Agendado - Código Moeda Diferente de R$",
        "02-73": "Débito não Agendado - Data de Vencimento Inválida",
        "03-02": "Código do Registro Detalhe Inválido",
        "03-03": "Código de Ocorrência Inválido",
        "03-04": "Código de Ocorrência não Permitido para a Carteira",
        "03-05": "Código de Ocorrência não Numérico",
        "03-08": "Nosso Número Inválido",
        "03-09": "Nosso Número Duplicado",
        "03-10": "Carteira Inválida",
        "03-16": "Data de Vencimento Inválida",
        "03-18": "Vencimento Fora do Prazo de Operação",
        "03-20": "Valor do Título Inválido",
        "03-21": "Espécie do Título Inválida",
        "03-22": "Espécie não Permitida para a Carteira",
        "03-24": "Data de Emissão Inválida",
        "03-38": "Prazo para Protesto Inválido",
        "03-44": "Agência Cedente não Prevista",
        "03-50": "CEP Irregular - Banco Correspondente",
        "03-63": "Entrada para Título já Cadastrado",
        "03-74": "Débito não Agendado, Título não Registrado",
        "06-00": "Liquidação Normal",
        "06-15": "Liquidação com Cheque",
        "09-10": "Baixa Comandada pela Empresa",
        "10-00": "Baixa Comandada",
        "10-14": "Título Protestado",
        "10-16": "Baixado por Tempo Excedido",
        "10-20": "Mudança de Carteira",
        "11-00": "Em SER - Arquivo de Títulos Pendentes",
        "12-00": "Abatimento Concedido",
        "13-00": "Abatimento Cancelado",
        "14-00": "Vencimento Alterado",
        "15-00": "Liquidação em Cartório",
        "17-00": "Liquidação após Baixa ou Título não Registrado",
        "18-00": "Acerto de Depositária",
        "19-00": "Título Encaminhado a Cartório",
        "20-00": "Confirmação Recebimento Instrução Sustação de Protesto",
        "21-00": "Acerto de Controle de Participante",
        "23-00": "Entrada de Título em Cartório",
        "24-48": "CEP Inválido",
        "27-07": "Baixa Rejeitada - Agência/Conta/Dígito Inválidos",
        "27-08": "Baixa Rejeitada - Nosso Número Inválido",
        "27-10": "Baixa Rejeitada - Carteira Inválida",
        "27-15": "Baixa Rejeitada - Carteira/Agência/Conta/Nosso Número Inválidos",
        "27-40": "Baixa Rejeitada - Título com Protesto Emitido",
        "27-42": "Baixa Rejeitada - Código via Telebradesco Inválido",
        "27-60": "Baixa Rejeitada - Movimento para Título não Cadastrado",
        "28-03": "Tarifa de Sustação",
        "28-04": "Tarifa de Protesto",
        "28-08": "Custas de Protesto",
        "30-01": "Alteração - Código do Banco Inválido",
        "30-05": "Alteração - Código da Ocorrência não Numérico",
        "30-08": "Alteração - Nosso Número Inválido",
        "30-15": "Alteração - Carteira/Agência/Conta/Nosso Número Inválidos",
        "30-28": "Alteração - Código via Telebradesco Inválido",
        "30-29": "Alteração - Valor de Desconto Maior ou Igual ao Valor do Título",
        "30-33": "Alteração - Valor do Abatimento Inválido",
        "30-34": "Alteração - Valor do Abatimento Maior ou Igual ao Valor do Título",
        "30-38": "Alteração - Prazo para Protesto Inválido",
        "30-39": "Alteração - Pedido de Protesto não Permitido",
        "30-40": "Alteração - Título com Protesto Emitido",
        "30-60": "Alteração - Movimento para Título não Cadastrado",
        "32-01": "Instrução Rejeitada - Código do Banco Inválido",
        "32-02": "Instrução Rejeitada - Código do Registro Detalhe Inválido",
        "32-04": "Instrução Rejeitada - Código de Ocorrência não Permitido",
        "32-05": "Instrução Rejeitada - Código de Ocorrência não Numérico",
        "32-07": "Instrução Rejeitada - Agência/Conta/Dígito Inválidos",
        "32-08": "Instrução Rejeitada - Nosso Número Inválido",
        "32-10": "Instrução Rejeitada - Carteira Inválida",
        "32-16": "Instrução Rejeitada - Data de Vencimento Inválida",
        "32-17": "Instrução Rejeitada - Vencimento Anterior à Emissão",
        "32-18": "Instrução Rejeitada - Vencimento Fora do Prazo de Operação",
        "32-21": "Instrução Rejeitada - Espécie do Título Inválida",
        "32-22": "Instrução Rejeitada - Espécie não Permitida",
        "32-24": "Instrução Rejeitada - Data de Emissão Inválida",
        "32-28": "Instrução Rejeitada - Código Telebradesco Inválido",
        "32-29": "Instrução Rejeitada - Desconto Maior ou Igual ao Valor do Título",
        "32-31": "Instrução Rejeitada - Já Existe Desconto Anterior",
        "32-33": "Instrução Rejeitada - Valor do Abatimento Inválido",
        "32-34": "Instrução Rejeitada - Abatimento Maior ou Igual ao Valor do Título",
        "32-36": "Instrução Rejeitada - Já Existe Abatimento Anterior",
        "32-38": "Instrução Rejeitada - Prazo de Protesto Inválido",
        "32-39": "Instrução Rejeitada - Pedido de Protesto não Permitido",
        "32-40": "Instrução Rejeitada - Título com Protesto Emitido",
        "32-41": "Instrução Rejeitada - Pedido de Cancelamento/Sustação Inválido",
        "32-45": "Instrução Rejeitada - Nome do Sacado não Informado",
        "32-46": "Instrução Rejeitada - CNPJ/CPF do Sacado Inválidos",
        "32-47": "Instrução Rejeitada - Endereço do Sacado não Informado",
        "32-48": "Instrução Rejeitada - CEP Inválido",
        "32-50": "Instrução Rejeitada - Banco Correspondente",
        "32-60": "Instrução Rejeitada - Movimento para Título não Cadastrado",
        "33-00": "Confirmação Pedido de Alteração de Outros Dados",
        "34-00": "Retirado de Cartório e Manutenção de Carteira",
        "35-81": "Tentativas de Desagendamento Esgotadas - Baixado",
        "35-82": "Tentativas de Desagendamento Esgotadas - Pendente - GRAFENO"

    }

    const chaveGrafeno400 = `${ocorrenciaGrafeno400.toLowerCase()}-${motivoGrafeno400.toUpperCase()}`;



    if (mapaOcorrenciaMotivoGrafeno400[chaveGrafeno400]) {
        return mapaOcorrenciaMotivoGrafeno400[chaveGrafeno400];
    } else {
        return "Combinação de ocorrência e motivo inválida";
    }
}



function consultarGrafeno400() {
    const ocorrenciaGrafeno400 = document.getElementById("ocorrenciaGrafeno400").value.trim().padStart(2, '0');
    const motivoGrafeno400 = document.getElementById("motivoGrafeno400").value.trim().padStart(2, '0');

    const nomePessoaGrafeno400 = obterNomePorOcorrenciaGrafeno400(ocorrenciaGrafeno400, motivoGrafeno400);
    document.getElementById("resultadoGrafeno400").innerText = "Resultado: " + nomePessoaGrafeno400;
}



function todosGrafeno400() {
    const mapaOcorrenciaMotivoGrafeno400 = {
        "02-00": "Entrada Confirmada",
        "02-17": "Data de Vencimento anterior à Data de Emissão",
        "02-21": "Espécie do Título Inválida",
        "02-45": "Nome do Sacado Inválido",
        "02-46": "CNPJ/CPF do Sacado Inválido",
        "02-47": "Endereço do Sacado Não Informado",
        "02-48": "CEP Irregular",
        "02-53": "CNPJ/CPF do Cliente Inválido",
        "02-54": "Cliente Não Informado",
        "02-67": "Débito Automático Agendado",
        "02-68": "Débito não Agendado - Erro nos Dados de Remessa",
        "02-69": "Débito não Agendado - Sacado não Cadastrado",
        "02-70": "Débito não Agendado - Cedente não Autorizado",
        "02-71": "Débito não Agendado - Cedente sem Débito Automático",
        "02-72": "Débito não Agendado - Código Moeda Diferente de R$",
        "02-73": "Débito não Agendado - Data de Vencimento Inválida",
        "03-02": "Código do Registro Detalhe Inválido",
        "03-03": "Código de Ocorrência Inválido",
        "03-04": "Código de Ocorrência não Permitido para a Carteira",
        "03-05": "Código de Ocorrência não Numérico",
        "03-08": "Nosso Número Inválido",
        "03-09": "Nosso Número Duplicado",
        "03-10": "Carteira Inválida",
        "03-16": "Data de Vencimento Inválida",
        "03-18": "Vencimento Fora do Prazo de Operação",
        "03-20": "Valor do Título Inválido",
        "03-21": "Espécie do Título Inválida",
        "03-22": "Espécie não Permitida para a Carteira",
        "03-24": "Data de Emissão Inválida",
        "03-38": "Prazo para Protesto Inválido",
        "03-44": "Agência Cedente não Prevista",
        "03-50": "CEP Irregular - Banco Correspondente",
        "03-63": "Entrada para Título já Cadastrado",
        "03-74": "Débito não Agendado, Título não Registrado",
        "06-00": "Liquidação Normal",
        "06-15": "Liquidação com Cheque",
        "09-10": "Baixa Comandada pela Empresa",
        "10-00": "Baixa Comandada",
        "10-14": "Título Protestado",
        "10-16": "Baixado por Tempo Excedido",
        "10-20": "Mudança de Carteira",
        "11-00": "Em SER - Arquivo de Títulos Pendentes",
        "12-00": "Abatimento Concedido",
        "13-00": "Abatimento Cancelado",
        "14-00": "Vencimento Alterado",
        "15-00": "Liquidação em Cartório",
        "17-00": "Liquidação após Baixa ou Título não Registrado",
        "18-00": "Acerto de Depositária",
        "19-00": "Título Encaminhado a Cartório",
        "20-00": "Confirmação Recebimento Instrução Sustação de Protesto",
        "21-00": "Acerto de Controle de Participante",
        "23-00": "Entrada de Título em Cartório",
        "24-48": "CEP Inválido",
        "27-07": "Baixa Rejeitada - Agência/Conta/Dígito Inválidos",
        "27-08": "Baixa Rejeitada - Nosso Número Inválido",
        "27-10": "Baixa Rejeitada - Carteira Inválida",
        "27-15": "Baixa Rejeitada - Carteira/Agência/Conta/Nosso Número Inválidos",
        "27-40": "Baixa Rejeitada - Título com Protesto Emitido",
        "27-42": "Baixa Rejeitada - Código via Telebradesco Inválido",
        "27-60": "Baixa Rejeitada - Movimento para Título não Cadastrado",
        "28-03": "Tarifa de Sustação",
        "28-04": "Tarifa de Protesto",
        "28-08": "Custas de Protesto",
        "30-01": "Alteração - Código do Banco Inválido",
        "30-05": "Alteração - Código da Ocorrência não Numérico",
        "30-08": "Alteração - Nosso Número Inválido",
        "30-15": "Alteração - Carteira/Agência/Conta/Nosso Número Inválidos",
        "30-28": "Alteração - Código via Telebradesco Inválido",
        "30-29": "Alteração - Valor de Desconto Maior ou Igual ao Valor do Título",
        "30-33": "Alteração - Valor do Abatimento Inválido",
        "30-34": "Alteração - Valor do Abatimento Maior ou Igual ao Valor do Título",
        "30-38": "Alteração - Prazo para Protesto Inválido",
        "30-39": "Alteração - Pedido de Protesto não Permitido",
        "30-40": "Alteração - Título com Protesto Emitido",
        "30-60": "Alteração - Movimento para Título não Cadastrado",
        "32-01": "Instrução Rejeitada - Código do Banco Inválido",
        "32-02": "Instrução Rejeitada - Código do Registro Detalhe Inválido",
        "32-04": "Instrução Rejeitada - Código de Ocorrência não Permitido",
        "32-05": "Instrução Rejeitada - Código de Ocorrência não Numérico",
        "32-07": "Instrução Rejeitada - Agência/Conta/Dígito Inválidos",
        "32-08": "Instrução Rejeitada - Nosso Número Inválido",
        "32-10": "Instrução Rejeitada - Carteira Inválida",
        "32-16": "Instrução Rejeitada - Data de Vencimento Inválida",
        "32-17": "Instrução Rejeitada - Vencimento Anterior à Emissão",
        "32-18": "Instrução Rejeitada - Vencimento Fora do Prazo de Operação",
        "32-21": "Instrução Rejeitada - Espécie do Título Inválida",
        "32-22": "Instrução Rejeitada - Espécie não Permitida",
        "32-24": "Instrução Rejeitada - Data de Emissão Inválida",
        "32-28": "Instrução Rejeitada - Código Telebradesco Inválido",
        "32-29": "Instrução Rejeitada - Desconto Maior ou Igual ao Valor do Título",
        "32-31": "Instrução Rejeitada - Já Existe Desconto Anterior",
        "32-33": "Instrução Rejeitada - Valor do Abatimento Inválido",
        "32-34": "Instrução Rejeitada - Abatimento Maior ou Igual ao Valor do Título",
        "32-36": "Instrução Rejeitada - Já Existe Abatimento Anterior",
        "32-38": "Instrução Rejeitada - Prazo de Protesto Inválido",
        "32-39": "Instrução Rejeitada - Pedido de Protesto não Permitido",
        "32-40": "Instrução Rejeitada - Título com Protesto Emitido",
        "32-41": "Instrução Rejeitada - Pedido de Cancelamento/Sustação Inválido",
        "32-45": "Instrução Rejeitada - Nome do Sacado não Informado",
        "32-46": "Instrução Rejeitada - CNPJ/CPF do Sacado Inválidos",
        "32-47": "Instrução Rejeitada - Endereço do Sacado não Informado",
        "32-48": "Instrução Rejeitada - CEP Inválido",
        "32-50": "Instrução Rejeitada - Banco Correspondente",
        "32-60": "Instrução Rejeitada - Movimento para Título não Cadastrado",
        "33-00": "Confirmação Pedido de Alteração de Outros Dados",
        "34-00": "Retirado de Cartório e Manutenção de Carteira",
        "35-81": "Tentativas de Desagendamento Esgotadas - Baixado",
        "35-82": "Tentativas de Desagendamento Esgotadas - Pendente - GRAFENO"

    };

    let tabelaHTMLGrafeno400 = "<table>";
    tabelaHTMLGrafeno400 += "<tr><th>Ocorrência</th><th>Motivo</th><th>Descrição</th></tr>";

    for (const chaveGrafeno400 in mapaOcorrenciaMotivoGrafeno400) {
        const ocorrenciaGrafeno400 = chaveGrafeno400.split('-')[0];
        const motivoGrafeno400 = chaveGrafeno400.split('-')[1];
        const descricaoGrafeno400 = mapaOcorrenciaMotivoGrafeno400[chaveGrafeno400];
        tabelaHTMLGrafeno400 += `<tr><td>${ocorrenciaGrafeno400}</td><td>${motivoGrafeno400}</td><td>${descricaoGrafeno400}</td></tr>`;
    }

    // Adiciona o botão de voltar
    tabelaHTMLGrafeno400 += "</table>";
    document.getElementById("resultadoTodosGrafeno400").innerHTML = tabelaHTMLGrafeno400;
    // Torna o botão Voltar visível
    document.getElementById("botaoVoltarGrafeno400").style.display = "block";
}

function voltarTodosGrafeno400() {
    document.getElementById("resultadoTodosGrafeno400").innerHTML = "";

    // Oculta o botão Voltar ao voltar para a página inicial
    document.getElementById("botaoVoltarGrafeno400").style.display = "none";
}