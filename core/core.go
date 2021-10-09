package core

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/google/go-github/v39/github"
	"golang.org/x/oauth2"
)

// PrefixTitle ref: prefix: https://github.com/tricot-inc/kamui/blob/main/CONTRIBUTING.md#type
var PrefixTitle = map[string]string{
	"feat":     "Features",
	"update":   "Updates",
	"fix":      "Bug Fixed",
	"docs":     "Documents",
	"refactor": "Refactorings",
	"test":     "Tests",
	"clean":    "Clean up",
	"chore":    "Other",
}

// PrefixOrder is order prefix string
var PrefixOrder = []string{
	"feat",
	"update",
	"fix",
	"refactor",
	"docs",
	"test",
	"clean",
	"chore",
}

func getGitHubClient(context context.Context, token string) *github.Client {
	ts := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token})
	tc := oauth2.NewClient(context, ts)
	client := github.NewClient(tc)

	return client
}

// Changelog is generate changelog text
func Changelog(owner string, repo string, target string, token string) error {
	ctx := context.Background()
	client := getGitHubClient(ctx, token)

  if target == "" {
    result,_,err  := client.Repositories.GetLatestRelease(ctx, owner, repo)

    if err != nil {
      return err
    }

    target = result.GetTagName()
  }

	commitsComparison, _, err := client.Repositories.CompareCommits(ctx, owner, repo, target, "main", nil)

	if err != nil {
    return err
	}

	result := map[string][]string{
		"feat":     []string{},
		"update":   []string{},
		"fix":      []string{},
		"docs":     []string{},
		"refactor": []string{},
		"test":     []string{},
		"clean":    []string{},
		"chore":    []string{},
	}

	for _, commit := range commitsComparison.Commits {
    raw := commit.Commit.Message
    tr := strings.Split(strings.Split(*raw, "\n")[0], ":")
    prefix := tr[0]
    body := tr[1][1:]
    author := commit.Author.Login

    result[prefix] = append(result[prefix], fmt.Sprintf("%s - [@%s](https://github.com/%s)", body, *author, *author))
	}

  now := time.Now()
  md := fmt.Sprintf("# <please insert tag version>(%s)", now.Format("2006-01-02"))

  for _, prefix := range PrefixOrder {
    if len(result[prefix]) == 0 {
      continue
    }

    md += "\n\n"
    md += fmt.Sprintf("## %s\n\n", PrefixTitle[prefix])
    md += fmt.Sprintf("- %s", strings.Join(result[prefix], "\n- "))
  }

  fmt.Println(md)

	return nil
}
