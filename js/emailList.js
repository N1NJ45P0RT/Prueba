document.addEventListener("DOMContentLoaded", function() {
    const emailItems = document.querySelectorAll(".email-list li");
    let maxWidth = 0;

    emailItems.forEach(item => {
        const itemWidth = item.offsetWidth;
        if (itemWidth > maxWidth) {
            maxWidth = itemWidth;
        }
    });

    emailItems.forEach(item => {
        item.style.width = `${maxWidth}px`;
    });
});