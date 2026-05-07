FROM maven:3-eclipse-temurin-23 AS build
WORKDIR /app
COPY . .
RUN cd Backend && mvn package -DskipTests

FROM eclipse-temurin:23-jre
WORKDIR /app
COPY --from=build /app/Backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]