/*  File name:      helpers.js
    Author:         Jessica Wu, Michael "The cool kid" Baldwin
    Description:    Helper functions for the html pages
    Function:       */


(function () {
    'use strict';

    angular
    .module('app.helpers.services')
    .service('HFHelpers', HFHelpers);

    HFHelpers.$inject = [];

    function HFHelpers() {
        return {
            slugify: slugify,
            paragraphize: paragraphize
        };

        function slugify(str) {
            return String(str).toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');            // Trim - from end of text
        }

        function paragraphize(str) {
            if( typeof str !== 'string' ) return '';
            var parts = str.split( "\n" );
            return ( parts.length > 0 ? '<p>' + parts.join('</p><p>') + '</p>' : '' );
        }
   }
})();
