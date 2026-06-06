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


чтобы добавить туры в базу данных есть файл туры.txt нужно исполнить их в sql server managment studio
