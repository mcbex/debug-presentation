define([], function() {

    return {

        setUp: function() {
            var $div = $('<div id="examples">').appendTo('body');

            $div.append('<button id="ajax">Click to make 10 buttons</button>');

            $('#ajax').on('click', function() {
                for (var i = 0, l = 10; i < l; i++) {
                    $.ajax({
                        url: 'http://httpbin.org/get',
                        method: 'GET',
                        success: function() {
                                var $button = $('<button class="funky-button">');
                                $button.text(i);
                                $div.append($button);
                                $('.funky-button').on('click', function() {
                                    console.log($(this).text());
                                });
                        }
                    })
                }
            });
        }

    };

});