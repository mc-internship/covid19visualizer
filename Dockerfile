FROM python:3
RUN apt-get -y install curl \
  && curl -sL https://deb.nodesource.com/setup_14.x | bash \
  && apt-get install nodejs \
  && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update && apt-get install yarn
WORKDIR /backend

#Install python dependencies
COPY ./backend /backend/
RUN pip install -r requirements.txt

#Install React dependencies
WORKDIR /frontend

COPY ./frontend /frontend/
RUN yarn install && yarn build

#Move all static files other than index.html to root/ for whitenoise
WORKDIR /frontend/build

RUN mkdir root && mv *.ico *.js *.json root

#Collect all static files for Django
RUN mkdir /backend/staticfiles

WORKDIR /

RUN DJANGO_SETTINGS_MODULE=backend.settings.production \
    python backend/manage.py collectstatic --noinput

EXPOSE $PORT

CMD python backend/manage.py runserver 0.0.0.0:$PORT 
