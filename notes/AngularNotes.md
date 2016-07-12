##Hello Michael

[Helpful Info Here](https://docs.angularjs.org/guide/di)
- http://www.undefinednull.com/2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/
- http://stackoverflow.com/questions/15285635/how-to-use-replace-of-directive-definition

In angularApp/components/home/controllers/homeController.js:

This syntax defines a module. Notice the square brackets that specify the dependencies.

```
angular
.module('app.home', [
    'app.home.controllers'
    ]);
```

This syntax is not redefining the module, rather it's adding functionality to it
(specifically as a controller). 
```
  angular
    .module('app.home.controllers')
    .controller('HomeController', HomeController);

```

This is defining a service.
```
  angular
    .module('app.companies.services')
    .service('Companies', Companies);
```

In index.html, this line specifies where controller content is displayed
```
<div class="container main-content" ng-view=""></div>
```
We don't have the `ng-controller="asdf"` because ngRoute binds the route to the view