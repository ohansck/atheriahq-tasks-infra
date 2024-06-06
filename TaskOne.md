# AWS Expedition Task 1

## Introduction
Welcome to the AWS Expedition Task! In this task, you will deploy a NestJS application with a Swagger UI on an EC2 instance in your AWS account. This task is designed to help you learn about AWS services such as EC2, IAM, and S3. This task also tests your ability to search for resources.

## Task Overview
The goal of this task is to deploy the NestJS application on an EC2 instance and configure the necessary security settings and permissions. You will perform the following steps:

1. **Create a Security Group:**
   Create a security group to allow access to the application UI on port 80.

2. **Access the Swagger UI:**
   Visit the Swagger UI by adding '/v1/doc' to the EC2 DNS name.

3. **Test the Endpoints:**
   Test the `list-buckets` endpoint, which will initially throw an error due to permissions.

4. **Provide EC2 Instance Role with S3 Access:**
   Modify the EC2 instance role to provide access to AWS S3.

5. **Test the Endpoints Again:**
   Test the endpoints again after providing S3 access to ensure they are working correctly.

## Task Details

### 1. Create an IAM Role
   - Create an IAM role to provide OIDC access between GitHub and AWS.

### 2. Clone the Repository
   - Clone this repository.

### 3. Create a Repo Secret
   - Create a repository secret with the name 'ROLE_TO_ASSUME'.

### 4. Deploy GitHub Actions (Alternatively, clone the repo, and deploy the cdk locally)
   - Deploy the GitHub Actions workflow with workflow dispatch, which will create the EC2 instance and its dependent resources. (If CDK deploy fails, try to bootstrap your environment and try again)

### 5. Modify Security Group and EC2 Instance Role
   - After deployment, modify the existing security group of the EC2 instance to allow access on port 80.
   - Modify the existing EC2 instance role to provide access to AWS S3.

### 6. Take Screenshots
   - Take screenshots of the deployed application and the Swagger UI with '/v1/doc' added to the EC2 DNS name.
   - Post the screenshots in the group for review.

## Conclusion
Congratulations on completing the AWS Services Learning Task! By completing this task, you have gained hands-on experience with deploying applications on AWS EC2, configuring security settings, and managing IAM roles. We hope this task has been a valuable learning experience for you.

## GO TO CLOUDFORMATION, AND DELETE THE 'ATHERIA**' STACK AFTER COMPLETION OF YOUR TASK
