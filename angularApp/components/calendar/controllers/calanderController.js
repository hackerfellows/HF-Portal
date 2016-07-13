// This jQuery comes from 'vertical-timeline' implementation by Sebastiano Guerriero from https://codyhouse.co/gem/vertical-timeline/
jQuery(document).ready(function($){

  var timelineBlocks = $('.cd-timeline-block'),
  offset = 0.8;

  //hide timeline blocks which are outside the viewport
  hideBlocks(timelineBlocks, offset);

  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function(){
    (!window.requestAnimationFrame)
      ? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
      : window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
  });

  function hideBlocks(blocks, offset) {
    blocks.each(function(){
      ( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
    });
  }

  function showBlocks(blocks, offset) {
    blocks.each(function(){
      ( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
    });
  }
});


// Setup CalendarController
(function () {

  'use strict';

  angular
    .module('app.calendar.controllers')
    .controller('CalendarController', CalendarController);

  CalendarController.$inject = ['$scope', '$http'];

  /**
   * @namespace CompaniesController
   */
  function CalendarController($scope, $http) {

    $scope.events = [];

    var url = 'https://spreadsheets.google.com/feeds/list/1rUiabmgoujPc1EWCSCvGiDhk80c9Y8ykcQ57D2Z7hfI/1/public/values?alt=json';
    $http({
      method: 'GET',
      url: url
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

    // Grab the event JSON from our google spreadsheet URL
    $scope.getSpreadsheetData = function() {
      $scope.webjson = $.getJSON(url, function(data){

        //grab spreadsheet data from google sheet
        $scope.spreadsheet = data;
        var entry_array = data.feed.entry;

        var idCounter = 0;
        $scope.showMoreInfo = [];
        $scope.hasOutsideLink = [];
        // Loop through the entries from the spreadsheet JSON
        for (var entry in entry_array) {

          // Grab elements from JSON
          var description = entry_array[entry].gsx$description.$t;
          var title       = entry_array[entry].gsx$title.$t;
          var date        = entry_array[entry].gsx$date.$t.split(",");
          var time        = entry_array[entry].gsx$time.$t;
          var icon        = entry_array[entry].gsx$icon.$t;
          var dot_color   = entry_array[entry].gsx$dotcolor.$t;
          var information = entry_array[entry].gsx$information.$t;
          var outsideLink = entry_array[entry].gsx$outsidelink.$t;
          var id          = idCounter++;

          // Uncomment to show JSON from google sheet
          //console.log(information)

          // Replace icon spaces with underscores
          var icon        = icon.replace(/ /g,"_");

          // Make datetime variable from concatnated date + time if time is listed
          var datetime = date[0];
          if (time != "") {
            datetime += " at " + time ;
          }

          // Get the current Date and the event date for comparison
          var curDate = new Date();
          var curDateString = (curDate.getMonth()+1) + " " + curDate.getDate() + " " + curDate.getFullYear();
          curDate = new Date(curDateString);
          var eventDate = new Date(date[0] + date[1]);

          $scope.showMoreInfo.push(information != "");
          $scope.hasOutsideLink.push(outsideLink != "");

          // Uncomment to show individual entries
          //console.log(entry_array[entry]);
          //console.log($scope.showMoreInfo[id]);

          // Only show events that are happening today or later
          if (curDate <= eventDate)
          {
            // Push elements to JS array for angular to use
            $scope.events.push({
              "title":title,
              "description":description,
              "datetime":datetime,
              "icon":icon,
              "dot_color":dot_color,
              "information":information,
              "id":id,
              "eventDate":eventDate,
              "outsideLink":outsideLink
            });


          }


          $scope.render = function(time) {
            return condition ? "This is rendered when condition == TRUE" : "This is rendered when condition == FALSE";
          };

        } /* end of for loop*/

        // Sorts the items by date
        $scope.events.sort(function (a, b) {
          if (a.eventDate > b.eventDate) {
            return 1;
          }
          // Only show date-relevant events
          if (a.eventDate < b.eventDate) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });

      }) /*end of getJSON function */
    } /*end spreadsheetData function*/
  } /*end function CalendarController()*/
})();
