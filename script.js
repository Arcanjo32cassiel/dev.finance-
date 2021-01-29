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
        description: ' Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        description: ' Websiste',
        amount: 500000,
        date: '23/01/2021',
    }, {
        description: ' Internet',
        amount: -20000,
        date: '23/01/2021',
    }, {
        description: ' Matériais Escolares da Izáuria',
        amount: -30000,
        date: '23/02/2021',
    }, {
        description: ' Landingpage',
        amount: 30000,
        date: '3/02/2021',
    }, {
        description: ' Hostsite',
        amount: 10000,
        date: '10/02/2021',
    }
]


// ====TRNASECTIONS=====
const Transection = {
    all: transections,
    add(transection) {
        Transection.all.push(transection)
        App.reload()
    },
    remove(index) {
        Transection.all.splice(index, 1);
        App.reload()
    },
    incomes() {
        let income = 0;
        // transections.forEach(transection => {
        //         if (transection.amount > 0) {
        //             income += transection.amount
        //         }
        //     })
        Transection.all.filter(transection => transection.amount > 0 ? income += transection.amount : income)
        return income;
    },
    expenses() {
        let expense = 0;
        Transection.all.filter(transection => transection.amount < 0 ? expense += transection.amount : expense)
        return expense;
    },
    total() {
        // Entradas - Saídas
        // let total = 0;
        // transections.filter(transection => transection.amount > 0 ? total += transection.amount : total)
        // transections.filter(transection => transection.amount < 0 ? total += transection.amount : total)
        // return total 
        return Transection.incomes() + Transection.expenses()

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
    },
    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transection.incomes())
        document.getElementById('expanseDisplay').innerHTML = Utils.formatCurrency(Transection.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transection.total())
    },
    clearTrasections() {
        DOM.transectionContainer.innerHTML = ""
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
const App = {
    init() {
        Transection.all.forEach(transection => DOM.addTransection(transection))

        DOM.updateBalance()
    },
    reload() {
        DOM.clearTrasections()
        App.init()
    }
}
App.init()

// Transection.remove(3)
// Transection.add({

//     description: 'Alo você',
//     amount: 2000,
//     date: '23/02/2021'
// })