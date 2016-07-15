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

  //admin-tags
  angular
    .module('app.tags', [
        'app.tags.controllers',
        'app.tags.services'
        ]);

  angular
    .module('app.tags.controllers', ['ui.bootstrap']);
  angular
    .module('app.tags.services', []);
  //End admin-tags
 
  //admin-users
  angular
    .module('app.adminUsers', [
        'app.adminUsers.controllers',
        'app.adminUsers.services'
        ]);

  angular
    .module('app.adminUsers.controllers', ['ui.bootstrap',  'app.profileSingle.services']);
  angular
    .module('app.adminUsers.services', []);
  //End admin-users

  //admin-applicants
  angular
    .module('app.adminApplicants', [
        'app.adminApplicants.controllers',
        'app.adminApplicants.services'
        ]);

  angular
    .module('app.adminApplicants.controllers', ['ui.bootstrap',  'app.adminApplicants.services']);
  angular
    .module('app.adminApplicants.services', []);
  //End admin-applicants

  angular
    .module('app.application', [
        'app.application.controllers'
    ]);


  angular
    .module('app.application.controllers', []);

    //Votes
    angular
        .module('app.votes', [
                'app.votes.controllers'
        ]);

    angular
        .module('app.votes.controllers', []);
    //End Votes

})();
