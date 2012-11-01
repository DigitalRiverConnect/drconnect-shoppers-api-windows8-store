﻿(function () {
    "use strict";
    /**
     * Super Class for Controllers
     * most of Controller objects will inherit from this 
     */
    var Class = DR.MVC.BaseDispatcher.extend(
        function () {
            this._super();
        },
        {
            /**
             * Mapping of all the URIs 
             */
            declareUrlMappings: function (u, c) {
                this.addUrlMapping(u.HOME_PAGE, c.homeController);
                this.addUrlMapping(u.PRODUCT_PAGE, c.productController);
                this.addUrlMapping(u.CATEGORY_PAGE, c.categoryController);
                this.addUrlMapping(u.CART_PAGE, c.cartController);
                this.addUrlMapping(u.CHECKOUT_PAGE, c.checkoutController,true);
                this.addUrlMapping(u.SEARCH_PAGE, c.searchController);
                this.addUrlMapping(u.SHOPPER_PAGE, c.userController, true);
            },

            /**
             * Sharing Mappings
             */
            declareSharingMappings: function (u, c) {
                this.addSharingMapping(u.PRODUCT_PAGE, c.productController, true);
            },

            /**
             * Notification Mapping
             */
            declareMappings: function (n, c) {
                this.addMapping(n.ADD_TO_CART, c.cartController, "addToCart");
                this.addMapping(n.ADD_PRODUCTS_TO_CART, c.cartController, "addProductsToCart");
                this.addMapping(n.PRODUCT_ADDED_TO_CART, c.mainApplicationController, "handleProductAddedToCart");
                this.addMapping(n.PRODUCT_ADDED_TO_CART, c.homeController, "_onProductsAdded");
                this.addMapping(n.PRODUCT_ADDED_TO_CART, c.categoryController, "_onProductsAdded");
                this.addMapping(n.APPLICATION_STARTED, c.mainApplicationController, "handle");
                this.addMapping(n.LOGIN, c.userController, "login");
                this.addSearchMapping(c.searchController, "searchRequested");
            },

            /**
             * Controller instances
             */
            initControllers: function() {
                var c = DR.Store.Controller;
                return {
                    mainApplicationController: new c.MainApplicationController(),
                    homeController: new c.HomeController(),
                    productController: new c.ProductController(),
                    cartController: new c.CartController(),
                    checkoutController: new c.CheckoutController(),
                    categoryController: new c.CategoryController(),
                    searchController: new c.SearchController(),
                    userController: new c.UserController()
                }
            }
        }
        );

    WinJS.Namespace.define("DR.Store.Core", {
        StoreDispatcher: Class
    });

})();