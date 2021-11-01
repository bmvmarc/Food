function calc() {
    
    const kcalEl = document.querySelector('.calculating__result span'),
        sexEl = document.querySelectorAll('#gender div'),
        heightEl = document.querySelector('#height'),
        weightEl = document.querySelector('#weight'),
        ageEl = document.querySelector('#age'),
        inputsEl = document.querySelectorAll('.calculating__choose_medium input'),
        ratioEl = document.querySelectorAll('.calculating__choose_big div');

    let sex, ratio,
        weight, height, age, kcal;

    function initValues() {
        sex = localStorage.getItem('sex') || "female";
        ratio = +localStorage.getItem('ratio') || 1.55;

        localStorage.setItem('sex', sex);
        localStorage.setItem('ratio', ratio);

        sexEl.forEach(el => {
            el.classList.remove('calculating__choose-item_active');

            if (sex === el.getAttribute('id')) {
                el.classList.add('calculating__choose-item_active');
            }
        });

        ratioEl.forEach(el => {
            el.classList.remove('calculating__choose-item_active');

            if (ratio === +el.getAttribute('data-ratio')) {
                el.classList.add('calculating__choose-item_active');
            }
        });
    }

    initValues();

    function calc() {
        if (!weight || !height || !age) {
            kcalEl.textContent = '____';
            return;
        }
        if (sex === 'female') {
            kcal = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;
        } else {
            kcal = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
        }
        kcalEl.textContent = Math.round(kcal);
    }

    sexEl.forEach(el => {
        el.addEventListener('click', (e) => {

            e.preventDefault();       
            sexEl.forEach(s => {
                s.classList.remove('calculating__choose-item_active');
            });
            el.classList.add('calculating__choose-item_active');
            sex = el.getAttribute('id');
            localStorage.setItem('sex', sex);
            calc();

        });

    });

    inputsEl.forEach(inp => {
        inp.addEventListener('input', (e) => {

            if (e.target.value.match(/\D/g)) {
                e.target.style.border = '1px solid red';
            } else {

                e.target.style.border = 'none';
            }
            height = +heightEl.value;
            weight = +weightEl.value;
            age = +ageEl.value;
            calc();

        });

    });

    ratioEl.forEach(el => {
        el.addEventListener('click', (e) => {
            ratioEl.forEach(el => {
                el.classList.remove('calculating__choose-item_active');
            });
            e.target.classList.add('calculating__choose-item_active');
            ratio = +e.target.getAttribute('data-ratio');
            localStorage.setItem('ratio', ratio);
            calc();
        });

    });

    calc();
}

export default calc;