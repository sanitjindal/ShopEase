import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../Hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container" style={{ padding: "60px 20px" }}>
        <div className="row justify-content-center" style={{ gap: "30px" }}>
          {categories.map((c) => (
            <div className="col-md-4" key={c._id} style={{ marginBottom: "30px" }}>
              <Link
                to={`/category/${c.slug}`}
                style={{
                  display: "block",
                  padding: "20px 30px",
                  fontSize: "22px",
                  textAlign: "center",
                  background: "linear-gradient(135deg, #333, #000)",
                  color: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                  textDecoration: "none",
                  transition: "background 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #555, #222)";
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #333, #000)";
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
                }}
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
