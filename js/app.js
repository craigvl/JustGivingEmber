App = Ember.Application.create();

App.Router.map(function() {
  this.resource("index",{path:"/"}),
  this.resource("charity",{path:"charities/:category"}),
  this.resource("modelNotFound",{path:"/modelNotFound/"})
});

App.ModelNotFoundController = Ember.ArrayController.extend({
    actions:{
        clickMe: function () {
            this.transitionToRoute('index');
        }
    }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
     return Ember.$.getJSON("http://localhost:3000/charity/categories",function (data) {
        });
     },
    actions: {
    error: function(error, transition) {
        this.transitionTo('modelNotFound');
         }
    }
});

App.IndexController = Ember.ArrayController.extend({
    renderedOn : function(){
        return new Date();
    }.property(),
    actions:{
        clickMe: function () {
            alert("Clicked");
        }
    }
});

App.CharityRoute = Ember.Route.extend({
    model: function(params) {
        //alert(JSON.stringify(params));
        return Ember.$.getJSON("http://localhost:3000/charity/" + params.category ,function (data) {
        });
    }
});