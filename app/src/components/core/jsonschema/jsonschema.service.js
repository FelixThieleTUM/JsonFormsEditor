/// <reference path="../../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/**
 * Created by pancho111203 on 4/12/15.
 */
var app;
(function (app) {
    var core;
    (function (core) {
        var jsonschema;
        (function (jsonschema) {
            var JsonSchemaService = (function () {
                function JsonSchemaService() {
                    this.fields = [];
                    this.loadFromJson(exampleFieldSchema);
                }
                JsonSchemaService.prototype.loadFromJson = function (json) {
                    this.fields = this.getPropertiesRecursive(json, '');
                };
                // From a json object, returns all the propertie names iinside it recursively and by adding a prefix with its location
                JsonSchemaService.prototype.getPropertiesRecursive = function (json, prefix) {
                    var res = [];
                    if (json.hasOwnProperty('properties')) {
                        for (var key in json.properties) {
                            if (json.properties.hasOwnProperty(key)) {
                                var name = prefix == '' ? key : prefix + '/' + key;
                                res.push(name);
                                res = res.concat(this.getPropertiesRecursive(json.properties[key], name));
                            }
                        }
                    }
                    return res;
                };
                JsonSchemaService.prototype.getFields = function () {
                    return this.fields;
                };
                return JsonSchemaService;
            })();
            jsonschema.JsonSchemaService = JsonSchemaService;
            angular.module("app.core").service("JsonSchemaService", JsonSchemaService);
        })(jsonschema = core.jsonschema || (core.jsonschema = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//TODO flatten fieldschema to include all the properties (use lodash)
//TODO load from user
var exampleFieldSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Product",
    "type": "object",
    "properties": {
        "id": {
            "description": "The unique identifier for a product",
            "type": "number"
        },
        "name": {
            "type": "string"
        },
        "price": {
            "type": "number",
            "minimum": 0,
            "exclusiveMinimum": true
        },
        "tags": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "minItems": 1,
            "uniqueItems": true
        },
        "dimensions": {
            "type": "object",
            "properties": {
                "length": { "type": "number" },
                "width": { "type": "number" },
                "height": { "type": "number" }
            },
            "required": ["length", "width", "height"]
        },
        "warehouseLocation": {
            "description": "Coordinates of the warehouse with the product",
            "$ref": "http://json-schema.org/geo"
        }
    },
    "required": ["id", "name", "price"]
};
//# sourceMappingURL=jsonschema.service.js.map