build-app:
	docker build -t training .
run-app:
	docker run --name training -d -p 80:8888 training

tag-app:
	docker tag training rohoolio/sanda_test:latest

push-app:
	docker push rohoolio/sanda_test:latest

app-up:
	docker-compose up -d

app-down:
	docker-compose down

viewlog:
	docker logs -f straightandarrow_web_1

testdata:
	docker run --rm -i --net=host mariadb mysql -uroot -pexample -h127.0.0.1 < data/schemas/sql/testdata.sql

dbconnect:
	docker exec -it sqldb sh -c "mysql -uroot -pexample"

init: app-up testdata

runtests:
	docker exec -it straightandarrow_web_1 npm test

reboot:
	docker exec -t straightandarrow_web_1 sh -c "forever restartall"

.PHONY: testdata

dev-migration:
	docker run -v"$(shell pwd)":/flyway/sql dhoer/flyway -url=jdbc:mysql://database-arrow.c1jzxrxaov0u.eu-west-1.rds.amazonaws.com -schemas=arrowdb_schema -user=admin -password=foxboxhouse migrate

live-migration:
	docker run -v"$(shell pwd)":/flyway/sql dhoer/flyway -url=jdbc:mysql://livedatabase-arrow.c1jzxrxaov0u.eu-west-1.rds.amazonaws.com -schemas=arrowdb_schema -user=admin -password=foxboxhouse migrate