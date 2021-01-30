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


// ====TRNASECTIONS=====
const Transection = {
    all: [{
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

    ],
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
        formatAmount(value) {
            value = Number(value) * 100
            return value
        },
        formatDate(date) {
            const splittedDate = date.split("-")
            return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
        },
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
    // ====Form======
const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },

    validateFields() {
        const { description, amount, date } = Form.getValues()
        if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos")
        }
    },
    formatValues() {
        let { description, amount, date } = Form.getValues()
        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
    },
    clearfields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            // Verificar se todas  as informações foram prrenchidas
            Form.validateFields()

            // formatar os dados para salvar
            const transection = Form.formatValues()

            // salvar
            Transection.add(transection)

            // apagar os dados do fromulário
            Form.clearfields()

            //modal feche
            openclosemodal();


        } catch (error) {
            alert(error.message)
        }

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