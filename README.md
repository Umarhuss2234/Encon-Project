# encon-projects
This folder contains the projects that I completed at my internship at Encon Pharam. Built a full-stack cold-chain temperature monitoring application using AWS, Terraform, Next.js and TypeScript, allowing users to create, view, edit and delete temperature readings

• Developed a REST API using API Gateway, Lambda and DynamoDB, with server-side validation, UUIDv4 IDs and automatic classification of readings as ok or excursion.

• Implemented an event-driven alert pipeline using SNS, SQS and Lambda, including retry handling, idempotency protection and a Dead-Letter Queue for failed messages.

• Rebuilt the complete backend using Terraform Infrastructure as Code, including S3 remote state, DynamoDB state locking and reusable Terraform modules, and verified it through a complete destroy-and-rebuild.

• Created automated Jest/Node.js tests and a deployment test gate, preventing Terraform deployment when tests failed, alongside API testing with Postman.

• Built the frontend using Next.js, TypeScript, Tailwind CSS and TanStack Query, including validation, loading/error/empty states and integration with the live deployed API.

• Deployed the frontend publicly using AWS Amplify with Git-based automatic builds and deployments from GitHub.
