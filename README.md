# Time_Buddy

Timezone sensitive event planning app/api

## Features by person

### James [Leader]

- CRUD Events API
- Import/Export Events to ics files

### Colin

- Marketing Page
- International Time Zone Picker

### Christie

- Internal App Logic (e.g. automatically set the local timezone offset, find users location)
- Event Groups (Seperate events into groups or organisations)

### Tasnim

- Time Zone Conversion Function/Design
- App Authentication & Authorisation

### Euan

- The Frontend for the Events App
- Support Page

## Django Build Instructions

### Install Required Dependancies

- Python https://www.python.org/downloads/
- Python-Pip https://pip.pypa.io/en/stable/installation/
- (recommended but not required) Docker https://docs.docker.com/engine/install/

### Install dev server

1. Setup python virutual environment `python -m venv ./venv`

2. Start virtual environment `source ./venv/bin/activate` or
   `.\venv\Scripts\activate.bat` on windows.

3. Install dependancies. `pip install -r requirements.txt` (only need to do this once)

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

