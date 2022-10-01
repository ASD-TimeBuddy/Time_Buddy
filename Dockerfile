FROM python:3.10-alpine as build

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

RUN apk add --no-cache gcc musl-dev postgresql-dev libpq

RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install -U pip setuptools wheel
COPY ./requirements.txt .
RUN pip install -r requirements.txt

FROM python:3.10-alpine as app

WORKDIR /usr/src/app

COPY --from=build /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY . /usr/src/app

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "time_buddy.wsgi:application"]
