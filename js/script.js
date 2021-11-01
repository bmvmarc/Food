'use strict';

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import calc from './modules/calc';
import tabs from './modules/tabs';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
    
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 3000);

    
    tabs('.tabcontent', '.tabheader__items', '.tabheader__item', 'tabheader__item_active');
    calc();
    cards();
    forms('form', '.modal', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2021-08-25T21:00:00');
    slider({
        container: '.offer__slider'
    });
});