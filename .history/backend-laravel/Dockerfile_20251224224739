FROM php:8.3-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy project files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Permissions
RUN chmod -R 775 storage bootstrap/cache

# Expose Render port
EXPOSE 10000

# Run migrations and start server
CMD php artisan migrate --force && php -S 0.0.0.0:$PORT -t public
