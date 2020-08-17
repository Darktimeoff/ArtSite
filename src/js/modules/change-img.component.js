const changeImg = (section, wrapper, parentImg) => {
    const $section = document.querySelector(section);
    const $wrapper = $section.querySelector(wrapper);
    const $imgs = $wrapper.querySelectorAll(parentImg);
    let $img;
    let changed;

    function _imgMouseEnterHandler(e) {
        const target = e.target.closest(parentImg).firstElementChild;
        let src = target.getAttribute('src');
        if(target.tagName === 'IMG') {
           const dot = src.indexOf('.')
           const newSrc = src.slice(0, dot) + '-1.png';
           target.setAttribute('src', newSrc);

            $img = target
            changed = true;
        } 
    }

    function _imgMouseLeaveHandler(e) {
        if (changed) {
            const prevSrc = $img.getAttribute('src').slice(0, $img.getAttribute('src').lastIndexOf('-1')) + '.png';
            $img.setAttribute('src', prevSrc);
            changed = false;
        }
    }
    
    $imgs.forEach(img => {
        console.log(img);
        img.addEventListener('mouseover', _imgMouseEnterHandler);
        img.addEventListener('mouseout', _imgMouseLeaveHandler); 
    })
}

export default changeImg;