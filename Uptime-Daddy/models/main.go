package models

import "gorm.io/gorm"

type Account struct {
	gorm.Model
	Email    string `gorm:"uniqueIndex;not null"`
	Password string `gorm:"column:password_hash;not null"`
}
