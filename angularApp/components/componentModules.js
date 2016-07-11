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
        'app.profileGrid.services',
        'app.profileGrid.controllers',
        'app.profileGrid.directives'
        ]);

  angular
    .module('app.profileGrid.services', []);
  angular
    .module('app.profileGrid.controllers', []);
  angular
    .module('app.profileGrid.directives', []);
  //End ProfileGrid

  //Profile
  // angular
  //   .module('app.profile', [
  //       'app.profile.controllers',
  //       'app.profile.services',
  //       'app.profile.directives'
  //       ]);

  // angular
  //   .module('app.profile.controllers', []);

  // angular
  //   .module('app.profile.services', []);

  // angular
//    .module('app.profile.directives', []);
  //End Profile

  //Entities
   // angular
   //  .module('app.entities', [
   //    'app.entities.services'
   //    ]);
   //  angular
   //  .module('app.entities.services', []);


})();
