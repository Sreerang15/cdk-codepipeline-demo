import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { AppStage } from './app-stage';
import * as cdk from 'aws-cdk-lib';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    console.log("lk",cdk.SecretValue.secretsManager('arn:aws:secretsmanager:ap-south-1:807157871082:secret:githubtoken-G3usqh'));
    

    const pipeline = new CodePipeline(this, 'MyPipeline', {
      pipelineName: 'SimplePipeline1',
      synth: new ShellStep('SynthStep', {
        input: CodePipelineSource.gitHub('Sreerang15/cdk-codepipeline-demo', 'master', {
          authentication: cdk.SecretValue.secretsManager('arn:aws:secretsmanager:ap-south-1:807157871082:secret:githubtoken-G3usqh'),
        }),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ],
      }),
    });

    pipeline.addStage(new AppStage(this, 'AppStage'));
  }
}
