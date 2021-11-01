function tabs(tabsSelector, menuSelector, menuItemsSelector, activeSelector) {

    const tabs = document.querySelectorAll(tabsSelector),
        menu = document.querySelector(menuSelector),
        menuItems = menu.querySelectorAll(menuItemsSelector);

    function hideMenuItems() {

        tabs.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');

        });

        menuItems.forEach(item => {
            item.classList.remove(activeSelector);
        });
    }

    function showChosenItem(i = 0) {
        tabs[i].classList.remove('hide');
        tabs[i].classList.add('show', 'fade');

        menuItems[i].classList.add(activeSelector);
    }

    menu.addEventListener('click', (event) => {

        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {

            menuItems.forEach((item, i) => {

                if (target == item) {
                    hideMenuItems();
                    showChosenItem(i);
                    target.classList.add(activeSelector);
                }
            });
        }
    });

    hideMenuItems();
    showChosenItem();
}

export default tabs;