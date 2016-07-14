//File name: calanderController.js
	//Author: Ben Willshire  & Michael Wright
	//Description:
	//    Controller for the calendar page. Checks what user is logged in,
  //    pulls from the correct source, and then displays the content
	//Function:
	//    CalendarController, assignSheetNumber, getSpreadsheetData



// Setup CalendarController
(function () {

  'use strict';

  angular
    .module('app.calendar.controllers')
    .controller('CalendarController', CalendarController);

  CalendarController.$inject = ['$scope', '$http', 'User'];




  /**
   * @namespace CompaniesController
   * Pass in the User object so that we deliver them the corresonding calendar
   */
  function CalendarController($scope, $http, User) {

    // Determine sheet number from user session information
    var sheetNumber = assignSheetNumber(User);
    $scope.invalidUser = (sheetNumber == 0);
    $scope.userJustApplied = (sheetNumber == 2 || sheetNumber == 4);

    $scope.events = [];
    var url = 'https://spreadsheets.google.com/feeds/list/1rUiabmgoujPc1EWCSCvGiDhk80c9Y8ykcQ57D2Z7hfI/'+sheetNumber+'/public/values?alt=json';

    // Grab the event JSON from our google spreadsheet URL
    $scope.getSpreadsheetData = function() {
      
      $scope.webjson = $.getJSON(url).done( function(data,status){
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

        $http({
          method: 'GET',
          url: url
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
          console.log("error at end of getSpreadsheetData")
          console.log(response)
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });



        //end of .done() of getJSON
      }).fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
        $scope.invalidUser = true;
    }); /*end of getJSON function */
    } /*end spreadsheetData function*/


  } /*end function CalendarController()*/
})();



/* Assign the correct sheet number to the right user

Sheet Number:
1. Accepted Company
2. Non-Accepted Company
3. Accepted Fellow
4. Non-Accepted Fellow
0. ERROR - no conditions met
*/
function assignSheetNumber(User) {
  // Only provide calendar to logged in users
  var toReturn = 0;
  if( User.isUserLoggedIn() ){

    // The User is a company
    if ( User.isUserCompany() ) {

      // Assign based on acceptance
      User.isUserAccepted() ? toReturn = 1 : toReturn = 2;
      return toReturn;
    } // of Company

    // The User is a Fellow
    if ( User.isUserFellow() ) {

      // Assign based on acceptance
      User.isUserAccepted() ? toReturn = 3 : toReturn = 4;
      return toReturn;
    } // of Fellow

  } // of isUserLoggedIn

  // user failed to meet conditions, ERROR case
  return toReturn;

} // of assignSheetNumber
