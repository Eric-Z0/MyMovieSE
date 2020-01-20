# Project Description
[MyMovieSE](http://3.19.27.205) is a fully functioning movie search engine that is dockerized and hosted on AWS EC2.

![MyMovieSE demo1](https://github.com/Eric-Z0/MyMovieSE/tree/deploy-docker/readme-images/project_demo1.PNG) 

![MyMovieSE demo2](https://github.com/Eric-Z0/MyMovieSE/tree/deploy-docker/readme-images/project_demo2.PNG)

## Technical Details
The development of the whole project is composed of the following sections:
- [Front-End](#front-end)
    - [Angular](#angular)
- [Back-End](#back-end)
    - [Java Spring Boot](#java-spring-boot)
- [Database](#database)
    - [MySQL](#mysql)
- [API Design](#api-design)
    - [REST API Table]()
- [Testing](#tesing)
    - [Front-End Testing](#front-end-testing)
    - [Back-End Testing](#back-end-testing)
- [Deployment](#deployment)
    - [Docker](#docker)
    - [AWS EC2](#aws-ec2)


## Front-End
### Angular
> Angular is a TypeScript-based open-source web application framwork led by the Angular Team at Google and by a community of individuals and corporations. - Wikipedia

![UI Layout demo](https://github.com/Eric-Z0/MyMovieSE/tree/deploy-docker/readme-images/layout.PNG)

To implement the front-end user interface (UI), the work listed below is done:


**Components created**
- **Basic Layout:** &nbsp; header + home + footer
- **Exception Handling:** &nbsp; not-found
- **User Related:** &nbsp; login + register + profile
- **Feature Related:** &nbsp; jumbotron + advertising
- **Movie Related:** &nbsp; movie-box + sort-nav-bar + search-result-bar + movie-snapshot + movie + pagination

<br/>

**Services created**
- **Authentication**
- **Token Storage**
- **Movie**

<br/>

**Routing configuration**
```typescript
const appRoutes: Routes = [
  { path: 'profile', component: ProfileComponent},
  { path: 'movie/:movie_id', component: MovieComponent},
  { path: '', component: HomeComponent},
  { path: '**', component: NotFoundComponent},
]
```
<br/>

**Several features applied:**
* Display different components by using `*ngIf`
* Display different effects on the same component by adding attribute `*ngClass`
* Event binding between sibling components by using service and event subscription
* Call asynchronous APIs by using `Observable` provided by RXJS library
* Implement the authentication by storing a JWT token in the Session Storage
* Implement certain user interactive effects importing the Bootstrap 4 library

<br/>

## Back-End
### Java Spring Boot
— _About Spring Framework_ 
> The Spring Framework is an application framework and inversion of control container for the Java platform. - Wikipedia  

— _About Spring Boot_
> Spring Boot makes it easy to crete stand-alone, production-grade Spring based appliction that you can "just run". - Wikipedia

**Dependencies required**
- Spring REST
- Spring Security
- Spring JPA

**Models created**
- ERole
- Role
- User
- MovieSnapshot
- Movie

**Repositories created**
- RoleRepository
- UserRepository
- MovieSnapshotRepository
- MovieRepository

**Controllers created**
- AuthController
- MovieController

**Functions provided**
* REST API
* Authentication
* AOP - logging
* Stream java 8 feature is used

Back-end process diagram:
![backend process diagram]()

_**Explanation of Authentication Mechanism:**_


<br/>

## Database
### MySQL
> MysSQL is an open-source relational database management system. - Wikipedia

**Tables Created**
- roles
- users
- role-user
- movie-snapshot
- movie

_Note:_  
_Given the current project only stores data related to users and movies, a relational database can well serve the purpose. However, when requests scale up, an additional non-relational database such as Redis can be used to cache certain data that are must often requested._

## Testing
### Front-End Testing
Jasmine Framework - TBD  

**Unit Tests Written**
1. TBD
2. TBD

**Integration Tests Written**
1. TBD
2. TBD

### Back-End Testing
Java Spring REST Unit Tests -TBD

**Unit Tests Written**

**Integration Tests Written**

<br/>

## Deployment
### Docker
> Docker is a set of platform as a service (PaaS) products that use OS-level virtualization to deliver software in packages called containers. - Wikipedia

In this project, two docker images are created and the dockerized application can be run through docker-compose command. This also embodies the microservice idea. 

Dockerized App Diagram:
![dockerized app diagram]()

**DockerFile:**
```docker
FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

_Note:_  
_[1] This project before dockerized, needs to build Angular and Spring Boot as one deployment unit._  
_[2] Since this app docker image generation requires JAR files. Before it is built, maven is needed to install the Java Spring application._

### Docker Compose
> Compose is a tool for defining and running multi-container Docker applications. - docker.com

**Docker Compose File:**
```docker
version: '3.7'

services:
  server-service:
    container_name: mymoviese_app
    build: ./
    ports:
      - "80:8080"
    depends_on:
      - datebase-service
      
  datebase-service:
    container_name: docker_mysql
    image: mysql:8.0
    ports:
      - "3306:3306"
    volumes:
      - ./data:/docker-entrypoint-initdb.d
    restart: always
    environment:
      MYSQL_DATABASE: my_movie_se_app
      MYSQL_ROOT_PASSWORD: password
```

### AWS EC2
> Amazon Elastic Compute Cloud forms a central part of Amazon.com's cloud-computing platform, by allowing users to rent vitual computers on which to run their own computer applications. - Wikipedia

The process of deploying dockerized application on EC2:
1. Create an EC2 instance. (Given the restriction of Free tier, almost all settings are set by default, at the last step a key-pair needs to be provided)
2. Run SSH to connect to EC2 Linux server remotely with the pem key downloaded.
3. Run yum command to install docker, git, java 8 and maven.
4. Use git to clone the project
5. Use maven to package the whole application and generate JAR file.
6. Run `docker-compose build`
7. Run `docker-compose up`


