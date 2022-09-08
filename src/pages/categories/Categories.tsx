import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { useFetch } from "../../hooks/useFetch";

export function Categories() {
  const categoriesUrl = "https://fakestoreapi.com/products/categories";
  const { data, loading, hasError } = useFetch<string>(categoriesUrl);

  if (hasError) {
    return <p>Sorry, something went wrong</p>;
  }

  return (
    <>
      <h1>Categories</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {loading ? (
          <Loading />
        ) : (
          data?.map((category, index) => (
            <Col key={index}>
              <Link to={category}>{category}</Link>
            </Col>
          ))
        )}
      </Row>
    </>
  );
}
