# Devops final project - Group SE1-2
This is the repository of group 2 of the SE1 class

# Installation

To run the project in production mode, open a terminal and run the following command in the root folder:

```Bash
docker compose -f docker-compose.prod.yml up -d
```

You can then send requests to the API on [http://localhost:20000](http://localhost:20000) using a tool like Postman or Insomnia

You can also visit Prometheus or Grafana on [http://localhost:20001](http://localhost:20001) and [http://localhost:20002](http://localhost:20002) respectively. Use username `admin` and password `acfc54b5660e48f6aeff60c6f3d1f04e` to access Grafana. There, you can find a dashboard with the main metrics of the application. Keep it open while testing the API to see the metrics refresh in real time.

Once done, you can run the following command to remove the containers:

```Bash
docker compose -f docker-compose.prod.yml down -v
```

# API Usage

The following routes ara available:

| Method | Route | Payload | Description |
|--------|-------|---------|-------------|
| GET | /api/hello |  | Returns a "Hello world" message |
| GET | /api/products|  | Returns all products in the catalog |
| GET | /api/products/[productId] |  | Returns the product with the specified [productId] |
| POST | /api/products |<pre>{<br>  "name": string,<br>  "price": number,<br>  "categories": string[]<br>}</pre>| Adds the specified product to the catalog |
| PUT | /api/products/[productId] |<pre>{<br>  "name": string,<br>  "price": number,<br>  "categories": string[]<br>}</pre>| Updates the product [productId] with the given product details |
| DELETE | /api/products/[productId] |  | Deletes the product with the specified [productId] from the catalog |
| * | /api/fail |  | This route always fails with an error code 500 |
| * | /api/slow |  | This route always take at least 2 seconds to execute and returns a code 200 |
| GET | /metrics|  | Returns the usage metrics of the app for Prometheus |

Moreover, all routes starting with `/api` have a 25% chance to have an artificial delay of 2s and a 10% chance to trigger an artificial error code 500. This was done to simulate an unreliable API. 

# Team

- Samuel BADER
- Elliot BENSOUSSAN
- Léa BUENDÉ
- Faris CHTATOU
- Nicolas CRESSEAUX
- Tristan FIEVET
- Enzo FILANGI
- Maxime LEVIEL
