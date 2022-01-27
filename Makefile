THIS_FILE := $(lastword $(MAKEFILE_LIST))
.PHONY: dev prod downdev downprod
dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build $(c)
prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build $(c)
downdev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down $(c)
downprod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down $(c)
