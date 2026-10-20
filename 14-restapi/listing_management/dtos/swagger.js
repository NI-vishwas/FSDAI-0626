const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Listings API",
      version: "1.0.0",
      description: "REST API documentation for listings"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server"
      }
    ],
    tags: [
      {
        name: "Listings",
        description: "Listings endpoints"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        Listing: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Acme Fresh Start Housing" },
            city: { type: "string", example: "Chicago" },
            state: { type: "string", example: "IL" },
            photo: { type: "string", example: "https://example.com/photo.jpg" },
            availableUnits: { type: "integer", example: 4 },
            wifi: { type: "boolean", example: true },
            laundry: { type: "boolean", example: true }
          },
          required: ["id", "name"]
        },
        ListingCreateRequest: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            city: { type: "string" },
            state: { type: "string" },
            photo: { type: "string" },
            availableUnits: { type: "integer" },
            wifi: { type: "boolean" },
            laundry: { type: "boolean" }
          },
          required: ["id", "name"]
        },
        ApiSuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Operation completed" },
            data: {},
            meta: { nullable: true },
            timestamp: { type: "string", format: "date-time" }
          }
        },
        ApiErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Request failed" },
            errors: { example: "Validation error" },
            timestamp: { type: "string", format: "date-time" }
          }
        }
      }
    },
    paths: {
      "/api/v1/listings": {
        get: {
          tags: ["Listings"],
          summary: "Get all listings",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Listings retrieved",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiSuccessResponse" },
                      {
                        type: "object",
                        properties: {
                          data: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Listing" }
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiErrorResponse" }
                }
              }
            },
            500: {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiErrorResponse" }
                }
              }
            }
          }
        },
        post: {
          tags: ["Listings"],
          summary: "Create a listing",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ListingCreateRequest" }
              }
            }
          },
          responses: {
            201: {
              description: "Listing created",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiSuccessResponse" },
                      {
                        type: "object",
                        properties: {
                          data: { $ref: "#/components/schemas/Listing" }
                        }
                      }
                    ]
                  }
                }
              }
            },
            400: {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiErrorResponse" }
                }
              }
            },
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiErrorResponse" }
                }
              }
            }
          }
        }
      },
      "/api/v1/listings/{id}": {
        get: {
          tags: ["Listings"],
          summary: "Get listing by id",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" }
            }
          ],
          responses: {
            200: {
              description: "Listing found",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiSuccessResponse" },
                      {
                        type: "object",
                        properties: {
                          data: { $ref: "#/components/schemas/Listing" }
                        }
                      }
                    ]
                  }
                }
              }
            },
            400: {
              description: "Invalid id",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiErrorResponse" }
                }
              }
            },
            404: {
              description: "Listing not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiErrorResponse" }
                }
              }
            },
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiErrorResponse" }
                }
              }
            },
            500: {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiErrorResponse" }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
