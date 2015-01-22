define(['backbone', 'async'], function(Backbone, async) {

    var ThumbnailView = Backbone.View.extend({

        tagName: 'div',

        id: 'thumbnails',

        images: ['daisies', 'abstract'],

        events: {
            'click img': 'selectImage'
        },

        initialize: function(options) {
            this.width = options.attributes.width || 50;
            this.render();
        },

        render: function() {

            // bug - images will have 0 height when the canvas is drawn
//            _.forEach(this.images, function(i) {
//                view.$el.append('<img src="' + i + '"/>');
//            });
            // draw chrome here
            this.$el.html('<div class="image-container">');
            this.loadImages();
        },

        // put this in the model
        loadImages: function() {
            var view = this, $img;

            async.each(this.images, function(i, cb) {
                $img = $('<img class="' + i + '" src="thumbs/' + i + '.jpg"/>')
                    .load(function() {
                        view.$el.append($(this).width(view.width));
                        cb();
                    });
            }, function(err) {
                // no errors yet
                console.log(new Date().getTime());
                err ? view.trigger('renderError', err) : view.trigger('rendered');
            });
        },

        selectImage: function(e) {
            var imageName = e.currentTarget.className,
                image = this.$el.find('.image-container').find('img.' + imageName);
                view = this;

            if (image.length) {
                view.selectedImage = image;
                view.trigger('imageSelected');
            } else {
                this.selectedImage = $('<img class="' + imageName + '" src="images/' + imageName + '.jpg"/>')
                    .load(function() {
                        $(this).appendTo(view.$el.find('.image-container'));
                        view.trigger('imageSelected');
                    });
            }
        },

        getSelectedImage: function() {
            return this.selectedImage;
        }

    });

    _.extend(ThumbnailView, Backbone.Events);

    return ThumbnailView;

});
