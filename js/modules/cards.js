function cards() {
    
    const cardsContainer = document.querySelector('.menu__field .container');

    axios.get('http://localhost:3000/menu')
    .then(data => {
                data.data.forEach(({
                    img,
                    altimg,
                    title,
                    descr,
                    price
                }) => {
                    new Card(img, altimg, title, descr, price, cardsContainer).render();
                });
            });

    class Card {
        constructor(imgSrc, altText, subtitle, descr, price, parentEl, ...classes) {
            this.imgSrc = imgSrc;
            this.altText = altText;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.showed = false;
            this.parentEl = parentEl;
            this.classes = classes;
        }

        render() {

            if (!this.showed) {

                const el = document.createElement('div');

                if (this.classes.length == 0) {
                    el.classList.add('menu__item');
                } else {
                    this.classes.forEach(cl => el.classList.add(cl));
                }

                el.setAttribute('data-card-id', this.altText);
                el.innerHTML = `<img src=${this.imgSrc} alt=${this.altText}>
                                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                                <div class="menu__item-descr">${this.descr}</div>
                                <div class="menu__item-divider"></div>
                                <div class="menu__item-price">
                                    <div class="menu__item-cost">Цена:</div>
                                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                </div>`;

                this.parentEl.append(el);

                this.showed = true;
            }

        }

        removeCard() {
            if (this.showed) {
                const el = document.querySelector(`[data-card-id = ${this.altText}]`);
                el.remove();
                this.showed = false;
            }
        }
    }


    // card2.removeCard();

}

export default cards;