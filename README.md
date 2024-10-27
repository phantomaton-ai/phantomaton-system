# Phantomaton System 🤖

The Phantomaton System is a module that provides a `.system` extension point for generating a unified system prompt in Phantomaton applications.

## Usage 🛠️

The Phantomaton System exposes a `.system` extension point that can be used to generate a system prompt for your Phantomaton application. This extension point can be installed and used within the [Phantomaton project](https://github.com/phantomaton-ai/phantomaton#readme).

The system prompt is composed of three parts:

1. The user input, which is retrieved from the `input` symbol provided by the `priestess` module.
2. Any additional system prompt providers that have been registered.
3. The aggregation of all the system prompt providers.

For more information on how to use the Phantomaton System, please refer to the [Phantomaton project documentation](https://github.com/phantomaton-ai/phantomaton#readme).

## Extending the System 🔧

The Phantomaton System is designed to be extensible. You can register additional system prompt providers by installing them in the `hierophant` container, and they will be automatically aggregated into the final system prompt.

## Contributing 🦄

We welcome contributions to the Phantomaton System project! If you have any ideas, bug reports, or pull requests, please feel free to submit them on the [Phantomaton System GitHub repository](https://github.com/phantomaton-ai/phantomaton-system).

## License 🔒

The Phantomaton System is licensed under the [MIT License](LICENSE).