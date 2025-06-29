import { Stage, StageProps, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class AppStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new Stack(this, 'AppStack'); // placeholder, add real stacks later
  }
}
