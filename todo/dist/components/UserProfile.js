var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// /* eslint-disable*/
import React, { useState } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import PeriqlesForm from './PeriqlesForm';
var UserProfile = function () {
    var _a = useState(false), updated = _a[0], setUpdate = _a[1];
    function fetchQuery(operation, variables) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/graphql', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                query: operation.text,
                                variables: variables,
                            }),
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    }
    var modernEnvironment = new Environment({
        network: Network.create(fetchQuery),
        store: new Store(new RecordSource()),
    });
    var mutationGQL = graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation UserProfile_AddUserMutation($input: AddUserInput!) {\n      addUser(input: $input) {\n        userId\n        username\n        password\n        email\n        gender\n        pizzaTopping\n        age\n      }\n    }\n  "], ["\n    mutation UserProfile_AddUserMutation($input: AddUserInput!) {\n      addUser(input: $input) {\n        userId\n        username\n        password\n        email\n        gender\n        pizzaTopping\n        age\n      }\n    }\n  "])));
    var specifications = {
        fields: {
            gender: {
                element: 'radio',
                label: 'Gender',
                options: [
                    { label: 'nonbinary', value: 'NON_BINARY' },
                    { label: 'male', value: 'MALE' },
                    { label: 'female', value: 'FEMALE' },
                ],
            },
            pizzaTopping: {
                label: 'Favorite pizza topping:',
                element: 'select',
                options: [
                    { label: 'buffalo chicken', value: 'BUFFALO_CHICKEN' },
                    { label: 'pepperoni', value: 'PEPPERONI' },
                    { label: "meat lovers'", value: 'MEATLOVERS' },
                    { label: 'eggplant parmesan', value: 'EGGPLANT_PARM' },
                    { label: 'olives', value: 'OLIVES' },
                    { label: 'hawaiian', value: 'HAWAIIAN' },
                ],
            },
        },
    };
    var onSuccess = function (response) {
        setUpdate(true);
    };
    var onFailure = function (error) {
        alert("Problem submitting form: " + error.toString());
    };
    var args = { clientMutationId: '0000' };
    return (React.createElement("section", { className: "UserProfile" },
        React.createElement("h1", null, "Periqles Demo"),
        React.createElement("section", { className: "UserProfile-flex" },
            React.createElement(PeriqlesForm // error: JSX element type 'PeriqlesForm' does not have any construct or call signatures.
            , { environment: modernEnvironment, mutationName: 'AddUser', mutationGQL: mutationGQL, args: args, callbacks: { onSuccess: onSuccess, onFailure: onFailure } }),
            React.createElement("main", { className: "UserProfile-main" },
                React.createElement("h2", null, "Most Recently Added User"),
                React.createElement(QueryRenderer, { environment: modernEnvironment, query: graphql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n              query UserProfileQuery {\n                demoUser {\n                  userId\n                  username\n                  password\n                  email\n                  gender\n                  pizzaTopping\n                  age\n                }\n              }\n            "], ["\n              query UserProfileQuery {\n                demoUser {\n                  userId\n                  username\n                  password\n                  email\n                  gender\n                  pizzaTopping\n                  age\n                }\n              }\n            "]))), render: function (_a) {
                        var error = _a.error, props = _a.props;
                        setUpdate(false);
                        if (props && !props.demoUser) {
                            React.createElement("p", null, "Sign up...");
                        }
                        if (props && props.demoUser) {
                            var demoUser = props.demoUser;
                            return (React.createElement("ul", null,
                                React.createElement("li", { className: "userDisplayItem" },
                                    "Username: ",
                                    demoUser.username),
                                React.createElement("li", { className: "userDisplayItem" },
                                    "Email: ",
                                    demoUser.email),
                                React.createElement("li", { className: "userDisplayItem" },
                                    "Gender: ",
                                    demoUser.gender),
                                React.createElement("li", { className: "userDisplayItem" },
                                    "Favorite Pizza Topping: ",
                                    demoUser.pizzaTopping),
                                React.createElement("li", { className: "userDisplayItem" },
                                    "Age: ",
                                    demoUser.age)));
                        }
                        else if (error) {
                            return React.createElement("p", null, error.message);
                        }
                    } })))));
};
export default UserProfile;
var templateObject_1, templateObject_2;
