import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export class Ec2DockerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Import the default VPC
    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', {
      isDefault: true,
    });

    // Define the user data script to install Docker and run the container
    // const userData = ec2.UserData.forLinux();
    // userData.addCommands(
    //   'sudo apt-get update -y',
    //   'sudo apt-get install unzip',
    //   'curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" ',
    //   'unzip awscliv2.zip',
    //   'sudo ./aws/install',
    //   'sudo apt-get install -y docker.io',
    //   'sudo systemctl start docker',
    //   'sudo systemctl enable docker',
    //   'sudo docker pull docker.io/ohansck/atheria-academy:latest',
    //   'sudo docker run --restart unless-stopped -p 80:80 -d docker.io/ohansck/atheriahq-academy:v1.0.0'
    // );

    const userData = ec2.UserData.forLinux();
    userData.addCommands(
      'sudo apt-get update -y',
      'sudo apt-get install unzip',
      'curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" ',
      'unzip awscliv2.zip',
      'sudo ./aws/install',
      'sudo apt install npm -y',
      'git clone https://github.com/ohansck/temp-ath.git ath',
      'cd ath',
      'npm install',
      'npm run build',
      'npm run start:prod'
    );

    // Define the role for the EC2 instances
    const role = new iam.Role(this, 'Ec2InstanceRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'),
      ]
    });

    // Create the instance
    const instance = new ec2.Instance(this, 'Instance', {
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.GenericLinuxImage({
        'us-east-1': 'ami-04b70fa74e45c3917', // Canonical, Ubuntu, 24.04 LTS, amd64 noble image build on 2024-04-23
      }),
      vpc,
      userData,
      role,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
    });

    // Output the instance ID
    new cdk.CfnOutput(this, 'InstanceId', { value: instance.instanceId });
    new cdk.CfnOutput(this, 'InstanceDNS', { value: instance.instancePublicDnsName });
  }
}
