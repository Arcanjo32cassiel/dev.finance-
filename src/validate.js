const validateform = {
    getValues() {
        return {
            form: document.querySelector('#form'),
            name: document.querySelector('#name'),
            email: document.querySelector('#email'),
            password: document.querySelector('#password')
        }
    },
    validate() {
        const { form, name, email, password } = validateform.getValues()
            // form.onsubmit = () => {

        if (name.value.trim() === "" || email.value.trim() === "" || password.value.trim() === "") {
            throw new Error("Por favor, preencha todos os campos")
        } else {
            window.location.href = "../public/dev.html"
                // }
        }
    },
    submit(event) {
        event.preventDefault()

        try {
            // Verificar se todas  as informações foram prrenchidas
            validateform.validate()
        } catch (error) {
            alert(error.message)
        }
    }
}