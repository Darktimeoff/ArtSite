const tabs = (section, tabsParent, contentParent) => {
    const $section = document.querySelector(section);
    const $tabsParent = $section.querySelector(tabsParent);
    const $contentParent = $section.querySelector(contentParent);
    const $contentItems = $contentParent.querySelectorAll('.portfolio-block');
    let prevValue;

    function _tabClickHandler(e) {
        const target = e.target;
        if(target && target.tagName === 'LI') {
            const filterClass = target.classList[0];
            if(prevValue ===  filterClass) return;

            _hideActiveElm($tabsParent, '.active');
            _showActiveElm(target, '.active');
            _showAllContent();
            _showFilterContent('.' +  filterClass);
            prevValue = filterClass;
        }
    }

    function _hideActiveElm(section, activeSel) {
        section.querySelector(activeSel).classList.remove(activeSel.slice(1));
    }

    function _showActiveElm(target, activeSel) {
        target.classList.add(activeSel.slice(1))
    }

    function _showFilterContent(showSel) {
        if(_exceptionFilter(showSel)) return undefined;

        $contentItems.forEach(item => {
            if(!item.classList.contains(showSel.slice(1))) {
                item.style.display = 'none';
            }
        });
    }

    function _exceptionFilter(showSel) {
        switch(showSel.slice(1)) {
            case 'grandmother': {
                $section.querySelector('.portfolio-no').classList.add('show');
                $contentParent.style.display = 'none';
                return true;
            } break;
            case 'granddad': {
                $section.querySelector('.portfolio-no').classList.add('show');
                $contentParent.style.display = 'none';
                return true;
            } break;
            default: {
                $section.querySelector('.portfolio-no').classList.remove('show');
                $contentParent.style.display = '';
                return false;
            }
        }
    }

    function _showAllContent() {
        $contentItems.forEach(item => {
            item.style.display = '';
            item.classList.add('animated', 'fadeInDown');
        });
    }
    
    $tabsParent.addEventListener('click', _tabClickHandler)
}

export default tabs