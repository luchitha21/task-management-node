# Step 1: Use Node.js 22 as the base image for the build stage
FROM node:22 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy all the source code into the container
COPY . .

# Step 6: Install TypeScript globally and compile the code
RUN npm install -g typescript
RUN tsc

# Step 7: Create a smaller image for running the app
FROM node:22-slim

# Step 8: Set the working directory in the container
WORKDIR /app

# Step 9: Copy only the compiled JavaScript files and node_modules from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Step 10: Expose the port the app runs on (defaults to 3000)
EXPOSE 3000

# Step 11: Run the Node.js app with the entry point file as server.js
CMD ["node", "dist/server.js"]
