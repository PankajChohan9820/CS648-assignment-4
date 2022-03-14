"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _window = window,
    React = _window.React,
    ReactDOM = _window.ReactDOM;
var productTableHeadings = ['Product Name', 'Price', 'Category', 'Image'];
var productCategories = [{
  product_id: 1,
  product_name: 'Shirts'
}, {
  product_id: 2,
  product_name: 'Jeans'
}, {
  product_id: 3,
  product_name: 'Jackets'
}, {
  product_id: 4,
  product_name: 'Sweaters'
}, {
  product_id: 5,
  product_name: 'Accessories'
}];
var NO_DATA = '';

var ProductTableRow = function ProductTableRow(_ref) {
  var product = _ref.product;
  var product_name = product.product_name,
      product_price = product.product_price,
      product_category = product.product_category,
      product_image = product.product_image;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, product_name || NO_DATA), /*#__PURE__*/React.createElement("td", null, product_price ? "".concat(product_price) : NO_DATA), /*#__PURE__*/React.createElement("td", null, product_category), /*#__PURE__*/React.createElement("td", null, product_image ? /*#__PURE__*/React.createElement("a", {
    href: product_image,
    target: "_blank",
    rel: "noreferrer"
  }, "View") : NO_DATA));
};

var ProductTable = function ProductTable(_ref2) {
  var headings = _ref2.headings,
      products = _ref2.products,
      loading = _ref2.loading;
  return /*#__PURE__*/React.createElement("table", {
    className: "table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("th", null, "Product Name"), /*#__PURE__*/React.createElement("th", null, "Price"), /*#__PURE__*/React.createElement("th", null, "Category"), /*#__PURE__*/React.createElement("th", null, "Image")), /*#__PURE__*/React.createElement("tbody", null, products.length > 0 ? products.map(function (product) {
    return /*#__PURE__*/React.createElement(ProductTableRow, {
      key: product.product_id,
      product: product
    });
  }) : /*#__PURE__*/React.createElement("tr", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: "4"
  }, loading ? 'Loading Products' : 'No Products added yet'))));
};

var ProductAdd = /*#__PURE__*/function (_React$Component) {
  _inherits(ProductAdd, _React$Component);

  var _super = _createSuper(ProductAdd);

  function ProductAdd() {
    var _this;

    _classCallCheck(this, ProductAdd);

    _this = _super.call(this);
    _this.state = {
      product_price: '$'
    };
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    _this.handlePriceChange = _this.handlePriceChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ProductAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();
      var addProduct = this.props.addProduct;
      var _document$forms$addPr = document.forms.addProduct,
          product_name = _document$forms$addPr.product_name,
          product_price = _document$forms$addPr.product_price,
          product_category = _document$forms$addPr.product_category,
          product_image = _document$forms$addPr.product_image;
      var priceWithoutDollar = product_price.value.substring(1); // Getting value without '$'

      var product = {
        product_name: product_name.value,
        product_price: parseFloat(priceWithoutDollar),
        product_category: product_category.value,
        product_image: product_image.value
      };
      addProduct(product);
      product_name.value = '';
      product_category.value = 'Shirts';
      product_image.value = '';
      this.setState({
        product_price: '$'
      });
    }
  }, {
    key: "handlePriceChange",
    value: function handlePriceChange(event) {
      var priceWithoutDollar = event.target.value.substring(1); // Getting value without '$'

      this.setState({
        product_price: "$".concat(priceWithoutDollar)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var product_price = this.state.product_price;
      return /*#__PURE__*/React.createElement("form", {
        name: "addProduct",
        onSubmit: this.handleSubmit,
        className: "onSubmit_form"
      }, /*#__PURE__*/React.createElement("div", {
        className: "form-element-container"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "product_category"
      }, "Category"), /*#__PURE__*/React.createElement("select", {
        name: "product_category"
      }, productCategories.map(function (_ref3) {
        var product_id = _ref3.product_id,
            product_name = _ref3.product_name;
        return /*#__PURE__*/React.createElement("option", {
          key: product_id,
          id: product_id,
          value: product_name
        }, product_name);
      }))), /*#__PURE__*/React.createElement("div", {
        className: "form-element-container"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "product_price"
      }, "Price Per Unit"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "product_price",
        value: product_price,
        onChange: this.handlePriceChange
      })), /*#__PURE__*/React.createElement("div", {
        className: "form-element-container"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "product_name"
      }, "Product Name"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "product_name"
      })), /*#__PURE__*/React.createElement("div", {
        className: "form-element-container"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "product_image"
      }, "Image URL"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "product_image"
      })), /*#__PURE__*/React.createElement("button", {
        type: "submit",
        className: "submit-button submit-button-dark"
      }, "Add Product"));
    }
  }]);

  return ProductAdd;
}(React.Component);

function graphQLFetch(_x) {
  return _graphQLFetch.apply(this, arguments);
}

function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(query) {
    var variables,
        jsonResult,
        response,
        result,
        error,
        data,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            variables = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            jsonResult = {};
            _context3.prev = 2;
            _context3.next = 5;
            return fetch(window.ENV.UI_API_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            });

          case 5:
            response = _context3.sent;
            _context3.next = 8;
            return response.json();

          case 8:
            result = _context3.sent;

            if (result.errors) {
              error = result.errors[0];
              alert('Error  - ', error);
            }

            data = result.data;
            jsonResult = data;
            _context3.next = 17;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](2);
            alert("Error in server: ".concat(_context3.t0.message));

          case 17:
            return _context3.abrupt("return", jsonResult);

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 14]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}

var ProductList = /*#__PURE__*/function (_React$Component2) {
  _inherits(ProductList, _React$Component2);

  var _super2 = _createSuper(ProductList);

  function ProductList() {
    var _this2;

    _classCallCheck(this, ProductList);

    _this2 = _super2.call(this);
    _this2.state = {
      products: [],
      loading: true
    };
    _this2.addProduct = _this2.addProduct.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(ProductList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.load();
    }
  }, {
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "\n            query {\n                productList {\n                  product_id\n                  product_name\n                  product_category\n                  product_price\n                  product_image\n                }\n            }\n        ";
                _context.next = 3;
                return graphQLFetch(query);

              case 3:
                data = _context.sent;

                if (data) {
                  this.setState({
                    products: data.productList,
                    loading: false
                  });
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load() {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "addProduct",
    value: function () {
      var _addProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(product) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "\n            mutation addProduct($product: ProductInputs!) {\n                addProduct(product: $product) {\n                  product_id\n                }\n            }\n        ";
                _context2.next = 3;
                return graphQLFetch(query, {
                  product: product
                });

              case 3:
                data = _context2.sent;

                if (data) {
                  this.load();
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addProduct(_x2) {
        return _addProduct.apply(this, arguments);
      }

      return addProduct;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          products = _this$state.products,
          loading = _this$state.loading;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "root-container"
      }, /*#__PURE__*/React.createElement("h2", null, "My Company Inventory"), /*#__PURE__*/React.createElement("h3", null, "Showing all available products"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductTable, {
        headings: productTableHeadings,
        products: products,
        loading: loading
      }), /*#__PURE__*/React.createElement("div", null, "Add a new Product"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductAdd, {
        addProduct: this.addProduct
      })));
    }
  }]);

  return ProductList;
}(React.Component);

var element = /*#__PURE__*/React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('root'));