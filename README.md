# ORIS_2SEM
инструкция по запуску
cd frontend
cd vite-project
npm run dev

cd ..
cd ..
cd backend
cd ToursApi
dotnet build
dotnet ef migrations add InitialCreate
dotnet run
