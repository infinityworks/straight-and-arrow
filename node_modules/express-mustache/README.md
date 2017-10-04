# [express-mustache](https://github.com/pndgz/express-mustache)

> mustache view engine for express nodejs

## using in express
        var expmustache = require('./node_modules/express-mustache');
        ……
        app.engine('mustache', expmustache.create());
        app.set('view engine', 'mustache');
