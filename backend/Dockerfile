FROM ruby:3.2.2

# Cài đặt các dependencies
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

# Tạo thư mục làm việc
WORKDIR /app

# Copy Gemfile và Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Cài đặt gems
RUN bundle install

# Copy toàn bộ code vào container
COPY . .

# Thêm script để chạy ứng dụng
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Start server
CMD ["rails", "server", "-b", "0.0.0.0"] 
