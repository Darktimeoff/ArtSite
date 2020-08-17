const calc = (form, result) => {
    const PROMOCODE = 'IWANTPOPART';
    const $form = document.querySelector(form);
    const $result = $form.querySelector(result);
    const calcData = {};
    let sum = 0;

    function _formChangeHandler(e) {
        const value = e.target.value;
        _defineSelectAndCalc(e.target.getAttribute('name'), value);
        _calcFormula(calcData);
        _checkCondition(calcData);
    }

    function _defineSelectAndCalc(name, value) {
        switch(name) {
            case 'size':  calcData.size = parseInt(value); break;
            case 'material':  calcData.material = parseFloat(value); break;
            case 'options':  calcData.options = parseInt(value);  break;
        }
        if(name === 'promocode' && value === PROMOCODE)  calcData.promocode = true;
    }

    function _calcFormula({size, material, options, promocode}) {
        const withOutPromo = options ? size * material + options : size * material;
        sum = promocode ? withOutPromo - (((withOutPromo ) * 30) / 100) : withOutPromo;
    }

    function _checkCondition(calcData) {
        if(calcData.size && calcData.material) {
            $result.textContent = sum;
        } else {
            $result.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
        }
    }


    $form.addEventListener('change', _formChangeHandler);
    $form.addEventListener('submit', () => $result.textContent = 'Для расчета нужно выбрать размер картины и материал картины');
}



export default calc;