package main

import (
	"log"
	"os"

	"github.com/tricot-inc/changelog/cli"
)

func main() {
	app := cli.Getapp()
	err := app.Run(os.Args)

	if err != nil {
		log.Fatalln(err)
	}
}
