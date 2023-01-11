FROM public.ecr.aws/docker/library/node:18-alpine3.15

WORKDIR /app

# Install dependencies first
COPY ./package.json ./
COPY ./tsconfig.json ./
RUN npm install

# Copy remaining files to working directory
COPY ./ .

# Expose Ports
EXPOSE 3000

# Run entry command 
CMD ["npm", "run", "start:dev"]
