package main

import (
	"log"

	"github.com/Mercantec-GHC/h5-h5-projekt-template/Uptime-Daddy/db"
	"github.com/Mercantec-GHC/h5-h5-projekt-template/Uptime-Daddy/models"
	"github.com/joho/godotenv"
)

func main() {

	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	if err := db.Connect(); err != nil {
		log.Fatal("Failed to connect to DB:", err)
	}

	db.DB.AutoMigrate(&models.Account{})

	log.Println("DB connection successful! Server is ready.")

}
