# Wx Files Frontend

UI for the PCIC Weather Files service.

This app provides an interface for selecting and downloading weather files
(wx files).


## Documentation

- [Goals and product requirements](docs/goals-and-product-requirements.md)
- [Installation](docs/installation.md)
- [Configuration](docs/configuration.md)
- [Development](docs/development.md)
- [Build Process](docs/build.md)
- [Production](docs/production.md)
- [Developer notes](docs/developer-notes.md)


### Releasing

1. Increment `version` in `package.json`.
2. Summarize the changes from the last version in `NEWS.md`.
3. Commit these changes, then tag the release, and push all to GitHub,
   including tag:

   ```bash
   git add package.json NEWS.md
   git commit -m "Bump to version x.x.x"
   git tag -a -m "x.x.x" x.x.x
   git push --follow-tags
   ```
