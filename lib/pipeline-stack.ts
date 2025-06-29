import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { AppStage } from './app-stage';
import * as cdk from 'aws-cdk-lib';
import { GitHubTrigger } from 'aws-cdk-lib/aws-codepipeline-actions';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    //console.log("lk",cdk.SecretValue.secretsManager('GITHUB_TOKEN'));
    

    const pipeline = new CodePipeline(this, 'MyPipeline', {
      pipelineName: 'SimplePipeline2',
      synth: new ShellStep('SynthStep', {
        input: CodePipelineSource.gitHub('Sreerang15/cdk-codepipeline-demo', 'master', {
          authentication: cdk.SecretValue.plainText('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'),
          trigger: GitHubTrigger.NONE
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
