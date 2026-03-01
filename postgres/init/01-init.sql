-- Init script for QPP database
-- Creates initial schema and extensions

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types if needed
-- CREATE TYPE user_role AS ENUM ('admin', 'user', 'guest');

-- Users table is created by SQLAlchemy migrations
-- This file can be used for additional initialization

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE qpp_db TO qpp_user;
