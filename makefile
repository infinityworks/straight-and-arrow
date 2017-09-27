build-app:
	docker build -t training .
run-app:
	docker run --name training -d -p 80:8888 training

tag-app:
	docker tag training rohoolio/sanda_test:latest

push-app:
	docker push rohoolio/sanda_test:latest

kill-app:
	docker kill straightandarrow_web_1
	docker kill straightandarrow_db_1

remove-app:
	docker rm straightandarrow_web_1
	docker rm straightandarrow_db_1

tear-down: kill-app remove-app

init: build-app run-app
