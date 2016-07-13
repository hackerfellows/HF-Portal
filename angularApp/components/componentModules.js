// Each component's modules should be declared in this

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

  //ProfileGrid
  angular
    .module('app.profileGrid', [
        'app.profileGrid.controllers',
        'app.profileGrid.services',
        'app.profileGrid.directives'
        ]);

  angular
    .module('app.profileGrid.controllers', []);

  angular
    .module('app.profileGrid.services', []);

  angular
    .module('app.profileGrid.directives', []);
  //End ProfileGrid

  //Profile
  angular
    .module('app.profile', [
        'app.profile.controllers',
        'app.profile.services',
        'app.profile.directives'
        ]);

  angular
    .module('app.profile.controllers', []);

  angular
    .module('app.profile.services', []);

  angular
    .module('app.profile.directives', []);
  //End Profile

  //Calendar
  angular
    .module('app.calendar', [
        'app.calendar.controllers'
        ]);

  angular
    .module('app.calendar.controllers', []);
  //End Calendar

  //admin
  angular
    .module('app.admin', [
        'app.admin.controllers',
        'app.admin.services'
        ]);

  angular
    .module('app.admin.controllers', []);
  angular
    .module('app.admin.services', []);
  //End admin


})();
