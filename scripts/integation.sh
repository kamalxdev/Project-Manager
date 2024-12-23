docker-compose up -d
echo '- Checking API endpoints'
cd ./backend
npm run test
docker-compose down