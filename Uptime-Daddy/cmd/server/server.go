package main

import (
	"log"
	"net/http"
	"os"

	"github.com/Mercantec-GHC/h5-h5-projekt-template/Uptime-Daddy/db"
	"github.com/Mercantec-GHC/h5-h5-projekt-template/Uptime-Daddy/handler"
	"github.com/Mercantec-GHC/h5-h5-projekt-template/Uptime-Daddy/models"
	"github.com/Mercantec-GHC/h5-h5-projekt-template/Uptime-Daddy/routes"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	port := os.Getenv("PORT")

	if err := db.Connect(); err != nil {
		log.Fatal("Failed to connect to DB:", err)
	}

	if err := db.DB.AutoMigrate(&models.Accounts{}); err != nil {
		log.Fatal("Failed to migrate DB:", err)
	}

	mux := http.NewServeMux()
	routes.RegisterAccountRoutes(mux, routes.AccountHandlers{
		Register: handler.CreateAccountHandler,
		Login:    handler.LoginHandler,
	})

	log.Printf("Server running on %s", port)
	if err := http.ListenAndServe(port, mux); err != nil {
		log.Fatal("Server failed:", err)
	}
}
