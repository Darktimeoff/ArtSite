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

export function forms(selectorForms) {
    const forms = document.querySelectorAll(selectorForms);
    const message = {
        success: "данные успешно отправились",
        failure: "произошёл сбой отправки",
        wait: "происходит отправка",
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    }

    const path = {
        design: 'https://jsonplaceholder.typicode.com/photos',
        question: 'https://jsonplaceholder.typicode.com/users'
    }

    forms.forEach(form => {
        form.addEventListener('submit', _formSubmitHandler);
    })

    async function _formSubmitHandler(e) {
        e.preventDefault();
        const item =  e.target;
        let validObj;
        let api;

        if(item.closest('.popup-design')) { 
            api = path.design;
            validObj = {
                name: [Validators.required],
                phone:[Validators.required],
                email:[Validators.required],
                message: [Validators.required, Validators.minLength(15)]
            };
        } else {
            validObj = {
                name: [Validators.required],
                phone:[Validators.required],
            }
            api = path.question;
        }

        console.log(api);

        let form = new Form(item, validObj);


        if(form.isValid()) {
            const messageElm = document.createElement("div");
            messageElm.classList.add('status');
            item.parentNode.appendChild(messageElm);
    
            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400)

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            messageElm.appendChild(statusImg);
    
            let textMessage = document.createElement('div');
            textMessage.textContent = message.wait;
            messageElm.appendChild(textMessage);


            let data = {
                ...form.value()
            }
            console.log(data);

            RequestService.postRequest(data, api)
                .then(response => {
                    console.log(response);
                    statusImg.setAttribute('src', message.ok)
                    textMessage.textContent = message.success;
                })
                .catch(error => {
                    console.log(error);
                    statusImg.setAttribute('src', message.fail)
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    setTimeout(() => {
                        item.classList.remove('animated', 'fadeOutUp');
                        messageElm.remove();
                    })
                    form.clear();
                }, 5000);
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