// validation with  js POO \\\\\\\\\\\
class Validator {
    constructor() {
        this.validations = [
            'data-required',
            'data-email-validate',
            'data-equal',
            'data-password-validate'
        ]
    }
    validate(form) {
            let currentValidations = document.querySelectorAll('form .error-validation');
            let inputss = document.querySelector('#email');
            if (currentValidations.length > 0) {
                this.cleanValidations(currentValidations, inputss);
                window.location.href = "../public/dev.html"
            }

            // get every inputs
            let inputs = form.getElementsByTagName('input');

            // turns an HTMLCollection into an  array
            let inputsArray = [...inputs];

            // loop of inputs and validation against what is found
            inputsArray.forEach(input => {

                // loop in every the validations existing
                for (let i = 0; this.validations.length > i; i++) {


                    // checks if the current validation exists in the input
                    if (input.getAttribute(this.validations[i]) != null) {

                        // cleanring  the string to flip  a method     
                        let method = this.validations[i].replace("data-", "").replace("-", "");

                        // value of input
                        let value = input.getAttribute(this.validations[i]);
                        // console.log(method, value)
                        // invoke the method
                        this[method](input, value);
                    }

                }
            }, this);
        }
        //=======METHOD VALIDATIONS=======//

    emailvalidate(input) {
        // email@email.com 
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um e-mail no padrão name@email.com `;

        if (!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }

    required(input) {
        let inputValue = input.value;

        if (inputValue === '') {
            let errorMessage = `Esse campo é obrigatório`;

            this.printMessage(input, errorMessage);
        }
    }

    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Este campo precisa estar igual ao ${inputName}`;

        if (input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    passwordvalidate(input) {
            // esplodir  string  em um array

            let charArr = input.value.split("")

            let uppercases = 0;
            let numbers = 0;

            for (let i = 0; charArr.length > i; i++) {
                if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                    uppercases++;
                } else if (!isNaN(parseInt(charArr[i]))) {
                    numbers++;
                }
            }
            if (uppercases === 0 || numbers === 0) {
                let errorMessage = ` A senha precisa de um caractere maiúsculo e um número`;

                this.printMessage(input, errorMessage);
            }
        }
        // ===========================//


    printMessage(input, msg) {
        //  amount of errors
        let errorsAmt = input.parentNode.querySelector('.error-validation');
        if (errorsAmt === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template)
        }
    }

    cleanValidations(validations, inputss) {
        validations.forEach(el => el.remove());
        inputss.classList.add('bordervalidate')
    }
}
const form = document.getElementById('form-register');
const submit = document.getElementById('save');

const validator = new Validator();

submit.addEventListener('click', event => {
    event.preventDefault();

    validator.validate(form);

})