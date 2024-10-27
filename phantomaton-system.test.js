import { expect, stub } from 'lovecraft';
import hierophant from 'hierophant';
import priestess from 'priestess';
import { system, systemPrompt } from './phantomaton-system.js';

describe('Phantomaton System', () => {
  let container;

  beforeEach(() => {
    container = hierophant();
  });

  it('provides a system prompt from user input', () => {
    const inputProvider = stub().returns('Hello, user!');

    container.install(priestess.input.resolver());
    container.install(priestess.input.provider([], inputProvider));

    container.install(system.resolver());
    container.install(system.provider([priestess.input.resolve], ([getInput]) => () => {
      const input = getInput();
      return `System prompt from user input: ${input}`;
    }));

    const [getSystemPrompt] = container.resolve(system.resolve);
    const systemPromptText = getSystemPrompt();

    expect(inputProvider.called).to.be.true;
    expect(systemPromptText).to.equal('System prompt from user input: Hello, user!');
  });

  it('aggregates system prompt providers', () => {
    const provider1 = stub().returns('Prompt 1');
    const provider2 = stub().returns('Prompt 2');

    container.install(systemPrompt.resolver());
    container.install(systemPrompt.provider([], provider1));
    container.install(systemPrompt.provider([], provider2));

    container.install(system.resolver());
    container.install(system.decorator([systemPrompt.resolve], (providers) => (fn) => (...args) => {
      const prompts = providers.map(p => p(...args));
      return prompts.join('\n');
    }));

    const [getSystemPrompt] = container.resolve(system.resolve);
    const systemPromptText = getSystemPrompt();

    expect(provider1.called).to.be.true;
    expect(provider2.called).to.be.true;
    expect(systemPromptText).to.equal('Prompt 1\nPrompt 2');
  });
});