import View from "@ioc:Adonis/Core/View";

View.global("menu", [
  {
    url: "/",
    text: "Home",
  },
  {
    url: "/about",
    text: "About",
  },
  {
    url: "/contact",
    text: "Contact",
  },
]);
