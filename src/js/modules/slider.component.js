const sliders = (parent, slides, direction, showClass, prev, next, autoPlay = true, delay = 3000, arrowUse = false) => {
    let slideIndex = 1;
    let paused = false;
    const parentSec = document.querySelector(parent)
    const items = parentSec.querySelectorAll(slides);

    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = items.length;
        }

        hideSlides();

        currentSlideShow(showClass);
    }

    function hideSlides() {
        items.forEach(item => {
            item.classList.add('animated')
            item.style.display = 'none';
            item.classList.remove(showClass);
        });
    }

    function currentSlideShow(classAdd) {
        items[slideIndex - 1].classList.add(classAdd);
    }

    function currentSlideHide(classHide) {
        items[slideIndex - 1].classList.remove(classHide);
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    showSlides(slideIndex);


    function initAutoShow() {
        if (direction === 'vertical') {
            paused = autoShow(initVerSlide, delay);
        } else {
            paused = autoShow(initHorSlide, delay);
        }
    }


    function initVerSlide() {
        plusSlides(1);
        currentSlideShow('slideInDown');
    }

    function initHorSlide() {
        plusSlides(1)
        currentSlideShow('slideInLeft');
        currentSlideHide('slideInRight');
    }

    function autoShow(func, delay) {
        return setInterval(func, delay);
    }
        
    function useArrow() {
        try{
            const prevBtn = parentSec.querySelector(prev);
            const nextBtn = parentSec.querySelector(next);
    
            prevBtn.onclick = () => {
                plusSlides(-1);
                currentSlideHide('slideInLeft');
                currentSlideShow('slideInRight');
            }
        
            nextBtn.onclick = () => {
                plusSlides(1);
                currentSlideShow('slideInLeft');
                currentSlideHide('slideInRight');
            }
        } catch(e) {}
    }

    if(autoPlay) {
        initAutoShow();
        
        parentSec.addEventListener('mouseenter', () => {
            clearInterval(paused);
        });
            
        parentSec.addEventListener('mouseleave', () => {
            initAutoShow()
        });
    }

    if(arrowUse) useArrow();
    }

    export default sliders