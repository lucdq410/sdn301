const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title", // Title of your API
      version: "1.0.0", // Version of your API
      description: "A brief description of your API", // Description of your API
    },
    servers: [
      {
        url: "http://localhost:3000", // URL of the API server
        description: "Development server", // Description of the server
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to the API docs (update this path according to your project structure)
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger UI available at http://localhost:3000/api-docs`);
};
module.exports = setupSwagger;
