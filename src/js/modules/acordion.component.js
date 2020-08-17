const acordion = (section, acordionHeader) => {
    const $section = document.querySelector(section);

    function _sectionClickHandler(e) {
        const target = e.target.closest(acordionHeader);
        if(target) {
            const acrBlock = target.nextElementSibling;
            if(!acrBlock.classList.contains('show'))  {
                acrBlock.classList.remove('fadeInUp');
                acrBlock.classList.add('animated', 'fadeInDown', 'show');
                target.classList.add('active-style');
            }
            else {
                acrBlock.classList.add('fadeInUp')
                setTimeout(() => {
                    acrBlock.classList.remove('fadeInDown','show');
                    target.classList.remove('active-style');
                }, 1000);
            }
        }
    }

    $section.addEventListener('click', _sectionClickHandler)
}

export default acordion