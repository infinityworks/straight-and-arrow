build-app:
	docker build -t training .
run-app:
	docker run --name training -d -p 80:8888 training

tag-app:
	docker tag training rohoolio/sanda_test:latest

push-app:
	docker push rohoolio/sanda_test:latest

app-up:
	docker-compose build
	docker-compose up -d

app-down:
	docker-compose down

seelog:
	tail -f app.log

viewlog:
	docker logs -f straightandarrow_web_1

testdata:
	docker exec -t sqldb sh -c "mysql < /var/lib/mysql/testdata/useremail.sql -pexample"

dbconnect:
	docker exec -it sqldb sh -c "mysql -uroot -pexample"

init: build-app run-app

.PHONY: testdata
