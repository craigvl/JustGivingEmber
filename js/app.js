App = Ember.Application.create();

App.Router.map(function() {
  this.resource("index",{path:"/"}),
  this.resource("charity",{path:"charities/:category"}),
  this.resource("modelNotFound",{path:"/modelNotFound/"})
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
     return Ember.$.getJSON("http://localhost:3000/charity/categories",function (data) {
         //alert(data[1].category);
        });
     },
    actions: {
    error: function(error, transition) {
        //alert(err.title);
        //alert(err);
        //var j = JSON.parse(error);
        //console.log(j);
        //alert(j.message);
        //this.transitionTo('modelNotFound');
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