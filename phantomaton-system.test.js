import { expect, stub } from 'lovecraft';
import hierophant from 'hierophant';
import priestess from 'priestess';
import plugin from './phantomaton-system.js';

const { system } = plugin;

describe('Phantomaton System', () => {
  let container;

  beforeEach(() => {
    container = hierophant();
    plugin().install.forEach(c => container.install(c));
  });

  it('provides a system prompt from user input', () => {
    const output = 'Hello, user!';
    const input = stub().returns(output);

    container.install(priestess.input.resolver());
    container.install(priestess.input.provider([], () => input));

    const [fn] = container.resolve(system.resolve);
    console.log(fn);
    const text = fn();

    expect(input.called).to.be.true;
    expect(text).to.equal(output);
  });

  it('aggregates system prompt providers', () => {
    const provider1 = stub().returns('Prompt 1');
    const provider2 = stub().returns('Prompt 2');

    container.install(system.prompt.resolver());
    container.install(system.prompt.provider([], () => provider1));
    container.install(system.prompt.provider([], () => provider2));

    container.install(system.resolver());
    container.install(system.decorator([system.prompt.resolve], (providers) => (fn) => (...args) => {
      const prompts = providers.map(p => p(...args));
      return prompts.join('\n');
    }));

    const [fn] = container.resolve(system.resolve);
    const text = fn();

    expect(provider1.called).to.be.true;
    expect(provider2.called).to.be.true;
    expect(text).to.equal('Prompt 1\nPrompt 2');
  });
});