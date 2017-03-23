"use strict";



define('myapp/adapters/application', ['exports', 'pouchdb', 'ember-pouch'], function (exports, _pouchdb, _emberPouch) {

  //var remote = new PouchDB('http://localhost:5984/my_couch');
  var db = new _pouchdb['default']('local_pouch');

  // db.sync(remote, {
  //    live: true,   // do a live, ongoing sync
  //    retry: true   // retry if the connection is lost
  // });

  exports['default'] = _emberPouch.Adapter.extend({
    db: db
  });
});
define('myapp/app', ['exports', 'ember', 'myapp/resolver', 'ember-load-initializers', 'myapp/config/environment'], function (exports, _ember, _myappResolver, _emberLoadInitializers, _myappConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _myappConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _myappConfigEnvironment['default'].podModulePrefix,
    Resolver: _myappResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _myappConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('myapp/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _emberWelcomePageComponentsWelcomePage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWelcomePageComponentsWelcomePage['default'];
    }
  });
});
define('myapp/helpers/app-version', ['exports', 'ember', 'myapp/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _myappConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _myappConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('myapp/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('myapp/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('myapp/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'myapp/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _myappConfigEnvironment) {
  var _config$APP = _myappConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('myapp/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('myapp/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('myapp/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('myapp/initializers/export-application-global', ['exports', 'ember', 'myapp/config/environment'], function (exports, _ember, _myappConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_myappConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _myappConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_myappConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('myapp/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('myapp/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('myapp/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("myapp/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('myapp/models/log', ['exports', 'ember-data', 'ember-pouch'], function (exports, _emberData, _emberPouch) {
								exports['default'] = _emberPouch.Model.extend({
																username: _emberData['default'].attr('string'),
																password: _emberData['default'].attr('string'),
																rating: _emberData['default'].attr('number'),
																exp: _emberData['default'].attr('string')
								});
});
define('myapp/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('myapp/router', ['exports', 'ember', 'myapp/config/environment'], function (exports, _ember, _myappConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _myappConfigEnvironment['default'].locationType,
    rootURL: _myappConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('login', function () {
      this.route('reg');
    });

    this.route('profile');
    this.route('reg');
  });

  exports['default'] = Router;
});
define('myapp/routes/login', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		// model: function(){

		// 		return this.store.findAll('log');
		// 	}
	});
});
define('myapp/routes/login/reg', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('myapp/routes/profile', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {

			return this.store.findAll('log');
		}
	});
});
define('myapp/routes/reg', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('myapp/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("myapp/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "6/BDjm6M", "block": "{\"statements\":[[\"text\",\"\\n\\n\"],[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default \"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"navbar-header\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"navbar-toggle collapsed\"],[\"static-attr\",\"data-toggle\",\"collapse\"],[\"static-attr\",\"data-target\",\"#navbar\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"static-attr\",\"aria-controls\",\"navbar\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"class\",\"navbar-brand\"],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Login/Register\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"navbar\"],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"login\"],null,1],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"reg\"],null,0],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"comment\",\"/.nav-collapse \"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\\n     \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-12\"],[\"flush-element\"],[\"text\",\"\\n               \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n     \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"comment\",\" /.container \"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Register\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Login\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "myapp/templates/application.hbs" } });
});
define("myapp/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "cDXW/2+5", "block": "{\"statements\":[[\"text\",\"\\n \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"hi\"],[\"close-element\"],[\"text\",\"\\n \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "myapp/templates/login.hbs" } });
});
define("myapp/templates/login/reg", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "r8hQAGaP", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"fg\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "myapp/templates/login/reg.hbs" } });
});
define("myapp/templates/profile", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "F9MO0N3L", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "myapp/templates/profile.hbs" } });
});
define("myapp/templates/reg", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Cgn9Anyh", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"username\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"username\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"password\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"password\",\"form-control\",[\"get\",[\"password\"]]]]],false],[\"text\",\" \\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"rating\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"rating\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n \\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addtask\"]],[\"flush-element\"],[\"text\",\"Submit\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "myapp/templates/reg.hbs" } });
});
define('myapp/transforms/attachment', ['exports', 'ember-pouch/transforms/attachment'], function (exports, _emberPouchTransformsAttachment) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPouchTransformsAttachment['default'];
    }
  });
});
define('myapp/transforms/attachments', ['exports', 'ember-pouch/transforms/attachments'], function (exports, _emberPouchTransformsAttachments) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPouchTransformsAttachments['default'];
    }
  });
});


define('myapp/config/environment', ['ember'], function(Ember) {
  var prefix = 'myapp';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("myapp/app")["default"].create({"name":"myapp","version":"0.0.0+2b70bb5e"});
}
//# sourceMappingURL=myapp.map
