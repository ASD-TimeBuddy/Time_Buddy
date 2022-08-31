# Time_Buddy

Timezone sensitive event planning app/api

## Django Build Instructions

### Install Required Dependancies

- Python https://www.python.org/downloads/
- Python-Pip https://pip.pypa.io/en/stable/installation/
- (recommended but not required) Docker https://docs.docker.com/engine/install/

### Install dev server

1. Setup python virutual environment `python -m venv ./venv`

2. Start virtual environment `source ./venv/bin/activate` or
   `.\venv\Scripts\activate.bat` on windows.

3. Install dependancies. `pip -r requirements.txt` (only need to do this once)

4. Run Django with `python manage.py runserver`

5. Deactivate environment with `deactivate`

## Client Build Instructions

### Install Required Dependancies

- NodeJS https://nodejs.org/en/

- Yarn https://yarnpkg.com/getting-started/install

### Run Development Server

1. cd or open time_buddy_client in vscode or terminal

2. Run `yarn install` to install dependancies (you only need to do this once)

3. Run `yarn dev` to run development server

