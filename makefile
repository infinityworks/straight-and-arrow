build-app:
	docker build -t training .
run-app:
	docker run --name training -d -p 80:8888 training

tag-app:
	docker tag training rohoolio/sanda_test:latest

push-app:
	docker push rohoolio/sanda_test:latest

kill-app:
	docker kill training

remove-app:
	docker rm training

tear-down: kill-app remove-app

init: build-app run-app
