/*
 * Copyright (c) 2014, Yahoo Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var ExpressMustache = require('./express-mustache');

exports = module.exports  = expmustache;
exports.create            = create;
exports.ExpressMustache = ExpressMustache;

// -----------------------------------------------------------------------------

function expmustache(config) {
    return create(config).engine;
}

function create(config) {
    return new ExpressMustache(config);
}
