# Microservice Assignment

Contains:
- product-service (NestJS, port 3001, microservice 4001)
- order-service (NestJS, port 3002)
- client-app (Next.js, dynamic form)

# Assignment: Microservice app + Dynamic Next.js client

## Overview
- product-service: NestJS microservice + REST API (port 3001, TCP microservice 4001)
- order-service: NestJS app that calls product-service over TCP (port 3002)
- client-app: Next.js + TypeScript + MUI dynamic Signup form (port 3000)

## Prerequisites
- Node 18+ and npm/yarn
- (optional) Docker if you want to containerize

## Setup & Run (local, simple)
Open three terminals:

### 1) Product service
```bash
cd product-service
npm install
npm run start:dev
# listens:
# REST: http://localhost:3001/products
# Microservice TCP: 127.0.0.1:4001





ORDER SERVICES
---------------
cd order-service
npm install
npm run start:dev
# REST: http://localhost:3002/orders


CLIENT APP
------------
cd client-app
npm install
npm run dev
# Next.js app: http://localhost:3000



Test flow

Create products via product service:

POST http://localhost:3001/products
{
  "name": "T-shirt",
  "description": "Cotton T-shirt",
  "price": 15.99,
  "stock": 100
}


Create order via order service:

POST http://localhost:3002/orders
{
  "items": [
    { "productId": 1, "qty": 2 }
  ]
}


Order service will call product-service via TCP to fetch product prices and validate product existence.

Use client-app to open dynamic form and submit. Submissions are saved in localStorage.

