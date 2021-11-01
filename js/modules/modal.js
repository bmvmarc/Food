function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // open
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    function openModalEndOfPage() {
        if (document.documentElement.scrollHeight <= window.pageYOffset + document.documentElement.clientHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', openModalEndOfPage);
        }
    }

    window.addEventListener('scroll', openModalEndOfPage);

    // close

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' & modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

}

export default modal;
export {
    closeModal
};
export {
    openModal
};