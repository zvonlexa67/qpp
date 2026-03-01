FROM postgres:15-alpine

# Set environment variables
ENV POSTGRES_DB=qpp_db
ENV POSTGRES_USER=qpp_user
ENV POSTGRES_PASSWORD=qpp_password

# Copy initialization scripts
COPY init/ /docker-entrypoint-initdb.d/

# Expose PostgreSQL port
EXPOSE 5432
