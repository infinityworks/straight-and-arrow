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

init: build-app run-app
