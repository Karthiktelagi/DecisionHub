# DecisionHub Database Schema

## Entity Relationship Diagram

```
Users ──────────┬──── Decisions ──────┬──── Options ──────┬──── ProsCons
                │         │           │         │          └──── OptionScores
                │         │           ├──── Polls ────────┬──── PollOptions
                │         │           │                    └──── Votes
                │         │           ├──── Comments (self-referencing for threads)
                │         │           └──── ComparisonFactors
                │
                ├──── Communities ──── CommunityMembers
                └──── Notifications
```

## Tables

### users
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| username | VARCHAR(255) | UNIQUE, NOT NULL |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL |
| full_name | VARCHAR(255) | |
| bio | TEXT | |
| avatar_url | VARCHAR(255) | |
| interests | TEXT | |
| role | ENUM(USER, MODERATOR, ADMIN) | DEFAULT 'USER' |
| created_at | TIMESTAMP | AUTO |
| updated_at | TIMESTAMP | AUTO |

### decisions
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| title | VARCHAR(255) | NOT NULL |
| description | TEXT | |
| category | VARCHAR(255) | |
| status | ENUM(DRAFT, ACTIVE, CLOSED) | DEFAULT 'ACTIVE' |
| is_public | BOOLEAN | DEFAULT TRUE |
| deadline | TIMESTAMP | |
| creator_id | BIGINT | FK → users.id |
| community_id | BIGINT | FK → communities.id (nullable) |
| created_at | TIMESTAMP | AUTO |
| updated_at | TIMESTAMP | AUTO |

### options
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| title | VARCHAR(255) | NOT NULL |
| description | TEXT | |
| image_url | VARCHAR(255) | |
| score | DOUBLE | DEFAULT 0 |
| decision_id | BIGINT | FK → decisions.id |
| created_at | TIMESTAMP | AUTO |

### comparison_factors
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK |
| name | VARCHAR(255) | NOT NULL |
| weight | DOUBLE | DEFAULT 1.0 |
| decision_id | BIGINT | FK → decisions.id |

### option_scores
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK |
| score | DOUBLE | |
| notes | VARCHAR(255) | |
| option_id | BIGINT | FK → options.id |
| factor_id | BIGINT | FK → comparison_factors.id |

### pros_cons
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK |
| type | ENUM(PRO, CON) | |
| content | VARCHAR(255) | NOT NULL |
| option_id | BIGINT | FK → options.id |
| user_id | BIGINT | FK → users.id |
| created_at | TIMESTAMP | AUTO |

### polls
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK |
| title | VARCHAR(255) | NOT NULL |
| type | ENUM(SINGLE_CHOICE, MULTIPLE_CHOICE, RATING) | |
| is_anonymous | BOOLEAN | DEFAULT FALSE |
| status | ENUM(ACTIVE, CLOSED) | DEFAULT 'ACTIVE' |
| decision_id | BIGINT | FK → decisions.id |
| created_at | TIMESTAMP | AUTO |
| closes_at | TIMESTAMP | |

### poll_options
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK |
| label | VARCHAR(255) | NOT NULL |
| poll_id | BIGINT | FK → polls.id |

### votes
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK |
| rating | INTEGER | (nullable, for RATING polls) |
| poll_id | BIGINT | FK → polls.id |
| poll_option_id | BIGINT | FK → poll_options.id |
| user_id | BIGINT | FK → users.id |
| created_at | TIMESTAMP | AUTO |

### comments
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK |
| content | TEXT | NOT NULL |
| decision_id | BIGINT | FK → decisions.id |
| user_id | BIGINT | FK → users.id |
| parent_id | BIGINT | FK → comments.id (nullable, for threading) |
| created_at | TIMESTAMP | AUTO |
| updated_at | TIMESTAMP | AUTO |

### communities
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK |
| name | VARCHAR(255) | UNIQUE, NOT NULL |
| description | TEXT | |
| category | VARCHAR(255) | |
| avatar_url | VARCHAR(255) | |
| is_public | BOOLEAN | DEFAULT TRUE |
| creator_id | BIGINT | FK → users.id |
| created_at | TIMESTAMP | AUTO |

### community_members
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK |
| role | ENUM(MEMBER, MODERATOR, ADMIN) | DEFAULT 'MEMBER' |
| community_id | BIGINT | FK → communities.id |
| user_id | BIGINT | FK → users.id |
| joined_at | TIMESTAMP | AUTO |

### notifications
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK |
| type | VARCHAR(255) | |
| title | VARCHAR(255) | |
| message | VARCHAR(255) | |
| reference_id | BIGINT | |
| is_read | BOOLEAN | DEFAULT FALSE |
| user_id | BIGINT | FK → users.id |
| created_at | TIMESTAMP | AUTO |

## Default Admin User
- Username: `admin`
- Email: `admin@decisionhub.com`
- Password: `admin123`
- Role: ADMIN
