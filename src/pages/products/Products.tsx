import { Col, Row } from "react-bootstrap";

import { useParams } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { Product } from "../../components/Product";
import { useFetch } from "../../hooks/useFetch";

type Rating = {
  count: number;
  rate: number;
};

type ProductProps = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  rating: Rating;
};

export function Products() {
  const { category } = useParams();

  const productsUrl = `https://fakestoreapi.com/products/category/${category}`;
  const { data, loading, hasError } = useFetch<ProductProps>(productsUrl);

  if (hasError) {
    return <p>Sorry, something went wrong</p>;
  }
  return (
    <>
      <h1>Products</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {loading ? (
          <Loading />
        ) : (
          data?.map((product) => (
            <Col key={product.id}>
              <Product {...product} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
}
