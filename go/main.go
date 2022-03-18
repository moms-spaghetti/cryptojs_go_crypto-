package main

import (
	"fmt"
	"log"

	"github.com/jackc/pgx"
	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
	c "github.com/moms-spaghetti/cryptojsgocrypto/crypto"
)

type Env struct {
	Dsn string `envconfig:"DATABASE_URL" required:"true"`
}

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("godotenv error")
	}

	var e Env

	if err := envconfig.Process("", &e); err != nil {
		log.Fatal("envconfig error")
	}

	cfg, err := pgx.ParseConnectionString(e.Dsn)
	if err != nil {
		log.Fatal("pgx parse error")
	}

	conn, err := pgx.Connect(cfg)
	if err != nil {
		log.Panic("pgx connect error")
	}

	defer conn.Close()

	rows, err := conn.Query("SELECT id, user_id, account_holder, account_number, sort_code FROM payment_detail")
	if err != nil {
		fmt.Printf("query error: %v", err)
	}

	type row struct {
		id string
		user_id string
		account_holder string
		account_number string
		sort_code string
	}

	var out []row

	for rows.Next() {
		r := row{}

		if err := rows.Scan(&r.id, &r.user_id, &r.account_holder, &r.account_number, &r.sort_code); err != nil {
			fmt.Printf("pgx rows scan error: %v", err)
		}

		out = append(out, r)
	}

	for _, r := range out {
		fmt.Println(
			"id: " + r.id + "\n",
			"user_id: " + r.user_id + "\n",
			"account_holder: " + c.Decrypt(r.account_holder) + "\n",
			"account_number: " + c.Decrypt(r.account_number) + "\n",
			"sort_code: " + c.Decrypt(r.sort_code) + "\n",
		)
	}
}
