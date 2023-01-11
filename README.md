# Sunstate Platform Coding Challenge

## Setup Instructions

Pull down repo:

```bash
git clone git@github.com:AnthonyConklin/project-sunstate.git
```

Navigate to project folder and init the docker containers.

```
cd project-sunstate && docker-compose up -d
```

Open up your browser and goto http://localhost:3000/api

This will take you to the swagger api spec. A provided postman collection is also in the root folder. To import go into postman, Collections -> Import -> Choose File: "./project-sunstate/SunstateTemps.postman_collection.json"

---

## Specs

- API - NestJS
- Database - Postgres

---

## Project Brief

Create a restful API that can do the following two tasks

1. The first task should allow a Fahrenheit temperature to be passed in, it will convert that value to Celsius, it will then save the reading to a database along with the time and conversion value, and return the value as Celsius

2. The second task should allow a Celsius temperature reading to be passed in, it will convert that value to Fahrenheit, it will then save the reading to a database along with the time and conversion value, and return the value as Fahrenheit

## Acceptance Criteria:

- The rest API should be able to be run and tested with a rest API tool such as Swagger/OpenAPI, Postman or Insomnia.
- The project can be built using language, frameworks, database, and IDE that you prefer.
- GIT should be used as the local source control.

At the end of the exercise, zip up the project including the local .git folders and any setup scripts. Write up a summary to send with the zip file back to your recruiting contact.

---

## Bonus Objectives

1. Use a database within a container (it is ok to restart and lose the data)
2. Deploy the API within a container
3. Add a third API task that calculates the average temperature over the last week and returns the average values in both Fahrenheit and Celsius
