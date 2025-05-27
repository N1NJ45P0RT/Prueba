document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.buttons button');
    const lists = document.querySelectorAll('.download-list');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const targetList = document.getElementById(button.dataset.target);
            lists.forEach(list => {
                if (list === targetList) {
                    list.classList.toggle('hidden');
                    button.setAttribute('aria-expanded', !list.classList.contains('hidden'));
                } else {
                    list.classList.add('hidden');
                    document.querySelector(`button[data-target="${list.id}"]`).setAttribute('aria-expanded', false);
                }
            });
        });
    });
});
