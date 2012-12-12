//// Application
var App = Ember.Application.create({
});

//// View/Controller pairs
App.ApplicationView = Ember.View.extend({
  templateName:  'application',
  classNames: ['application-view']
});

App.ApplicationController = Ember.Controller.extend({
  slogan: 'A framework for creating ambitious web applications',
  isSlogan: true
});

App.CarsView =  Ember.View.extend({
  templateName:  'cars'
});

App.CarsController =  Ember.ArrayController.extend();

App.ShoesView = Ember.View.extend({
  templateName:  'shoes'
});

App.ShoesController = Ember.ArrayController.extend();

App.SalutationView = Ember.View.extend({
  templateName:  'salutation'
});

App.SalutationController = Ember.ObjectController.extend();

App.TraversalView = Ember.View.extend({
  templateName:  'traversal'
});

App.TraversalController = Ember.ObjectController.extend();

App.HomeView = Ember.View.extend({
  template:  Ember.Handlebars.compile('<p><a {{action goHome href=true}}><em>Go Home</em></a></p>')
});

App.HomeController = Ember.ObjectController.extend();

//// 起動時処理
App.ready = function(){
  console.log("Created App namespace");
};

//// Router定義
App.Router = Ember.Router.extend({
  enableLogging:  true,
  goToCars:  Ember.Route.transitionTo('cars'),
  goToShoes:  Ember.Route.transitionTo('shoes'),
  goHome:  Ember.Route.transitionTo('index'),
  root:  Ember.Route.extend({
    index:  Ember.Route.extend({
      route:  '/',
      connectOutlets:  function(router, context){
        router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                          { greeting: "My Ember App" });
        router.get('applicationController').connectOutlet('body', 'traversal'); }
    }),
    shoes:  Ember.Route.extend({
      route: '/shoes',
      enter: function ( router ){
        console.log("The shoes sub-state was entered.");
      },
      connectOutlets:  function(router, context){
        router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                          { greeting: "Shoes Route" });
        router.get('applicationController').connectOutlet('body', 'shoes');
        router.get('applicationController').connectOutlet('footer', 'traversal');
        router.get('traversalController').connectOutlet('home');
      }
    }),
    cars:  Ember.Route.extend({
      route: '/cars',
      enter: function ( router ){
        console.log("The cars sub-state was entered.");
      },
      connectOutlets:  function(router, context){
        router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                          { greeting: "Cars Route" });
        router.get('applicationController').connectOutlet('body', 'cars');
        router.get('applicationController').connectOutlet('footer', 'traversal');
        router.get('traversalController').connectOutlet('home');
      }
    })
  })
});

App.initialize();


