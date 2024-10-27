# Phantomaton System 🤖

The Phantomaton System is a module that provides a unified system prompt for running Phantomaton applications on the `hierophant` dependency injector.

## Usage 🛠️

The Phantomaton System exposes a `system` composite that can be used to generate a system prompt for your application. The prompt is composed of three parts:

1. The user input, which is retrieved from the `input` symbol provided by the `priestess` module.
2. Any additional system prompt providers that have been registered.
3. The aggregation of all the system prompt providers.

Here's an example of how to use the Phantomaton System:

```javascript
import hierophant from 'hierophant';
import priestess from 'priestess';
import phantomatomSystem from 'phantomaton-system';

const container = hierophant();

// Install the Phantomaton System
phantomatomSystem().install.forEach(c => container.install(c));

// Register an additional system prompt provider
container.install(phantomatomSystem.system.provider([], () => 'Additional prompt information'));

// Resolve the system prompt and use it in your application
const [getSystemPrompt] = container.resolve(phantomatomSystem.system.resolve);
const systemPrompt = getSystemPrompt();
console.log(systemPrompt);
```

In this example, we install the Phantomaton System plugin, which includes the `system` composite and its associated resolver, provider, and aggregator. We then register an additional system prompt provider and resolve the `system` composite to get the full system prompt.

## Extending the System 🔧

The Phantomaton System is designed to be extensible. You can register additional system prompt providers by installing them in the `hierophant` container, and they will be automatically aggregated into the final system prompt.

## Contributing 🦄

We welcome contributions to the Phantomaton System project! If you have any ideas, bug reports, or pull requests, please feel free to submit them on the [Phantomaton System GitHub repository](https://github.com/phantomaton-ai/phantomaton-system).

## License 🔒

The Phantomaton System is licensed under the [MIT License](LICENSE).