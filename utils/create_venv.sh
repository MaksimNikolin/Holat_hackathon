#!/bin/bash

# ---------------------------------------------------
# CivicLens: setup Python 3.11 virtual environment
# ---------------------------------------------------

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Project root: $PROJECT_ROOT"

if ! command -v python3.11 &> /dev/null
then
    echo "Python 3.11 not found. Please install Python 3.11."
    exit 1
fi

PYTHON_VERSION=$(python3.11 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")

echo "Python found: $PYTHON_VERSION"

VENV_PATH="$PROJECT_ROOT/.venv"

if [ -d "$VENV_PATH" ]; then
    echo "Virtual environment already exists"
else
    echo "Creating virtual environment..."
    python3.11 -m venv "$VENV_PATH"
fi

source "$VENV_PATH/bin/activate"

echo "Upgrading pip..."
pip install --upgrade pip

REQUIREMENTS_FILE="$PROJECT_ROOT/backend/requirements.txt"

if [ -f "$REQUIREMENTS_FILE" ]; then
    echo "Installing dependencies..."
    pip install -r "$REQUIREMENTS_FILE"
else
    echo "backend/requirements.txt not found!"
    exit 1
fi

echo ""
echo "Environment is ready!"
echo ""
echo "To activate the environment:"
echo "source .venv/bin/activate"