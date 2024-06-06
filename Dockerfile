FROM node:alpine AS build

# Set the working directory to /app
WORKDIR /app

# Copy the rest of the app's source code to the container
COPY . .

# Install dependencies & Build the Angular app for production
RUN npm install
RUN npm run build

# Use the official Nginx image as the base image for the web server
FROM nginx:alpine

# Copy the Angular app's built files from the previous stage to the Nginx web root
COPY --from=build /app/dist/pegelhub/browser /usr/share/nginx/html/

# Copy nginx.conf
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
