define(['backbone', 'async'], function(Backbone, async) {

    var ThumbnailView = Backbone.View.extend({

        tagName: 'div',

        id: 'thumbnails',

        images: ['/thumbs/daisies.jpg'],

        initialize: function(options) {
            this.render();
        },

        render: function() {
            var view = this;
            // add custom rendered event to be triggered

            // bug - images will have 0 height when the canvas is drawn
//            _.forEach(this.images, function(i) {
//                view.$el.append('<img src="' + i + '"/>');
//            });
            // draw chrome here
            this.loadImages();
        },

        // put this in the model
        // fetch little images then on click get bigger one and render
        loadImages: function() {
            var view = this, img;

            async.each(this.images, function(i, cb) {
                img = $('<img src="' + i + '"/>');
                img.load(function() {
                    view.$el.append(this);
                    cb();
                });
            }, function(err) {
                // no errors yet
                console.log(new Date().getTime());
                err ? view.trigger('renderError', err) : view.trigger('rendered');
            });
        }

    });

    _.extend(ThumbnailView, Backbone.Events);

    return ThumbnailView;

});
