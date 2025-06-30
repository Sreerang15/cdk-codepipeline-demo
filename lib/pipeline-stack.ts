import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, CodeBuildStep } from 'aws-cdk-lib/pipelines';
import { AppStage } from './app-stage';
import * as cdk from 'aws-cdk-lib';
import { GitHubTrigger } from 'aws-cdk-lib/aws-codepipeline-actions';

const s = "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"

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'MyPipeline', {
      pipelineName: 'SimplePipeline3',
      synth: new CodeBuildStep('SynthStep', {
        input: CodePipelineSource.gitHub('Sreerang15/cdk-codepipeline-demo', 'master', {
          authentication: cdk.SecretValue.unsafePlainText(s),
          trigger: GitHubTrigger.NONE
        }),
        installCommands: [
          'npm ci'
        ],
        commands: [
          'npm run build',
          'npx cdk synth'
        ],
        // Optional: if you want to give build project more permissions
        rolePolicyStatements: [
          new cdk.aws_iam.PolicyStatement({
            actions: ['*'],
            resources: ['*']
          })
        ]
      })
    });

    pipeline.addStage(new AppStage(this, 'AppStage'));
  }
}
