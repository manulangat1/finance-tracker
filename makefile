up: 
	docker compose up -d --remove-orphans --build
down:
	docker compose down -v 
prune:
	docker system prune -a -f 
logs:
	docker compose logs -f