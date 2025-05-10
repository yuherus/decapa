FROM python:3.9

WORKDIR /app

# Copy requirements.txt
COPY requirements.txt .

# Cài đặt dependencies
RUN pip install -r requirements.txt

# Copy toàn bộ code vào container
COPY . .

# Expose port
EXPOSE 5000

# Start service
CMD ["python", "app.py"] 
