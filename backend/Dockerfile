# Stage 1: Build the application
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

# Copy the backend project into the container
COPY . .

# Build the Maven Spring Boot application without running tests
# Use the Maven wrapper if present; otherwise fall back to mvn
RUN chmod +x mvnw || true
RUN ./mvnw clean package -DskipTests || mvn clean package -DskipTests

# Stage 2: Runtime image
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the built Spring Boot JAR from the builder stage
COPY --from=builder /app/target/backend-*.jar app.jar

# Expose Render's required port
EXPOSE 10000

# Start the app with Render's PORT variable
CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT:-10000}"]
