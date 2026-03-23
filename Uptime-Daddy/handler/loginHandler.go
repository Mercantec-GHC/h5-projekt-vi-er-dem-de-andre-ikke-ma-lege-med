package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"time"

	"github.com/Mercantec-GHC/h5-h5-projekt-template/Uptime-Daddy/db"
	"github.com/Mercantec-GHC/h5-h5-projekt-template/Uptime-Daddy/models"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req models.LoginRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	if req.Email == "" || req.Password == "" {
		http.Error(w, "email and password are required", http.StatusBadRequest)
		return
	}

	var account models.Accounts
	if err := db.DB.Where("email = ?", req.Email).First(&account).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			http.Error(w, "invalid email or password", http.StatusUnauthorized)
			return
		}

		http.Error(w, "could not process login", http.StatusInternalServerError)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(account.Password), []byte(req.Password)); err != nil {
		http.Error(w, "invalid email or password", http.StatusUnauthorized)
		return
	}

	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		http.Error(w, "jwt secret is not configured", http.StatusInternalServerError)
		return
	}

	expiresAt := time.Now().Add(24 * time.Hour).Unix()
	claims := jwt.MapClaims{
		"sub":      account.ID,
		"email":    account.Email,
		"fullName": account.FullName,
		"exp":      expiresAt,
		"iat":      time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte(secret))
	if err != nil {
		http.Error(w, "could not create token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(models.LoginResponse{
		Message:   "login successful",
		Token:     signedToken,
		ExpiresAt: expiresAt,
	}); err != nil {
		http.Error(w, "could not encode response", http.StatusInternalServerError)
		return
	}
}
