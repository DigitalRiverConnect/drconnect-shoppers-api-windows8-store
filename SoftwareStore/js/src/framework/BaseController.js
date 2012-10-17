﻿(function () {
    "use strict";

    /**
     * Super Class for Controllers
     * most of Controller objects will inherit from this 
     */
    var Class = DR.Class.extend(
        function () {
            this.pageNavigator = DR.Store.App.pageNavigator;
            this.app = DR.Store.App;
        },
        {
            pageNavigator: null,
            showPage: function (detail, localized) {
                console.log("Showing page with URI " + detail.location);
                var p = this.pageNavigator.goToPage(detail.location, detail.state).then(function (page) {
                    if (page.clear) {
                        page.clear();
                    }
                    if (localized) {
                        WinJS.Resources.processAll(page.element);
                    }
                    
                    return page;
                });
                if (p) {
                    detail.setPromise(p);
                }
                return p;
            },

            /**
             * Sends a notification to the AcmeDispatcher so other parts of the app can react to this event.
             * 
             * @param notificationName	String describing the notification that want to be forwarded
             * @param data				JSON object with possible params to be forwarded
             */
            notify: function (notificationName, data) {
                var dispatcher = this.app.getDispatcher();
                dispatcher.handle(notificationName, data);
            },

            /**
             * Navigates to the provided URL
             */
            goToPage: function (url, data) {
                this.app.navigateTo(url, data);
            }
        }
        );

    WinJS.Namespace.define("DR.MVC", {
        BaseController: Class
    });

})();