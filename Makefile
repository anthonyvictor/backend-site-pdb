ENVIRONMENT_FILE=.env

default: run

run: check-environment
	- docker-compose up -d --build

start:
	- docker start techdinner-api techdinner-db techdinner-nginx

stop:
	- docker stop techdinner-api techdinner-db techdinner-nginx

restart:
	- docker restart techdinner-api techdinner-db techdinner-nginx

status:
	- docker ps -f name=techdinner-api
	- docker ps -f name=techdinner-nginx
	- docker ps -f name=techdinner-db

clean:
	- docker stop techdinner-api techdinner-db techdinner-nginx
	- docker rm techdinner-api techdinner-db techdinner-nginx
	- docker rmi techdinner-node

bash:
	- docker exec -it techdinner-api bash

deploy: check-environment
	- docker stop techdinner-api techdinner-db techdinner-nginx
	- docker rm techdinner-api techdinner-db techdinner-nginx
	- yarn build
	- docker-compose up -d

check-environment:
	- @echo Copiando arquivo ".env.example";
ifeq ("$(wildcard $(ENVIRONMENT_FILE))","")
	- cp .env.example .env
	- @echo O arquivo ".env" foi gerado;
else
	- @echo Arquivo ".env" já existe;
endif
