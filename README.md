
# JWT Authentication Application

This is a JWT authentication application built using Node.js, Express.js, and MongoDB. It includes Docker and Docker Compose for easy setup and deployment.

## Prerequisites

Before running the application, ensure you have the following installed:

1. **Node.js** (v18.19.1 or higher)
   - [Download Node.js](https://nodejs.org/)

2. **Docker**
   - [Install Docker](https://docs.docker.com/get-docker/)
   
3. **Docker Compose**
   - [Install Docker Compose](https://docs.docker.com/compose/install/)

## Steps to Run the Application

1. **Clone the Repository**  
   Clone this repository to your local machine:
   ```bash
   git clone https://github.com/gautham-huzlin/nodetest.git
   cd jwt-auth-app
   ```

2. **Build the Docker Images**  
   Run the following command to build the Docker images:
   ```bash
   docker-compose build
   ```

3. **Start the Application**  
   Use Docker Compose to start the application:
   ```bash
   docker-compose up
   ```

4. **Access the Application**  
   The application should now be running on `http://localhost:5000`.

5. **Testing the Endpoints**  
   You can use tools like Postman or curl to test the authentication endpoints.
   Import Postman Collection


To test the endpoints using Postman, you can import the provided Postman collection:

    Open Postman.
    Click on the "Import" button in the top left corner.
    Select the jwt test.postman_collection.json file from the repository.
    Click "Import" to load the collection.
