import { rest } from "msw";

export const handlers = [
  rest.get("https://fakestoreapi.com/products/categories", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(["women", "men", "kids", "babies"]));
  }),

  rest.get(
    "https://fakestoreapi.com/products/category/women",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            category: "women",
            description: "women clothings",
            id: 9,
            image: "",
            price: 64,
            rating: { rate: 3.3, count: 203 },
            title: "Nice Gown",
          },
          {
            category: "women",
            description: "women clothings",
            id: 10,
            image: "",
            price: 64,
            rating: { rate: 3.5, count: 204 },
            title: "Leather Jacket",
          },
        ])
      );
    }
  ),

  rest.post("https://fakestoreapi.com/auth/login", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ token: "authenticated" }));
  }),
];
