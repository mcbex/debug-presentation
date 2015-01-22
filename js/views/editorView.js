define(['backbone'], function(Backbone) {

    var EditorView = Backbone.View.extend({

        events: {
            'click td': 'changeColor'
        },

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
        },

        render: function() {
            console.log(new Date().getTime());
            var width = this.model.get('context').canvas.width,
                height = this.model.get('context').canvas.height,
                data = this.model.get('context').getImageData(0, 0, width, height),
                $table = $('<table>'), html = '<tr>', view = this;

            this.$el.html('<div class="editor">');

            for (var i = 0, l = data.data.length; i < l; i += 4) {
                if (i != 0 && !(i % (width * 4))) {
                    html += '</tr><tr>';
                    html += '<td style="background-color: rgb(' +
                        [data.data[i], data.data[i + 1], data.data[i + 2]].join(',').toString() +
                        ')" class="' + [data.data[i], data.data[i + 1], data.data[i + 2]].join('_').toString() +
                        '"></td>';
                } else {
                    html += '<td style="background-color: rgb(' +
                        [data.data[i], data.data[i + 1], data.data[i + 2]].join(',').toString() +
                        ')" class="' + [data.data[i], data.data[i + 1], data.data[i + 2]].join('_').toString() +
                        '"></td>';
                }
            }

            html += '</tr>';

            $table.html(html);

            $table.find('td').css({
                width: view.pixelSize,
                height: view.pixelSize
            });

            view.$el.find('.editor').append($table);

            console.log(new Date().getTime());
        },

        clearTable: function() {
            this.$el.find('.editor').empty();
        },

        rgbToString: function(colorArray) {
            return _.reduce(colorArray, function(memo, c) {
                memo.push(('000' + c).slice(-3));
                return memo;
            }, []).join('_').toString();
        },

        changeColor: function(e) {
            var cls = $(e.currentTarget).attr('class');

            $('.' + cls).css({
                'background-color': 'rgb(255,0,0)'
            }).removeClass(cls).addClass('255_0_0');
        }

    });

    return EditorView;

});