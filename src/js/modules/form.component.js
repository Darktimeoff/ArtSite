import Validators from "./validators.component";
import RequestService from "./../services/request.services";

export default class Form {
    constructor(form, controls) {
        this.form = form;
        this.controls = controls;
    }

    value() {
        const value = {};
        
        Object.keys(this.controls).forEach(control => {
            value[control] = this.form[control].value
        });

        return value;
    }

    isValid() {
        let isFormValid = true;

        Object.keys(this.controls).forEach(control => {
            const validators = this.controls[control];

            let isValid = true;

            validators.forEach(validator => {
                isValid = validator(this.form[control].value) && isValid;
            });

            isValid ? _clearError(this.form[control]) :  _setError(this.form[control]);

          
            isFormValid = isFormValid && isValid;
        });

        return isFormValid;
    }


    clear() {
        this.form.reset();
    }

    destroy() {
        this.form = null;
        this.controls = null;
    }
}

export function forms(selectorForms, urlSend) {
    const forms = document.querySelectorAll(selectorForms);
    const message = {
        success: "данные успешно отправились",
        failure: "произошёл сбой отправки",
        wait: "происходит отправка"
    }
    const messageElm = document.createElement("div");
    forms.forEach(form => {
        form.addEventListener('submit', _formSubmitHandler);
    })

    async function _formSubmitHandler(e) {
        e.preventDefault();
        messageElm.textContent = message.wait;
        e.target.appendChild(messageElm);

        let form = new Form(e.target, {
            user_name:[Validators.required],
            user_phone:[Validators.required, Validators.minLength(8)]
        });

        if(form.isValid()) {
            RequestService.postRequest({...form.value()}, urlSend)
                .then(response => {
                    console.log(response);
                    messageElm.textContent = message.success;
                    setTimeout(() => {
                        messageElm.remove();
                    }, 2000);
                })
                .catch(error => {
                    messageElm.textContent = message.failure;
                    setTimeout(() => {
                        messageElm.remove();
                    }, 5000);
                });
            form.clear();
        }
    }
}

function _setError($control) {
    _clearError($control);
    const error = '<p class="validation-error">Введите коректное значение</p>'
    $control.classList.add('invalid');
    $control.insertAdjacentHTML('afterend', error);
}

function _clearError($control) {
    if($control.nextElementSibling && $control.classList.contains('invalid')) {
        $control.nextElementSibling.remove();
        $control.classList.remove('invalid');
    }
}