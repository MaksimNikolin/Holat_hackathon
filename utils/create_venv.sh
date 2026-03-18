#!/bin/bash

# ---------------------------------------------------
# Real Holat: setup Python 3.11 virtual environment
# ---------------------------------------------------

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Project root: $PROJECT_ROOT"

if ! command -v python3.11 &> /dev/null
then
    echo "Python 3.11 не найден. Установите Python 3.11."
    exit 1
fi

PYTHON_VERSION=$(python3.11 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")

echo "Python найден: $PYTHON_VERSION"

VENV_PATH="$PROJECT_ROOT/.venv"

# Создание окружения
if [ -d "$VENV_PATH" ]; then
    echo "Виртуальное окружение уже существует"
else
    echo "Создаём виртуальное окружение..."
    python3.11 -m venv "$VENV_PATH"
fi

# Активация
source "$VENV_PATH/bin/activate"

echo "Обновляем pip..."
pip install --upgrade pip

REQUIREMENTS_FILE="$PROJECT_ROOT/backend/requirements.txt"

if [ -f "$REQUIREMENTS_FILE" ]; then
    echo "Устанавливаем зависимости..."
    pip install -r "$REQUIREMENTS_FILE"
else
    echo "backend/requirements.txt не найден!"
    exit 1
fi

echo ""
echo "Environment ready!"
echo ""
echo "Активировать окружение:"
echo "source .venv/bin/activate"