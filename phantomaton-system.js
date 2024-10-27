import sigilium from 'sigilium';
import priestess from 'priestess';

const system = sigilium.composite('system');
system.prompt = sigilium.sigil('system.prompt');

const provider = system.provider(
  [priestess.input.resolve],
  ([input]) => () => input()
);

const decorator = system.decorator(
  [system.prompt.resolve],
  (providers) => (fn) => (...args) => providers.map(p => p(...args)).join('\n')
);

const plugin = () => ({ install: [provider, decorator] });
plugin.system = system;

export default plugin;
