App = Ember.Application.create();

App.Router.map(function() {
  this.resource("index",{path:"/"}),
  this.resource("modelNotFound",{path:"/modelNotFound/"}),
  this.resource("charities",{path:"/:category"}, function () {
      this.resource("charity", { path: "/details/:charity" });
  });

});

App.ModelNotFoundController = Ember.ArrayController.extend({
    actions:{
        clickMe: function () {
            this.transitionToRoute('index');
        }
    }
});

App.LoadingRoute = Ember.Route.extend({});

App.IndexRoute = Ember.Route.extend({
    model: function() {
        return Ember.$.getJSON("http://localhost:3000/charity/categories").then(
            function (response){
                App.charitycategories = response;
                //console.log(App.charitycategories[0].id);
                console.log(App.charitycategories);
                return App.charitycategories;
            }
        );
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


App.CharitiesRoute = Ember.Route.extend({
    model: function(params) {
        //alert(JSON.stringify(params));
        return Ember.$.getJSON("http://localhost:3000/charity/" + params.category ,function (data) {
        });
    }
});

App.CharityController = Ember.ObjectController.extend({
    donationlink: function () {
        var duration = 'http://www.justgiving.com/4w350m3/donation/direct/charity/' + this.get('charityId');
        return duration;
    }.property('donationlink')
});

App.CharitiesController = Ember.ArrayController.extend({
    itemController: 'charity'
});

App.CharitiesIndexRoute = Ember.Route.extend({
    model: function(params) {
        //return this.modelFor('charities');
        //return Ember.$.getJSON("http://localhost:3000/charitydetail/" + params.charityId, function (data) {
        //});
    }
});

App.CharityRoute = Ember.Route.extend({
    model: function(params) {
        //alert(JSON.stringify(params));
        return Ember.$.getJSON("http://localhost:3000/charitydetail/" + params.charity ,function (data) {
        });
    }
});