package models

import "gorm.io/gorm"

type Accounts struct {
	gorm.Model
	Email    string `gorm:"uniqueIndex;not null"`
	Password string `gorm:"column:password_hash;not null"`
	FullName string `gorm:"column:fullName;not null"`
}

type CreateAccountRequest struct {
	Email    string `json:"email"`
	FullName string `json:"fullName"`
	Password string `json:"password"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Message   string `json:"message"`
	Token     string `json:"token"`
	ExpiresAt int64  `json:"expiresAt"`
}
