#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Ec2DockerStack } from '../src/Ec2Stack';

const app = new cdk.App();

const ec2Docker = new Ec2DockerStack(app, `AtheriaHqEc2DockerStack`, {
    env: {
        region: process.env.CDK_DEFAULT_REGION,
        account: process.env.CDK_DEFAULT_ACCOUNT
    }
});
cdk.Tags.of(ec2Docker).add('project', 'atheria');