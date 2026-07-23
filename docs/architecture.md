# DecisionHub Architecture

## System Architecture

```
┌──────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                   │
│           React 18 + Vite + Tailwind CSS             │
│           Material Design 3 Light Theme               │
│                  Port: 5173                           │
└───────────────────────┬──────────────────────────────┘
                        │ HTTP (Axios + JWT)
                        │ Proxy: /api → :8080
┌───────────────────────▼──────────────────────────────┐
│               BACKEND (Spring Boot 3.2)              │
│                    Port: 8080                        │
│                                                      │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │ Controllers  │  │   Services   │  │  Security  │  │
│  │  (REST API)  │──│ (Business    │  │  (JWT +    │  │
│  │  9 endpoints │  │  Logic)      │  │  Spring    │  │
│  └─────────────┘  └──────┬───────┘  │  Security) │  │
│                          │          └────────────┘  │
│  ┌───────────────────────▼───────────────────────┐  │
│  │         Spring Data JPA + Hibernate           │  │
│  │              13 Repositories                  │  │
│  └───────────────────────┬───────────────────────┘  │
└──────────────────────────┼───────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────┐
│                   DATABASE                           │
│    Development: H2 In-Memory (jdbc:h2:mem:decisionhub)│
│    Production:  MySQL / PostgreSQL                   │
└──────────────────────────────────────────────────────┘
```

## Module Architecture

| Module | Entities | API Base |
|--------|----------|----------|
| Authentication | User | /api/auth |
| User Management | User | /api/users |
| Decision Boards | Decision, Option, ComparisonFactor, OptionScore, ProCon | /api/decisions |
| Voting & Polls | Poll, PollOption, Vote | /api/polls |
| Discussions | Comment | /api/comments |
| Communities | Community, CommunityMember | /api/communities |
| Notifications | Notification | /api/notifications |
| Analytics | (aggregated) | /api/analytics |
| Reports | (generated) | /api/reports |

## Technology Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Security 6 (JWT stateless)
- Spring Data JPA + Hibernate
- H2 Database (dev) / MySQL / PostgreSQL (prod)
- Maven

### Frontend
- React 18.2
- Vite 5.0
- Tailwind CSS 3.3
- Chart.js 4.4 + react-chartjs-2
- Axios (HTTP client)
- React Router 6
- Material Symbols Outlined (Google Fonts)
- Material Design 3 Light Theme

### Authentication Flow
1. User registers/logs in → POST /api/auth/register or /api/auth/login
2. Server validates credentials, creates JWT token
3. Token returned to client, stored in localStorage
4. All subsequent requests include `Authorization: Bearer <token>` header
5. JwtAuthenticationFilter validates token on each request
6. SecurityContextHolder populated with authenticated user
