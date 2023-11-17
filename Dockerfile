# Puppeteer requires certain dependencies. We're using the chrome image as base image
FROM node:18-buster-slim

# Install puppeteer dependencies
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst \
      --no-install-recommends \
    # Additional dependencies for Puppeteer
    && apt-get install -y libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 libnss3 libcups2 libxss1 libxrandr2 libasound2 libpangocairo-1.0-0 libatk1.0-0 libatk-bridge2.0-0 libgtk-3-0 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr

# Copy the app
COPY . ./

# Set environment variables
ENV NODE_OPTIONS=--openssl-legacy-provider

# Install your dependencies
RUN npm install
RUN npm run build

# Expose the port
EXPOSE 1337
EXPOSE 80

# Run the app
CMD npm run start