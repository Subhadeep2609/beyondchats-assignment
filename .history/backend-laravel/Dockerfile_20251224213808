FROM php:8.3-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libonig-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring zip gd

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN php artisan key:generate

RUN php artisan migrate --force || true

EXPOSE 10000

CMD php artisan serve --host=0.0.0.0 --port=10000
