import Bugsee from 'react-native-bugsee';

function exceptionMethod(): void {
  throw new Error('I am dummy exception');
}

function handleExceptionMethod(): void {
  try {
    exceptionMethod();
  } catch (e) {
    Bugsee.logException(e);
  }
}

const BUGSEE_ACTIONS = [
  {
    id: 'a1',
    title: 'Initialize callbacks',
    description: 'Initialize various content and state callbacks',
    onPress: (): void => {
      Bugsee.setLogFilter((logEvent: any) => {
        if (logEvent.text && logEvent.text.indexOf('[secure]') > -1) {
          logEvent.text = '<redacted>';
        }
        return logEvent;
      });

      Bugsee.setNetworkFilter((netEvent: any) => {
        // Filter event here as required, or return null to ignore it
        if (netEvent.url?.indexOf('secure') > -1) {
          netEvent.url = '<redacted>';
        }
        return netEvent;
      });

      Bugsee.setLifecycleEventHandler((eventType: any) => {
        // Handle lifecycle event here...
        console.log(`Bugsee lifecycle state changed to: ${eventType}`);
      });
    },
  },
  {
    id: 'a2',
    title: 'Console log',
    description: 'Add console log entries',
    onPress: (): void => {
      Bugsee.log('Info message', Bugsee.LogLevel.Info);
      Bugsee.log('Debug message', Bugsee.LogLevel.Debug);
      Bugsee.log('Verbose message', Bugsee.LogLevel.Verbose);
      Bugsee.log('Warning message', Bugsee.LogLevel.Warning);
      Bugsee.log('Error message', Bugsee.LogLevel.Error);
      console.log('console.log() message');
      console.warn('console.warn() message');
      console.error('console.error() message');
      console.debug('console.debug() message');
      console.log('[secure] This is "password"!');
    },
  },
  {
    id: 'a3',
    title: 'Network request',
    description: 'Perform network (HTTP) requests',
    onPress: (): void => {
      (async () => {
        const response = await fetch('https://google.com');
        if (response.ok) {
          const responseBody = await response.blob();
          if (responseBody) {
            console.log(`Received network response of ${responseBody.size} characters long!`);
          }
        }
      })();
    },
  },
  {
    id: 'a4',
    title: 'Set identifier',
    description: 'Set some random identifier',
    onPress: (): void => {
      Bugsee.setEmail('test-id');
    },
  },
  {
    id: 'a5',
    title: 'Feedback UI',
    description: 'Bring up the Feedback UI',
    onPress: (): void => {
      Bugsee.showFeedbackUI();
    },
  },
  {
    id: 'a6',
    title: 'Show report UI',
    description: 'Bring up the reporting UI to let user fill the data',
    onPress: (): void => {
      Bugsee.showReportDialog();
    },
  },
  {
    id: 'a7',
    title: 'Upload report',
    description: 'Silently upload the bug report without interrupting user',
    onPress: (): void => {
      Bugsee.upload('', '');
    },
  },
  {
    id: 'a8',
    title: 'Handled exception',
    description: 'Trigger and handle exception',
    onPress: (): void => {
      handleExceptionMethod();
    },
  },
  {
    id: 'a9',
    title: 'JS exception',
    description: 'Throw unhandled exception in JS',
    onPress: (): void => {
      Bugsee.testJsCrash();
    },
  },
  {
    id: 'a10',
    title: 'Native exception/crash',
    description: 'Trigger exception in native code (Objective-C or Java)',
    onPress: (): void => {
      Bugsee.testNativeCrash();
    },
  },
];

export default BUGSEE_ACTIONS;