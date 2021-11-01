function slider({container}) {
    
    function addZero(num) {
        return (num >= 0 && num < 10) ? `0${num}` : num;
    }

    const slider = document.querySelector(container),
        btnLeft = slider.querySelector('.offer__slider-prev'),
        btnRight = slider.querySelector(' .offer__slider-next'),
        current = slider.querySelector('#current'),
        total = slider.querySelector('#total'),
        allSlides = slider.querySelectorAll('.offer__slide');


    const slidersWrapper = slider.querySelector('.offer__slider-wrapper'),
        slidersField = slider.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidersWrapper).width,
        widthWindowInt = +width.replace(/\D/g, '');

    slidersField.style.width = 100 * allSlides.length + `%`;
    slidersField.style.display = 'flex';
    slidersField.style.transition = '0.5s all';

    slidersWrapper.style.overflow = 'hidden';

    allSlides.forEach(slide => {
        slide.style.width = width;
    });

    let slideIndex = 1;

    total.textContent = addZero(allSlides.length);
    current.textContent = addZero(slideIndex);

    btnRight.addEventListener('click', () => {
        slideIndex++;
        showSlideByIndex();
    });

    btnLeft.addEventListener('click', () => {
        slideIndex--;
        showSlideByIndex();
    });


    slider.style.position = 'relative';
    const dotsEl = document.createElement('ol'),
        dots = [];
    dotsEl.classList.add('carousel-indicators');
    slider.append(dotsEl);

    for (let i = 1; i <= allSlides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-number', i);
        dotsEl.append(dot);
        dots.push(dot);
    }

    dots[0].style.opacity = '1';

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            slideIndex = +event.target.getAttribute('data-number');
            showSlideByIndex();
        });
    });

    function showSlideByIndex() {
        slideIndex = slideIndex == 0 ? allSlides.length : slideIndex;
        slideIndex = slideIndex > allSlides.length ? 1 : slideIndex;

        current.textContent = addZero(slideIndex);
        let offset = widthWindowInt * (slideIndex - 1);
        slidersField.style.transform = `translateX(-${offset}px)`;

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

}

export default slider;