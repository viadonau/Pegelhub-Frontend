# Use the official Node.js 18 image as the base image
FROM node:18-alpine AS build

# Set the working directory to /app
WORKDIR /app

# Install @angular/cli
RUN npm install @angular/cli@15.2.4

# Copy the rest of the app's source code to the container
COPY . .

# Install dependencies & Build the Angular app for production
RUN npm install
RUN npm run build

# Use the official Nginx image as the base image for the web server
FROM nginx:1.24

# Copy the Angular app's built files from the previous stage to the Nginx web root
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Copy nginx.conf
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

# Expose port 80 for incoming traffic
EXPOSE 80

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]