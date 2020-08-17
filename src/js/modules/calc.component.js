import RequestService from "./../services/request.services";
const calc = (form, result) => {
    const $form = document.querySelector(form);
    const $result = $form.querySelector(result);
    const calcOptionsValue = {};
    let sum = 0;

    function _formChangeHandler(e) {
        const value = e.target.value;
        _defineSelectAndCalc(e.target.getAttribute('name'), value);
        _checkCondition();
    }

    function _defineSelectAndCalc(name, value) {
        switch(name) {
            case 'size':  calcOptionsValue.size = value; break;
            case 'material':  calcOptionsValue.material = value; break;
            case 'options':  calcOptionsValue.options = value;  break;
            case 'promocode' :  calcOptionsValue.promocode = value;  break;
        }
    }

    function _calcFormula({size, material, options, promocode}) {
        const withOutPromo = options ? size * material + options : size * material;
        sum = promocode ? withOutPromo - (((withOutPromo ) * promocode) / 100) : withOutPromo;
    }

   async function _checkCondition() {
        if(calcOptionsValue.size && calcOptionsValue.material) {
            _calcFormula(await _getPrice());
            $result.textContent = sum;
        } else {
            $result.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
        }
    }

    async function _getPrice() {
        const temp = {};
        const response = await RequestService.getRequest('assets/db.json')

        Object.keys(calcOptionsValue).forEach(key => {
                temp[key] = parseFloat(response.calc[key][calcOptionsValue[key]]);
        });

        return temp;
    }
    
    $form.addEventListener('change', _formChangeHandler);
    $form.addEventListener('submit', () => $result.textContent = 'Для расчета нужно выбрать размер картины и материал картины');
}



export default calc;