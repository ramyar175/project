'use strict';

define('myapp/tests/adapters/application.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - adapters/application.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint.\n');
  });
});
define('myapp/tests/app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - app.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint.\n');
  });
});
define('myapp/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('myapp/tests/helpers/destroy-app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/destroy-app.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint.\n');
  });
});
define('myapp/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'myapp/tests/helpers/start-app', 'myapp/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _myappTestsHelpersStartApp, _myappTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _myappTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _myappTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('myapp/tests/helpers/module-for-acceptance.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/module-for-acceptance.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint.\n');
  });
});
define('myapp/tests/helpers/resolver', ['exports', 'myapp/resolver', 'myapp/config/environment'], function (exports, _myappResolver, _myappConfigEnvironment) {

  var resolver = _myappResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _myappConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _myappConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('myapp/tests/helpers/resolver.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/resolver.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint.\n');
  });
});
define('myapp/tests/helpers/start-app', ['exports', 'ember', 'myapp/app', 'myapp/config/environment'], function (exports, _ember, _myappApp, _myappConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var attributes = _ember['default'].merge({}, _myappConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    return _ember['default'].run(function () {
      var application = _myappApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('myapp/tests/helpers/start-app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/start-app.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint.\n');
  });
});
define('myapp/tests/models/log.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - models/log.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/log.js should pass ESLint.\n');
  });
});
define('myapp/tests/resolver.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - resolver.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint.\n');
  });
});
define('myapp/tests/router.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - router.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint.\n');
  });
});
define('myapp/tests/routes/login.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - routes/login.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass ESLint.\n');
  });
});
define('myapp/tests/routes/login/reg.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - routes/login/reg.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login/reg.js should pass ESLint.\n');
  });
});
define('myapp/tests/routes/profile.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - routes/profile.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/profile.js should pass ESLint.\n');
  });
});
define('myapp/tests/routes/reg.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - routes/reg.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/reg.js should pass ESLint.\n');
  });
});
define('myapp/tests/test-helper', ['exports', 'myapp/tests/helpers/resolver', 'ember-qunit'], function (exports, _myappTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_myappTestsHelpersResolver['default']);
});
define('myapp/tests/test-helper.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - test-helper.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint.\n');
  });
});
define('myapp/tests/unit/adapters/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('myapp/tests/unit/adapters/application-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/adapters/application-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint.\n');
  });
});
define('myapp/tests/unit/models/log-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('log', 'Unit | Model | log', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('myapp/tests/unit/models/log-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/models/log-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/log-test.js should pass ESLint.\n');
  });
});
define('myapp/tests/unit/routes/login-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:login', 'Unit | Route | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('myapp/tests/unit/routes/login-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/routes/login-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass ESLint.\n');
  });
});
define('myapp/tests/unit/routes/login.reg-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:login.reg', 'Unit | Route | login.reg', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('myapp/tests/unit/routes/login.reg-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/routes/login.reg-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login.reg-test.js should pass ESLint.\n');
  });
});
define('myapp/tests/unit/routes/login/reg-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:login/reg', 'Unit | Route | login/reg', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('myapp/tests/unit/routes/login/reg-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/routes/login/reg-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login/reg-test.js should pass ESLint.\n');
  });
});
define('myapp/tests/unit/routes/profile-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:profile', 'Unit | Route | profile', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('myapp/tests/unit/routes/profile-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/routes/profile-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/profile-test.js should pass ESLint.\n');
  });
});
define('myapp/tests/unit/routes/reg-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:reg', 'Unit | Route | reg', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('myapp/tests/unit/routes/reg-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/routes/reg-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/reg-test.js should pass ESLint.\n');
  });
});
require('myapp/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
