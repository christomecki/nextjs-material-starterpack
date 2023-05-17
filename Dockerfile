FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Add the `package.json` and `yarn.lock` (if you're using Yarn)
COPY ./package.json ./yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build