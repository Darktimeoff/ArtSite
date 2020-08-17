const scrolling = (button) => {
    const $scrollToBtn = document.querySelector(button);

    window.addEventListener('scroll',() => {
        if(document.documentElement.scrollTop > 1650) {
            $scrollToBtn.classList.add('animated', 'fadeIn');
            $scrollToBtn.classList.remove('fadeOut')
        } else {
            $scrollToBtn.classList.add('fadeOut')
            $scrollToBtn.classList.remove('fadeIn')
        }
    });


    let links = document.querySelectorAll('[href^="#"]');
    let speed = 0.18;

    links.forEach(link => {
        link.addEventListener('click',  function(e) {
            e.preventDefault();

            let widthTop = document.documentElement.scrollTop;
            let hash = this.hash;
            let toBlock = document.querySelector(hash).getBoundingClientRect().top;
            let start = null;

            function step(time) {
                if(start === null) {
                    start = time;
                }

                let progress = time - start;
                let r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) :  Math.min(widthTop + progress / speed, widthTop + toBlock));

                document.documentElement.scrollTo(0, r);

                if(r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }

            requestAnimationFrame(step);
        });
    });
}

export default scrolling