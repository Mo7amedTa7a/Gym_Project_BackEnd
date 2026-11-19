const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Gym Management System API',
    version: '1.0.0',
    description: `
## Gym Management System - Backend RESTful API Documentation

A standalone, robust RESTful backend API designed to handle day-to-day operations for a modern Gym Management System.
Built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**, featuring **JWT-based authentication**, **Role-Based Access Control (RBAC)**, and centralized error handling.

### Roles & Permissions:
- **Admin**: Full access across all resources.
- **Staff**: Manage members, trainers, subscriptions, and attendance.
- **Trainer**: Limited access (view plans, check attendance, view assigned members).

### Authentication:
Protected endpoints require a JWT Bearer token.
Click the **Authorize** button on the right, enter your token in the format: \`Bearer <your_token>\`, and click **Authorize**.
    `,
    contact: {
      name: 'Gym Management API Support'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local Development Server'
    }
  ],
  tags: [
    { name: 'Auth', description: 'Authentication and User profile management' },
    { name: 'Members', description: 'Gym member management (CRUD, search, filters)' },
    { name: 'Trainers', description: 'Gym trainer / coach management' },
    { name: 'Plans', description: 'Gym membership package plans' },
    { name: 'Subscriptions', description: 'Member plan subscription lifecycle' },
    { name: 'Attendance', description: 'Member check-in & check-out tracking' },
    { name: 'Dashboard', description: 'Gym analytics, summary statistics, and KPIs' }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token (e.g. Bearer eyJhbGciOi...)'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '60d0fe4f5311236168a109ca' },
          name: { type: 'string', example: 'Captain Ahmed' },
          email: { type: 'string', format: 'email', example: 'ahmed@example.com' },
          role: { type: 'string', enum: ['Admin', 'Staff', 'Trainer'], example: 'Staff' },
          isActive: { type: 'boolean', example: true },
          lastLogin: { type: 'string', format: 'date-time' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      RegisterInput: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', format: 'email', example: 'john@example.com' },
          password: { type: 'string', minLength: 6, example: 'secret123' },
          role: { type: 'string', enum: ['Admin', 'Staff', 'Trainer'], default: 'Staff', example: 'Staff' }
        }
      },
      LoginInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'john@example.com' },
          password: { type: 'string', example: 'secret123' }
        }
      },
      ChangePasswordInput: {
        type: 'object',
        required: ['oldPassword', 'newPassword'],
        properties: {
          oldPassword: { type: 'string', example: 'oldSecret123' },
          newPassword: { type: 'string', minLength: 6, example: 'newSecret456' }
        }
      },
      ForgotPasswordInput: {
        type: 'object',
        required: ['email'],
        properties: {
          email: { type: 'string', format: 'email', example: 'john@example.com' }
        }
      },
      ResetPasswordInput: {
        type: 'object',
        required: ['newPassword'],
        properties: {
          newPassword: { type: 'string', minLength: 6, example: 'newSecret456' }
        }
      },
      Member: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '64e320f3299a910811bcf234' },
          name: { type: 'string', example: 'Mohamed Ali' },
          email: { type: 'string', format: 'email', example: 'mohamed@example.com' },
          phone: { type: 'string', example: '+201012345678' },
          gender: { type: 'string', enum: ['male', 'female'], example: 'male' },
          dateOfBirth: { type: 'string', format: 'date', example: '1995-05-15' },
          address: { type: 'string', example: '123 Nasr City, Cairo' },
          emergencyContact: { type: 'string', example: '+201098765432' },
          profileImage: { type: 'string', nullable: true, example: 'https://example.com/avatar.jpg' },
          status: { type: 'string', enum: ['active', 'inactive'], example: 'active' },
          trainer: { type: 'string', nullable: true, description: 'Trainer ID', example: '64e320f3299a910811bcf111' },
          joinedAt: { type: 'string', format: 'date-time' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      CreateMemberInput: {
        type: 'object',
        required: ['name', 'email', 'phone', 'gender', 'dateOfBirth', 'address', 'emergencyContact'],
        properties: {
          name: { type: 'string', example: 'Mohamed Ali' },
          email: { type: 'string', format: 'email', example: 'mohamed@example.com' },
          phone: { type: 'string', example: '+201012345678' },
          gender: { type: 'string', enum: ['male', 'female'], example: 'male' },
          dateOfBirth: { type: 'string', format: 'date', example: '1995-05-15' },
          address: { type: 'string', example: '123 Nasr City, Cairo' },
          emergencyContact: { type: 'string', example: '+201098765432' },
          profileImage: { type: 'string', nullable: true, example: null },
          status: { type: 'string', enum: ['active', 'inactive'], default: 'active', example: 'active' },
          trainer: { type: 'string', nullable: true, description: 'Trainer MongoDB ObjectId', example: '64e320f3299a910811bcf111' }
        }
      },
      UpdateMemberInput: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Mohamed Ali Updated' },
          email: { type: 'string', format: 'email', example: 'mohamed@example.com' },
          phone: { type: 'string', example: '+201012345678' },
          gender: { type: 'string', enum: ['male', 'female'] },
          dateOfBirth: { type: 'string', format: 'date' },
          address: { type: 'string' },
          emergencyContact: { type: 'string' },
          profileImage: { type: 'string' },
          status: { type: 'string', enum: ['active', 'inactive'] },
          trainer: { type: 'string' }
        }
      },
      Trainer: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '64e320f3299a910811bcf111' },
          user: { type: 'string', description: 'Associated User ID with Trainer role', example: '64e320f3299a910811bcf000' },
          name: { type: 'string', example: 'Coach Tarek' },
          email: { type: 'string', format: 'email', example: 'tarek@example.com' },
          phone: { type: 'string', example: '+201122334455' },
          specialization: { type: 'string', example: 'CrossFit & Bodybuilding' },
          experience: { type: 'number', minimum: 0, example: 5 },
          profileImage: { type: 'string', nullable: true, example: null },
          status: { type: 'string', enum: ['active', 'inactive'], example: 'active' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      CreateTrainerInput: {
        type: 'object',
        required: ['user', 'name', 'email', 'phone', 'specialization', 'experience'],
        properties: {
          user: { type: 'string', description: 'User ID with Trainer role', example: '64e320f3299a910811bcf000' },
          name: { type: 'string', example: 'Coach Tarek' },
          email: { type: 'string', format: 'email', example: 'tarek@example.com' },
          phone: { type: 'string', example: '+201122334455' },
          specialization: { type: 'string', example: 'CrossFit & Bodybuilding' },
          experience: { type: 'number', minimum: 0, example: 5 },
          profileImage: { type: 'string', nullable: true, example: null }
        }
      },
      UpdateTrainerInput: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Coach Tarek Updated' },
          email: { type: 'string', format: 'email', example: 'tarek@example.com' },
          phone: { type: 'string', example: '+201122334455' },
          specialization: { type: 'string', example: 'CrossFit & Functional Training' },
          experience: { type: 'number', example: 6 },
          profileImage: { type: 'string', nullable: true },
          status: { type: 'string', enum: ['active', 'inactive'], example: 'active' }
        }
      },
      Plan: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '64e320f3299a910811bcf333' },
          name: { type: 'string', example: 'Gold Plan - 3 Months' },
          description: { type: 'string', example: 'Full access to gym equipment, pool, and sauna' },
          duration: { type: 'number', description: 'Duration in months', example: 3 },
          price: { type: 'number', example: 1200 },
          features: {
            type: 'array',
            items: { type: 'string' },
            example: ['Locker Room Access', 'Free Wi-Fi', 'Sauna Access', '1 Free PT Session']
          },
          status: { type: 'boolean', example: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      CreatePlanInput: {
        type: 'object',
        required: ['name', 'description', 'price', 'duration'],
        properties: {
          name: { type: 'string', example: 'Gold Plan - 3 Months' },
          description: { type: 'string', example: 'Full access to gym equipment, pool, and sauna' },
          duration: { type: 'number', example: 3 },
          price: { type: 'number', example: 1200 },
          features: {
            type: 'array',
            items: { type: 'string' },
            example: ['Locker Room Access', 'Sauna Access']
          },
          status: { type: 'boolean', default: true, example: true }
        }
      },
      UpdatePlanInput: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          duration: { type: 'number' },
          price: { type: 'number' },
          features: {
            type: 'array',
            items: { type: 'string' }
          },
          status: { type: 'boolean' }
        }
      },
      Subscription: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '64e320f3299a910811bcf444' },
          member: { type: 'string', description: 'Member ObjectId or populated Member object', example: '64e320f3299a910811bcf234' },
          plan: { type: 'string', description: 'Plan ObjectId or populated Plan object', example: '64e320f3299a910811bcf333' },
          startDate: { type: 'string', format: 'date-time', example: '2026-09-01T00:00:00.000Z' },
          endDate: { type: 'string', format: 'date-time', example: '2026-12-01T00:00:00.000Z' },
          price: { type: 'number', example: 1200 },
          status: { type: 'string', enum: ['Active', 'Expired', 'Pending', 'Cancelled'], example: 'Active' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      CreateSubscriptionInput: {
        type: 'object',
        required: ['member', 'plan', 'startDate', 'endDate', 'price'],
        properties: {
          member: { type: 'string', description: 'Member ObjectId', example: '64e320f3299a910811bcf234' },
          plan: { type: 'string', description: 'Plan ObjectId', example: '64e320f3299a910811bcf333' },
          startDate: { type: 'string', format: 'date-time', example: '2026-09-01T00:00:00.000Z' },
          endDate: { type: 'string', format: 'date-time', example: '2026-12-01T00:00:00.000Z' },
          price: { type: 'number', example: 1200 },
          status: { type: 'string', enum: ['Active', 'Expired', 'Pending', 'Cancelled'], default: 'Pending', example: 'Active' }
        }
      },
      UpdateSubscriptionInput: {
        type: 'object',
        properties: {
          member: { type: 'string' },
          plan: { type: 'string' },
          startDate: { type: 'string', format: 'date-time' },
          endDate: { type: 'string', format: 'date-time' },
          price: { type: 'number' },
          status: { type: 'string', enum: ['Active', 'Expired', 'Pending', 'Cancelled'] }
        }
      },
      Attendance: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '64e320f3299a910811bcf555' },
          member: { type: 'string', description: 'Member ObjectId', example: '64e320f3299a910811bcf234' },
          checkIn: { type: 'string', format: 'date-time', example: '2026-09-15T08:30:00.000Z' },
          checkOut: { type: 'string', format: 'date-time', nullable: true, example: '2026-09-15T10:15:00.000Z' }
        }
      },
      CheckInInput: {
        type: 'object',
        required: ['member'],
        properties: {
          member: { type: 'string', description: 'Member ObjectId', example: '64e320f3299a910811bcf234' }
        }
      },
      GenericResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Operation completed successfully' }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Error description message' }
        }
      }
    }
  },
  paths: {
    // ----------------------------------------------------
    // AUTHENTICATION
    // ----------------------------------------------------
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new system user',
        description: 'Creates a new user (Admin, Staff, or Trainer) and returns an authentication JWT token.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'User registered successfully' },
                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
                  }
                }
              }
            }
          },
          400: {
            description: 'Validation error or user already exists',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } }
            }
          }
        }
      }
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Log in user',
        description: 'Authenticates a user by email and password and returns a JWT token.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginInput' }
            }
          }
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Login successful' },
                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
                  }
                }
              }
            }
          },
          401: {
            description: 'Invalid credentials',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } }
            }
          }
        }
      }
    },
    '/api/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Log out user',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Logout successful',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/GenericResponse' } }
            }
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } }
            }
          }
        }
      }
    },
    '/api/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Get current user profile',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Current user profile returned',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    user: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } }
            }
          }
        }
      }
    },
    '/api/auth/change-password': {
      patch: {
        tags: ['Auth'],
        summary: 'Change password for currently authenticated user',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ChangePasswordInput' }
            }
          }
        },
        responses: {
          200: {
            description: 'Password changed successfully',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/GenericResponse' } }
            }
          },
          400: {
            description: 'Bad Request / Validation error',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } }
            }
          },
          401: {
            description: 'Old password is incorrect or unauthorized',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } }
            }
          }
        }
      }
    },
    '/api/auth/forgot-password': {
      post: {
        tags: ['Auth'],
        summary: 'Request password reset token',
        description: 'Generates a reset password token for the specified user email.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ForgotPasswordInput' }
            }
          }
        },
        responses: {
          200: {
            description: 'Password reset token generated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Password reset token generated' },
                    resetToken: { type: 'string', example: '4c78a1bcde...' }
                  }
                }
              }
            }
          },
          404: {
            description: 'User not found',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } }
            }
          }
        }
      }
    },
    '/api/auth/reset-password/{token}': {
      patch: {
        tags: ['Auth'],
        summary: 'Reset password using token',
        parameters: [
          {
            name: 'token',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Password reset token received from forgot-password'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ResetPasswordInput' }
            }
          }
        },
        responses: {
          200: {
            description: 'Password reset successful',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/GenericResponse' } }
            }
          },
          400: {
            description: 'Invalid or expired token',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } }
            }
          }
        }
      }
    },

    // ----------------------------------------------------
    // MEMBERS
    // ----------------------------------------------------
    '/api/members': {
      get: {
        tags: ['Members'],
        summary: 'Get all members (with pagination and filtering)',
        description: 'Allowed Roles: Admin, Staff, Trainer (Trainers only receive their assigned members).',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Search by member name or phone' },
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['active', 'inactive'] }, description: 'Filter by member status' },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 }, description: 'Page number' },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 }, description: 'Results per page' },
          { name: 'sort', in: 'query', schema: { type: 'string', default: 'createdAt' }, description: 'Field to sort by' },
          { name: 'order', in: 'query', schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' }, description: 'Sort order' }
        ],
        responses: {
          200: {
            description: 'List of members returned',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'All Members' },
                    total: { type: 'integer', example: 45 },
                    page: { type: 'integer', example: 1 },
                    limit: { type: 'integer', example: 10 },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Member' }
                    }
                  }
                }
              }
            }
          },
          401: { description: 'Unauthorized' }
        }
      },
      post: {
        tags: ['Members'],
        summary: 'Create a new gym member',
        description: 'Allowed Roles: Admin, Staff.',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateMemberInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Member created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Member created successfully' },
                    data: { $ref: '#/components/schemas/Member' }
                  }
                }
              }
            }
          },
          400: { description: 'Missing required fields or invalid format' },
          404: { description: 'Trainer not found if trainer ID was supplied' }
        }
      }
    },
    '/api/members/{id}': {
      get: {
        tags: ['Members'],
        summary: 'Get single member by ID',
        description: 'Allowed Roles: Admin, Staff, Trainer.',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Member ObjectId' }
        ],
        responses: {
          200: {
            description: 'Member details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Member Found' },
                    data: { $ref: '#/components/schemas/Member' }
                  }
                }
              }
            }
          },
          403: { description: 'Forbidden (Trainer not authorized for this member)' },
          404: { description: 'Member not found' }
        }
      },
      put: {
        tags: ['Members'],
        summary: 'Update member information',
        description: 'Allowed Roles: Admin, Staff.',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Member ObjectId' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateMemberInput' }
            }
          }
        },
        responses: {
          200: {
            description: 'Member updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Member Updated Successfully' },
                    data: { $ref: '#/components/schemas/Member' }
                  }
                }
              }
            }
          },
          404: { description: 'Member or assigned Trainer not found' }
        }
      },
      delete: {
        tags: ['Members'],
        summary: 'Deactivate member (Soft Delete)',
        description: 'Sets member status to "inactive". Allowed Roles: Admin only.',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Member ObjectId' }
        ],
        responses: {
          200: {
            description: 'Member deactivated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Member Deactivated Successfully' },
                    data: { $ref: '#/components/schemas/Member' }
                  }
                }
              }
            }
          },
          403: { description: 'Forbidden (Admin role required)' },
          404: { description: 'Member not found' }
        }
      }
    },

    // ----------------------------------------------------
    // TRAINERS
    // ----------------------------------------------------
    '/api/trainer': {
      get: {
        tags: ['Trainers'],
        summary: 'Get list of trainers (with pagination & search)',
        description: 'Allowed Roles: Admin, Staff. Also accessible via /api/trainers.',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Search by trainer name or phone' },
          { name: 'specialization', in: 'query', schema: { type: 'string' }, description: 'Filter by specialization' },
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['active', 'inactive'] }, description: 'Filter by status' },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'sort', in: 'query', schema: { type: 'string', default: 'createdAt' } },
          { name: 'order', in: 'query', schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' } }
        ],
        responses: {
          200: {
            description: 'List of trainers',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'All Trainers' },
                    total: { type: 'integer', example: 12 },
                    page: { type: 'integer', example: 1 },
                    limit: { type: 'integer', example: 10 },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Trainer' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Trainers'],
        summary: 'Create a new trainer profile',
        description: 'Allowed Roles: Admin, Staff. Associates with an existing user who has role "Trainer".',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateTrainerInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Trainer created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Trainer created successfully' },
                    data: { $ref: '#/components/schemas/Trainer' }
                  }
                }
              }
            }
          },
          400: { description: 'Missing fields, user lacks Trainer role, or trainer profile already exists' },
          404: { description: 'User not found' }
        }
      }
    },
    '/api/trainer/{id}': {
      get: {
        tags: ['Trainers'],
        summary: 'Get trainer by ID',
        description: 'Allowed Roles: Admin, Staff. Also accessible via /api/trainers/{id}.',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Trainer ObjectId' }
        ],
        responses: {
          200: {
            description: 'Trainer details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Trainer Found' },
                    data: { $ref: '#/components/schemas/Trainer' }
                  }
                }
              }
            }
          },
          404: { description: 'Trainer not found' }
        }
      },
      put: {
        tags: ['Trainers'],
        summary: 'Update trainer profile',
        description: 'Allowed Roles: Admin, Staff. Also accessible via /api/trainers/{id}.',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Trainer ObjectId' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateTrainerInput' }
            }
          }
        },
        responses: {
          200: {
            description: 'Trainer updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Trainer Updated Successfully' },
                    data: { $ref: '#/components/schemas/Trainer' }
                  }
                }
              }
            }
          },
          404: { description: 'Trainer not found' }
        }
      },
      delete: {
        tags: ['Trainers'],
        summary: 'Deactivate trainer',
        description: 'Sets trainer status to "inactive". Allowed Roles: Admin only. Also accessible via /api/trainers/{id}.',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Trainer ObjectId' }
        ],
        responses: {
          200: {
            description: 'Trainer deactivated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Trainer Deactivated Successfully' },
                    data: { $ref: '#/components/schemas/Trainer' }
                  }
                }
              }
            }
          },
          404: { description: 'Trainer not found' }
        }
      }
    },

    // ----------------------------------------------------
    // PLANS
    // ----------------------------------------------------
    '/api/plans': {
      get: {
        tags: ['Plans'],
        summary: 'Get all gym plans',
        description: 'Allowed Roles: Admin, Staff, Trainer.',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'List of all plans',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'All Plans' },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Plan' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Plans'],
        summary: 'Create a new gym membership plan',
        description: 'Allowed Roles: Admin only.',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreatePlanInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Plan created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Plan created successfully' },
                    data: { $ref: '#/components/schemas/Plan' }
                  }
                }
              }
            }
          },
          400: { description: 'Required fields missing' }
        }
      }
    },
    '/api/plans/{id}': {
      get: {
        tags: ['Plans'],
        summary: 'Get plan by ID',
        description: 'Allowed Roles: Admin, Staff, Trainer.',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Plan ObjectId' }
        ],
        responses: {
          200: {
            description: 'Plan found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Plan Found' },
                    data: { $ref: '#/components/schemas/Plan' }
                  }
                }
              }
            }
          },
          404: { description: 'Plan not found' }
        }
      },
      patch: {
        tags: ['Plans'],
        summary: 'Update gym plan',
        description: 'Allowed Roles: Admin only.',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Plan ObjectId' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdatePlanInput' }
            }
          }
        },
        responses: {
          200: {
            description: 'Plan updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Plan Updated' },
                    data: { $ref: '#/components/schemas/Plan' }
                  }
                }
              }
            }
          },
          404: { description: 'Plan not found' }
        }
      },
      delete: {
        tags: ['Plans'],
        summary: 'Deactivate gym plan',
        description: 'Sets plan status to false. Allowed Roles: Admin only.',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Plan ObjectId' }
        ],
        responses: {
          200: {
            description: 'Plan deactivated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Plan Deactivated' },
                    data: { $ref: '#/components/schemas/Plan' }
                  }
                }
              }
            }
          },
          404: { description: 'Plan not found' }
        }
      }
    },

    // ----------------------------------------------------
    // SUBSCRIPTIONS
    // ----------------------------------------------------
    '/api/subscriptions': {
      get: {
        tags: ['Subscriptions'],
        summary: 'Get all subscriptions',
        description: 'Allowed Roles: Admin, Staff.',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'List of all subscriptions',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'All Subscriptions' },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Subscription' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Subscriptions'],
        summary: 'Create a new subscription for a member',
        description: 'Allowed Roles: Admin, Staff.',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateSubscriptionInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Subscription created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Subscription created successfully' },
                    data: { $ref: '#/components/schemas/Subscription' }
                  }
                }
              }
            }
          },
          400: { description: 'Missing required fields' },
          404: { description: 'Member or Plan not found' }
        }
      }
    },
    '/api/subscriptions/{id}': {
      get: {
        tags: ['Subscriptions'],
        summary: 'Get subscription by ID',
        description: 'Allowed Roles: Admin, Staff.',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Subscription ObjectId' }
        ],
        responses: {
          200: {
            description: 'Subscription found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Subscription Found' },
                    data: { $ref: '#/components/schemas/Subscription' }
                  }
                }
              }
            }
          },
          404: { description: 'Subscription not found' }
        }
      },
      put: {
        tags: ['Subscriptions'],
        summary: 'Update subscription',
        description: 'Allowed Roles: Admin, Staff.',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Subscription ObjectId' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateSubscriptionInput' }
            }
          }
        },
        responses: {
          200: {
            description: 'Subscription updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Subscription Updated' },
                    data: { $ref: '#/components/schemas/Subscription' }
                  }
                }
              }
            }
          },
          404: { description: 'Subscription not found' }
        }
      },
      delete: {
        tags: ['Subscriptions'],
        summary: 'Cancel subscription',
        description: 'Sets subscription status to "Cancelled". Allowed Roles: Admin only.',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Subscription ObjectId' }
        ],
        responses: {
          200: {
            description: 'Subscription cancelled successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Subscription Cancelled' },
                    data: { $ref: '#/components/schemas/Subscription' }
                  }
                }
              }
            }
          },
          404: { description: 'Subscription not found' }
        }
      }
    },

    // ----------------------------------------------------
    // ATTENDANCE
    // ----------------------------------------------------
    '/api/attendance/check-in': {
      post: {
        tags: ['Attendance'],
        summary: 'Record member check-in',
        description: 'Member must exist and have an Active subscription with no open check-in. Allowed Roles: Admin, Staff, Trainer.',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CheckInInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Check-in successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Check-in successful' },
                    attendance: { $ref: '#/components/schemas/Attendance' }
                  }
                }
              }
            }
          },
          400: { description: 'Subscription is not active' },
          403: { description: 'Member already has an open check-in' },
          404: { description: 'Member or subscription does not exist' }
        }
      }
    },
    '/api/attendance/{id}/check-out': {
      patch: {
        tags: ['Attendance'],
        summary: 'Record member check-out',
        description: 'Sets checkOut timestamp for open attendance record. Allowed Roles: Admin, Staff, Trainer.',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Attendance record ObjectId' }
        ],
        responses: {
          200: {
            description: 'Check-out successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Check-out successful' }
                  }
                }
              }
            }
          },
          404: { description: 'Attendance record does not exist or already checked out' }
        }
      }
    },
    '/api/attendance/member/{memberid}': {
      get: {
        tags: ['Attendance'],
        summary: 'Get attendance history for a specific member',
        description: 'Allowed Roles: Admin, Staff, Trainer.',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'memberid', in: 'path', required: true, schema: { type: 'string' }, description: 'Member ObjectId' }
        ],
        responses: {
          200: {
            description: 'Member attendance history',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Successful' },
                    attendance: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Attendance' }
                    }
                  }
                }
              }
            }
          },
          404: { description: 'Member does not exist' }
        }
      }
    },
    '/api/attendance': {
      get: {
        tags: ['Attendance'],
        summary: 'Get overall attendance records',
        description: 'Filterable by member ID or specific date. Allowed Roles: Admin, Staff.',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'memberid', in: 'query', schema: { type: 'string' }, description: 'Filter by member ObjectId' },
          { name: 'date', in: 'query', schema: { type: 'string', format: 'date' }, description: 'Filter by date (YYYY-MM-DD)' }
        ],
        responses: {
          200: {
            description: 'Attendance records list',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Successful' },
                    attendance: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Attendance' }
                    }
                  }
                }
              }
            }
          },
          404: { description: 'No attendance records found for specified filters' }
        }
      }
    },

    // ----------------------------------------------------
    // DASHBOARD
    // ----------------------------------------------------
    '/api/dashboard/stats': {
      get: {
        tags: ['Dashboard'],
        summary: 'Get real-time gym analytics & KPIs',
        description: 'Allowed Roles: Admin, Staff.',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Gym dashboard metrics',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    total_Members: { type: 'integer', example: 120 },
                    activeMembersCount: { type: 'integer', example: 95 },
                    expiredMembersCount: { type: 'integer', example: 25 },
                    active_Subscriptions: { type: 'integer', example: 98 },
                    expired_Subscriptions: { type: 'integer', example: 30 },
                    total_Trainers: { type: 'integer', example: 8 },
                    today_Attendance: { type: 'integer', example: 42 }
                  }
                }
              }
            }
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden (Admin or Staff only)' }
        }
      }
    }
  }
};

const swaggerOptions = {
  customSiteTitle: 'Gym Management System API Docs',
  customCss: `
    .swagger-ui .topbar { background-color: #1a1a2e; }
    .swagger-ui .topbar .topbar-wrapper img { content: url('https://cdn-icons-png.flaticon.com/512/2964/2964514.png'); height: 40px; }
  `
};

const setupSwagger = (app) => {
  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

  // Serve raw JSON spec for Postman / frontend code generators
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
  });

  // Redirect /docs to /api-docs for convenience
  app.get('/docs', (req, res) => {
    res.redirect('/api-docs');
  });
};

module.exports = {
  setupSwagger,
  swaggerDocument
};
