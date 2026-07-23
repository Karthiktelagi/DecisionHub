# DecisionHub API Reference

## Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login, get JWT token | No |
| GET | /api/auth/me | Get current user profile | Yes |

## Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/users/profile | Get own profile | Yes |
| PUT | /api/users/profile | Update own profile | Yes |
| GET | /api/users/{id} | Get user by ID | Yes |
| GET | /api/users | Get all users | Yes |
| GET | /api/users/{id}/stats | Get user statistics | Yes |

## Decisions
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/decisions | Create decision | Yes |
| GET | /api/decisions | List public decisions | Yes |
| GET | /api/decisions/{id} | Get decision detail | Yes |
| PUT | /api/decisions/{id} | Update decision | Yes |
| DELETE | /api/decisions/{id} | Delete decision | Yes |
| GET | /api/decisions/my | Get user's decisions | Yes |
| GET | /api/decisions/community/{id} | Get community decisions | Yes |
| POST | /api/decisions/{id}/options | Add option | Yes |
| DELETE | /api/decisions/options/{id} | Remove option | Yes |
| POST | /api/decisions/{id}/factors | Add comparison factor | Yes |
| POST | /api/decisions/options/{id}/scores | Set option score | Yes |
| POST | /api/decisions/options/{id}/proscons | Add pro/con | Yes |
| GET | /api/decisions/search?q= | Search decisions | Yes |

## Polls
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/polls | Create poll | Yes |
| GET | /api/polls/{id} | Get poll | Yes |
| GET | /api/polls/decision/{id} | Get polls for decision | Yes |
| POST | /api/polls/{id}/vote | Cast vote | Yes |
| GET | /api/polls/{id}/results | Get poll results | Yes |
| PUT | /api/polls/{id}/close | Close poll | Yes |
| GET | /api/polls/active | List active polls | Yes |
| GET | /api/polls/{id}/hasVoted | Check if user voted | Yes |

## Comments
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/comments | Add comment | Yes |
| GET | /api/comments/decision/{id} | Get comments | Yes |
| PUT | /api/comments/{id} | Update comment | Yes |
| DELETE | /api/comments/{id} | Delete comment | Yes |

## Communities
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/communities | Create community | Yes |
| GET | /api/communities | List public communities | Yes |
| GET | /api/communities/{id} | Get community detail | Yes |
| PUT | /api/communities/{id} | Update community | Yes |
| GET | /api/communities/my | User's communities | Yes |
| POST | /api/communities/{id}/join | Join community | Yes |
| POST | /api/communities/{id}/leave | Leave community | Yes |
| GET | /api/communities/{id}/members | Get members | Yes |
| GET | /api/communities/search?q= | Search communities | Yes |

## Notifications
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/notifications | Get notifications | Yes |
| GET | /api/notifications/unread/count | Unread count | Yes |
| PUT | /api/notifications/{id}/read | Mark read | Yes |
| PUT | /api/notifications/read-all | Mark all read | Yes |
| DELETE | /api/notifications/{id} | Delete notification | Yes |

## Analytics
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/analytics/dashboard | Dashboard stats | Yes |
| GET | /api/analytics/votes/{decisionId} | Vote distribution | Yes |
| GET | /api/analytics/trends | Decision trends | Yes |
| GET | /api/analytics/categories | Category distribution | Yes |
| GET | /api/analytics/user/{userId}/activity | User activity | Yes |

## Reports
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/reports/decision/{id}/pdf | Decision PDF report | Yes |
| GET | /api/reports/poll/{id}/csv | Poll CSV report | Yes |
