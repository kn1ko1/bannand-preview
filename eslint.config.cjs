module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        document: "readonly",
        window: "readonly",
        Image: "readonly",
        IntersectionObserver: "readonly",
        setInterval: "readonly",
        setTimeout: "readonly",
        HTMLElement: "readonly",
        Node: "readonly"
      }
    },
    rules: {
      "max-lines-per-function": ["error", 50]
    }
  }
];
