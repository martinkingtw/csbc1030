Cloud Run Deployment

- Containerized the application with Dockerfile
- Create final/entrypoint.sh file to run migrations and start application
- Setup Google Artifact Registry
- Setup Google Cloud Run service instance
- Setup Google Cloud SQL instance
- Configure database, database users, grant permission to database users
- Grant Goolge Cloud Run service account permission to Google Cloud SQL instance
- Connect Google Cloud SQL instance to Google Cloud Run service instance
- Update code to use socketPath instead of port for SQL
- Create secrets SECRET_KEY, DB_PASSWORD in Github
- Setup final/utils/tester.sql for automation testing, ONLY use in lint_and_test.yml
- Setup .github/workflows/lint_and_test.yml for linting and testing on every PR
- The content of the yml file is
Setup environments, Install dependencies, Running linter, Starting MySQL, Creating test databases, Seed databases, Start server, and Run testing
- Create secrets SECRET_KEY and DB_PASSWORD in Google Secret Manager, and GCP_CREDENTIALS in Github
- Setup .github/workflows/gcp.yml to deploy new version of the application on every merge to develop
- It is a protected branch, must merge to commit
- The content of the yml file is
Setup environments, Login to Google, Build and Upload docker to Google Artifact Registry, Deploy the latest docker image to Google Cloud Run, Output the URL to the Express application
- Refer to final/README.md for the usage of the Express application
