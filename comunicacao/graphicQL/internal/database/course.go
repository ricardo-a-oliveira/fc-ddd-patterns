package database

import (
	"database/sql"

	"github.com/google/uuid"
)

type Course struct {
	db *sql.DB
	ID string
	Name string
	Description string
	CategoryId string
}


func NewCourse ( db *sql.DB) *Course {
	return &Course{ db: db}
}


func (c *Course) Create( name string, description string, categoryId string)(Course, error) {
	id := uuid.New().String()

	_, err := c.db.Exec("INSERT INTO courses (id, name, description, categoryId) VALUES ($1, $2, $3, $4)",
					id, name, description, categoryId)

	if err != nil {
		return Course{}, err
	}

	return Course{ID: id, Name: name, Description: description, CategoryId: categoryId}, nil
}