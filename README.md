1. First you need to download **docker-compose.yml** file from here https://drive.google.com/file/d/1fubB1kVRzmaCwrVDdngYu-OKP__FdWwb/view?usp=sharing
2. Clone both repos into one folder. 
- backend - https://github.com/Chaika813/user-registration-test-task-backend
- frontend - https://github.com/Chaika813/user-registration-test-task-frontend
3. Add to the same folder **docker-compose.yml** file. It should look like on screen below:
![image](https://github.com/Chaika813/user-registration-test-task-backend/assets/61594007/c856b616-d43f-4582-a2da-4c71e5f5ee05)
4. Open in this folder a terminal and run commands:
      ```
    docker compose up --build
    ```
  - in the new terminal tab run command
    ```
    docker compose exec backend bash
    ```
 - inside on the bash run command:
    ```
    npx prisma migrate dev
    ```
  - after that run command
    ```
    docker compose up --build
5. In the **http://localhost:3000/** you will be able to test the app. 
