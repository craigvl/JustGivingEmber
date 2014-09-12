App = Ember.Application.create();

App.Router.map(function() {
  this.resource("charity",{path:"/charities/:category"})
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
     return Ember.$.getJSON("http://localhost:3000/charity/categories",function (data) {
         //alert(data[1].category);
        });
     }
});

App.IndexController = Ember.ArrayController.extend({
    renderedOn : function(){
        return new Date();
    }.property(),
    actions:{
        clickMe: function (){
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
