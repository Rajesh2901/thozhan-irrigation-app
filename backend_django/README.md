# Thozhan Irrigation: Python & Django Backend

This directory contains the production-ready **Python & Django** backend architecture and REST API for **Thozhan Irrigation**.

---

## Quick Start (Beginner Steps)

### 1. Create & Activate Virtual Environment
```powershell
# Windows
python -m venv venv
.\venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Packages
```powershell
pip install -r requirements.txt
```

### 3. Run Database Migrations
```powershell
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Admin Account
```powershell
python manage.py createsuperuser
```

### 5. Run Server
```powershell
python manage.py runserver
```

Open `http://127.0.0.1:8000/` in your browser!
Admin portal is available at `http://127.0.0.1:8000/admin/`.
