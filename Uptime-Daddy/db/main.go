package db

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() error {
	connStr := os.Getenv("DB_CONNECTION")
	if connStr == "" {
		log.Fatal("DB_CONNECTION environment variable is not set")
	}

	var err error
	DB, err = gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		return err
	}

	log.Println("Successfully connected to Neon DB")
	return nil
}
