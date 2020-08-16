import RequestService from "./../services/request.services";

export const showMoreInfFromServer = (sectionSel, cardParentSel, trigger) => {
    const section = document.querySelector(sectionSel);
    const button = section.querySelector(trigger);
    const cardParent = section.querySelector(cardParentSel)

    button.addEventListener('click', () => {
        RequestService.getRequest('assets/db.json')
            .then((response) => {
                _createCards(response.styles, cardParent);
            })
            .finally(() => {
                button.remove()
            });
    }, {once: true});
}

function _createCard({src, title, link}) {
    return `
    <div class="col-sm-3 col-sm-offset-0 col-xs-10 col-xs-offset-1 animated fadeInDown">
        <div class=styles-block>
            <img src='${src}' alt>
            <h4>${title}</h4>
            <a href="${link}">Подробнее</a>
        </div>
    </div>
    `
}

function _createCards(cards, cardParent) {
    cards.forEach( style => {
        cardParent.insertAdjacentHTML('beforeend', _createCard(style));
    });
}
