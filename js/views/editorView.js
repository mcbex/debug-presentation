define(['backbone'], function(Backbone) {

    var EditorView = Backbone.View.extend({

        pixelSize: 4,

        initialize: function() {
            var self = this;

            this.listenTo(this.model, 'change:context', function(m) {
                if (m.get('context')) {
                    view.render();
                } else {
                    view.clearTable();
                }
            });
//            this.render();
        },

        render: function() {
            this.$el.html('<div class="editor">');
        },

        render: function() {
            console.log(new Date().getTime());
            var width = this.model.get('context').canvas.width,
                height = this.model.get('context').canvas.height,
                data = this.model.get('context').getImageData(0, 0, width, height),
                $table = $('<table id="horrible-table">'), $row, $cell;

            this.$el.find('.editor').append($table);

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
                $cell.width(this.pixelSize);
                $cell.height(this.pixelSize);
            }

            $('td').on('click', function(e) {
                var color = $(e.currentTarget).css('background-color');

                _.forEach($('td'), function(t) {
                    if ($(t).css('background-color') == color) {
                        $(t).css({ 'background-color': 'rgba(250,0,0,1)' });
                    }
                });
            });

            console.log(new Date().getTime());
        },

        clearTable: function() {
            // makes memory leak
            // this.$el.find('#horrible-table').detach();
            this.$el.find('.editor').empty();
        }

    });

    return EditorView;

});