 FROM python:3
 RUN mkdir /backend
 WORKDIR /backend
 ADD requirements.txt /backend/
 
 # adding custom MS repository
 RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
 RUN curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list > /etc/apt/sources.list.d/mssql-release.list

 # install SQL Server drivers
 RUN apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17 unixodbc-dev libgssapi-krb5-2

 # install SQL Server tools
 RUN apt-get update && ACCEPT_EULA=Y apt-get install -y mssql-tools
 RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
 RUN /bin/bash -c "source ~/.bashrc"
 
 RUN pip install -r requirements.txt
 ADD . /backend/
 EXPOSE 8000
