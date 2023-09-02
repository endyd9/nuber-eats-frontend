module.exports = {
  plugins: [
    {
      "postcss-import": {},
      tailwindcss: {},
      awtoprefixer: {},
    },
    require("tailwindcss"),
    require("@tailwindcss/deprecation-warnings"),
    require("autoprefixer"),
  ],
};
