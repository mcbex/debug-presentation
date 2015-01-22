define(['backbone',
        'views/thumbnailView',
        'views/editorView',
        'models/editorModel'
    ], function(Backbone, ThumbnailView, EditorView, EditorModel) {

    var AppView = Backbone.View.extend({

        tagName: 'div',

        id: 'app',

        imageSize: 200,

        initialize: function() {
            this.$el.appendTo('body');
            this.render();
        },

        render: function() {
            var view = this, thumbnailView, editorView, $image, context;

            thumbnailView = new ThumbnailView({
                attributes: {
                    width: 200
                }
            });

            editorView = new EditorView({
                model: new EditorModel
            });

            thumbnailView.$el.appendTo(view.$el);
            editorView.$el.appendTo(view.$el);

            thumbnailView.on('imageSelected', function() {
                console.log(new Date().getTime());
                $image = this.getSelectedImage();
                $image.width(view.imageSize);

                context = $('#canvas').get(0).getContext('2d');
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                context.canvas.width = $image.width();
                context.canvas.height = $image.height();
                context.drawImage($image.get(0), 0, 0, $image.width(), $image.height());

                editorView.model.clear();
                editorView.model.set('context', context);
            });
        }

    });

    return AppView;
});

