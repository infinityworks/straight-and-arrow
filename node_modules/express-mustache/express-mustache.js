/*
 * Copyright (c) 2016, Yahoo Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

var fs       = require('fs');
var mustache = require('mustache');
var path       = require('path');

module.exports = ExpressMustache;

// -----------------------------------------------------------------------------

function ExpressMustache(config) {
    var _partials = {},
        _partialRegExp = /\{\{>\s*([\w/-]+)\s*\}\}/,
        _settings = {
            basePath: "views/",
            extName: ".mustache"
        };
    if (config) {
        _settings.basePath = config.basePath || _settings.basePath;
        _settings.extName = config.extName || _settings.extName;
    }

    var _loadPartials = function (basePath, template) {
        var matches;
        while ((matches = _partialRegExp.exec(template)) != null) {
            var pid = matches[1],
                partialPath = path.resolve(basePath, pid + _settings.extName);
            _partials[pid] = fs.readFileSync(partialPath).toString();
            _loadPartials(path.dirname(partialPath), _partials[pid]);
            template = template.substr(matches.index + matches[1].length + 5);
        }
    };
    // Express view engine integration point.
    return function (filePath, options, callback) {
        _settings.basePath = path.dirname(filePath);
        fs.readFile(filePath, function (err, content) {
            if (err) {
                return callback(new Error(err));
            }
            var template = content.toString();
            _loadPartials(_settings.basePath, template);
            return callback(null, mustache.render(template, options, _partials));
        });
    };
}
