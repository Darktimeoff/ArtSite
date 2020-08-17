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
    const upload = document.querySelectorAll('[name="upload"]');
    let infoPhoto = {};

    const path = {
        design: 'https://jsonplaceholder.typicode.com/photos',
        question: 'https://jsonplaceholder.typicode.com/users'
    }

    upload.forEach(input => _inputTypeFile(input, infoPhoto));

    _formsAddSubmitHandler(forms, _formSubmitHandler);

    async function _formSubmitHandler(e) {
        e.preventDefault();
        const item =  e.target;
        let validObj = {};
        let api;

        api = _defineFormAndSetValidAndUrl(item, validObj, path);

        let form = new Form(item, validObj);


        if(form.isValid()) {

            let {messageElm, statusImg, textMessage} = _createStatusModal(item, message);

            const data = _createDataToSend(infoPhoto, form, item);

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
                        item.style.display = '';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                        item.querySelector('.file_upload button').textContent = 'Загрузить фотографию';
                        messageElm.remove();
                    }, 5000)
                    form.clear();
                });
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

function _defineFormAndSetValidAndUrl(form, validObj, path) {
    if(form.closest('.popup-design') || form.classList.contains('consul_form')) { 
        validObj.name = [Validators.required];
        validObj.phone = [Validators.required];
        validObj.email = [Validators.required];
        validObj.message = [Validators.required, Validators.minLength(15)];

        return path.design;
    } else if(form.classList.contains('calc_form')) {
        validObj.size = [];
        validObj.material = [];
        validObj.options = [];
        validObj.promocode = [];

        return path.design;
    } else {
        validObj.name = [Validators.required];
        validObj.phone = [Validators.required];

       return path.question;
    }
}

function _createStatusModal(form, message) {
    const messageElm = document.createElement("div");
    messageElm.classList.add('status');
    form.parentNode.appendChild(messageElm);
    
    form.classList.add('animated', 'fadeOutUp');
    setTimeout(() => {
        form.style.display = 'none';
    }, 400)

    let statusImg = document.createElement('img');
    statusImg.setAttribute('src', message.spinner);
    statusImg.classList.add('animated', 'fadeInUp');
    messageElm.appendChild(statusImg);
    
    let textMessage = document.createElement('div');
    textMessage.textContent = message.wait;
    messageElm.appendChild(textMessage);

    return {
        messageElm,
        statusImg,
        textMessage
    }
}

function _formsAddSubmitHandler(forms, handler) { 
    forms.forEach(form => {
        form.addEventListener('submit', handler);
    })
}

function _inputTypeFile(input, infoPhoto) {
    const button = input.closest('.file_upload').querySelector('button');
    /*const buttonImg = document.createElement('img');
    buttonImg.classList.add('upload_img')*/

    input.addEventListener('change', (e) => {
        console.log('change')
        const target = e.target;
        const reader = new FileReader();
        let file = target.files[0]
    
        infoPhoto.fileName = file.name;
        infoPhoto.size = file.size;
    
        reader.readAsBinaryString(file);
        reader.addEventListener('load', (e) => {
            if(infoPhoto.size <= 1e7) {
                button.textContent = _checkAndCutName(infoPhoto.fileName);
                infoPhoto.base64 = btoa(event.target.result); //конвертация картинки в строку
                //button.append(buttonImg);
                //buttonImg.src = `data:image/jpeg;base64,${infoPhoto.base64}`
            } else {
                button.textContent = 'Размер файта не должен превышать 10мб';
            }
        });
    });
}

function _createDataToSend(infoPhoto, form, item) {
    let data = {
        ...form.value()
    }
    
    if(infoPhoto.base64) data.img = infoPhoto.base64;

    if(item.classList.contains('calc_form')) data.totalPrice = item.querySelector('.calc-price').textContent;

    return data;
}

function _checkAndCutName(name) {
    return name.length < 10 ? name : name.slice(0, 10) + '...';
}