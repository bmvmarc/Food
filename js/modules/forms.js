import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalSelector, modalTimerId) {
    // POST 

    const forms = document.querySelectorAll(formSelector);

    const messages = {

        ok: 'Спасибо за ваши данные. Мы найдем для них proper использование!',
        thatIsNotOk: 'Что-то поистине ужасное случилось с вашими данными. Ну, сорян.',
        loading: 'img/form/spinner.svg'

    };

    forms.forEach((i) => addPostHandler(i));



    function addPostHandler(form) {

        form.addEventListener('submit', (e) => {

            e.preventDefault();
            const spinnerEl = document.createElement('img');
            spinnerEl.src = messages.loading;
            spinnerEl.style.cssText = 'display: block; margin: 0 auto';
            form.insertAdjacentElement('afterend', spinnerEl);

            const formData = new FormData(form),
                formDataObj = {};

            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });

            const dataJSON = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', dataJSON)
                .then(data => {
                    showSendingResult(messages.ok);
                    console.log(data);
                    form.reset();
                })
                .catch(() => {
                    showSendingResult(messages.thatIsNotOk);
                })
                .finally(() => {
                    spinnerEl.remove();
                });
        });
    }

    function showSendingResult(text) {

        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide');

        openModal(modalSelector, modalTimerId);
        const sendingResultEl = document.createElement('div');
        sendingResultEl.classList.add('modal__dialog');
        sendingResultEl.innerHTML = `<div class="modal__content">
                                        <div data-close class="modal__close">&times;</div>
                                        <div class="modal__title">${text}</div>
                                     </div>`;
        document.querySelector('.modal').append(sendingResultEl);

        setTimeout(() => {
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            sendingResultEl.remove();
            closeModal(modalSelector);

        }, 4000);
    }

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(data => console.log(data));
}

export default forms;