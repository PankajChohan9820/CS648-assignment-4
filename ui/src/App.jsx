const { React, ReactDOM } = window;
const productTableHeadings = ['Product Name', 'Price', 'Category', 'Image'];
const productCategories = [
  { product_id: 1, product_name: 'Shirts' },
  { product_id: 2, product_name: 'Jeans' },
  { product_id: 3, product_name: 'Jackets' },
  { product_id: 4, product_name: 'Sweaters' },
  { product_id: 5, product_name: 'Accessories' },
];
const NO_DATA = '';

const ProductTableRow = ({ product }) => {
  const {
    product_name, product_price, product_category, product_image,
  } = product;
  return (
    <tr>
      <td>{product_name || NO_DATA}</td>
      <td>{product_price ? `${product_price}` : NO_DATA}</td>
      <td>{product_category}</td>
      <td>{product_image ? <a href={product_image} target="_blank" rel="noreferrer">View</a> : NO_DATA}</td>
    </tr>
  );
};

const ProductTable = ({ headings, products, loading }) => (
  <table className="table">
    <thead>
      <tr>
        {headings.map(heading => <th key={heading}>{heading}</th>)}
      </tr>
    </thead>

    <tbody>
      {products.length > 0 ? (
        products.map(product => <ProductTableRow key={product.product_id} product={product} />)
      ) : (
        <tr className="text-center">
          <td colSpan="4">{loading ? 'Loading Products' : 'No Products added yet'}</td>
        </tr>
      )}
    </tbody>
  </table>
);

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      product_price: '$',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { addProduct } = this.props;
    const {
      product_name, product_price, product_category, product_image,
    } = document.forms.addProduct;
    const priceWithoutDollar = product_price.value.substring(1); // Getting value without '$'

    const product = {
      product_name: product_name.value,
      product_price: parseFloat(priceWithoutDollar),
      product_category: product_category.value,
      product_image: product_image.value,
    };
    addProduct(product);

    product_name.value = '';
    product_category.value = 'Shirts';
    product_image.value = '';
    this.setState({ product_price: '$' });
  }

  handlePriceChange(event) {
    const priceWithoutDollar = event.target.value.substring(1); // Getting value without '$'
    this.setState({ product_price: `$${priceWithoutDollar}` });
  }

  render() {
    const { product_price } = this.state;
    return (
      <form name="addProduct" onSubmit={this.handleSubmit} className="add-product-form">
        <div className="form-element-container">
          <label htmlFor="product_category">Category</label>
          <select name="product_category">
            {
              productCategories.map(({ product_id, product_name }) => (
                <option key={product_id} id={product_id} value={product_name}>{product_name}</option>
              ))
            }
          </select>
        </div>

        <div className="form-element-container">
          <label htmlFor="product_price">Price Per Unit</label>
          <input type="text" name="product_price" value={product_price} onChange={this.handlePriceChange} />
        </div>

        <div className="form-element-container">
          <label htmlFor="product_name">Product Name</label>
          <input type="text" name="product_name" />
        </div>

        <div className="form-element-container">
          <label htmlFor="product_image">Image URL</label>
          <input type="text" name="product_image" />
        </div>

        <button type="submit" className="submit-button submit-button-dark">Add Product</button>
      </form>
    );
  }
}

async function graphQLFetch(query, variables = {}) {
  let jsonResult = {};
  try {
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();

    if (result.errors) {
      const error = result.errors[0];
      alert('Error  - ', error);
    }
    const { data } = result;
    jsonResult = data;
  } catch (e) {
    alert(`Error in server: ${e.message}`);
  }
  return jsonResult;
}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [], loading: true };
    this.addProduct = this.addProduct.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  async load() {

    const query = `
            query {
                productList {
                  product_id
                  product_name
                  product_category
                  product_price
                  product_image
                }
            }
        `;

    const data = await graphQLFetch(query);

    if (data) {
      this.setState({ products: data.productList, loading: false });
    }
  }

  async addProduct(product) {
    const query = `
            mutation addProduct($product: ProductInputs!) {
                addProduct(product: $product) {
                  product_id
                }
            }
        `;

    const data = await graphQLFetch(query, { product });
    if (data) {
      this.load();
    }
  }

  render() {
    const { products, loading } = this.state;
    return (
      <React.Fragment>
        <div className="root-container">
          <h2>My Company Inventory</h2>
          <div>Showing all available products</div>
          <hr />
          <ProductTable
            headings={productTableHeadings}
            products={products}
            loading={loading}
          />
          <div>Add a new Product</div>
          <hr />
          <ProductAdd addProduct={this.addProduct} />
        </div>
      </React.Fragment>
    );
  }
}

const element = (<ProductList />);

ReactDOM.render(element, document.getElementById('root'));
