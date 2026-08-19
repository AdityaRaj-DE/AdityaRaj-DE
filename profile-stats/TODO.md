# Future Implementations (V2)

## Featured Projects Widget (`/api/v2/projects.svg`)
- **Currently**: The 4 featured projects are hardcoded in `src/services/v2/projects.ts`.
- **Future Task**: Convert this to dynamically fetch `pinnedItems` or top starred repositories from the GitHub GraphQL API once the GitHub profile has pinned repositories or repositories with stars.
  - The GraphQL query `pinnedRepos` should be added to `src/github/queries.ts`.
