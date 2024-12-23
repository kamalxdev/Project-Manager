docker-compose up -d
cd ./backend
echo '- Checking API endpoints'
npm run test
docker-compose down
