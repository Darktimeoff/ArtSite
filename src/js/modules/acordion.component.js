const acordion = (section, acordionHeader) => {
    const $section = document.querySelector(section);

    function _sectionClickHandler(e) {
        const target = e.target.closest(acordionHeader);
        if(target) {
            const acrBlock = target.nextElementSibling;
            target.classList.toggle('active-style');
            acrBlock.classList.toggle('active-content');

            if(target.classList.contains('active-style'))  {
                acrBlock.style.maxHeight = acrBlock.scrollHeight + 80 + 'px';
            } else {
                acrBlock.style.maxHeight = '0px';
            }
        }
    }

    $section.addEventListener('click', _sectionClickHandler)
}

export default acordion