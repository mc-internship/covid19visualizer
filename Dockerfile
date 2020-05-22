FROM python:3
RUN apt-get -y install curl \
  && curl -sL https://deb.nodesource.com/setup_14.x | bash \
  && apt-get install nodejs \
  && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update && apt-get install yarn
WORKDIR /backend
COPY ./backend /backend/

#Install Microsoft SQL server
# adding custom MS repository
 RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
 RUN curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
 # install SQL Server drivers
 RUN apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17 unixodbc-dev libgssapi-krb5-2
 # install SQL Server tools
 RUN apt-get update && ACCEPT_EULA=Y apt-get install -y mssql-tools
 RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
 RUN /bin/bash -c "source ~/.bashrc"

#Install python dependencies
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
