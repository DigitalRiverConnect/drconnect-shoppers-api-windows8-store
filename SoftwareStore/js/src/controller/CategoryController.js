﻿/**
 * Category page controller
 */
(function () {
    "use strict";

    // TODO CHANGE to another location!
    var PAGE_SIZE = 5;

    var Class = DR.MVC.SinglePageController.extend(
        function () {
            this._super();
        },
        {
            /**
             * Loads the data and passes it to the page on initialization
             */
            initPage: function (page, state) {
                // Event Listening
                page.addEventListener(page.events.ITEM_SELECTED, this._onItemSelected.bind(this), false);

                // Create the subcategory data adapter
                var subcategoryDA = new DR.Store.DataSource.SubCategoriesPaginatedDataAdapter(state.item.id);

                // Create the paginated products data adapter
                var productDA = new DR.Store.DataSource.ProductByCategoryPaginatedDataAdapter(state.item.id);
                var dataAdapters = [];
                dataAdapters.push({ name: "Subcategories", da: subcategoryDA });
                dataAdapters.push({ name: "Products", da: productDA });

                // Creates the multi datasource using both data adapters
                var listDS = new DR.Store.DataSource.MultiplePaginatedDataSource(dataAdapters);

                // Send the datasource to the view
                page.setListDataSource(listDS);

                // Set the category name in the view
                page.setCategoryName(state.item.displayName);
            },

            /**
            * Handler executed when an item in the Categories screen is selected
            */
            _onItemSelected: function (e) {
                var item = e.detail.item;
                console.log("[Category Page:] " + item.data.displayName + " selected");
                var url = (item.itemType == DR.Store.Datasource.ItemType.PRODUCT) ? DR.Store.URL.PRODUCT_PAGE : DR.Store.URL.CATEGORY_PAGE;
                this.goToPage(url, { item: item.data });
            },

            _onCartButtonClicked: function (e) {
                this.goToPage(DR.Store.URL.CART_PAGE);
            },

            _onHomeButtonClicked: function (e) {
                this.goToPage(DR.Store.URL.HOME_PAGE);
            }
        }
    );

    // PRIVATE METHODS


    // EXPOSING THE CLASS
    WinJS.Namespace.define("DR.Store.Controller", {
        CategoryController: Class
    });

})();