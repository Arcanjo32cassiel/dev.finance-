const buttonNew = document.querySelector(".new");
const modalOverlay = document.querySelector('.modal-overlay');
const close = document.querySelector('.cancel');
// ======//
function openclosemodal() {
    buttonNew.onclick = () => { modalOverlay.classList.add('active') }
    close.onclick = () => { modalOverlay.classList.remove('active') }
}
openclosemodal();

// =========/
const transections = [{
            id: 1,
            description: ' Luz',
            amount: -50000,
            date: '23/01/2021',
        },
        {
            id: 2,
            description: ' Websiste',
            amount: 500000,
            date: '23/01/2021',
        },
        {
            id: 3,
            description: ' Internet',
            amount: -20000,
            date: '23/01/2021',
        },
        {
            id: 4,
            description: ' Matériais Escolares da Izáuria',
            amount: -30000,
            date: '23/02/2021',
        }
    ]
    // ====TRNASECTIONS=====
const Transection = {
        incomes() {
            // Somar as entradas
        },
        expenses() {
            // Somar as saídas
        },
        total() {
            // Entradas - Saídas
        }

    }
    // =====DOM=====
const DOM = {
        transectionContainer: document.querySelector('#data-table tbody'),
        addTransection(transection, index) {

            const tr = document.createElement('tr');
            tr.innerHTML = DOM.innerHTMLTransection(transection);

            DOM.transectionContainer.appendChild(tr)
        },
        innerHTMLTransection(transection) {
            const CSSclass = transection.amount > 0 ? "income" : "expense";
            const amount = Utils.formatCurrency(transection.amount)

            const html = ` 
        <td class="description">${transection.description}</td>
        <td class="${CSSclass}"> ${amount} </td>
        <td class="date">${transection.date}</td>
        <td><img src="./images/minus.svg" alt="Remover Transação"></td>
    `
            return html
        }
    }
    // ====UTILS======
const Utils = {
    formatCurrency(value) {
        const seginal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, '')

        value = Number(value) / 100

        value = value.toLocaleString('pt-VR', {
            style: 'currency',
            currency: 'BRL'
        })

        return seginal + value
    }
}

transections.forEach(transection => DOM.addTransection(transection))