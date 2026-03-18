PYTHON=python
VENV_DIR=.venv
APP_MODULE=app.main:app
PORT=8000

venv:
	@echo "Creating virtual environment..."
	@bash src/utils/create_venv.sh

backend:
	@echo "Starting backend..."
	@$(VENV_DIR)/bin/uvicorn $(APP_MODULE) --reload --port $(PORT) --app-dir backend

frontend:
	@echo "Starting frontend..."
	cd frontend && npm install && npm start

dev:
	@echo "Starting backend and frontend..."
	@$(MAKE) backend &
	@sleep 2
	@$(MAKE) frontend

lint:
	@./utils/check_style.sh

format:
	@./utils/format.sh


.PHONY: venv backend frontend lint format dev