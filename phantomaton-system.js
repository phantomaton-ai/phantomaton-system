import sigilium from 'sigilium';
import priestess from 'priestess';

const system = sigilium.composite('system');

const resolver = system.resolver();

const provider = system.provider(
  [priestess.input.resolve],
  ([input]) => input
);

const aggregator = system.aggregator(
  [],
  () => (providers) => () => providers.map(fn => fn()).join('\n')
);

const plugin = () => ({ install: [resolver, provider, aggregator] });
plugin.system = system;

export default plugin;
