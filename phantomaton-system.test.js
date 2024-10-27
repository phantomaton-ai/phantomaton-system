import { expect, stub } from 'lovecraft';
import hierophant from 'hierophant';
import priestess from 'priestess';
import plugin from './phantomaton-system.js';

const { system } = plugin;

describe('Phantomaton System', () => {
  const output = 'Hello, user!';
  let input;
  let container;

  beforeEach(() => {
    input = stub().returns(output);
    container = hierophant();
    container.install(priestess.input.resolver());
    container.install(priestess.input.provider([], () => input));
    plugin().install.forEach(c => container.install(c));
  });

  it('provides a system prompt from user input', () => {
    const [fn] = container.resolve(system.resolve);
    const text = fn();

    expect(input.called).to.be.true;
    expect(text).to.equal(output);
  });

  it('aggregates system prompt providers', () => {
    const provider1 = stub().returns('Prompt 1');
    const provider2 = stub().returns('Prompt 2');

    container.install(system.provider([], () => provider1));
    container.install(system.provider([], () => provider2));

    const [fn] = container.resolve(system.resolve);
    const text = fn();

    expect(provider1.called).to.be.true;
    expect(provider2.called).to.be.true;
    expect(text).to.equal(`${output}\nPrompt 1\nPrompt 2`);
  });
});