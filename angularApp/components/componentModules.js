/*  File name:      componentModules.js
    Author:         Jessica Wu, Michael Baldwin
    Description:    Every component needs to declare its modules here
*/

(function () {
  'use strict';

  //Home
  angular
    .module('app.home', [
        'app.home.controllers'
        ]);

  angular
    .module('app.home.controllers', []);
  //End Home

  // Static Pages
  angular
    .module('app.static_about', [
        'app.static_about.controllers'
    ]);
  angular
    .module('app.static_about.controllers', []);

  angular
    .module('app.static_application', [
        'app.static_application.controllers'
    ]);
  angular
    .module('app.static_application.controllers', []);

  angular
    .module('app.static_contact', [
        'app.static_contact.controllers'
    ]);
  angular
    .module('app.static_contact.controllers', []);

  angular
    .module('app.static_groups', [
        'app.static_groups.controllers'
    ]);
  angular
    .module('app.static_groups.controllers', []);

  //End Static Pages

  //Dash
  angular
    .module('app.dash', [
        'app.dash.controllers'
        ]);

  angular
    .module('app.dash.controllers', []);
  //End Dash

  //ProfileGrid
  angular
    .module('app.profileGrid', [
        'app.profileGrid.controllers',
        'app.profileGrid.directives'
        ]);

  angular
    .module('app.profileGrid.controllers', []);

  angular
    .module('app.profileGrid.directives', []);
  //End ProfileGrid

  //Profile
  angular
    .module('app.profileSingle', [
        'app.profileSingle.controllers',
        'app.profileSingle.services',
        'app.profileSingle.directives'
        ]);

  angular
    .module('app.profileSingle.controllers', []);

  angular
    .module('app.profileSingle.services', []);

  angular
   .module('app.profileSingle.directives', []);
  //End Profile

  //Calendar
  angular
    .module('app.calendar', [
        'app.calendar.controllers'
        ]);

  angular
    .module('app.calendar.controllers', []);
  //End Calendar

  angular
    .module('app.application', [
        'app.application.controllers'
    ]);

  angular
    .module('app.application.controllers', []);

})();
