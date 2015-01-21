define(['backbone',
        'views/thumbnailView'
    ], function(Backbone, ThumbnailView) {
    var App = window.App = {

        init: function(options) {
            var AppRouter = Backbone.Router.extend({
                routes: {
                    '/': 'loadHome'
                }
            });

            this.router = new AppRouter;
            Backbone.history.start();
            this.loadHome();
        },

        loadHome: function() {
            var self = this, $image;

            self.thumbnailView = new ThumbnailView;
            self.thumbnailView.$el.appendTo('body');

            self.thumbnailView.on('rendered', function() {
                // async debugger?
                console.log(new Date().getTime());
                $image = $('img');
                $image.width(50);

                self.context = $('#canvas').get(0).getContext('2d');
                self.context.drawImage($image.get(0), 0, 0, $image.width(), $image.height());
                self.drawHorribleTable();
            });
        },

        // on thumbnail click fetch big image and render to canvas?
        drawHorribleTable: function() {
                console.log(new Date().getTime());
            var width = 100, height = 50,
                data = this.context.getImageData(0, 0, width, height),
                $table = $('<table id="horrible-table">'), $row, $cell;

            $('body').append($table);

            for (var i = 0, l = data.data.length; i < l; i += 4) {
                if (!(i % (width * 4))) {
                    $row = $('<tr>');
                    $table.append($row);
                }
                $cell = $('<td>');
                $row.append($cell);
                $cell.css({
                    'background-color': 'rgba(' + data.data[i] + ',' + data.data[i + 1] + ',' + data.data[i + 2] + ',' + data.data[i + 3] + ')'
                });
                $cell.width(5);
                $cell.height(5);

            }

            $('td').on('click', function(e) {
                var color = $(e.currentTarget).css('background-color');

                // checking width would trigger reflow
                _.forEach($('td'), function(t) {
                    if ($(t).css('background-color') == color) {
                        $(t).css({ 'background-color': 'rgba(250,0,0,1)' });
                    }
                });
            });
                console.log(new Date().getTime());
        }

    }

    return App;
});

