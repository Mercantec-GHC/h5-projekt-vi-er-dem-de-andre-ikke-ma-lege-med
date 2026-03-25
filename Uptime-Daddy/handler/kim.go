package handler

import (
	"net/http"
)

func KimHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Hej"))
}
