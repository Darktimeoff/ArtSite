const burger = (button, menu, resolution, showClass) => {
    const $button = document.querySelector(button);
    const $menu = document.querySelector(menu);
    function _buttonClickHandler() {
        if(document.documentElement.offsetWidth < resolution) {
            $menu.classList.add('animated');
            $menu.classList.toggle('fadeInDown')
            $menu.classList.toggle(showClass);
        }
    }

    $button.addEventListener('click', _buttonClickHandler);
}

export default burger