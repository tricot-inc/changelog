package cli

import (
	"fmt"
	"strings"

	"github.com/tricot-inc/changelog/core"
	"github.com/urfave/cli/v2"
)

// Getapp is return cli.App struct
func Getapp() *cli.App {
  app := &cli.App{
    Name: "changelog",
    Usage: "changelog <organization>/<repo> <target?>",
    Description: "generate simple CHANGELOG",
    Version: "0.0.1",
    Flags: []cli.Flag{
      &cli.StringFlag{
        Name: "token",
        Aliases: []string{"t"},
        Usage: "GitHub Token",
        EnvVars: []string{"GITHUB_TOKEN"},
      },
    },
    Action: func(ctx *cli.Context) error {
      orgAndRepo := ctx.Args().Get(0)
      target := ctx.Args().Get(1)
      arr := strings.Split(orgAndRepo, "/")

      if len(arr) < 2 {
        return fmt.Errorf("Error: required <organization>/<repo>")
      }

      org := arr[0]
      repo := arr[1]

      return core.Changelog(org, repo, target, ctx.String("token"))
    },
  }

  return app
}
