(function ($) {
    $('[data-toggle="tooltip"]').tooltip({
        trigger: "hover"
    });
    //animation
    wow = new WOW({
        boxClass: 'wow', // default
        animateClass: 'animated', // change this if you are not using animate.css
        offset: 0, // default
        mobile: false, // keep it on mobile
        live: true // track if element updates
    })
    wow.init();
})(jQuery);

(function (document, window, index) {
    var inputs = document.querySelectorAll('.inputfile');
    Array.prototype.forEach.call(inputs, function (input) {
        var label = input.nextElementSibling,
            labelVal = label.innerHTML;

        input.addEventListener('change', function (e) {
            var fileName = '';
            if (this.files && this.files.length > 1)
                fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files
                    .length);
            else
                fileName = e.target.value.split('\\').pop();

            if (fileName) {
                label.querySelector('span').innerHTML = fileName;
            } else {
                label.innerHTML = labelVal;
            }
        });

        // Firefox bug fix
        input.addEventListener('focus', function () {
            input.classList.add('has-focus');
        });
        input.addEventListener('blur', function () {
            input.classList.remove('has-focus');
        });
    });
}(document, window, 0));