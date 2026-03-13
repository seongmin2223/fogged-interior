# 🌫️ FOGGED — 무드 기반 인테리어 큐레이션

> 안개처럼 스며드는 인테리어. 감각으로 고르고, 무드로 기억하세요.

## 🔗 배포 링크

> 👉 [FOGGED 바로가기](https://fogged-interior-fkh5medji-seongmin2223s-projects.vercel.app/)
<br />
## 📌 프로젝트 소개

**FOGGED**는 무드 기반 인테리어 큐레이션 서비스입니다.  
FOG, DUSK, VOID, DAWN, ASH — 다섯 가지 무드로 분류된 공간들을 통해  
사용자만의 공간 언어를 찾아드립니다.

| 항목 | 내용 |
|------|------|
| 서비스 유형 | 인테리어 큐레이션 웹 서비스 |
| 개발 기간 | 2026.03.12 ~ |
| 개발 인원 | 1인 |

<br />

## 🛠 기술 스택

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

### Backend
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java_17-007396?style=flat-square&logo=java&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

<br />

## 📁 폴더 구조

```
fogged-interior/
├── frontend/                  # React + Vite 프론트엔드
│   ├── src/
│   │   └── App.jsx            # 메인 컴포넌트
│   ├── public/
│   └── package.json
│
└── backend/                   # Spring Boot 백엔드
    └── src/main/java/com/fogged/backend/
        ├── controller/        # API 컨트롤러
        ├── service/           # 비즈니스 로직
        ├── repository/        # DB 접근 계층
        ├── entity/            # JPA 엔티티
        ├── dto/               # 요청/응답 DTO
        ├── config/            # Security 설정
        └── util/              # JWT 유틸
```

<br />

## ⚙️ 실행 방법

### 사전 준비
- Node.js 18+
- Java 17
- MySQL 8.0+

### Frontend

```bash
cd frontend
npm install
npm run dev
```
> `http://localhost:5173` 에서 확인

### Backend

**1. MySQL 스키마 생성**
```sql
CREATE DATABASE fogged CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**2. `application.properties` 설정**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/fogged
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

**3. 실행**
```bash
cd backend
./gradlew bootRun
```
> `http://localhost:8080` 에서 확인

<br />

## 📡 API 명세

### Auth

| Method | URL | 설명 | 인증 |
|--------|-----|------|------|
| POST | `/api/auth/signup` | 회원가입 | ❌ |
| POST | `/api/auth/login` | 로그인 | ❌ |

#### 회원가입 `POST /api/auth/signup`

**Request Body**
```json
{
  "email": "user@fogged.com",
  "password": "password123",
  "nickname": "무드메이커"
}
```

**Response** `200 OK`
```
회원가입 성공
```

#### 로그인 `POST /api/auth/login`

**Request Body**
```json
{
  "email": "user@fogged.com",
  "password": "password123"
}
```

**Response** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "nickname": "무드메이커"
}
```

<br />

## 🌫️ 무드 카테고리

| 무드 | 설명 |
|------|------|
| FOG | 안개 — 부드럽고 몽환적인 공간 |
| DUSK | 황혼 — 따뜻하고 감각적인 공간 |
| VOID | 정적 — 극도로 절제된 공간 |
| DAWN | 새벽 — 차갑고 고요한 공간 |
| ASH | 재 — 시간이 쌓인 빈티지 공간 |
