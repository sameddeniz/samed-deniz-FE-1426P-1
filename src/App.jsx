import { Button, Form, Table } from "react-bootstrap";
import "./App.css";
import { useState } from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";
import IconButton from "./components/IconButton.jsx";

const shops = ["Migros", "Teknosa", "BiM"];

const shopsObj = shops.map((shop, index) => ({
  id: index,
  name: shop,
}));

const categories = ["Elektronik", "Şarküteri", "Oyuncak", "Bakliyat", "Fırın"];

const categoriesObj = categories.map((category, index) => ({
  id: index,
  name: category,
}));

const TableRow = styled.tr`
  text-decoration: ${(props) =>
    props.isBought === true ? "line-through" : "unset"};
`;

function App() {
  const [products, setProducts] = useState([]);

  const [productName, setProductName] = useState("");
  const [productShop, setProductShop] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const handleAddProduct = () => {
    const product = {
      id: nanoid(),
      name: productName,
      category: productCategory,
      shop: productShop,
    };
    setProducts([...products, product]);
  };

  return (
    <>
      <div className="d-flex align-items-end">
        <Form className="d-flex align-items-end">
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
              type="text"
            />
          </Form.Group>
          <Form.Select
            style={{
              maxWidth: "130px",
            }}
            aria-label="Default select example"
            value={productShop}
            onChange={(e) => {
              setProductShop(e.target.value);
            }}
          >
            <option>Shop</option>
            {shopsObj.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            style={{
              maxWidth: "130px",
            }}
            aria-label="Default select example"
            value={productCategory}
            onChange={(e) => {
              setProductCategory(e.target.value);
            }}
          >
            <option>Category</option>
            {categoriesObj.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form>
        <Button onClick={handleAddProduct}>Ekle</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Shop</th>
            <th>Category</th>
            <th>ID</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <TableRow
              isBought={product.isBought}
              onClick={() => {
                const updatedProducts = products.map((oldProduct) => {
                  if (oldProduct.id === product.id) {
                    return { ...oldProduct, isBought: true };
                  } else {
                    return oldProduct;
                  }
                });
                if (updatedProducts.every((uP) => Boolean(uP.isBought))) {
                  alert("Shopping Completed");
                }
                setProducts(updatedProducts);
              }}
              key={product.id}
            >
              <td>{product.name}</td>
              <td>
                {
                  shopsObj.find(
                    (shopsObj) => shopsObj.id === parseInt(product.shop)
                  )?.name
                }
              </td>
              <td>
                {
                  categoriesObj.find(
                    (categoriesObj) =>
                      categoriesObj.id === parseInt(product.category)
                  )?.name
                }
              </td>
              <td>{product.id}</td>
              <IconButton
                handleClick={() => {
                  setProducts(
                    products.filter(
                      (filterProduct) => filterProduct.id !== product.id
                    )
                  );
                }}
              />
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default App;
